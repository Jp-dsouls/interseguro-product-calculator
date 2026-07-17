'use client'

import { ReactNode } from 'react'
import { ArrowLeft, ChevronRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Stepper } from '@/components/ui/stepper'

interface StepConfig {
  id: string
  title: string
  description?: string
}

interface FormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  steps: StepConfig[]
  currentStep: number
  onNext: () => void
  onBack: () => void
  children: ReactNode
  isFirstStep?: boolean
  isLastStep?: boolean
  isStepValid?: boolean
  nextLabel?: string
  backLabel?: string
}

export function FormModal({
  open,
  onOpenChange,
  title,
  description,
  steps,
  currentStep,
  onNext,
  onBack,
  children,
  isLastStep = currentStep === steps.length - 1,
  isStepValid = true,
  nextLabel,
  backLabel,
}: FormModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-3xl p-0 gap-0 overflow-hidden !grid-rows-none flex flex-col max-h-[min(90vh,820px)]"
        showCloseButton={false}
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/60 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
              {description && (
                <DialogDescription className="mt-1">{description}</DialogDescription>
              )}
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full shrink-0">
              Paso {currentStep + 1} de {steps.length}
            </span>
          </div>
        </DialogHeader>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="w-52 shrink-0 border-r border-border/60 bg-muted/30 p-5 hidden md:block overflow-y-auto">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6">
            <div
              key={`step-${currentStep}`}
              className="animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              {children}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border/60 bg-muted/30 shrink-0">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {backLabel || 'Anterior'}
          </Button>

          <Button
            onClick={onNext}
            disabled={!isStepValid}
            className="gap-2 bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50"
          >
            {isLastStep ? (
              <>
                {nextLabel || 'Enviar'}
                <Send className="h-4 w-4" />
              </>
            ) : (
              <>
                {nextLabel || 'Siguiente'}
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
