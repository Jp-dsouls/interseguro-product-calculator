'use client'

import { Calculator, TrendingUp, Shield, Zap } from 'lucide-react'

interface CalculatorLandingProps {
  onStart: () => void
}

export function CalculatorLanding({ onStart }: CalculatorLandingProps) {
  return (
    <div className="min-h-screen bg-background dark:bg-[radial-gradient(circle_at_top_left,rgba(94,179,246,0.08),transparent_45%),linear-gradient(135deg,#0a1428_0%,#132d5a_100%)] bg-[radial-gradient(circle_at_top_left,rgba(0,59,135,0.08),transparent_45%),linear-gradient(135deg,#f6f9ff_0%,#ffffff_100%)] transition-colors duration-300 flex flex-col">
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4 py-4 md:py-6">
        <div className="absolute inset-0 dark:bg-[linear-gradient(120deg,rgba(94,179,246,0.04),transparent_35%,rgba(0,212,255,0.04))] bg-[linear-gradient(120deg,rgba(0,59,135,0.04),transparent_35%,rgba(0,128,208,0.04))] pointer-events-none" />

        <div className="relative w-full max-w-5xl">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-[0_12px_35px_-18px_rgba(0,59,135,0.45)]">
                <Calculator className="w-8 h-8 text-primary" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground mb-3 leading-[1.05] animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '100ms' }}>
                Tu Producto
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                  InterSeguro Ideal
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-5 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '200ms' }}>
                Responde algunas preguntas simples y descubre qué producto de inversión y ahorro se ajusta perfectamente a tu situación financiera
              </p>

              <button
                onClick={onStart}
                className="inline-flex items-center gap-3 px-7 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-2xl hover:shadow-[0_16px_40px_-18px_rgba(0,59,135,0.45)] transition-all duration-300 text-base group animate-in fade-in slide-in-from-bottom-2 duration-500"
                style={{ animationDelay: '300ms' }}
              >
                <span>Comenzar Cálculo</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '400ms' }}>
              {[
                {
                  icon: Zap,
                  title: 'Rápido',
                  description: 'Obtén tu recomendación en menos de 2 minutos'
                },
                {
                  icon: TrendingUp,
                  title: 'Personalizado',
                  description: 'Basado en tu perfil financiero único'
                },
                {
                  icon: Shield,
                  title: 'Confiable',
                  description: 'Recomendaciones de InterSeguro verificadas'
                }
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/60 bg-background/70 p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_14px_35px_-22px_rgba(0,59,135,0.35)] group/item"
                  >
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 mb-3 group-hover/item:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
        </div>
      </div>

      <div className="border-t border-border/60 py-3 text-center bg-background/70 backdrop-blur-sm">
        <p className="text-sm text-muted-foreground">
          Confiado por <span className="font-semibold text-foreground">100,000+ peruanos</span> desde 2014
        </p>
      </div>
    </div>
  )
}
