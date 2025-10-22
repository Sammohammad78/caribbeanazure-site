'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/**
 * Automation Orb - Main 3D element for hero section
 * Represents interconnected nodes in an AI automation system
 */
function AutomationOrb() {
  const mainOrbRef = useRef<THREE.Mesh>(null)
  const nodesRef = useRef<THREE.Group>(null)

  // Animate rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (mainOrbRef.current) {
      mainOrbRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
      mainOrbRef.current.rotation.y = t * 0.1
    }

    if (nodesRef.current) {
      nodesRef.current.rotation.y = -t * 0.15
    }
  })

  // Generate node positions in a circle
  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = []
    const count = 8
    const radius = 2.5

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      positions.push([x, 0, z])
    }

    return positions
  }, [])

  return (
    <group>
      {/* Main Orb */}
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
      >
        <Sphere ref={mainOrbRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#0F5FFF"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
            emissive="#0F5FFF"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      {/* Satellite Nodes */}
      <group ref={nodesRef}>
        {nodePositions.map((position, i) => (
          <Float
            key={i}
            speed={3}
            rotationIntensity={0.1}
            floatIntensity={0.3}
            floatingRange={[position[1] - 0.2, position[1] + 0.2]}
          >
            <Sphere args={[0.15, 32, 32]} position={position}>
              <meshStandardMaterial
                color="#4080FF"
                emissive="#4080FF"
                emissiveIntensity={0.8}
                roughness={0.3}
                metalness={0.7}
              />
            </Sphere>

            {/* Connection lines to main orb */}
            <ConnectionLine
              start={[0, 0, 0]}
              end={position}
              color="#0F5FFF"
              opacity={0.3}
            />
          </Float>
        ))}
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4080FF" />
    </group>
  )
}

/**
 * Simple line component for connections
 */
function ConnectionLine({ start, end, color = '#ffffff', opacity = 1 }: {
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

  return (
    <primitive object={new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity })
    )} />
  )
}

/**
 * Loading fallback component
 */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-32 w-32 rounded-full bg-primary/10 animate-pulse" />
    </div>
  )
}

/**
 * Static poster image for reduced-motion preference
 */
function StaticPoster() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl"
        style={{
          boxShadow: '0 0 80px rgba(15, 95, 255, 0.3)',
        }}
      />
    </div>
  )
}

/**
 * Hero3D Component
 * Renders the automation orb with performance optimizations and fallbacks
 */
export function Hero3D({ className }: { className?: string }) {
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Show static poster if reduced motion is preferred
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
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]} // Cap DPR for performance
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
          }}
        >
          <Suspense fallback={null}>
            <AutomationOrb />

            {/* Post-processing effects */}
            <EffectComposer>
              <Bloom
                luminanceThreshold={0.6}
                luminanceSmoothing={0.9}
                height={300}
                intensity={0.5}
              />
            </EffectComposer>

            {/* Optional: Allow gentle camera movement */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={false}
              rotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}

export default Hero3D
