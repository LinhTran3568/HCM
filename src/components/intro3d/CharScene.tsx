import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html, Sparkles, GradientTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Character } from './Character'
import { HousePhoto, Tree, Campfire } from './Houses'
import type { Phase, UserChoice } from './types'

const HOUSE_HEIGHT = 4.2
const TRAD_X = -5.4
const MODERN_X = 5.4
const HOUSE_Z = -0.6

function SkyDome() {
  return (
    <mesh scale={[1, 1, 1]}>
      <sphereGeometry args={[46, 24, 16]} />
      <meshBasicMaterial side={THREE.BackSide} fog={false}>
        <GradientTexture stops={[0, 0.45, 0.58, 1]} colors={['#131b3a', '#6d3352', '#ff9a5e', '#131b3a']} size={512} />
      </meshBasicMaterial>
    </mesh>
  )
}

function Ground() {
  return (
    <group>
      <mesh position={[0, -0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#1c150e" roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[7.5, 7.8, 0.2, 40]} />
        <meshStandardMaterial color="#5c4a33" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13, 2.6]} />
        <meshStandardMaterial color="#6d5a41" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Bubble({
  title,
  text,
  color,
}: {
  title: string
  text: string
  color: string
}) {
  return (
    <Html position={[0, 1.9, 0]} center zIndexRange={[25, 0]} style={{ pointerEvents: 'none' }}>
      <div className="char-bubble">
        <span className="char-bubble__title" style={{ color }}>
          {title}
        </span>
        <span className="char-bubble__text">{text}</span>
      </div>
    </Html>
  )
}

function Characters({ phase, choice }: { phase: Phase; choice: UserChoice | null }) {
  const active = phase === 'walk'
  const chung = choice === 'chung'
  const houseX = chung ? TRAD_X : MODERN_X

  const motherX = chung ? TRAD_X - 0.5 : TRAD_X - 0.5
  const daughterX = chung ? TRAD_X + 0.5 : MODERN_X - 0.5
  const husbandX = chung ? TRAD_X + 1.5 : MODERN_X + 0.5

  const motherTo: [number, number] | null = active ? [motherX, 1.75] : null
  const daughterTo: [number, number] | null = active ? [daughterX, 2.05] : null
  const husbandTo: [number, number] | null = active ? [husbandX, 1.75] : null

  const faceTo = (x: number, hx: number) => (x < hx ? Math.PI / 2 : -Math.PI / 2)
  const motherArrive = faceTo(motherX, TRAD_X)
  const daughterArrive = faceTo(daughterX, houseX)
  const husbandArrive = faceTo(husbandX, houseX)

  const motherBubble =
    phase === 'ask'
      ? { title: 'Mẹ chồng', text: 'Con dâu với mẹ chồng — ở chung hay ở riêng, con thấy sao?', color: '#b06a4a' }
      : phase === 'walk'
        ? {
            title: 'Mẹ chồng',
            text: chung ? 'Sum vầy một mái nhà!' : 'Mẹ luôn vui khi các con hạnh phúc.',
            color: '#b06a4a',
          }
        : null

  const daughterBubble =
    phase === 'ask'
      ? { title: 'Nàng dâu', text: 'Mẹ ơi, con đang phân vân lắm…', color: '#0e6e5c' }
      : phase === 'walk'
        ? {
            title: 'Nàng dâu',
            text: chung ? 'Dạ, một tổ ấm chung ạ!' : 'Con vẫn về thăm mẹ cuối tuần ạ!',
            color: '#0e6e5c',
          }
        : null

  return (
    <>
      <Character
        model="mother"
        position={[-2.05, 0, 0.1]}
        walkTo={motherTo}
        arriveFace={motherArrive}
        talk={phase === 'ask'}
        active={active}
        prop="basket"
      >
        {motherBubble && <Bubble title={motherBubble.title} text={motherBubble.text} color={motherBubble.color} />}
      </Character>

      <Character
        model="daughter"
        position={[1.8, 0, 0.3]}
        walkTo={daughterTo}
        arriveFace={daughterArrive}
        talk={phase === 'ask'}
        active={active}
        prop="flower"
      >
        {daughterBubble && <Bubble title={daughterBubble.title} text={daughterBubble.text} color={daughterBubble.color} />}
      </Character>

      <Character
        model="husband"
        position={[2.4, 0, -0.2]}
        walkTo={husbandTo}
        arriveFace={husbandArrive}
        active={active}
      />
    </>
  )
}

function CameraRig({ phase }: { phase: Phase }) {
  const settled = phase === 'boot'
  return (
    <OrbitControls
      makeDefault
      target={[0, 1, 0]}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={4}
      maxDistance={11}
      minPolarAngle={0.55}
      maxPolarAngle={1.4}
      autoRotate={settled}
      autoRotateSpeed={0.7}
    />
  )
}

export function CharScene({ phase, choice }: { phase: Phase; choice: UserChoice | null }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 6.9], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: 'high-performance',
      }}
      performance={{ min: 0.5 }}
    >
      <SkyDome />
      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#ffd9a8', '#2c2118', 0.7]} />
      <directionalLight
        position={[-6, 9, 5]}
        intensity={1.5}
        color="#ffb977"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[5, 3, -4]} intensity={0.4} color="#7f8fd0" />

      <Ground />
      <Suspense fallback={null}>
        <HousePhoto url="/images/nha-tan-ky-3d.jpg" position={[TRAD_X, HOUSE_HEIGHT / 2, HOUSE_Z]} height={HOUSE_HEIGHT} />
        <HousePhoto url="/images/modern-house-dusk-3d.jpg" position={[MODERN_X, HOUSE_HEIGHT / 2, HOUSE_Z]} height={HOUSE_HEIGHT} />
      </Suspense>
      <Tree position={[-7.1, 0, -1.3]} scale={1.4} />
      <Tree position={[7.1, 0, -1.3]} scale={1.3} />
      <Tree position={[0, 0, -4.1]} scale={1.7} />
      <Campfire />

      <pointLight position={[-5.2, 2, 2.6]} color="#ffb066" intensity={7} distance={10} decay={2} />
      <pointLight position={[5.2, 2, 2.4]} color="#ffc58f" intensity={6} distance={9} decay={2} />

      <Suspense fallback={null}>
        <Characters phase={phase} choice={choice} />
      </Suspense>

      <Sparkles count={60} scale={[9, 3.5, 4]} position={[0, 2, 0]} size={2.2} speed={0.25} opacity={0.5} color="#ffd9a0" />
      <CameraRig phase={phase} />
    </Canvas>
  )
}
