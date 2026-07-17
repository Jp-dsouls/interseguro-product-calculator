'use client'

import { useEffect, useRef, useState } from 'react'
import { Calculator, TrendingUp, Shield, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CalculatorLandingProps {
  onStart: () => void
}

const FEATURES = [
  {
    icon: Zap,
    title: 'Rápido',
    description: 'Obtén tu recomendación en menos de 2 minutos',
  },
  {
    icon: TrendingUp,
    title: 'Personalizado',
    description: 'Basado en tu perfil financiero único',
  },
  {
    icon: Shield,
    title: 'Confiable',
    description: 'Recomendaciones de InterSeguro verificadas',
  },
]

export function CalculatorLanding({ onStart }: CalculatorLandingProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const isProgrammaticScroll = useRef(false)

  useEffect(() => {
    if (isPaused) return

    const timer = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % FEATURES.length)
    }, 3000)

    return () => window.clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const card = scroller.children[activeIndex] as HTMLElement | undefined
    if (!card) return

    isProgrammaticScroll.current = true
    scroller.scrollTo({
      left: card.offsetLeft - scroller.offsetLeft,
      behavior: 'smooth',
    })

    const timeout = window.setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 450)

    return () => window.clearTimeout(timeout)
  }, [activeIndex])

  const handleScroll = () => {
    if (isProgrammaticScroll.current) return

    const scroller = scrollerRef.current
    if (!scroller) return

    const cards = Array.from(scroller.children) as HTMLElement[]
    if (cards.length === 0) return

    const center = scroller.scrollLeft + scroller.clientWidth / 2
    let closest = 0
    let minDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const distance = Math.abs(center - cardCenter)
      if (distance < minDistance) {
        minDistance = distance
        closest = index
      }
    })

    setActiveIndex(closest)
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[radial-gradient(circle_at_top_left,rgba(94,179,246,0.08),transparent_45%),linear-gradient(135deg,#0a1428_0%,#132d5a_100%)] bg-[radial-gradient(circle_at_top_left,rgba(0,59,135,0.08),transparent_45%),linear-gradient(135deg,#f6f9ff_0%,#ffffff_100%)] transition-colors duration-300 flex flex-col">
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4 py-4 md:py-6">
        <div className="absolute inset-0 dark:bg-[linear-gradient(120deg,rgba(94,179,246,0.04),transparent_35%,rgba(0,212,255,0.04))] bg-[linear-gradient(120deg,rgba(0,59,135,0.04),transparent_35%,rgba(0,128,208,0.04))] pointer-events-none" />

        <div className="relative w-full max-w-5xl">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-5 animate-in fade-in slide-in-from-bottom-2 duration-500 shadow-[0_12px_35px_-18px_rgba(0,59,135,0.45)]">
              <Calculator className="w-8 h-8 text-primary" />
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-foreground mb-3 leading-[1.05] animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: '100ms' }}
            >
              Tu Producto
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                InterSeguro Ideal
              </span>
            </h1>

            <p
              className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-5 leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500"
              style={{ animationDelay: '200ms' }}
            >
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

          <div
            className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: '400ms' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div
              ref={scrollerRef}
              onScroll={handleScroll}
              className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {FEATURES.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div
                    key={idx}
                    className={cn(
                      'min-w-[78%] sm:min-w-[60%] md:min-w-0 snap-center rounded-2xl border border-border/60 bg-background/70 p-4 transition-all duration-500 ease-out group/item',
                      'md:scale-100 md:opacity-90',
                      activeIndex === idx
                        ? 'border-primary/40 shadow-[0_14px_35px_-22px_rgba(0,59,135,0.35)] md:scale-105 md:opacity-100 md:shadow-[0_18px_40px_-20px_rgba(0,59,135,0.4)] md:z-10 md:relative'
                        : 'md:scale-95 md:opacity-70'
                    )}
                  >
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 mb-3 group-hover/item:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center gap-2 mt-3 md:hidden">
              {FEATURES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Ir a tarjeta ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    activeIndex === idx ? 'w-6 bg-primary' : 'w-1.5 bg-border'
                  )}
                />
              ))}
            </div>
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
