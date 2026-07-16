'use client'

import { useState } from 'react'
import { CalculatorLanding } from '@/components/calculator-landing'
import { CalculatorWizard, type CalculatorData } from '@/components/calculator-wizard'
import { RecommendationResult } from '@/components/recommendation-result'
import { ThemeToggle } from '@/components/theme-toggle'

type CalculatorStep = 'landing' | 'wizard' | 'result'

export default function Page() {
  const [step, setStep] = useState<CalculatorStep>('landing')
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null)

  const handleStartCalculator = () => {
    setStep('wizard')
  }

  const handleWizardSubmit = (data: CalculatorData) => {
    setCalculatorData(data)
    setStep('result')
  }

  const handleReset = () => {
    setStep('landing')
    setCalculatorData(null)
  }

  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {step === 'landing' && <CalculatorLanding onStart={handleStartCalculator} />}
      {step === 'wizard' && (
        <CalculatorWizard 
          onSubmit={handleWizardSubmit}
          onBack={() => setStep('landing')}
        />
      )}
      {step === 'result' && calculatorData && (
        <RecommendationResult 
          calculatorData={calculatorData}
          onReset={handleReset}
        />
      )}
    </main>
  )
}
