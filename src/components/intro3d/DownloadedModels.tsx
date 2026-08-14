import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Clone } from '@react-three/drei'
import * as THREE from 'three'

type GlbModelProps = {
  url: string
  height: number
  position?: [number, number, number]
  rotationY?: number
  scale?: number
  castShadow?: boolean
}

export function GlbModel({
  url,
  height,
  position = [0, 0, 0],
  rotationY = 0,
  scale = 1,
  castShadow = true,
}: GlbModelProps) {
  const { scene } = useGLTF(url)
  const norm = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const h = box.getSize(new THREE.Vector3()).y || 1
    const s = height / h
    return { scale: s, yOff: -box.min.y * s }
  }, [scene, height])
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <Clone object={scene} scale={norm.scale} position={[0, norm.yOff, 0]} castShadow={castShadow} receiveShadow />
    </group>
  )
}

export function TradHouseDl(props: Omit<GlbModelProps, 'url'>) {
  return <GlbModel url="/models/house-trad.glb" {...props} />
}

export function ModernHouseDl(props: Omit<GlbModelProps, 'url'>) {
  return <GlbModel url="/models/house-modern.glb" {...props} />
}

export function TownHouse(props: Omit<GlbModelProps, 'url'>) {
  return <GlbModel url="/models/house-town.glb" {...props} />
}

export function Tree({ big = false, ...props }: Omit<GlbModelProps, 'url'> & { big?: boolean }) {
  return <GlbModel url={big ? '/models/tree-big.glb' : '/models/tree-common.glb'} {...props} />
}

/* ── Đường thẳng bờ xa ─────────────────────────────────────── */
export function StraightRoad({ z = -30.5, length = 60, width = 3.6 }: { z?: number; length?: number; width?: number }) {
  const dashes = useMemo(() => {
    const arr: number[] = []
    for (let x = -length / 2 + 1; x < length / 2 - 0.5; x += 1.8) arr.push(x)
    return arr
  }, [length])
  return (
    <group position={[0, 0.012, z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial color="#3b3e42" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.004, -width / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length, 0.22]} />
        <meshStandardMaterial color="#c9c4b4" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.004, width / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length, 0.22]} />
        <meshStandardMaterial color="#c9c4b4" roughness={0.95} />
      </mesh>
      {dashes.map((x, i) => (
        <mesh key={i} position={[x, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 0.2]} />
          <meshStandardMaterial color="#e8e6df" roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

/* ── Xe di chuyển ──────────────────────────────────────────── */
type VehicleProps = {
  url: string
  length: number
  y?: number
  yaw?: number
  children?: React.ReactNode
}

function useFitLen(url: string, length: number) {
  const { scene } = useGLTF(url)
  return useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const len = Math.max(size.x, size.z) || 1
    const s = length / len
    return { scene, scale: s, yOff: -box.min.y * s }
  }, [scene, length])
}

export function RoadVehicle({
  url,
  length,
  x,
  z,
  speed,
  dir = 1,
  y = 0.04,
  yaw = 0,
  range = 26,
}: VehicleProps & { x: number; z: number; speed: number; dir?: 1 | -1; range?: number }) {
  const ref = useRef<THREE.Group>(null)
  const { scene, scale, yOff } = useFitLen(url, length)
  useFrame((_, dt) => {
    const g = ref.current
    if (!g) return
    let xPos = g.position.x + speed * dir * dt
    let d = dir
    if (xPos > range) {
      xPos = range
      d = -1
    } else if (xPos < -range) {
      xPos = -range
      d = 1
    }
    g.userData.dir = d
    g.position.x = xPos
    g.rotation.y = d > 0 ? Math.PI / 2 + yaw : -Math.PI / 2 + yaw
  })
  return (
    <group ref={ref} position={[x, y, z]} userData={{ dir }}>
      <Clone object={scene} scale={scale} position={[0, yOff, 0]} castShadow receiveShadow />
    </group>
  )
}
