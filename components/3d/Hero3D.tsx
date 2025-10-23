'use client'

import { Suspense, useMemo, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Environment,
  ContactShadows,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

type RGB = `#${string}`

function getCssColor(variable: string, fallback: RGB): RGB {
  if (typeof window === 'undefined') {
    return fallback
  }
  const resolved = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim()
  if (!resolved) return fallback
  return resolved as RGB
}

function useThemeColors() {
  const [colors, setColors] = useState(() => ({
    brand: getCssColor('--brand', '#0891b2'),
    accent: getCssColor('--accent', '#7c3aed'),
    brandSoft: getCssColor('--brand-soft', '#22d3ee'),
  }))

  useEffect(() => {
    const update = () =>
      setColors({
        brand: getCssColor('--brand', '#0891b2'),
        accent: getCssColor('--accent', '#7c3aed'),
        brandSoft: getCssColor('--brand-soft', '#22d3ee'),
      })

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return colors
}

interface MousePosition {
  x: number // normalized -0.5 to 0.5
  y: number // normalized -0.5 to 0.5
}

function CameraController({ mousePosition }: { mousePosition: MousePosition }) {
  const { camera } = useThree()
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame(() => {
    // Smooth damping to prevent jitter (lerp factor 0.05 = ~20 frames to reach target)
    targetRotation.current.x += (mousePosition.y * 0.3 - targetRotation.current.x) * 0.05
    targetRotation.current.y += (mousePosition.x * 0.3 - targetRotation.current.y) * 0.05

    camera.position.x = targetRotation.current.y * 2
    camera.position.y = -targetRotation.current.x * 1.5
    camera.lookAt(0, 0, 0)
  })

  return null
}

function AutomationOrb({
  colors,
  mousePosition
}: {
  colors: ReturnType<typeof useThemeColors>
  mousePosition: MousePosition
}) {
  const mainOrbRef = useRef<THREE.Mesh>(null)
  const nodesRef = useRef<THREE.Group>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (mainOrbRef.current) {
      mainOrbRef.current.rotation.x = Math.sin(t * 0.2) * 0.12
      mainOrbRef.current.rotation.y = t * 0.12
    }

    if (nodesRef.current) {
      nodesRef.current.rotation.y = -t * 0.2
    }

    // Add subtle rotation based on mouse position (inverse for depth effect)
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.PI / 3 - mousePosition.x * 0.2
      groupRef.current.rotation.x = -mousePosition.y * 0.15
    }
  })

  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = []
    const count = 12
    const radius = 2.7

    for (let i = 0; i < count; i++) {
      const angle = ((Math.PI * 2) / count) * i
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle * 0.5) * 0.6
      const z = Math.sin(angle) * radius
      positions.push([x, y, z])
    }

    return positions
  }, [])

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.28} floatIntensity={0.65}>
        <Sphere ref={mainOrbRef} args={[1.4, 96, 96]}>
          <MeshDistortMaterial
            color={colors.brand}
            attach="material"
            distort={0.35}
            speed={2.2}
            roughness={0.18}
            metalness={0.85}
            emissive={colors.accent}
            emissiveIntensity={0.4}
          />
        </Sphere>
      </Float>

      <group ref={nodesRef}>
        {nodePositions.map((position, i) => (
          <Float
            key={`node-${i}`}
            speed={2.8}
            rotationIntensity={0.12}
            floatIntensity={0.42}
            floatingRange={[position[1] - 0.25, position[1] + 0.25]}
          >
            <Sphere args={[0.16 + (i % 3) * 0.04, 32, 32]} position={position}>
              <meshStandardMaterial
                color={i % 2 === 0 ? colors.brandSoft : colors.accent}
                emissive={colors.brandSoft}
                emissiveIntensity={0.75}
                roughness={0.28}
                metalness={0.72}
              />
            </Sphere>

            <ConnectionLine start={[0, 0, 0]} end={position} color={colors.brand} opacity={0.24} />
          </Float>
        ))}
      </group>

      <ambientLight intensity={0.6} />
      <pointLight position={[8, 9, 6]} intensity={1.2} color={colors.brand} />
      <pointLight position={[-6, -8, -4]} intensity={0.7} color={colors.accent} />
    </group>
  )
}

function ConnectionLine({
  start,
  end,
  color = '#ffffff',
  opacity = 1,
}: {
  start: [number, number, number]
  end: [number, number, number]
  color?: string
  opacity?: number
}) {
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const positions = new Float32Array([...start, ...end])
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geom
  }, [start, end])

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    [color, opacity]
  )

  return <primitive object={new THREE.Line(geometry, material)} />
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-32 w-32 rounded-full bg-[color:color-mix(in_oklab,var(--brand)_26%,transparent)] blur-xl" />
    </div>
  )
}

function StaticPoster() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-64 w-64 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--brand) 32%, transparent) 0%, transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--accent) 28%, transparent) 0%, transparent 65%)',
          boxShadow: '0 0 120px color-mix(in oklab, var(--accent) 40%, transparent)',
        }}
      />
    </div>
  )
}

export function Hero3D({
  className,
  mousePosition = { x: 0, y: 0 }
}: {
  className?: string
  mousePosition?: MousePosition
}) {
  const colors = useThemeColors()

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <StaticPoster />
      </div>
    )
  }

  return (
    <div className={className}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 50 }}
          dpr={[1, 1.25]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <color attach="background" args={['transparent']} />
          <Suspense fallback={null}>
            <CameraController mousePosition={mousePosition} />

            <group rotation={[0, 0, 0]}>
              <Environment
                files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/studio_small_08_2k.hdr"
                blur={0.2}
              />
            </group>
            <AutomationOrb colors={colors} mousePosition={mousePosition} />

            <EffectComposer>
              <Bloom luminanceThreshold={0.55} luminanceSmoothing={0.92} height={320} intensity={0.65} />
            </EffectComposer>

            <ContactShadows
              rotation={[Math.PI / 2, 0, 0]}
              position={[0, -1.8, 0]}
              opacity={0.4}
              scale={12}
              blur={2.5}
            />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Hero3D
