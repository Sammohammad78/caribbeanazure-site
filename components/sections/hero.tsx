'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  // WhatsApp deep link with prefilled message
  const whatsappNumber = '31612345678' // TODO: Replace with actual number
  const whatsappMessage = encodeURIComponent(
    locale === 'nl'
      ? 'Hoi Caribbean Azure, ik ben geïnteresseerd in jullie automatiseringsoplossingen.'
      : 'Hi Caribbean Azure, I\'m interested in your automation solutions.'
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section className="relative overflow-hidden section-padding-y">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10" />

      {/* Decorative blur elements with motion */}
      <motion.div
        className="absolute top-1/4 left-1/4 -z-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 -z-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container-custom">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-8)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center self-center rounded-full border px-4 py-1.5 copy-14 font-medium transition-base hover:bg-muted/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="mr-2">🚀</span>
            <span>{t('trustedBy')} 50+ Nederlandse bedrijven</span>
          </motion.div>

          {/* Heading with fluid typography */}
          <motion.h1
            className="h1-fluid"
            style={{ maxWidth: '100%' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('title')}
          </motion.h1>

          {/* Subtitle with copy-20 */}
          <motion.p
            className="copy-20 text-muted-foreground mx-auto"
            style={{ maxWidth: 'var(--max-text-width)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs with consistent sizing */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: 'var(--space-4)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto min-h-[44px] copy-16 transition-base hover:scale-[1.02] active:scale-[0.98]"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t('cta.primary')}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-h-[44px] copy-16 transition-base hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link href={`/${locale}/contact`}>
                {t('cta.secondary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Trust badges - Client logos */}
          <motion.div
            className="pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="copy-13 text-muted-foreground mb-6">{t('trustedBy')}</p>
            <div
              className="flex flex-wrap items-center justify-center opacity-60"
              style={{ gap: 'var(--space-8)' }}
            >
              {/* Placeholder for client logos */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-24 rounded bg-muted animate-pulse transition-base hover:opacity-100"
                  aria-hidden="true"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
