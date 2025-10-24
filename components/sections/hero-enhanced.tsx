'use client'

import Hero3D from '@/components/3d/Hero3D'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/ui/button-magnetic'
import { AnimatedHeadline } from '@/components/ui/animated-headline'
import { TrustBar } from '@/components/ui/trust-bar'
import { ArrowRight, Calculator, Play } from 'lucide-react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const headlineVariants = [
  {
    metric: "60%",
    text: "sneller reageren op klanten",
    color: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)"
  },
  {
    metric: "+25%",
    text: "meer deals door slimmere pipeline",
    color: "linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)"
  },
  {
    metric: "-50%",
    text: "repetitief werk in 30 dagen",
    color: "linear-gradient(135deg, #F59E0B 0%, #2563EB 100%)"
  }
]

export function HeroEnhanced() {
  const locale = useLocale()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showVideo, setShowVideo] = useState(false)

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
    <section className="hero-glow relative min-h-[92vh] overflow-hidden">
      {/* 3D Background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
        <Hero3D className="h-full w-full" mousePosition={mousePosition} />
      </div>

      <div className="hero-glow__background" />

      <div className="container-custom relative z-10">
        <div className="flex items-center justify-center py-24 md:py-36 lg:py-44">
          <div className="flex max-w-5xl flex-col gap-10 text-center">

            {/* Badge */}
            <motion.div
              className="inline-flex max-w-max items-center gap-3 self-center rounded-full border border-[color:color-mix(in_oklab,var(--fg)_16%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fg-subtle)] backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--brand)] shadow-[0_0_12px_color-mix(in_oklab,var(--brand)_60%,transparent)]" />
              Caribbean Azure · De 30-Dagen Automation Sprint
            </motion.div>

            {/* Animated Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedHeadline variants={headlineVariants} />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="copy-20 mx-auto max-w-2xl text-[color:var(--fg-subtle)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Caribbean Azure automatiseert terugkerende processen in 30 dagen. Email, CRM, rapportage — het loopt gewoon. Jij focust op groei.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="#roi-calculator" className="w-full sm:w-auto">
                <MagneticButton className="w-full min-w-[240px]">
                  <Calculator className="size-5" />
                  Bereken je ROI in 60 sec
                </MagneticButton>
              </Link>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-outline w-full min-w-[240px] sm:w-auto"
              >
                <Link href={`/${locale}/cases`} className="flex items-center gap-2">
                  Bekijk succesverhalen
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Video Preview Button */}
            <motion.div
              className="relative mx-auto"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                onClick={() => setShowVideo(!showVideo)}
                className="group flex items-center gap-3 rounded-full border border-[color:color-mix(in_oklab,var(--fg)_16%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_60%,transparent)] px-6 py-3 text-sm font-semibold text-[color:var(--fg-subtle)] backdrop-blur-sm transition-all duration-300 hover:border-[color:color-mix(in_oklab,var(--brand)_32%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--panel)_80%,transparent)]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--brand)] text-white transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-4 translate-x-0.5" />
                </div>
                <span>Bekijk hoe het werkt (30 sec)</span>
              </button>

              {/* Video Modal */}
              {showVideo && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowVideo(false)}
                >
                  <motion.div
                    className="relative w-full max-w-4xl rounded-2xl bg-[color:var(--panel)] p-2"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="aspect-video w-full overflow-hidden rounded-xl bg-[color:var(--bg)]">
                      {/* Placeholder for video - replace with actual embed */}
                      <div className="flex h-full items-center justify-center text-[color:var(--fg-subtle)]">
                        <div className="text-center">
                          <Play className="mx-auto mb-4 size-16 opacity-40" />
                          <p>Video komt hier (YouTube/Vimeo embed)</p>
                          <p className="mt-2 text-sm opacity-60">
                            Vervang deze placeholder met je video URL
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowVideo(false)}
                      className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-110"
                    >
                      ×
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Trust Bar */}
            <TrustBar />

          </div>
        </div>
      </div>
    </section>
  )
}
