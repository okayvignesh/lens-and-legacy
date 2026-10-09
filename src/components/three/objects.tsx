import { useRef, useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import type { MotionValue } from 'motion/react'
import { useRig } from './Stage'

type Rig = { progress: MotionValue<number>; pointer: { current: { x: number; y: number } } }

const CHROME = { color: '#d9dce0', metalness: 1, roughness: 0.16, envMapIntensity: 1.15 }
const GRAPHITE = { color: '#23262b', metalness: 0.62, roughness: 0.5, envMapIntensity: 0.6 }
const RUBBER = { color: '#101215', metalness: 0.1, roughness: 0.95, envMapIntensity: 0.3 }
const SIGNAL = { color: '#e8452c', metalness: 0.4, roughness: 0.35, emissive: '#7a1a0c', emissiveIntensity: 0.35 }
const GLASS = {
  color: '#0d1a22',
  metalness: 0,
  roughness: 0.03,
  transmission: 0.97,
  thickness: 1.6,
  ior: 1.5,
  clearcoat: 1,
  clearcoatRoughness: 0.04,
  envMapIntensity: 1,
}

function Ring({ radius, height, material, z, seg = 64 }: { radius: number; height: number; material: object; z: number; seg?: number }) {
  return (
    <mesh position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[radius, radius, height, seg]} />
      <meshStandardMaterial {...material} />
    </mesh>
  )
}

function Knurl({ radius, count, size, depth, z }: { radius: number; count: number; size: number; depth: number; z: number }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2), [count])
  return (
    <group position={[0, 0, z]}>
      {items.map((a, i) => (
        <mesh key={i} rotation={[0, 0, a]} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
          <boxGeometry args={[size, size * 1.7, depth]} />
          <meshStandardMaterial {...GRAPHITE} />
        </mesh>
      ))}
    </group>
  )
}

/** 03, Chrome Precision: a machined lens barrel, floating in a white studio. */
export function ChromeLens({ progress, pointer }: Rig) {
  const group = useRef<THREE.Group>(null)
  useRig(group, progress, pointer, {
    yaw: 0.34,
    pitch: 0.24,
    scrollTurn: Math.PI * 0.35,
    baseYaw: -0.62,
    basePitch: 0.14,
  })
  return (
    <group ref={group}>
      {/* barrel core */}
      <Ring radius={1.0} height={1.5} material={GRAPHITE} z={0} />
      {/* chrome rings */}
      <Ring radius={1.03} height={0.07} material={CHROME} z={-0.66} />
      <Ring radius={1.03} height={0.07} material={CHROME} z={0.66} />
      <Ring radius={1.06} height={0.1} material={CHROME} z={-0.3} />
      {/* signal accent ring */}
      <Ring radius={1.035} height={0.035} material={SIGNAL} z={0.5} />
      {/* focus grip */}
      <Ring radius={0.99} height={0.4} material={RUBBER} z={0.12} />
      <Knurl radius={1.0} count={72} size={0.018} depth={0.38} z={0.12} />
      {/* front bezel */}
      <Ring radius={0.9} height={0.14} material={CHROME} z={0.83} />
      <mesh position={[0, 0, 0.84]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.88, 0.9, 0.2, 64]} />
        <meshStandardMaterial {...GRAPHITE} />
      </mesh>
      {/* aperture blades */}
      <group position={[0, 0, 0.6]}>
        {Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2).map((a, i) => (
          <mesh key={i} rotation={[0, 0, a]} position={[Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0]}>
            <boxGeometry args={[0.72, 0.11, 0.02]} />
            <meshStandardMaterial color="#1a1c20" metalness={0.7} roughness={0.4} />
          </mesh>
        ))}
      </group>
      {/* front element glass */}
      <mesh position={[0, 0, 0.86]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.72, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2.6]} />
        <meshPhysicalMaterial {...GLASS} />
      </mesh>
      {/* rear mount */}
      <Ring radius={0.95} height={0.3} material={CHROME} z={-0.8} />
      <mesh position={[0, 0, -0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.16, 64]} />
        <meshStandardMaterial color="#0b0c0e" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  )
}

/** 04, Nocturne: a glass aperture that gathers and refracts the light. */
export function GlassAperture({ progress, pointer }: Rig) {
  const group = useRef<THREE.Group>(null)
  useRig(group, progress, pointer, {
    yaw: 0.42,
    pitch: 0.3,
    scrollTurn: Math.PI * 0.5,
    baseYaw: 0.34,
    basePitch: 0.12,
  })
  const blades = useMemo(() => Array.from({ length: 9 }, (_, i) => (i / 9) * Math.PI * 2), [])

  return (
    <group ref={group}>
      {/* outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.15, 0.12, 24, 96]} />
        <meshStandardMaterial color="#1a2530" metalness={0.85} roughness={0.3} envMapIntensity={0.8} />
      </mesh>
      {/* ice accent ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.13]}>
        <torusGeometry args={[1.03, 0.022, 16, 96]} />
        <meshStandardMaterial color="#5fd8ff" emissive="#5fd8ff" emissiveIntensity={1.6} metalness={0.3} roughness={0.3} />
      </mesh>
      {/* aperture blades */}
      <group>
        {blades.map((a, i) => (
          <mesh key={i} rotation={[0, 0, a + 0.2]} position={[Math.cos(a) * 0.42, Math.sin(a) * 0.42, 0]}>
            <boxGeometry args={[0.9, 0.14, 0.03]} />
            <meshStandardMaterial color="#24303c" metalness={0.8} roughness={0.35} />
          </mesh>
        ))}
      </group>
      {/* glass center */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.78, 48, 32]} />
        <meshPhysicalMaterial
          color="#0b1b26"
          metalness={0}
          roughness={0.02}
          transmission={1}
          thickness={2}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.03}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* core glow */}
      <mesh>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshBasicMaterial color="#a6ecff" toneMapped={false} />
      </mesh>
    </group>
  )
}

/** Small floating film strip used in the Paper direction's editorial hero. */
export function FilmStrip({ progress, pointer }: Rig) {
  const group = useRef<THREE.Group>(null)
  useRig(group, progress, pointer, { yaw: 0.4, pitch: 0.3, scrollTurn: Math.PI * 0.3 })
  const frames = useMemo(() => Array.from({ length: 5 }, (_, i) => i - 2), [])
  return (
    <group ref={group} rotation={[0.1, -0.6, -0.06]}>
      {frames.map((f, i) => (
        <RoundedBox
          key={i}
          args={[1.5, 1.1, 0.05]}
          radius={0.05}
          smoothness={4}
          position={[0, f * 1.24, i * 0.02]}
          castShadow
        >
          <meshStandardMaterial color={i % 2 ? '#fffdf8' : '#e7e1d4'} metalness={0.1} roughness={0.7} />
        </RoundedBox>
      ))}
    </group>
  )
}
