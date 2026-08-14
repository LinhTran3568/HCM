import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// /images/modern-house-dusk.jpg — "Modern-home-dusk", vcmxnajg1, CC BY 2.0 via Wikimedia Commons
// /images/nha-tan-ky.jpg — ảnh ngôi nhà cổ Tân Kỳ sẵn có trong dự án
// (bản -3d là ảnh đã thu nhỏ cho cảnh 3D)

let duskTexture: THREE.CanvasTexture | null = null

function getDuskTexture() {
  if (duskTexture) return duskTexture
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const grad = ctx!.createLinearGradient(0, 0, 0, size)
  grad.addColorStop(0, 'rgba(16,24,54,0.85)')
  grad.addColorStop(0.55, 'rgba(16,24,54,0.28)')
  grad.addColorStop(1, 'rgba(16,24,54,0)')
  ctx!.fillStyle = grad
  ctx!.fillRect(0, 0, size, size)
  duskTexture = new THREE.CanvasTexture(canvas)
  duskTexture.needsUpdate = true
  return duskTexture
}

type HousePhotoProps = {
  url: string
  position: [number, number, number]
  height: number
}

export function HousePhoto({ url, position, height }: HousePhotoProps) {
  const texture = useTexture(url)
  const group = useRef<THREE.Group>(null)
  const img = texture.image as { width?: number; height?: number }
  const aspect = img && img.height ? img.width! / img.height : 1.5
  const width = height * aspect

  useFrame(({ camera }) => {
    const g = group.current
    if (!g) return
    const dx = camera.position.x - g.position.x
    const dz = camera.position.z - g.position.z
    if (dx !== 0 || dz !== 0) g.rotation.y = Math.atan2(dx, dz)
  })

  return (
    <group ref={group} position={position}>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#2a3352" transparent opacity={0.16} toneMapped={false} />
      </mesh>

      <mesh position={[0, height * 0.3, 0.02]}>
        <planeGeometry args={[width, height * 0.55]} />
        <meshBasicMaterial map={getDuskTexture()} transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  )
}

export function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.13, 1, 8]} />
        <meshStandardMaterial color="#5a4028" roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.25, 0]} castShadow>
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshStandardMaterial color="#2f5d3a" roughness={0.95} />
      </mesh>
      <mesh position={[0.32, 1.0, 0.12]} scale={0.8} castShadow>
        <sphereGeometry args={[0.5, 10, 10]} />
        <meshStandardMaterial color="#3a6b46" roughness={0.95} />
      </mesh>
    </group>
  )
}

export function Campfire({ position = [0, 0, -0.3] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[Math.cos(i * 2.1) * 0.17, 0.06, Math.sin(i * 2.1) * 0.17]}
          rotation={[0, i * 1.2, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.04, 0.04, 0.34, 6]} />
          <meshStandardMaterial color="#6b4526" roughness={0.95} />
        </mesh>
      ))}
      {[-0.24, 0, 0.24].map((x) => (
        <mesh key={x} position={[x, 0.025, 0]} rotation={[0, 0, 0.28]}>
          <boxGeometry args={[0.13, 0.09, 0.3]} />
          <meshStandardMaterial color="#7a7a80" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.17, 0]} scale={[1, 1.7, 1]}>
        <sphereGeometry args={[0.11, 12, 12]} />
        <meshStandardMaterial color="#ffb054" emissive="#ff8c3a" emissiveIntensity={2.2} />
      </mesh>
      <pointLight position={[0, 0.45, 0]} color="#ffab5e" intensity={3.4} distance={7} decay={2} />
    </group>
  )
}
