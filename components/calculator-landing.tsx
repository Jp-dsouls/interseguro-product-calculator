'use client'

import { Calculator, TrendingUp, Shield, Zap } from 'lucide-react'

interface CalculatorLandingProps {
  onStart: () => void
}

export function CalculatorLanding({ onStart }: CalculatorLandingProps) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <div className="relative max-w-4xl w-full">
          <div className="text-center mb-12">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Calculator className="w-10 h-10 text-primary" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '100ms' }}>
              Tu Producto
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                InterSeguro Ideal
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '200ms' }}>
              Responde algunas preguntas simples y descubre qué producto de inversión y ahorro se ajusta perfectamente a tu situación financiera
            </p>

            {/* CTA Button */}
            <button
              onClick={onStart}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 text-lg group animate-in fade-in slide-in-from-bottom-2 duration-500" 
              style={{ animationDelay: '300ms' }}
            >
              <span>Comenzar Cálculo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '400ms' }}>
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
                  className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group/item"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 group-hover/item:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-border/50 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Confiado por <span className="font-semibold text-foreground">100,000+ peruanos</span> desde 2014
        </p>
      </div>
    </div>
  )
}
