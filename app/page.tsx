'use client'

import { useState } from 'react'
import { CalculatorLanding } from '@/components/calculator-landing'
import { CalculatorWizard, type CalculatorData } from '@/components/calculator-wizard'
import { RecommendationResult } from '@/components/recommendation-result'
import { ThemeToggle } from '@/components/theme-toggle'

type AppView = 'landing' | 'result'

export default function Page() {
  const [view, setView] = useState<AppView>('landing')
  const [wizardOpen, setWizardOpen] = useState(false)
  const [calculatorData, setCalculatorData] = useState<CalculatorData | null>(null)

  const handleWizardSubmit = (data: CalculatorData) => {
    setCalculatorData(data)
    setWizardOpen(false)
    setView('result')
  }

  const handleReset = () => {
    setView('landing')
    setCalculatorData(null)
  }

  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {view === 'landing' && (
        <CalculatorLanding onStart={() => setWizardOpen(true)} />
      )}

      {view === 'result' && calculatorData && (
        <RecommendationResult
          calculatorData={calculatorData}
          onReset={handleReset}
        />
      )}

      <CalculatorWizard
        open={wizardOpen}
        onOpenChange={setWizardOpen}
        onSubmit={handleWizardSubmit}
      />
    </main>
  )
}
