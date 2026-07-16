'use client'

import { Shield, Car, Heart, Plane, DollarSign, Briefcase, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductSelectorProps {
  onSelectProduct: (productId: string) => void
}

interface Product {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  url: string
}

const products: Product[] = [
  {
    id: 'soat-digital',
    name: 'SOAT Digital',
    description: 'Seguro vehicular rápido y digital',
    icon: <Car className="w-8 h-8" />,
    color: 'from-blue-600 to-blue-800',
    url: 'https://www.interseguro.pe/soat-digital/',
  },
  {
    id: 'vida-cash-plus',
    name: 'Vida Cash Plus',
    description: 'Seguro de vida con rendimientos',
    icon: <Heart className="w-8 h-8" />,
    color: 'from-red-600 to-red-800',
    url: 'https://www.interseguro.pe/seguro-de-vida/vida-cash-plus',
  },
  {
    id: 'ingreso-seguro',
    name: 'Ingreso Seguro',
    description: 'Protección ante desempleo',
    icon: <DollarSign className="w-8 h-8" />,
    color: 'from-green-600 to-green-800',
    url: 'https://www.interseguro.pe/ingreso-seguro',
  },
  {
    id: 'viajes',
    name: 'Seguros Viajes',
    description: 'Cobertura completa internacional',
    icon: <Plane className="w-8 h-8" />,
    color: 'from-purple-600 to-purple-800',
    url: 'https://www.interseguro.pe/viajes/',
  },
  {
    id: 'endoso-devolucion',
    name: 'Endoso Devolución',
    description: 'Ahorro con protección familiar',
    icon: <TrendingUp className="w-8 h-8" />,
    color: 'from-orange-600 to-orange-800',
    url: 'https://www.interseguro.pe/seguro-de-vida/endoso-con-devolucion',
  },
  {
    id: 'seguros-asesoria',
    name: 'Seguros Asesoría',
    description: 'Soluciones personalizadas',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-indigo-600 to-indigo-800',
    url: 'https://www.interseguro.pe/seguros-con-asesoria',
  },
  {
    id: 'rumbo',
    name: 'Rumbo',
    description: 'Seguro de vida a tu medida',
    icon: <Shield className="w-8 h-8" />,
    color: 'from-cyan-600 to-cyan-800',
    url: 'https://www.interseguro.pe/seguro-de-vida/rumbo/',
  },
]

export function ProductSelector({ onSelectProduct }: ProductSelectorProps) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Hero Section - Modern Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
        <div className="relative container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-6">
            <div className="inline-block mb-4">
              <div className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                ✨ Tus seguros, simplificados
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              Encuentra el Seguro
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Perfecto para Ti
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Compara de manera inteligente y elige la cobertura que se adapta a tu vida
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, index) => (
            <button
              key={product.id}
              onClick={() => onSelectProduct(product.id)}
              className="group text-left h-full animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-full bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 overflow-hidden group/item">
                {/* Gradient Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
                
                {/* Content */}
                <div className="relative flex flex-col h-full">
                  {/* Icon Container */}
                  <div className={`inline-flex w-fit bg-gradient-to-br ${product.color} p-3 rounded-xl mb-4 text-white shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    {product.icon}
                  </div>

                  {/* Text Content */}
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">
                    {product.description}
                  </p>

                  {/* CTA Arrow */}
                  <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all duration-300">
                    <span>Explorar</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 backdrop-blur">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
            Ventajas de InterSeguro
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Cobertura Integral',
                description: 'Protección completa ante cualquier eventualidad con pólizas flexibles',
              },
              {
                icon: DollarSign,
                title: 'Mejores Precios',
                description: 'Ofertas competitivas y personalizadas según tu presupuesto',
              },
              {
                icon: TrendingUp,
                title: 'Trámite Rápido',
                description: 'Proceso 100% digital, ágil y sin complicaciones',
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="group flex gap-4 p-4 rounded-xl hover:bg-primary/5 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-border/50 py-12">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Confiado por más de <span className="font-bold text-foreground">100,000+ peruanos</span> • Desde 2014
          </p>
        </div>
      </div>
    </div>
  )
}
