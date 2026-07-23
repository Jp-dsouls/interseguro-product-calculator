'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, ExternalLink, ArrowLeft, Award, Zap, ChevronDown, Star } from 'lucide-react'
import { calculateRecommendation } from '@/lib/recommendation-engine'
import type { CalculatorData } from '@/components/calculator-wizard'
import { Stepper } from '@/components/ui/stepper'
import { cn } from '@/lib/utils'

interface RecommendationResultProps {
  calculatorData: CalculatorData
  onReset: () => void
}

const RESULT_STEPS = [
  { id: 'monto', title: 'Monto', description: 'Cantidad a invertir' },
  { id: 'plazo', title: 'Plazo', description: 'Horizonte de inversión' },
  { id: 'objetivo', title: 'Objetivo', description: 'Meta principal' },
  { id: 'perfil', title: 'Perfil', description: 'Tolerancia al riesgo' },
  { id: 'resultado', title: 'Resultado', description: 'Tu recomendación' },
]

export function RecommendationResult({ calculatorData, onReset }: RecommendationResultProps) {
  const recommendation = calculateRecommendation(calculatorData)
  const [progressOpen, setProgressOpen] = useState(false)
  const [alternativesOpen, setAlternativesOpen] = useState(false)

  const formatMonto = (monto: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(monto)
  }

  const formatPercentage = (score: number) => {
    return `${Math.round(score)}%`
  }

  const plazoLabel: Record<string, string> = {
    '6meses': '6 meses',
    '1año': '1 año',
    '3años': '3 años',
    '5+años': '5+ años',
  }

  const objetivoLabel: Record<string, string> = {
    ahorro: 'Ahorro protegido',
    protección: 'Protección',
    rentabilidad: 'Rentabilidad',
    flexibilidad: 'Flexibilidad',
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[radial-gradient(circle_at_top_left,rgba(94,179,246,0.08),transparent_45%),linear-gradient(135deg,#0a1428_0%,#132d5a_100%)] bg-[radial-gradient(circle_at_top_left,rgba(0,59,135,0.08),transparent_45%),linear-gradient(135deg,#f6f9ff_0%,#ffffff_100%)] transition-colors duration-300 py-4 md:py-6">
      <div className="container max-w-6xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-4 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Nueva búsqueda</span>
        </button>

        <div className="rounded-[24px] border border-border/70 bg-card/90 backdrop-blur-xl shadow-[0_24px_80px_-32px_rgba(0,59,135,0.32)] overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[70vh]">
            <aside className="md:w-56 lg:w-64 shrink-0 border-b md:border-b-0 md:border-r border-border/60 bg-muted/30 p-4 md:p-6 flex flex-col gap-3 md:gap-6">
              <div>
                <button
                  type="button"
                  onClick={() => setProgressOpen(prev => !prev)}
                  className="w-full flex items-center justify-between gap-2 md:pointer-events-none"
                  aria-expanded={progressOpen}
                >
                  <div className="text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                      Progreso
                    </p>
                    <p className="text-xs text-muted-foreground md:hidden mt-0.5">
                      5 de 5 pasos completados
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-primary shrink-0 transition-transform duration-300 md:hidden',
                      progressOpen && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-out',
                    'md:mt-4 md:max-h-none md:opacity-100',
                    progressOpen ? 'mt-4 max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:opacity-100'
                  )}
                >
                  <Stepper
                    steps={RESULT_STEPS}
                    currentStep={RESULT_STEPS.length}
                    allCompleted
                  />
                </div>
              </div>

              {recommendation.alternatives.length > 0 && (
                <div className="pt-3 md:pt-5 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setAlternativesOpen(prev => !prev)}
                    className="w-full flex items-center justify-between gap-2 md:pointer-events-none"
                    aria-expanded={alternativesOpen}
                  >
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-foreground">
                        Otras opciones que podrían interesarte
                      </h3>
                      <p className="text-xs text-muted-foreground md:hidden mt-0.5">
                        {recommendation.alternatives.length} alternativas
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-primary shrink-0 transition-transform duration-300 md:hidden',
                        alternativesOpen && 'rotate-180'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-out',
                      'md:mt-3 md:max-h-none md:opacity-100',
                      alternativesOpen ? 'mt-3 max-h-[800px] opacity-100' : 'max-h-0 opacity-0 md:opacity-100'
                    )}
                  >
                    <div className="flex flex-col gap-2.5">
                      {recommendation.alternatives.map((alt, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-border/70 bg-card/90 p-3 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h4 className="text-sm font-semibold text-foreground leading-tight">
                              {alt.product.shortName}
                            </h4>
                            <span className="text-sm font-bold text-primary shrink-0">
                              {formatPercentage(alt.score)}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">
                            {alt.product.description}
                          </p>
                          <a
                            href={alt.product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:text-accent transition-colors font-semibold text-[11px]"
                          >
                            Conocer más
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </aside>

            <div className="flex-1 p-5 md:p-7 lg:p-8">
              <div className="rounded-2xl border border-border/70 bg-background/40 p-4 md:p-6 mb-4">
                <div className="grid lg:grid-cols-3 gap-4 mb-4">
                  <div className="lg:col-span-2">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full font-semibold text-sm mb-3">
                      <Star className="w-4 h-4 fill-primary" />
                      Tu Mejor Opción
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-foreground mb-2">
                      {recommendation.product.name}
                    </h1>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {recommendation.product.description}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-4 border border-primary/10 flex flex-col justify-center">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-[0.24em]">
                      Compatibilidad
                    </p>
                    <p className="text-4xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                      {formatPercentage(recommendation.score)}
                    </p>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${recommendation.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-muted/25 p-4 mb-4 border border-border/60">
                  <h3 className="font-semibold text-foreground mb-3">Tu perfil de inversión:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-card rounded-2xl p-3 border border-border/40">
                      <p className="text-[11px] text-muted-foreground font-semibold mb-1">Monto</p>
                      <p className="text-sm font-semibold text-foreground">{formatMonto(calculatorData.monto)}</p>
                    </div>
                    <div className="bg-card rounded-2xl p-3 border border-border/40">
                      <p className="text-[11px] text-muted-foreground font-semibold mb-1">Plazo</p>
                      <p className="text-sm font-semibold text-foreground">{plazoLabel[calculatorData.plazo]}</p>
                    </div>
                    <div className="bg-card rounded-2xl p-3 border border-border/40">
                      <p className="text-[11px] text-muted-foreground font-semibold mb-1">Objetivo</p>
                      <p className="text-sm font-semibold text-foreground">{objetivoLabel[calculatorData.objetivo]}</p>
                    </div>
                    <div className="bg-card rounded-2xl p-3 border border-border/40">
                      <p className="text-[11px] text-muted-foreground font-semibold mb-1">Perfil</p>
                      <p className="text-sm font-semibold text-foreground capitalize">{calculatorData.perfil || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2 mb-4">
                  <div className="rounded-xl border border-primary/20 bg-background/50 p-3.5">
                    <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <span>Por qué te lo recomendamos</span>
                    </h3>
                    {recommendation.reasons.map((reason, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start px-2 py-1 rounded-lg hover:bg-muted/30 transition-colors duration-300">
                        <span className="text-primary font-bold text-sm shrink-0 mt-0.5">✓</span>
                        <span className="text-xs text-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-background/50 p-3.5">
                    <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span>Beneficios principales</span>
                    </h3>
                    {recommendation.product.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start px-2 py-1 rounded-lg hover:bg-muted/30 transition-colors duration-300">
                        <span className="text-primary font-bold text-sm shrink-0">✓</span>
                        <span className="text-xs text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-accent/5 p-3.5 border border-accent/20 mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-accent shrink-0" />
                    Consideraciones importantes
                  </h3>
                  <ul className="space-y-1">
                    {recommendation.product.considerations.map((consideration, idx) => (
                      <li key={idx} className="text-muted-foreground text-xs flex gap-2">
                        <span className="text-accent font-bold shrink-0">•</span>
                        <span>{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col md:flex-row gap-2.5 mt-5">
                  <a
                    href={recommendation.product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-[0_12px_28px_-16px_rgba(0,59,135,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95 text-sm"
                  >
                    Ver producto completo
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <button className="flex-1 px-4 py-2.5 rounded-xl border border-border/60 text-foreground font-semibold hover:bg-muted/70 transition-all duration-300 flex items-center justify-center gap-2 group text-sm">
                    <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Contactar asesor
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-background/40 p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  ¿Deseas explorar otras opciones?
                </h3>
                <p className="text-muted-foreground mb-4 max-w-2xl mx-auto text-sm">
                  Puedes hacer una nueva búsqueda con diferentes criterios para explorar otros productos
                </p>
                <button
                  onClick={onReset}
                  className="px-6 py-2.5 rounded-2xl bg-muted/80 hover:bg-muted text-foreground font-semibold transition-all duration-300 shadow-sm"
                >
                  Comenzar nueva búsqueda
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Esta recomendación es basada en tu perfil. Contáctanos para asesoría personalizada más detallada.
          </p>
        </div>
      </div>
    </div>
  )
}
