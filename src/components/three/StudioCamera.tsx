import { useRef, useMemo, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import type { MotionValue } from 'motion/react'

/* Shared material palette for the hardware. */
const MAT = {
  body: { color: '#0f0f12', metalness: 0.32, roughness: 0.64, envMapIntensity: 0.34 },
  leather: { color: '#070709', metalness: 0.1, roughness: 0.98, envMapIntensity: 0.18 },
  silver: { color: '#b4b4bb', metalness: 1, roughness: 0.3, envMapIntensity: 0.9 },
  darkMetal: { color: '#26262b', metalness: 0.78, roughness: 0.46, envMapIntensity: 0.5 },
  amber: {
    color: '#7de0c0',
    metalness: 0.5,
    roughness: 0.3,
    emissive: '#1f6b57',
    emissiveIntensity: 0.55,
    envMapIntensity: 0.7,
  },
  copper: { color: '#6f4a22', metalness: 1, roughness: 0.5, envMapIntensity: 0.7 },
  glass: {
    color: '#08151a',
    metalness: 0,
    roughness: 0.04,
    transmission: 0.96,
    thickness: 1.4,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    envMapIntensity: 0.8,
  },
}

/** A ring of thin blades that reads as a closed aperture behind the front glass. */
function ApertureBlades() {
  const blades = useMemo(() => Array.from({ length: 7 }, (_, i) => (i / 7) * Math.PI * 2), [])
  return (
    <group position={[0, 0, 0.92]}>
      {blades.map((a, i) => (
        <mesh key={i} rotation={[0, 0, a]} position={[Math.cos(a) * 0.16, Math.sin(a) * 0.16, 0]}>
          <boxGeometry args={[0.42, 0.09, 0.015]} />
          <meshStandardMaterial {...MAT.copper} />
        </mesh>
      ))}
    </group>
  )
}

/** A ring of small ridges that gives a dial its knurled texture. */
function Knurl({ radius = 0.57, count = 56, size = 0.016, depth = 0.35 }) {
  const items = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2),
    [count],
  )
  return (
    <group>
      {items.map((a, i) => (
        <mesh key={i} rotation={[0, 0, a]} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
          <boxGeometry args={[size, size * 1.6, depth]} />
          <meshStandardMaterial {...MAT.darkMetal} />
        </mesh>
      ))}
    </group>
  )
}

export default function StudioCamera({
  progress,
  pointer,
}: {
  progress: MotionValue<number>
  pointer: RefObject<{ x: number; y: number }>
}) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    if (!group.current || !inner.current) return
    const ptr = pointer.current ?? { x: 0, y: 0 }
    const p = progress.get()

    const targetY = ptr.x * 0.5 + p * Math.PI * 0.55
    const targetX = -ptr.y * 0.32 + p * 0.22

    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta)

    inner.current.position.y = THREE.MathUtils.damp(inner.current.position.y, p * 0.6, 3, delta)
    inner.current.position.z = THREE.MathUtils.damp(inner.current.position.z, p * -1.4, 3, delta)
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.16} floatIntensity={0.5}>
        <group ref={inner} rotation={[-0.06, 0.35, 0]}>
          {/* ── Body ─────────────────────────────────────────── */}
          <RoundedBox args={[3.05, 2, 1]} radius={0.16} smoothness={5} castShadow receiveShadow>
            <meshStandardMaterial {...MAT.body} />
          </RoundedBox>

          {/* top plate */}
          <RoundedBox args={[3.02, 0.36, 1.01]} radius={0.1} smoothness={4} position={[0, 0.84, 0]} castShadow>
            <meshStandardMaterial {...MAT.darkMetal} />
          </RoundedBox>

          {/* EVF hump */}
          <RoundedBox args={[1.15, 0.52, 0.92]} radius={0.12} smoothness={4} position={[0, 1.16, -0.08]} castShadow>
            <meshStandardMaterial {...MAT.body} />
          </RoundedBox>

          {/* grip */}
          <RoundedBox
            args={[0.94, 1.72, 0.98]}
            radius={0.22}
            smoothness={4}
            position={[1.03, -0.06, 0.16]}
            castShadow
          >
            <meshStandardMaterial {...MAT.leather} />
          </RoundedBox>

          {/* ── Lens mount ───────────────────────────────────── */}
          <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.63, 0.63, 0.16, 64]} />
            <meshStandardMaterial {...MAT.silver} />
          </mesh>

          {/* amber brand ring */}
          <mesh position={[0, 0, 0.585]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.02, 64]} />
            <meshStandardMaterial {...MAT.amber} />
          </mesh>

          {/* ── Lens barrel ──────────────────────────────────── */}
          <mesh position={[0, 0, 0.95]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.53, 0.55, 0.92, 64]} />
            <meshStandardMaterial {...MAT.body} />
          </mesh>

          {/* focus ring */}
          <group position={[0, 0, 0.82]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.57, 0.57, 0.34, 64]} />
              <meshStandardMaterial {...MAT.darkMetal} />
            </mesh>
            <Knurl radius={0.575} count={58} depth={0.33} />
          </group>

          {/* zoom ring */}
          <mesh position={[0, 0, 1.24]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.22, 64]} />
            <meshStandardMaterial {...MAT.darkMetal} />
          </mesh>

          {/* front bezel */}
          <mesh position={[0, 0, 1.37]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.52, 0.5, 0.06, 64]} />
            <meshStandardMaterial {...MAT.silver} />
          </mesh>

          {/* aperture blades, seen through the glass */}
          <ApertureBlades />

          {/* front element, glass */}
          <mesh position={[0, 0, 1.35]} rotation={[Math.PI / 2, 0, 0]}>
            <sphereGeometry args={[0.47, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
            <meshPhysicalMaterial {...MAT.glass} />
          </mesh>

          {/* ── Top controls ─────────────────────────────────── */}
          <mesh position={[1.02, 1.06, 0.18]}>
            <cylinderGeometry args={[0.14, 0.14, 0.12, 40]} />
            <meshStandardMaterial {...MAT.silver} />
          </mesh>
          <mesh position={[1.02, 1.12, 0.18]}>
            <cylinderGeometry args={[0.145, 0.145, 0.02, 40]} />
            <meshStandardMaterial {...MAT.amber} />
          </mesh>

          <group position={[-0.92, 1.05, 0.05]}>
            <mesh>
              <cylinderGeometry args={[0.22, 0.22, 0.14, 40]} />
              <meshStandardMaterial {...MAT.silver} />
            </mesh>
            <Knurl radius={0.225} count={22} size={0.026} depth={0.13} />
          </group>

          <mesh position={[0.55, 1.06, -0.12]}>
            <cylinderGeometry args={[0.16, 0.16, 0.12, 36]} />
            <meshStandardMaterial {...MAT.silver} />
          </mesh>

          <mesh position={[0, 1.34, -0.08]}>
            <boxGeometry args={[0.5, 0.06, 0.44]} />
            <meshStandardMaterial {...MAT.silver} />
          </mesh>

          {/* viewfinder window (rear) */}
          <mesh position={[0, 1.14, -0.55]}>
            <boxGeometry args={[0.44, 0.26, 0.06]} />
            <meshStandardMaterial color="#05080a" metalness={0.6} roughness={0.12} envMapIntensity={0.8} />
          </mesh>

          {/* rear screen */}
          <mesh position={[0, -0.05, -0.505]}>
            <boxGeometry args={[2.1, 1.4, 0.04]} />
            <meshStandardMaterial color="#07090b" metalness={0.4} roughness={0.12} />
          </mesh>
          <RoundedBox args={[2.2, 1.48, 0.04]} radius={0.06} smoothness={3} position={[0, -0.05, -0.525]}>
            <meshStandardMaterial {...MAT.body} />
          </RoundedBox>

          {/* strap lugs */}
          <mesh position={[1.55, 0.42, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.08, 0.028, 12, 24]} />
            <meshStandardMaterial {...MAT.silver} />
          </mesh>
          <mesh position={[-1.55, 0.42, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.08, 0.028, 12, 24]} />
            <meshStandardMaterial {...MAT.silver} />
          </mesh>

          {/* engraved logo plate */}
          <mesh position={[0, 0.9, 0.512]}>
            <boxGeometry args={[0.7, 0.12, 0.01]} />
            <meshStandardMaterial color="#8f8f96" metalness={1} roughness={0.3} />
          </mesh>
        </group>
      </Float>
    </group>
  )
}
