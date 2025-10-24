'use client'

import Hero3D from '@/components/3d/Hero3D'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/ui/button-magnetic'
import { CapabilitiesStrip } from '@/components/ui/capabilities-strip'
import { ArrowRight } from 'lucide-react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function HeroEnhanced() {
  const locale = useLocale()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="hero-glow relative min-h-[90vh] overflow-hidden">
      {/* 3D Background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
        <Hero3D className="h-full w-full" mousePosition={mousePosition} />
      </div>

      <div className="hero-glow__background" />

      <div className="container-custom relative z-10">
        <div className="flex items-center justify-center py-24 md:py-32 lg:py-40">
          <div className="flex max-w-4xl flex-col gap-8 text-center">

            {/* Badge */}
            <motion.div
              className="inline-flex max-w-max items-center gap-3 self-center rounded-full border border-[color:color-mix(in_oklab,var(--fg)_16%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fg-subtle)] backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--brand)] shadow-[0_0_12px_color-mix(in_oklab,var(--brand)_60%,transparent)]" />
              Caribbean Azure · Automatisering Studio
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Automatiseer je werk. Versnel je groei.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="copy-20 mx-auto max-w-2xl text-[color:var(--fg-subtle)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Wij ontwerpen praktische automatiseringen voor teams die minder willen klikken en meer willen leveren.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href={`/${locale}/contact`}>
                <MagneticButton className="w-full min-w-[220px] sm:w-auto">
                  Plan een korte intake
                  <ArrowRight className="ml-2 h-5 w-5" />
                </MagneticButton>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="w-full min-w-[220px] sm:w-auto"
                asChild
              >
                <Link href={`/${locale}/diensten`}>
                  Bekijk onze aanpak
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Capabilities Strip (replaces trust bar) */}
            <CapabilitiesStrip />

          </div>
        </div>
      </div>
    </section>
  )
}
