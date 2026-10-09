import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows } from '@react-three/drei'
import { useScroll, type MotionValue } from 'motion/react'
import * as THREE from 'three'
import StudioCamera from './StudioCamera'

type PointerRef = { current: { x: number; y: number } }

/** Keeps the studio reflections from washing the hardware out. */
function SceneTuning() {
  const scene = useThree((s) => s.scene)
  useEffect(() => {
    scene.environmentIntensity = 0.5
  }, [scene])
  return null
}

function Rig({ progress, pointer }: { progress: MotionValue<number>; pointer: PointerRef }) {
  const { size } = useThree()
  const scale = size.width < 700 ? 0.56 : size.width < 1100 ? 0.72 : 0.86
  return (
    <group scale={scale} position={[0, 0.15, 0]}>
      <StudioCamera progress={progress} pointer={pointer} />
    </group>
  )
}

/**
 * The hero's 3D stage. A studio-lit camera rig that tracks the pointer and
 * drifts with the scroll. Everything is procedural, no model downloads.
 */
export default function CameraCanvas() {
  const { scrollYProgress } = useScroll()
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
      }}
      camera={{ position: [0, 0.1, 8.6], fov: 32 }}
      className="!absolute inset-0"
    >
      <SceneTuning />
      <Suspense fallback={null}>
        <ambientLight intensity={0.16} />
        <directionalLight
          position={[4.5, 6, 6]}
          intensity={2.1}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0002}
        />
        <directionalLight position={[-6, 2, -4]} intensity={0.7} color="#7de0c0" />
        <directionalLight position={[5, 1, -5]} intensity={0.5} color="#6d7fd0" />
        <pointLight position={[0, -2, 3]} intensity={0.3} color="#eaf6f2" />

        <Environment resolution={256}>
          <Lightformer form="rect" intensity={1} color="#ffffff" position={[0, 4, -5]} scale={[12, 7, 1]} />
          <Lightformer
            form="rect"
            intensity={0.5}
            color="#7de0c0"
            position={[-6, 1, 2]}
            scale={[7, 7, 1]}
            rotation-y={Math.PI / 2}
          />
          <Lightformer
            form="rect"
            intensity={0.4}
            color="#7f8fd0"
            position={[6, 0, 2]}
            scale={[7, 7, 1]}
            rotation-y={-Math.PI / 2}
          />
          <Lightformer form="ring" intensity={1} color="#ffffff" position={[0, 3, 5]} scale={3} />
        </Environment>

        <Rig progress={scrollYProgress} pointer={pointer} />

        <ContactShadows
          position={[0, -1.9, 0]}
          opacity={0.55}
          scale={14}
          blur={2.8}
          far={5}
          color="#000000"
        />
      </Suspense>
    </Canvas>
  )
}
