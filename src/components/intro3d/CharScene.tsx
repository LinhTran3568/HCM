import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Character } from './Character'
import { Sky, Sun, Clouds, CitySkyline, TheHucBridge, NgoSon, Flora, Fence, StoneRailing, StreetLamp, Lotus, Boat } from './Scenery'
import { TradHouseDl, TownHouse, Tree, StraightRoad, RoadVehicle } from './DownloadedModels'
import type { Phase, UserChoice } from './types'

const TRAD_X = -4.4
const MODERN_X = 4.4
const HOUSE_Z = -2.1

function Ground() {
  return (
    <group>
      {/* mặt nước hồ */}
      <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[110, 110]} />
        <meshStandardMaterial color="#21755a" roughness={0.22} metalness={0.06} />
      </mesh>
      {/* bờ xa (đảo Hà Nội) */}
      <mesh position={[0, -0.05, -42]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 30]} />
        <meshStandardMaterial color="#5d7e47" roughness={1} />
      </mesh>
      {/* đảo đá giữa hồ (sân trước hai ngôi nhà) */}
      <mesh position={[0, -0.175, 0]}>
        <cylinderGeometry args={[10.5, 10.8, 0.35, 48]} />
        <meshStandardMaterial color="#d8d1c2" roughness={0.95} />
      </mesh>
      {/* bờ kè đá quanh đảo */}
      <mesh position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10.42, 10.66, 48]} />
        <meshStandardMaterial color="#bfae90" roughness={1} />
      </mesh>
      {/* lối đi đá */}
      <mesh position={[-6, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 3.2]} />
        <meshStandardMaterial color="#cbc4b4" roughness={1} />
      </mesh>
      <mesh position={[6, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 3.2]} />
        <meshStandardMaterial color="#cbc4b4" roughness={1} />
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

  const motherX = TRAD_X - 0.5
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
      target={[0, 1.2, 0]}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={4}
      maxDistance={18}
      minPolarAngle={0.5}
      maxPolarAngle={1.45}
      autoRotate={settled}
      autoRotateSpeed={0.5}
    />
  )
}

export function CharScene({ phase, choice }: { phase: Phase; choice: UserChoice | null }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 9.6], fov: 46 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: 'high-performance',
      }}
      performance={{ min: 0.5 }}
    >
      <Sky />
      <color attach="background" args={['#cfe6f2']} />
      <fog attach="fog" args={['#cfe6f2', 24, 62]} />
      <Sun />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#bfe3ff', '#7c8a6a', 0.85]} />
      <directionalLight
        position={[7, 11, 9]}
        intensity={1.7}
        color="#fff3dd"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-8, 5, -5]} intensity={0.4} color="#d9ecff" />

      <Clouds />
      <CitySkyline />
      <Ground />
      <NgoSon />
      <TheHucBridge />

      <Suspense fallback={null}>
        <TradHouseDl position={[TRAD_X, 0, HOUSE_Z]} rotationY={-0.06} height={3.2} />
        <TownHouse position={[MODERN_X, 0, HOUSE_Z]} rotationY={0.05} height={4.0} />

      <Fence position={[TRAD_X, 0.03, 1.05]} />
      <Fence position={[MODERN_X, 0.03, 1.05]} />

      {/* cây xanh quanh đảo — ít, không che tầm nhìn */}
      <Tree position={[-8.9, 0.03, -2.8]} rotationY={0.3} height={3.1} />
      <Tree position={[8.9, 0.03, -2.9]} rotationY={-0.25} height={2.9} />
      <Tree position={[-6.8, 0.03, -8.2]} rotationY={0.1} height={3.4} big />
      <Tree position={[6.9, 0.03, -8.3]} rotationY={-0.1} height={3.2} big />
      <Tree position={[-9.6, 0.03, 2.1]} rotationY={0.2} height={2.8} />
      <Tree position={[9.7, 0.03, 2.0]} rotationY={-0.2} height={2.7} />
      <Tree position={[-3.4, 0.03, 9.0]} rotationY={-0.15} height={2.9} />
      <Tree position={[3.6, 0.03, 9.1]} rotationY={0.15} height={2.8} />

      {/* nhà phố cổ bên kia hồ */}
      <TownHouse position={[-17.5, 0.03, -32]} rotationY={0.1} height={4.4} />
      <TownHouse position={[-13, 0.03, -31.5]} rotationY={-0.05} height={3.9} />
      <TownHouse position={[-8.5, 0.03, -33]} rotationY={0.12} height={4.6} />
      <TownHouse position={[8.6, 0.03, -32.5]} rotationY={-0.12} height={4.5} />
      <TownHouse position={[13.2, 0.03, -31]} rotationY={0.05} height={3.9} />
      <TownHouse position={[17.8, 0.03, -32.5]} rotationY={-0.1} height={4.4} />

      {/* hàng cây bên bờ xa */}
      <Tree position={[-21, 0.0, -36]} rotationY={0} height={5.2} big />
      <Tree position={[-15.5, 0.0, -37]} rotationY={0} height={4.8} big />
      <Tree position={[-5.5, 0.0, -36]} rotationY={0} height={5.0} big />
      <Tree position={[6, 0.0, -37]} rotationY={0} height={4.9} big />
      <Tree position={[15.5, 0.0, -36]} rotationY={0} height={5.1} big />
      <Tree position={[21.5, 0.0, -37]} rotationY={0} height={5.2} big />

      {/* đường bờ hồ nối vào thành phố */}
      <StraightRoad z={-28} length={120} />
      <RoadVehicle url="/models/car-sport.glb" length={4.2} x={-35} z={-28} speed={5} dir={1} range={55} yaw={Math.PI} />
      <RoadVehicle url="/models/truck.glb" length={4.4} x={20} z={-28} speed={4} dir={-1} range={55} />
      </Suspense>

      {/* lan can đá quanh bờ */}
      <StoneRailing />

      {/* cột đèn trước hai ngôi nhà */}
      <StreetLamp position={[-6, 0.03, 1.5]} rotationY={0} />
      <StreetLamp position={[6, 0.03, 1.5]} rotationY={0} />

      {/* hoa sen trên mặt nước */}
      <Lotus position={[5.2, -0.16, -11]} />
      <Lotus position={[-5.4, -0.16, -12]} />
      <Lotus position={[0.5, -0.16, -11.5]} />
      <Lotus position={[10.8, -0.16, -5]} />
      <Lotus position={[-10.8, -0.16, -4]} />
      <Lotus position={[10.6, -0.16, 4.5]} />
      <Lotus position={[-10.7, -0.16, 5]} />
      <Lotus position={[4, -0.16, 12]} />
      <Lotus position={[-4, -0.16, 12.4]} />
      <Lotus position={[8.5, -0.16, 9.5]} />

      {/* thuyền gỗ trên hồ */}
      <Boat position={[13.5, -0.18, -17]} rotationY={0.4} />
      <Boat position={[-13.8, -0.18, -18]} rotationY={-0.5} />
      <Boat position={[15.5, -0.18, 8]} rotationY={2.2} />
      <Boat position={[-15, -0.18, 9]} rotationY={-2.4} />

      <Flora />

      <Suspense fallback={null}>
        <Characters phase={phase} choice={choice} />
      </Suspense>

      <CameraRig phase={phase} />
    </Canvas>
  )
}
