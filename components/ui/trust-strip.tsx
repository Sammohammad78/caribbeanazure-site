import { Shield, Database, Server } from 'lucide-react'
import { useLocale } from 'next-intl'

interface TrustStripProps {
  variant?: 'default' | 'compact'
  className?: string
}

export function TrustStrip({ variant = 'default', className = '' }: TrustStripProps) {
  const locale = useLocale() as 'nl' | 'en'

  const items = {
    nl: [
      {
        icon: Server,
        text: 'EU-hosting',
        tooltip: 'Alle data blijft binnen de EU'
      },
      {
        icon: Shield,
        text: 'DPA beschikbaar',
        tooltip: 'Data Processing Agreement op aanvraag'
      },
      {
        icon: Database,
        text: 'n8n self-host optie',
        tooltip: 'Behoud volledige controle met self-hosted workflows'
      }
    ],
    en: [
      {
        icon: Server,
        text: 'EU hosting',
        tooltip: 'All data stays within the EU'
      },
      {
        icon: Shield,
        text: 'DPA available',
        tooltip: 'Data Processing Agreement upon request'
      },
      {
        icon: Database,
        text: 'n8n self-host option',
        tooltip: 'Maintain full control with self-hosted workflows'
      }
    ]
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 text-sm text-[color:var(--fg-subtle)] ${className}`}>
        {items[locale].map((item, index) => (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-[color:var(--fg-muted)]">·</span>}
            <item.icon className="h-3.5 w-3.5" />
            <span>{item.text}</span>
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 md:gap-8 ${className}`}>
      {items[locale].map((item, index) => (
        <div
          key={index}
          className="group flex items-center gap-2 text-sm text-[color:var(--fg-subtle)] transition-colors hover:text-[color:var(--fg)]"
          title={item.tooltip}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:color-mix(in_oklab,var(--brand-soft)_50%,transparent)] text-[color:var(--brand)] transition-transform group-hover:scale-110">
            <item.icon className="h-4 w-4" />
          </div>
          <span className="font-medium">{item.text}</span>
        </div>
      ))}
    </div>
  )
}
