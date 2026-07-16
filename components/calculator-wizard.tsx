'use client'

import { useState } from 'react'
import { ArrowLeft, ChevronRight, DollarSign, Calendar, Target, TrendingUp, Users } from 'lucide-react'

export interface CalculatorData {
  monto: number
  plazo: '6meses' | '1año' | '3años' | '5+años'
  objetivo: 'ahorro' | 'protección' | 'rentabilidad' | 'flexibilidad'
  perfil?: 'conservador' | 'moderado' | 'agresivo'
  dependientes?: number
}

interface CalculatorWizardProps {
  onSubmit: (data: CalculatorData) => void
  onBack: () => void
}

const QUESTIONS = [
  {
    id: 'monto',
    title: '¿Cuánto deseas invertir o ahorrar?',
    description: 'Selecciona el monto inicial',
    icon: DollarSign
  },
  {
    id: 'plazo',
    title: '¿Cuál es tu horizonte de inversión?',
    description: 'Define el tiempo que planeas mantener tu inversión',
    icon: Calendar
  },
  {
    id: 'objetivo',
    title: '¿Cuál es tu objetivo principal?',
    description: 'Esto nos ayuda a personalizar la recomendación',
    icon: Target
  },
  {
    id: 'perfil',
    title: '¿Cuál es tu perfil de riesgo?',
    description: 'Define tu tolerancia al riesgo de inversión',
    icon: TrendingUp
  }
]

export function CalculatorWizard({ onSubmit, onBack }: CalculatorWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<CalculatorData>>({
    monto: 5000,
    plazo: '1año',
    objetivo: 'ahorro'
  })
  const [showDependents, setShowDependents] = useState(false)

  const currentQuestion = QUESTIONS[currentStep]
  const Icon = currentQuestion.icon

  const handleMontoChange = (value: number) => {
    setFormData(prev => ({ ...prev, monto: value }))
  }

  const handleNext = () => {
    if (currentStep === 2) { // After objetivo question
      if (formData.objetivo === 'rentabilidad' || formData.objetivo === 'protección') {
        setShowDependents(true)
      }
    }
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onSubmit(formData as CalculatorData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const isStepValid = () => {
    const step = QUESTIONS[currentStep].id
    if (step === 'monto') return formData.monto && formData.monto > 0
    if (step === 'plazo') return formData.plazo
    if (step === 'objetivo') return formData.objetivo
    if (step === 'perfil') return formData.perfil
    return true
  }

  const montoOptions = [
    { label: '$500 - $2,000', value: 1250 },
    { label: '$2,000 - $5,000', value: 3500 },
    { label: '$5,000 - $10,000', value: 7500 },
    { label: '$10,000 - $25,000', value: 17500 },
    { label: '$25,000+', value: 50000 }
  ]

  const plazoOptions = [
    { label: '6 meses', value: '6meses', description: 'Corto plazo' },
    { label: '1 año', value: '1año', description: 'Plazo moderado' },
    { label: '3 años', value: '3años', description: 'Largo plazo' },
    { label: '5+ años', value: '5+años', description: 'Muy largo plazo' }
  ]

  const objetivoOptions = [
    { label: 'Ahorro Protegido', value: 'ahorro', description: 'Preservar capital con seguridad' },
    { label: 'Protección', value: 'protección', description: 'Cubrir riesgos y contingencias' },
    { label: 'Rentabilidad', value: 'rentabilidad', description: 'Maximizar ganancias' },
    { label: 'Flexibilidad', value: 'flexibilidad', description: 'Acceso fácil a fondos' }
  ]

  const perfilOptions = [
    { label: 'Conservador', value: 'conservador', description: 'Bajo riesgo, rentabilidad segura' },
    { label: 'Moderado', value: 'moderado', description: 'Balance entre riesgo y rentabilidad' },
    { label: 'Agresivo', value: 'agresivo', description: 'Alto riesgo, alta rentabilidad' }
  ]

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 py-12">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver</span>
        </button>

        {/* Card */}
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 backdrop-blur hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5">
          
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                PREGUNTA {currentStep + 1} DE {QUESTIONS.length}
              </span>
              <span className="text-sm font-bold text-primary">
                {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {currentQuestion.title}
                </h2>
                <p className="text-muted-foreground">
                  {currentQuestion.description}
                </p>
              </div>
            </div>

            {/* Question Content */}
            <div className="space-y-4 mt-8">
              {/* Monto */}
              {currentQuestion.id === 'monto' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {montoOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleMontoChange(option.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left font-semibold ${
                          formData.monto === option.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border/50 hover:border-primary/50 text-foreground hover:bg-muted'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mb-4">O ingresa un monto personalizado:</p>
                    <input
                      type="number"
                      value={formData.monto}
                      onChange={(e) => handleMontoChange(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 font-bold text-lg"
                      placeholder="Ingresa el monto"
                      min="500"
                    />
                  </div>
                </div>
              )}

              {/* Plazo */}
              {currentQuestion.id === 'plazo' && (
                <div className="grid grid-cols-1 gap-3">
                  {plazoOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFormData(prev => ({ ...prev, plazo: option.value as any }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.plazo === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/50 hover:bg-muted'
                      }`}
                    >
                      <div className="font-semibold text-foreground">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Objetivo */}
              {currentQuestion.id === 'objetivo' && (
                <div className="grid grid-cols-1 gap-3">
                  {objetivoOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFormData(prev => ({ ...prev, objetivo: option.value as any }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.objetivo === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/50 hover:bg-muted'
                      }`}
                    >
                      <div className="font-semibold text-foreground">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Perfil de Riesgo */}
              {currentQuestion.id === 'perfil' && (
                <div className="grid grid-cols-1 gap-3">
                  {perfilOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFormData(prev => ({ ...prev, perfil: option.value as any }))}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.perfil === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/50 hover:bg-muted'
                      }`}
                    >
                      <div className="font-semibold text-foreground">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-8 border-t border-border/50">
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-3 rounded-xl border border-border/50 text-foreground font-semibold hover:bg-muted transition-all duration-300"
            >
              Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
            >
              {currentStep === QUESTIONS.length - 1 ? 'Ver Recomendación' : 'Siguiente'}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Tus respuestas nos ayudan a encontrar el producto InterSeguro más adecuado para ti
          </p>
        </div>
      </div>
    </div>
  )
}
