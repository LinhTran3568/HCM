import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { GradientTexture } from '@react-three/drei'
import * as THREE from 'three'

let glowTexture: THREE.CanvasTexture | null = null

function getGlowTexture() {
  if (glowTexture) return glowTexture
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx!.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,0.95)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.4)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx!.fillStyle = g
  ctx!.fillRect(0, 0, size, size)
  glowTexture = new THREE.CanvasTexture(canvas)
  glowTexture.needsUpdate = true
  return glowTexture
}

/* ── Bầu trời ban ngày ─────────────────────────────────────── */
export function Sky() {
  return (
    <mesh>
      <sphereGeometry args={[46, 24, 16]} />
      <meshBasicMaterial side={THREE.BackSide} fog={false}>
        <GradientTexture
          stops={[0, 0.32, 0.58, 0.78, 0.92, 1]}
          colors={['#3f9be3', '#6db8ec', '#9ed4f4', '#cde8fa', '#eaf6fd', '#f2fafd']}
          size={512}
        />
      </meshBasicMaterial>
    </mesh>
  )
}

/* ── Mặt trời ──────────────────────────────────────────────── */
export function Sun({ position = [8, 13, 9] }: { position?: [number, number, number] }) {
  const group = useRef<THREE.Group>(null)
  useFrame(({ camera }) => {
    const g = group.current
    if (g) g.quaternion.copy(camera.quaternion)
  })
  return (
    <group ref={group} position={position}>
      <mesh>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial map={getGlowTexture()} color="#fff3d0" transparent depthWrite={false} toneMapped={false} fog={false} />
      </mesh>
      <mesh>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial map={getGlowTexture()} color="#fffbe8" transparent depthWrite={false} toneMapped={false} fog={false} />
      </mesh>
    </group>
  )
}

/* ── Mây trắng trôi ────────────────────────────────────────── */
export function Clouds() {
  const group = useRef<THREE.Group>(null)
  const clouds = useMemo(
    () =>
      Array.from({ length: 6 }, () => ({
        x: -22 + Math.random() * 44,
        y: 9 + Math.random() * 3.5,
        z: -20 - Math.random() * 10,
        scale: 2.6 + Math.random() * 2,
        speed: 0.25 + Math.random() * 0.3,
      })),
    [],
  )
  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    g.children.forEach((child, i) => {
      child.position.x += clouds[i].speed * dt
      if (child.position.x > 24) child.position.x = -24
    })
  })
  return (
    <group ref={group}>
      {clouds.map((c, i) => (
        <group key={i} position={[c.x, c.y, c.z]} scale={c.scale}>
          <mesh>
            <sphereGeometry args={[1.1, 12, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0.9, -0.12, 0.2]}>
            <sphereGeometry args={[0.8, 12, 8]} />
            <meshStandardMaterial color="#f7fafc" roughness={1} transparent opacity={0.95} />
          </mesh>
          <mesh position={[-0.9, -0.1, 0]}>
            <sphereGeometry args={[0.72, 12, 8]} />
            <meshStandardMaterial color="#f7fafc" roughness={1} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, -0.18, -0.25]} scale={[1.4, 0.8, 1]}>
            <sphereGeometry args={[0.55, 10, 8]} />
            <meshStandardMaterial color="#fbfdff" roughness={1} transparent opacity={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ── Đường chân trời Hà Nội (xa) ───────────────────────────── */
type Building = { x: number; w: number; h: number; z: number; tower?: boolean }

export function CitySkyline() {
  const buildings = useMemo(() => {
    const arr: Building[] = []
    let x = -21
    while (x < 21) {
      const w = 1.5 + Math.random() * 1.7
      const h = 3.5 + Math.random() * 5
      arr.push({ x: x + w / 2, w, h, z: -33 - Math.random() * 4 })
      x += w + (0.4 + Math.random() * 1.3)
    }
    for (let i = 0; i < 3; i++) {
      const x = -13 + Math.random() * 26
      arr.push({ x, w: 1.7 + Math.random() * 0.8, h: 14 + Math.random() * 6, z: -36 - Math.random() * 3, tower: true })
    }
    return arr
  }, [])

  return (
    <group>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, 0, b.z]}>
          <mesh position={[0, b.h / 2, 0]}>
            <boxGeometry args={[b.w, b.h, b.w * 0.9]} />
            <meshStandardMaterial color={i % 3 === 0 ? '#b7c6d3' : '#c5d2db'} roughness={1} flatShading />
          </mesh>
          <mesh position={[0, b.h + 0.05, 0]}>
            <boxGeometry args={[b.w + 0.15, 0.14, b.w + 0.15]} />
            <meshStandardMaterial color="#aebcc9" roughness={1} flatShading />
          </mesh>
          {b.tower && (
            <>
              <mesh position={[0, b.h + 0.85, 0]}>
                <boxGeometry args={[0.14, 1.6, 0.14]} />
                <meshStandardMaterial color="#aebcc9" roughness={1} />
              </mesh>
              <mesh position={[0, b.h + 1.8, 0]}>
                <sphereGeometry args={[0.14, 6, 6]} />
                <meshStandardMaterial color="#e0533f" roughness={0.5} />
              </mesh>
            </>
          )}
        </group>
      ))}
    </group>
  )
}

/* ── Cầu Thê Húc (đỏ) nối bờ với đảo Ngọc Sơn ──────────────── */
export function TheHucBridge() {
  return (
    <group position={[4.9, 0, -5.4]} rotation={[0, Math.atan2(-2.4, 2.6), 0]}>
      {/* mặt cầu 3 nhịp vồng nhẹ */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <boxGeometry args={[1.8, 0.11, 0.95]} />
        <meshStandardMaterial color="#b23a26" roughness={0.85} />
      </mesh>
      <mesh position={[-0.95, 0.2, 0]} rotation={[0, 0, 0.09]}>
        <boxGeometry args={[0.95, 0.09, 0.95]} />
        <meshStandardMaterial color="#b23a26" roughness={0.85} />
      </mesh>
      <mesh position={[0.95, 0.2, 0]} rotation={[0, 0, -0.09]}>
        <boxGeometry args={[0.95, 0.09, 0.95]} />
        <meshStandardMaterial color="#b23a26" roughness={0.85} />
      </mesh>
      {/* lan can hai bên */}
      {[-0.42, 0.42].map((z, i) => (
        <group key={i} position={[0, 0.78, z]}>
          <mesh>
            <boxGeometry args={[2.9, 0.07, 0.05]} />
            <meshStandardMaterial color="#a3402a" roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.28, 0]}>
            <boxGeometry args={[2.9, 0.05, 0.05]} />
            <meshStandardMaterial color="#a3402a" roughness={0.85} />
          </mesh>
          {[-1.1, -0.36, 0.36, 1.1].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <boxGeometry args={[0.045, 0.56, 0.05]} />
              <meshStandardMaterial color="#a3402a" roughness={0.85} />
            </mesh>
          ))}
        </group>
      ))}
      {/* cổng hai đầu */}
      <mesh position={[-1.55, 1.0, 0]}>
        <boxGeometry args={[0.14, 0.55, 1.15]} />
        <meshStandardMaterial color="#a3402a" roughness={0.85} />
      </mesh>
      <mesh position={[1.55, 1.0, 0]}>
        <boxGeometry args={[0.14, 0.55, 1.15]} />
        <meshStandardMaterial color="#a3402a" roughness={0.85} />
      </mesh>
    </group>
  )
}

/* ── Đảo Ngọc Sơn (đền nhỏ mái đỏ) ─────────────────────────── */
export function NgoSon({ position = [6.2, 0, -6.6] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]} scale={[1, 0.4, 1]}>
        <sphereGeometry args={[1.95, 16, 12]} />
        <meshStandardMaterial color="#7b7465" roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 0.6, 0]} scale={[1, 0.3, 1]}>
        <sphereGeometry args={[1.4, 14, 10]} />
        <meshStandardMaterial color="#55704a" roughness={1} />
      </mesh>
      {/* sân đền */}
      <mesh position={[0, 0.88, 0]} castShadow>
        <cylinderGeometry args={[1.3, 1.45, 0.4, 12]} />
        <meshStandardMaterial color="#cfc4aa" roughness={0.95} />
      </mesh>
      {/* cột đỏ */}
      {[
        [-0.65, -0.65],
        [0.65, -0.65],
        [-0.65, 0.65],
        [0.65, 0.65],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.55, z]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.0, 6]} />
          <meshStandardMaterial color="#a3402a" roughness={0.85} />
        </mesh>
      ))}
      {/* xà ngang */}
      <mesh position={[0, 2.15, 0]}>
        <boxGeometry args={[1.8, 0.16, 1.8]} />
        <meshStandardMaterial color="#8a7a5f" roughness={0.9} />
      </mesh>
      {/* mái đền */}
      <mesh position={[0, 2.38, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.7, 0.7, 4]} />
        <meshStandardMaterial color="#a3402a" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2.85, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.4, 6]} />
        <meshStandardMaterial color="#5a4636" roughness={0.9} />
      </mesh>
    </group>
  )
}

/* ── Đảo Ngọc Sơn (đền nhỏ mái đỏ) ─────────────────────────── */
function Tuft({ x, z, s }: { x: number; z: number; s: number }) {
  return (
    <group position={[x, 0, z]} scale={s}>
      <mesh position={[0, 0.11, 0]}>
        <coneGeometry args={[0.05, 0.24, 4]} />
        <meshStandardMaterial color="#4a7a35" roughness={1} />
      </mesh>
      <mesh position={[0.06, 0.08, 0.02]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.045, 0.2, 4]} />
        <meshStandardMaterial color="#5a8a3f" roughness={1} />
      </mesh>
      <mesh position={[-0.05, 0.09, -0.02]} rotation={[0, 0, 0.28]}>
        <coneGeometry args={[0.045, 0.18, 4]} />
        <meshStandardMaterial color="#3f6f2e" roughness={1} />
      </mesh>
    </group>
  )
}

function Bush({ x, z, s }: { x: number; z: number; s: number }) {
  return (
    <group position={[x, 0, z]} scale={s}>
      <mesh position={[0, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.26, 10, 8]} />
        <meshStandardMaterial color="#3c7a2e" roughness={1} />
      </mesh>
      <mesh position={[0.2, 0.12, 0.08]}>
        <sphereGeometry args={[0.16, 8, 8]} />
        <meshStandardMaterial color="#4d8c3c" roughness={1} />
      </mesh>
      <mesh position={[-0.17, 0.1, -0.05]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color="#356c28" roughness={1} />
      </mesh>
    </group>
  )
}

function Stone({ x, z, s }: { x: number; z: number; s: number }) {
  return (
    <mesh position={[x, 0.08, z]} scale={s} castShadow>
      <dodecahedronGeometry args={[0.16, 0]} />
      <meshStandardMaterial color="#8d8a80" roughness={1} flatShading />
    </mesh>
  )
}

function Flower({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.01, 0.012, 0.22, 5]} />
        <meshStandardMaterial color="#4a7a35" roughness={1} />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <sphereGeometry args={[0.045, 6, 6]} />
        <meshStandardMaterial color="#e08aa8" roughness={0.7} />
      </mesh>
    </group>
  )
}

const BUSHES: [number, number, number][] = [
  [-7.6, 0.6, 1.1], [7.7, 0.5, 1.0], [-8.4, -2.2, 1.2], [8.4, -2.4, 1.1],
  [-3.6, -2.8, 0.85], [3.8, -3.0, 0.9], [-6.2, -2.6, 1.0], [6.6, -2.8, 0.95],
]
const TUFTS: [number, number, number][] = [
  [-6.0, 1.0, 0.5], [6.1, 0.9, 0.5], [-2.8, 1.6, 0.5], [2.9, 1.5, 0.5],
  [-5.4, 1.5, 0.45], [5.5, 1.4, 0.45], [-7.1, -0.4, 0.55], [7.2, -0.5, 0.55],
  [-1.2, -1.9, 0.5], [1.3, -1.8, 0.5], [-3.5, -1.5, 0.5], [3.6, -1.7, 0.5],
]
const STONES: [number, number, number][] = [
  [-1.6, 1.35, 0.7], [1.9, 1.25, 0.6], [-2.4, -0.3, 0.8], [2.5, -0.4, 0.75],
  [-4.3, 1.4, 0.65], [4.4, 1.3, 0.6],
]
const FLOWERS: [number, number][] = [
  [-2.2, 1.9], [2.3, 1.8], [-1.1, -2.2], [1.2, -2.1], [-5.1, 1.0], [5.2, 0.9],
]

export function Flora() {
  return (
    <group>
      {BUSHES.map(([x, z, s], i) => (
        <Bush key={`b${i}`} x={x} z={z} s={s} />
      ))}
      {TUFTS.map(([x, z, s], i) => (
        <Tuft key={`t${i}`} x={x} z={z} s={s} />
      ))}
      {STONES.map(([x, z, s], i) => (
        <Stone key={`s${i}`} x={x} z={z} s={s} />
      ))}
      {FLOWERS.map(([x, z], i) => (
        <Flower key={`f${i}`} x={x} z={z} />
      ))}
    </group>
  )
}

/* ── Hàng rào gỗ ───────────────────────────────────────────── */
export function Fence({ position, width = 4.6 }: { position: [number, number, number]; width?: number }) {
  const posts = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i <= Math.round(width / 0.55); i++) arr.push(-width / 2 + i * 0.55)
    return arr
  }, [width])
  return (
    <group position={position}>
      {posts.map((x, i) => (
        <mesh key={i} position={[x, 0.28, 0]} castShadow>
          <boxGeometry args={[0.06, 0.58, 0.06]} />
          <meshStandardMaterial color="#6a4a2e" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[width, 0.05, 0.05]} />
        <meshStandardMaterial color="#7a5636" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[width, 0.04, 0.04]} />
        <meshStandardMaterial color="#745232" roughness={0.9} />
      </mesh>
    </group>
  )
}

/* ── Lan can đá quanh bờ hồ (biểu tượng Hồ Gươm) ──────────── */
export function StoneRailing({ radius = 10.4 }: { radius?: number }) {
  const posts = useMemo(() => {
    const arr: number[] = []
    for (let i = 0; i < 40; i++) arr.push((i / 40) * Math.PI * 2)
    return arr
  }, [])
  return (
    <group>
      {posts.map((a, i) => (
        <mesh key={i} position={[Math.cos(a) * radius, 0.26, Math.sin(a) * radius]}>
          <boxGeometry args={[0.12, 0.52, 0.12]} />
          <meshStandardMaterial color="#d5ccb8" roughness={1} />
        </mesh>
      ))}
      <mesh position={[0, 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.05, 6, 72]} />
        <meshStandardMaterial color="#d5ccb8" roughness={1} />
      </mesh>
      <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.045, 6, 72]} />
        <meshStandardMaterial color="#cbc0a8" roughness={1} />
      </mesh>
    </group>
  )
}

/* ── Cột đèn phố cổ Hà Nội ─────────────────────────────────── */
export function StreetLamp({ position, rotationY = 0 }: { position: [number, number, number]; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.16, 8]} />
        <meshStandardMaterial color="#3a3f42" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 2.9, 8]} />
        <meshStandardMaterial color="#3a3f42" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, 3.08, 0]}>
        <sphereGeometry args={[0.16, 10, 8]} />
        <meshStandardMaterial color="#fff2d0" emissive="#ffd98a" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 3.34, 0]}>
        <coneGeometry args={[0.12, 0.3, 6]} />
        <meshStandardMaterial color="#3a3f42" roughness={0.8} metalness={0.2} />
      </mesh>
    </group>
  )
}

/* ── Hoa sen trên hồ ────────────────────────────────────────── */
export function Lotus({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.28, 0.33, 0.03, 8]} />
        <meshStandardMaterial color="#3f7c33" roughness={1} />
      </mesh>
      <mesh position={[0.05, 0.24, 0]}>
        <coneGeometry args={[0.13, 0.32, 6]} />
        <meshStandardMaterial color="#e58a9c" roughness={0.7} />
      </mesh>
      <mesh position={[-0.06, 0.3, 0.04]}>
        <coneGeometry args={[0.1, 0.26, 6]} />
        <meshStandardMaterial color="#f0a8bd" roughness={0.7} />
      </mesh>
    </group>
  )
}

/* ── Thuyền gỗ trên hồ ──────────────────────────────────────── */
export function Boat({ position, rotationY = 0 }: { position: [number, number, number]; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, -0.14, 0]}>
        <boxGeometry args={[2.4, 0.28, 0.6]} />
        <meshStandardMaterial color="#7a4a2e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1.6, 0.24, 0.5]} />
        <meshStandardMaterial color="#8a5a33" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.7, 0.5, 0.4]} />
        <meshStandardMaterial color="#a3402a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.85, 0.15, 0.45]} />
        <meshStandardMaterial color="#6d4a37" roughness={0.9} />
      </mesh>
    </group>
  )
}
