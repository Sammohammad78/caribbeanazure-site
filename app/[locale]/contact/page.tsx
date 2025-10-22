import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ContactForm } from '@/components/sections/contact-form'
import { useTranslations } from 'next-intl'
import { MessageCircle, Mail, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Neem Contact Op
            </h1>
            <p className="text-xl text-muted-foreground">
              We reageren binnen 24 uur
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact options */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Kies uw voorkeurskanaal</h2>

              {/* WhatsApp */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">WhatsApp</CardTitle>
                        <CardDescription>Snelste reactie</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat direct met ons team. Perfectvoor snelle vragen.
                  </p>
                  <Button asChild className="w-full">
                    <a
                      href="https://wa.me/31612345678?text=Hoi%20Caribbean%20Azure%2C%20ik%20wil%20graag%20meer%20informatie."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Start WhatsApp Chat
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Email */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Email</CardTitle>
                        <CardDescription>Voor uitgebreide vragen</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Stuur ons een gedetailleerd bericht via het formulier hiernaast.
                  </p>
                  <p className="text-sm font-medium">info@caribbeanazur.nl</p>
                </CardContent>
              </Card>

              {/* Cal.com Booking */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Plan een Gesprek</CardTitle>
                        <CardDescription>30 min kennismakingsgesprek</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Kies een moment dat u uitkomt voor een videogesprek.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href="https://cal.com/caribbeanazure"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Plan Afspraak
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Stuur ons een bericht</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
