import { useRef, useEffect, type RefObject, type ReactNode } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, ContactShadows, Float } from '@react-three/drei'
import { useScroll, useReducedMotion, type MotionValue } from 'motion/react'
import * as THREE from 'three'

type PointerRef = { current: { x: number; y: number } }

/**
 * Shared 3D stage used by the product/immersive directions.
 * Handles canvas setup, pointer tracking, theme-aware studio lighting and
 * the pointer/scroll rig, so each direction only supplies its own object.
 */
export function Stage({
  object,
  tone = 'light',
  scale = 1,
  position = [0, 0, 9],
  fov = 30,
  dim = 0.5,
  contact = true,
}: {
  object: (ctx: { progress: MotionValue<number>; pointer: PointerRef }) => ReactNode
  tone?: 'light' | 'dark' | 'cool'
  scale?: number
  position?: [number, number, number]
  fov?: number
  dim?: number
  contact?: boolean
}) {
  const progress = useScroll().scrollYProgress
  const pointer = useRef({ x: 0, y: 0 })
  const reduce = useReducedMotion()

  usePointer(pointer)

  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position, fov }}
      className="!absolute inset-0"
    >
      <SceneTone tone={tone} dim={dim} />

      <group scale={scale}>
        <Float speed={reduce ? 0 : 1.3} rotationIntensity={0.14} floatIntensity={0.45}>
          {object({ progress, pointer })}
        </Float>
      </group>

      {contact && (
        <ContactShadows position={[0, -2.1, 0]} opacity={0.5} scale={16} blur={3} far={6} color="#000000" />
      )}
    </Canvas>
  )
}

function SceneTone({ tone, dim }: { tone: 'light' | 'dark' | 'cool'; dim: number }) {
  const scene = useThree((s) => s.scene)
  useEffect(() => {
    scene.environmentIntensity = dim
  }, [scene, dim])

  if (tone === 'light') {
    return (
      <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 7, 6]} intensity={2} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-6, 2, -3]} intensity={0.8} color="#dfe6ff" />
        <directionalLight position={[4, -1, -5]} intensity={0.6} color="#ffd9c2" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={1.1} color="#ffffff" position={[0, 5, -4]} scale={[14, 8, 1]} />
          <Lightformer form="rect" intensity={0.7} color="#eef2ff" position={[-7, 1, 2]} scale={[8, 8, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={0.5} color="#ffe8d6" position={[7, 0, 2]} scale={[8, 8, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer form="ring" intensity={1.4} color="#ffffff" position={[0, 4, 6]} scale={3} />
        </Environment>
      </>
    )
  }

  if (tone === 'cool') {
    return (
      <>
        <ambientLight intensity={0.22} />
        <directionalLight position={[5, 6, 5]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-6, 2, -4]} intensity={1.4} color="#5fd8ff" />
        <directionalLight position={[5, 0, -5]} intensity={0.9} color="#2b6d8c" />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={0.8} color="#dff4ff" position={[0, 5, -4]} scale={[14, 8, 1]} />
          <Lightformer form="rect" intensity={0.9} color="#5fd8ff" position={[-7, 1, 2]} scale={[8, 8, 1]} rotation-y={Math.PI / 2} />
          <Lightformer form="rect" intensity={0.6} color="#1d4a63" position={[7, 0, 2]} scale={[8, 8, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer form="ring" intensity={1.8} color="#a6ecff" position={[0, 4, 6]} scale={3} />
        </Environment>
      </>
    )
  }

  return (
    <>
      <ambientLight intensity={0.16} />
      <directionalLight position={[4.5, 6, 6]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 2, -4]} intensity={1.1} color="#e6a24b" />
      <directionalLight position={[5, 1, -5]} intensity={0.7} color="#2a6b72" />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={0.75} color="#ffffff" position={[0, 4, -5]} scale={[12, 7, 1]} />
        <Lightformer form="rect" intensity={0.7} color="#e6a24b" position={[-6, 1, 2]} scale={[7, 7, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={0.4} color="#1d5a61" position={[6, 0, 2]} scale={[7, 7, 1]} rotation-y={-Math.PI / 2} />
      </Environment>
    </>
  )
}

/** Drives a group's rotation from the pointer and page scroll. */
export function useRig(
  group: RefObject<THREE.Group | null>,
  progress: MotionValue<number>,
  pointer: PointerRef,
  opts: { yaw?: number; pitch?: number; scrollTurn?: number; drift?: number; baseYaw?: number; basePitch?: number } = {},
) {
  const {
    yaw = 0.5,
    pitch = 0.32,
    scrollTurn = Math.PI * 0.55,
    drift = 1,
    baseYaw = 0,
    basePitch = 0,
  } = opts
  useFrame((_s, delta) => {
    if (!group.current) return
    const p = pointer.current ?? { x: 0, y: 0 }
    const g = progress.get()
    const ty = baseYaw + p.x * yaw + g * scrollTurn
    const tx = basePitch - p.y * pitch + g * 0.2
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, ty, 3, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, tx, 3, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, g * 0.6 * drift, 3, delta)
  })
  return group
}

function usePointer(ref: PointerRef) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1
      ref.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [ref])
}
