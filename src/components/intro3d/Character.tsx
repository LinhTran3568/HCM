import { useMemo, useRef, useEffect, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

function dampAngle(current: number, target: number, lambda: number, dt: number) {
  const diff = Math.atan2(Math.sin(target - current), Math.cos(target - current))
  return current + diff * (1 - Math.exp(-lambda * dt))
}

let blobTexture: THREE.CanvasTexture | null = null

function getBlobTexture() {
  if (blobTexture) return blobTexture
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const grad = ctx!.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2)
  grad.addColorStop(0, 'rgba(0,0,0,0.6)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx!.fillStyle = grad
  ctx!.fillRect(0, 0, size, size)
  blobTexture = new THREE.CanvasTexture(canvas)
  blobTexture.needsUpdate = true
  return blobTexture
}

export type ModelKey = 'mother' | 'daughter' | 'husband'

type ModelDef = {
  url: string
  height: number
  colors?: Record<string, string>
}

const MODEL_DEFS: Record<ModelKey, ModelDef> = {
  mother: {
    url: '/models/mother.glb',
    height: 1.42,
    colors: {
      Skin: '#e8c09a',
      Hair: '#c9c9d2',
      HairBase: '#b3b3c0',
      Shirt: '#8a5a3b',
      Pants: '#4a3527',
      Socks: '#d8d2c2',
      Shoes: '#5b3a26',
    },
  },
  daughter: {
    url: '/models/daughter.glb',
    height: 1.5,
    colors: {
      Skin: '#e8c09a',
      Hair: '#1d140e',
      HairBase: '#0d0a08',
      Shirt: '#0e6e5c',
      Pants: '#f0e9dc',
      Shoes: '#f0e9dc',
    },
  },
  husband: {
    url: '/models/husband.glb',
    height: 1.55,
    colors: {
      Shirt: '#8fa3b8',
      Pants: '#3d4046',
      Hair: '#1d1a16',
    },
  },
}

function Prop({ kind }: { kind: 'basket' | 'flower' }) {
  if (kind === 'basket') {
    return (
      <group position={[0.01, -0.02, 0.05]} rotation={[0, 0, -0.35]}>
        <mesh>
          <torusGeometry args={[0.085, 0.018, 8, 20]} />
          <meshStandardMaterial color="#8a5a33" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.078, 0.078, 0.09, 12]} />
          <meshStandardMaterial color="#a06c3e" roughness={0.95} />
        </mesh>
      </group>
    )
  }
  return (
    <group position={[0.02, -0.02, 0.06]} rotation={[0, 0, -0.25]}>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.008, 0.01, 0.2, 6]} />
        <meshStandardMaterial color="#2f5d3a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <sphereGeometry args={[0.048, 10, 10]} />
        <meshStandardMaterial color="#e08aa8" roughness={0.6} />
      </mesh>
    </group>
  )
}

export type CharacterProps = {
  model: ModelKey
  position?: [number, number, number]
  walkTo?: [number, number] | null
  arriveFace?: number
  talk?: boolean
  prop?: 'basket' | 'flower' | 'none'
  active?: boolean
  children?: ReactNode
}

export function Character({
  model,
  position = [0, 0, 0],
  walkTo = null,
  arriveFace = 0,
  talk = false,
  prop = 'none',
  active = false,
  children,
}: CharacterProps) {
  const def = MODEL_DEFS[model]
  const { scene, animations } = useGLTF(def.url)
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)
  const moving = useRef(false)
  const { actions, names } = useAnimations(animations, inner)

  const norm = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const height = box.getSize(new THREE.Vector3()).y || 1
    const s = def.height / height
    return { scale: s, yOff: -box.min.y * s }
  }, [scene, def])

  const bones = useMemo(() => {
    const map: Record<string, THREE.Object3D | null> = {}
    scene.traverse((o) => {
      if ((o as THREE.SkinnedMesh).isSkinnedMesh) {
        const sm = o as THREE.SkinnedMesh
        for (const b of sm.skeleton.bones) map[b.name] = b
      }
    })
    return map
  }, [scene])

  const handR = (bones['MiddleHand.R'] ?? null) as THREE.Bone | null
  const head = (bones['Head'] ?? null) as THREE.Bone | null
  const armR = (bones['UpperArm.R'] ?? null) as THREE.Bone | null

  const lastHeadY = useRef(0)
  const lastHeadZ = useRef(0)
  const lastArmZ = useRef(0)

  const clipMode: 'idle' | 'walk' = active && walkTo ? 'walk' : 'idle'

  useEffect(() => {
    const pick = (re: RegExp) => names.find((n) => re.test(n))
    const target = clipMode === 'walk' ? pick(/_Walk$/) : pick(/_Idle$/) ?? pick(/_Standing$/)
    const current = pick(/_Walk$/) ?? pick(/_Idle$/) ?? pick(/_Standing$/)
    if (!target || !actions[target] || !current || !actions[current]) return
    if (current !== target) actions[current]?.fadeOut(0.25)
    actions[target]?.reset().fadeIn(0.25).play()
  }, [clipMode, names, actions])

  useEffect(() => {
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const mesh = o as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        const mat = mesh.material as THREE.MeshStandardMaterial
        if (mat) {
          if (def.colors && mat.name && def.colors[mat.name]) mat.color.set(def.colors[mat.name])
          if ('metalness' in mat) {
            mat.metalness = 0
            mat.roughness = 0.9
          }
        }
      }
    })
  }, [scene, def])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const p = g.position

    if (active && walkTo) {
      const dx = walkTo[0] - p.x
      const dz = walkTo[1] - p.z
      const dist = Math.hypot(dx, dz)
      const speed = 1.6
      if (dist > 0.04) {
        const step = Math.min(dist, speed * dt)
        p.x += (dx / dist) * step
        p.z += (dz / dist) * step
        const faceYaw = dx > 0.02 ? Math.PI / 2 : dx < -0.02 ? -Math.PI / 2 : 0
        g.rotation.y = dampAngle(g.rotation.y, faceYaw, 6, dt)
        moving.current = true
      } else {
        p.x = walkTo[0]
        p.z = walkTo[1]
        g.rotation.y = dampAngle(g.rotation.y, arriveFace, 5, dt)
        moving.current = false
      }
    } else {
      moving.current = false
    }

    if (talk) {
      if (head) {
        const vy = Math.sin(t * 3.6) * 0.1
        const vz = Math.sin(t * 2.6) * 0.05
        head.rotation.y += vy - lastHeadY.current
        head.rotation.z += vz - lastHeadZ.current
        lastHeadY.current = vy
        lastHeadZ.current = vz
      }
      if (armR) {
        const va = Math.sin(t * 3.0) * 0.18
        armR.rotation.z += va - lastArmZ.current
        lastArmZ.current = va
      }
    } else {
      lastHeadY.current = 0
      lastHeadZ.current = 0
      lastArmZ.current = 0
    }
  })

  return (
    <group ref={group} position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <planeGeometry args={[0.95, 0.7]} />
        <meshBasicMaterial map={getBlobTexture()} transparent opacity={0.85} depthWrite={false} />
      </mesh>
      <group ref={inner} position={[0, norm.yOff, 0]} scale={norm.scale}>
        <primitive object={scene} />
        {handR && prop !== 'none' && (
          <primitive object={handR}>
            <Prop kind={prop} />
          </primitive>
        )}
      </group>
      {children}
    </group>
  )
}
