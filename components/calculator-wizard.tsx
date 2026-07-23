'use client'

import { useState } from 'react'
import { DollarSign, Calendar, Target, TrendingUp } from 'lucide-react'
import { FormModal } from '@/components/form-modal'

export interface CalculatorData {
  monto: number
  plazo: '6meses' | '1año' | '3años' | '5+años'
  objetivo: 'ahorro' | 'protección' | 'rentabilidad' | 'flexibilidad'
  perfil?: 'conservador' | 'moderado' | 'agresivo'
  dependientes?: number
}

interface CalculatorWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CalculatorData) => void
}

const STEPS = [
  { id: 'monto', title: 'Monto', description: 'Cantidad a invertir' },
  { id: 'plazo', title: 'Plazo', description: 'Horizonte de inversión' },
  { id: 'objetivo', title: 'Objetivo', description: 'Meta principal' },
  { id: 'perfil', title: 'Perfil', description: 'Tolerancia al riesgo' },
]

const QUESTIONS = [
  {
    id: 'monto',
    title: '¿Cuánto deseas invertir o ahorrar?',
    description: 'Selecciona el monto inicial',
    icon: DollarSign,
  },
  {
    id: 'plazo',
    title: '¿Cuál es tu horizonte de inversión?',
    description: 'Define el tiempo que planeas mantener tu inversión',
    icon: Calendar,
  },
  {
    id: 'objetivo',
    title: '¿Cuál es tu objetivo principal?',
    description: 'Esto nos ayuda a personalizar la recomendación',
    icon: Target,
  },
  {
    id: 'perfil',
    title: '¿Cuál es tu perfil de riesgo?',
    description: 'Define tu tolerancia al riesgo de inversión',
    icon: TrendingUp,
  },
]

const INITIAL_DATA: Partial<CalculatorData> = {
  monto: 5000,
  plazo: '1año',
  objetivo: 'ahorro',
}

export function CalculatorWizard({ open, onOpenChange, onSubmit }: CalculatorWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<CalculatorData>>(INITIAL_DATA)

  const currentQuestion = QUESTIONS[currentStep]
  const Icon = currentQuestion.icon

  const resetWizard = () => {
    setCurrentStep(0)
    setFormData(INITIAL_DATA)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetWizard()
    }
    onOpenChange(nextOpen)
  }

  const handleMontoChange = (value: number) => {
    setFormData(prev => ({ ...prev, monto: value }))
  }

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
      return
    }

    const data = formData as CalculatorData
    onSubmit(data)
    resetWizard()
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      handleOpenChange(false)
    }
  }

  const isStepValid = (): boolean => {
    const step = QUESTIONS[currentStep].id
    if (step === 'monto') return Boolean(formData.monto && formData.monto > 0)
    if (step === 'plazo') return Boolean(formData.plazo)
    if (step === 'objetivo') return Boolean(formData.objetivo)
    if (step === 'perfil') return Boolean(formData.perfil)
    return true
  }

  const montoOptions = [
    { label: '$500 - $2,000', value: 1250 },
    { label: '$2,000 - $5,000', value: 3500 },
    { label: '$5,000 - $10,000', value: 7500 },
    { label: '$10,000 - $25,000', value: 17500 },
    { label: '$25,000+', value: 50000 },
  ]

  const plazoOptions = [
    { label: '6 meses', value: '6meses', description: 'Corto plazo' },
    { label: '1 año', value: '1año', description: 'Plazo moderado' },
    { label: '3 años', value: '3años', description: 'Largo plazo' },
    { label: '5+ años', value: '5+años', description: 'Muy largo plazo' },
  ]

  const objetivoOptions = [
    { label: 'Ahorro Protegido', value: 'ahorro', description: 'Preservar capital con seguridad' },
    { label: 'Protección', value: 'protección', description: 'Cubrir riesgos y contingencias' },
    { label: 'Rentabilidad', value: 'rentabilidad', description: 'Maximizar ganancias' },
    { label: 'Flexibilidad', value: 'flexibilidad', description: 'Acceso fácil a fondos' },
  ]

  const perfilOptions = [
    { label: 'Conservador', value: 'conservador', description: 'Bajo riesgo, rentabilidad segura' },
    { label: 'Moderado', value: 'moderado', description: 'Balance entre riesgo y rentabilidad' },
    { label: 'Agresivo', value: 'agresivo', description: 'Alto riesgo, alta rentabilidad' },
  ]

  return (
    <FormModal
      open={open}
      onOpenChange={handleOpenChange}
      title={currentQuestion.title}
      description={currentQuestion.description}
      steps={STEPS}
      currentStep={currentStep}
      onNext={handleNext}
      onBack={handleBack}
      isFirstStep={currentStep === 0}
      isLastStep={currentStep === QUESTIONS.length - 1}
      isStepValid={isStepValid()}
      nextLabel={currentStep === QUESTIONS.length - 1 ? 'Ver Recomendación' : undefined}
    >
      <div className="flex items-start gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 shadow-[0_10px_25px_-18px_rgba(0,59,135,0.45)]">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{currentQuestion.title}</h3>
          <p className="text-sm text-muted-foreground">{currentQuestion.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {currentQuestion.id === 'monto' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {montoOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleMontoChange(option.value)}
                  className={`p-3 rounded-2xl border transition-all duration-300 text-left font-semibold text-sm shadow-sm ${
                    formData.monto === option.value
                      ? 'border-primary bg-primary/10 text-primary shadow-[0_12px_30px_-20px_rgba(0,59,135,0.4)]'
                      : 'border-border/60 hover:border-primary/50 text-foreground hover:bg-muted/70'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="pt-3 border-t border-border/60">
              <p className="text-xs text-muted-foreground mb-2">O ingresa un monto personalizado:</p>
              <input
                type="number"
                inputMode="numeric"
                value={formData.monto}
                onChange={(e) => handleMontoChange(Number(e.target.value))}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault()
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background/80 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 font-semibold text-sm"
                placeholder="Ingresa el monto"
                min="500"
              />
            </div>
          </div>
        )}

        {currentQuestion.id === 'plazo' && (
          <div className="grid grid-cols-2 gap-2">
            {plazoOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFormData(prev => ({ ...prev, plazo: option.value as any }))}
                className={`p-3 rounded-xl border transition-all duration-300 text-left shadow-sm ${
                  formData.plazo === option.value
                    ? 'border-primary bg-primary/10 shadow-[0_10px_24px_-16px_rgba(0,59,135,0.35)]'
                    : 'border-border/60 hover:border-primary/50 hover:bg-muted/70'
                }`}
              >
                <div className="font-semibold text-foreground text-sm">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </button>
            ))}
          </div>
        )}

        {currentQuestion.id === 'objetivo' && (
          <div className="grid grid-cols-2 gap-2">
            {objetivoOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFormData(prev => ({ ...prev, objetivo: option.value as any }))}
                className={`p-3 rounded-xl border transition-all duration-300 text-left shadow-sm ${
                  formData.objetivo === option.value
                    ? 'border-primary bg-primary/10 shadow-[0_10px_24px_-16px_rgba(0,59,135,0.35)]'
                    : 'border-border/60 hover:border-primary/50 hover:bg-muted/70'
                }`}
              >
                <div className="font-semibold text-foreground text-sm">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </button>
            ))}
          </div>
        )}

        {currentQuestion.id === 'perfil' && (
          <div className="grid grid-cols-2 gap-2">
            {perfilOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFormData(prev => ({ ...prev, perfil: option.value as any }))}
                className={`p-3 rounded-xl border transition-all duration-300 text-left shadow-sm ${
                  formData.perfil === option.value
                    ? 'border-primary bg-primary/10 shadow-[0_10px_24px_-16px_rgba(0,59,135,0.35)]'
                    : 'border-border/60 hover:border-primary/50 hover:bg-muted/70'
                }`}
              >
                <div className="font-semibold text-foreground text-sm">{option.label}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </FormModal>
  )
}
