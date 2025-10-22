import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Target, Heart, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                Wij zijn Caribbean Azure
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Een Nederlands AI-automatiseringsbureau dat bedrijven helpt tijd te besparen en omzet te verhogen met slimme technologie.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">
                Onze Waarden
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <Target className="h-6 w-6" />
                    </div>
                    <CardTitle>Resultaatgericht</CardTitle>
                    <CardDescription>
                      We focussen op meetbare impact: minder handmatig werk, meer omzet, snellere processen.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
                      <Heart className="h-6 w-6" />
                    </div>
                    <CardTitle>Eerlijk & Transparant</CardTitle>
                    <CardDescription>
                      Geen verborgen kosten, geen technische jargon. We leggen alles helder uit in gewoon Nederlands.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-foreground mb-4">
                      <Zap className="h-6 w-6" />
                    </div>
                    <CardTitle>Snel & Pragmatisch</CardTitle>
                    <CardDescription>
                      We leveren binnen weken, niet maanden. Praktische oplossingen boven perfectie.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tight mb-8">
                Onze Aanpak
              </h2>

              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <p>
                  Caribbean Azure is opgericht met één doel: Nederlandse bedrijven helpen om slimmer te werken zonder de complexiteit van enterprise-software.
                </p>

                <p>
                  We geloven dat automatisering toegankelijk moet zijn voor iedereen—niet alleen voor bedrijven met IT-afdelingen en grote budgetten. Daarom werken we met no-code en low-code platforms zoals Zapier, Make, en OpenAI, gecombineerd met maatwerk waar nodig.
                </p>

                <p>
                  Ons team bestaat uit pragmatische builders met ervaring in zowel tech startups als scale-ups. We hebben zelf de pijn gevoeld van handmatige processen en weten wat wel én niet werkt.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-12 mb-4">
                  Wat ons anders maakt
                </h3>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span><strong>Geen lock-in:</strong> Je bent eigenaar van je eigen systemen en data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span><strong>Nederlandse service:</strong> Lokaal, beschikbaar, begrijpelijk</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span><strong>Vaste prijzen:</strong> Weet vooraf wat je betaalt, geen verrassingen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-primary">•</span>
                    <span><strong>Snelle oplevering:</strong> Resultaat binnen weken, niet kwartalen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
