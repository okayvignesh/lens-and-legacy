import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { useScroll } from 'motion/react'
import * as THREE from 'three'
import StudioCamera from './three/StudioCamera'
import { useTheme } from '../lib/theme'

function Drift({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = Math.sin(t * 0.06) * 0.07
    ref.current.position.y = Math.sin(t * 0.4) * 0.06
  })
  return <group ref={ref}>{children}</group>
}

/**
 * A contained 3D stage. The camera body is light chrome in the light theme
 * and graphite in the dark theme, lit to match, drifting and turning with
 * the page scroll and the pointer.
 */
export default function CameraStage() {
  const { scrollYProgress } = useScroll()
  const { theme } = useTheme()
  const dark = theme === 'dark'
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
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        shadows="percentage"
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: dark ? 1.15 : 1.05,
        }}
        camera={{ position: [0, 0.1, 8.8], fov: 32 }}
      >
        <ambientLight intensity={dark ? 0.2 : 0.5} />
        <directionalLight
          position={[5, 6, 6]}
          intensity={dark ? 1.25 : 1.55}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-6, 1, -3]} intensity={dark ? 1.6 : 1.1} color={dark ? '#8b98ff' : '#1b2bc9'} />
        <directionalLight position={[5, 0, -5]} intensity={0.6} color={dark ? '#5b6478' : '#9aa3b5'} />

        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={dark ? 0.5 : 0.95}
            color="#ffffff"
            position={[0, 5, -4]}
            scale={[12, 7, 1]}
          />
          <Lightformer
            form="rect"
            intensity={dark ? 0.4 : 0.6}
            color="#dfe4ff"
            position={[-6, 1, 2]}
            scale={[7, 7, 1]}
            rotation-y={Math.PI / 2}
          />
          <Lightformer
            form="rect"
            intensity={dark ? 0.6 : 0.45}
            color={dark ? '#8b98ff' : '#1b2bc9'}
            position={[6, 0, 2]}
            scale={[7, 7, 1]}
            rotation-y={-Math.PI / 2}
          />
          <Lightformer form="ring" intensity={dark ? 0.6 : 0.8} color="#ffffff" position={[0, 3, 5]} scale={3} />
        </Environment>

        <Suspense fallback={null}>
          <Drift>
            <StudioCamera progress={scrollYProgress} pointer={pointer} tone={theme} />
          </Drift>
        </Suspense>
      </Canvas>
    </div>
  )
}
