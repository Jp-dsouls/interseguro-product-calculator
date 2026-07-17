'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
  /** Marks every step as completed (e.g. result view) */
  allCompleted?: boolean
}

export function Stepper({ steps, currentStep, className, allCompleted = false }: StepperProps) {
  return (
    <nav className={cn('flex flex-col', className)} aria-label="Progreso del formulario">
      {steps.map((step, index) => {
        const isCompleted = allCompleted || index < currentStep
        const isActive = !allCompleted && index === currentStep
        const isLast = index === steps.length - 1

        return (
          <div key={step.id} className="flex">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300',
                  isCompleted && 'border-primary bg-primary text-primary-foreground',
                  isActive && 'border-primary bg-primary/10 text-primary shadow-[0_0_0_4px_rgba(0,59,135,0.1)]',
                  !isCompleted && !isActive && 'border-border bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'w-0.5 flex-1 min-h-8 my-1 transition-colors duration-300',
                    isCompleted || isActive ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>
            <div className={cn('ml-3 pb-8', isLast && 'pb-0')}>
              <p
                className={cn(
                  'text-sm font-semibold leading-tight transition-colors duration-300',
                  isActive && 'text-foreground',
                  isCompleted && 'text-primary',
                  !isCompleted && !isActive && 'text-muted-foreground'
                )}
              >
                {step.title}
              </p>
              {step.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              )}
            </div>
          </div>
        )
      })}
    </nav>
  )
}
