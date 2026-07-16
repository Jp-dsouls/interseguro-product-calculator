'use client'

import { CheckCircle, AlertCircle, ExternalLink, ArrowLeft, TrendingUp, Award, Zap } from 'lucide-react'
import { calculateRecommendation, type Recommendation } from '@/lib/recommendation-engine'
import type { CalculatorData } from '@/components/calculator-wizard'

interface RecommendationResultProps {
  calculatorData: CalculatorData
  onReset: () => void
}

export function RecommendationResult({ calculatorData, onReset }: RecommendationResultProps) {
  const recommendation = calculateRecommendation(calculatorData)

  const formatMonto = (monto: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(monto)
  }

  const formatPercentage = (score: number) => {
    return `${Math.round(score)}%`
  }

  const plazoLabel: Record<string, string> = {
    '6meses': '6 meses',
    '1año': '1 año',
    '3años': '3 años',
    '5+años': '5+ años'
  }

  const objetivoLabel: Record<string, string> = {
    'ahorro': 'Ahorro protegido',
    'protección': 'Protección',
    'rentabilidad': 'Rentabilidad',
    'flexibilidad': 'Flexibilidad'
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Nueva búsqueda</span>
        </button>

        {/* Success Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-2xl p-7 mb-10 flex gap-4 backdrop-blur animate-in fade-in slide-in-from-top-2 duration-500">
          <Award className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold text-foreground mb-1">
              Hemos encontrado tu producto ideal
            </h2>
            <p className="text-muted-foreground">
              Basado en tu perfil de inversión personalizado
            </p>
          </div>
        </div>

        {/* Main Recommendation Card */}
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 mb-8 backdrop-blur hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '100ms' }}>
          
          {/* Badge + Title */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm mb-4">
              <Award className="w-4 h-4" />
              Tu Mejor Opción
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {recommendation.product.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {recommendation.product.description}
            </p>
          </div>

          {/* Score */}
          <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-xl p-6 mb-10 border border-primary/10">
            <div className="flex items-end gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Compatibilidad</p>
                <p className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {formatPercentage(recommendation.score)}
                </p>
              </div>
              <div className="flex-1">
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${recommendation.score}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Summary */}
          <div className="bg-muted/30 rounded-xl p-6 mb-10 border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Tu perfil de inversión:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border/30">
                <p className="text-xs text-muted-foreground font-semibold mb-1">Monto</p>
                <p className="text-lg font-bold text-foreground">{formatMonto(calculatorData.monto)}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border/30">
                <p className="text-xs text-muted-foreground font-semibold mb-1">Plazo</p>
                <p className="text-lg font-bold text-foreground">{plazoLabel[calculatorData.plazo]}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border/30">
                <p className="text-xs text-muted-foreground font-semibold mb-1">Objetivo</p>
                <p className="text-lg font-bold text-foreground">{objetivoLabel[calculatorData.objetivo]}</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border/30">
                <p className="text-xs text-muted-foreground font-semibold mb-1">Perfil</p>
                <p className="text-lg font-bold text-foreground capitalize">{calculatorData.perfil || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Reasons */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              Por qué te lo recomendamos
            </h3>
            <div className="space-y-3">
              {recommendation.reasons.map((reason, idx) => (
                <div key={idx} className="flex gap-3 items-start p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300 group/item">
                  <span className="text-primary font-bold text-lg flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-foreground group-hover/item:text-primary transition-colors">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              Beneficios principales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendation.product.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-3 items-start p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300 group/item">
                  <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-foreground group-hover/item:text-primary transition-colors">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Considerations */}
          <div className="bg-accent/5 rounded-xl p-6 border border-accent/20 mb-10 hover:bg-accent/10 transition-colors duration-300">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-accent" />
              </div>
              Consideraciones importantes
            </h3>
            <ul className="space-y-2">
              {recommendation.product.considerations.map((consideration, idx) => (
                <li key={idx} className="text-muted-foreground text-sm flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">↳</span>
                  <span>{consideration}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-12">
            <a
              href={recommendation.product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
            >
              Ver producto completo
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <button
              className="flex-1 px-6 py-4 rounded-xl border border-border/50 text-foreground font-bold hover:bg-muted transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Contactar asesor
            </button>
          </div>
        </div>

        {/* Alternatives */}
        {recommendation.alternatives.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Otras opciones que podrían interesarte
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendation.alternatives.map((alt, idx) => (
                <div
                  key={idx}
                  className="bg-card rounded-2xl p-6 border border-border/50 backdrop-blur hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5 animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-bold text-foreground">{alt.product.shortName}</h4>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground font-semibold">Compatibilidad</p>
                      <p className="text-xl font-bold text-primary">{formatPercentage(alt.score)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {alt.product.description}
                  </p>
                  <a
                    href={alt.product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold text-sm"
                  >
                    Conocer más
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reset Card */}
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 backdrop-blur hover:border-accent/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-accent/5 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            ¿Deseas explorar otras opciones?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Puedes hacer una nueva búsqueda con diferentes criterios para explorar otros productos
          </p>
          <button
            onClick={onReset}
            className="px-8 py-3 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-muted/50"
          >
            Comenzar nueva búsqueda
          </button>
        </div>

        {/* Info Footer */}
        <div className="mt-10 text-center text-sm text-muted-foreground">
          <p>
            Esta recomendación es basada en tu perfil. Contáctanos para asesoría personalizada más detallada.
          </p>
        </div>
      </div>
    </div>
  )
}
