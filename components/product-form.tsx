'use client'

import { useState } from 'react'
import { FormModal } from '@/components/form-modal'

interface ProductFormProps {
  productId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

interface FormField {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'radio' | 'date'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
}

const formConfigs: Record<string, FormField[]> = {
  'soat-digital': [
    { name: 'placa', label: 'Placa del vehículo', type: 'text', placeholder: 'Ej: ABC-123', required: true },
    { name: 'marca', label: 'Marca', type: 'text', placeholder: 'Toyota, Honda, etc.', required: true },
    { name: 'anio', label: 'Año', type: 'number', placeholder: '2024', required: true },
    { name: 'uso', label: 'Uso del vehículo', type: 'select', required: true, options: [
      { value: 'particular', label: 'Particular' },
      { value: 'taxi', label: 'Taxi' },
      { value: 'carga', label: 'Carga' },
    ]},
  ],
  'vida-cash-plus': [
    { name: 'edad', label: 'Edad', type: 'number', placeholder: '30', required: true },
    { name: 'genero', label: 'Género', type: 'select', required: true, options: [
      { value: 'masculino', label: 'Masculino' },
      { value: 'femenino', label: 'Femenino' },
    ]},
    { name: 'cobertura', label: 'Cobertura deseada', type: 'select', required: true, options: [
      { value: '50000', label: 'S/ 50,000' },
      { value: '100000', label: 'S/ 100,000' },
      { value: '250000', label: 'S/ 250,000' },
      { value: '500000', label: 'S/ 500,000' },
    ]},
  ],
  'ingreso-seguro': [
    { name: 'edad', label: 'Edad', type: 'number', placeholder: '35', required: true },
    { name: 'profesion', label: 'Profesión/Ocupación', type: 'text', placeholder: 'Ingeniero, Profesor, etc.', required: true },
    { name: 'ingresoMensual', label: 'Ingreso mensual (S/)', type: 'number', placeholder: '3000', required: true },
  ],
  'viajes': [
    { name: 'destino', label: 'Destino', type: 'select', required: true, options: [
      { value: 'america', label: 'América Latina' },
      { value: 'europa', label: 'Europa' },
      { value: 'asia', label: 'Asia' },
      { value: 'mundial', label: 'Viaje Mundial' },
    ]},
    { name: 'dias', label: 'Duración (días)', type: 'number', placeholder: '7', required: true },
    { name: 'personas', label: 'Cantidad de personas', type: 'number', placeholder: '1', required: true },
  ],
  'endoso-devolucion': [
    { name: 'edad', label: 'Edad', type: 'number', placeholder: '25', required: true },
    { name: 'plazo', label: 'Plazo de ahorro', type: 'select', required: true, options: [
      { value: '5', label: '5 años' },
      { value: '10', label: '10 años' },
      { value: '15', label: '15 años' },
      { value: '20', label: '20 años' },
    ]},
    { name: 'monto', label: 'Monto mensual a ahorrar (S/)', type: 'number', placeholder: '200', required: true },
  ],
  'seguros-asesoria': [
    { name: 'tipoSeguro', label: '¿Qué tipo de seguro buscas?', type: 'select', required: true, options: [
      { value: 'personal', label: 'Seguro Personal' },
      { value: 'empresarial', label: 'Seguro Empresarial' },
      { value: 'patrimonial', label: 'Seguro Patrimonial' },
    ]},
    { name: 'nombre', label: 'Tu nombre completo', type: 'text', placeholder: 'Juan Pérez', required: true },
    { name: 'telefono', label: 'Teléfono de contacto', type: 'text', placeholder: '+51 999 999 999', required: true },
  ],
  'rumbo': [
    { name: 'edad', label: 'Edad', type: 'number', placeholder: '40', required: true },
    { name: 'estado', label: 'Estado civil', type: 'select', required: true, options: [
      { value: 'soltero', label: 'Soltero' },
      { value: 'casado', label: 'Casado' },
      { value: 'viudo', label: 'Viudo' },
      { value: 'divorciado', label: 'Divorciado' },
    ]},
    { name: 'beneficiarios', label: 'Cantidad de beneficiarios', type: 'number', placeholder: '2', required: true },
  ],
}

const productNames: Record<string, string> = {
  'soat-digital': 'SOAT Digital',
  'vida-cash-plus': 'Vida Cash Plus',
  'ingreso-seguro': 'Ingreso Seguro',
  'viajes': 'Seguros Viajes',
  'endoso-devolucion': 'Endoso Devolución',
  'seguros-asesoria': 'Seguros Asesoría',
  'rumbo': 'Rumbo',
}

function splitIntoSteps(fields: FormField[]): FormField[][] {
  if (fields.length <= 2) return [fields]
  const mid = Math.ceil(fields.length / 2)
  return [fields.slice(0, mid), fields.slice(mid)]
}

function renderField(
  field: FormField,
  formData: Record<string, string>,
  errors: Record<string, string>,
  handleChange: (name: string, value: string) => void
) {
  return (
    <div key={field.name} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <label className="block text-sm font-semibold text-foreground mb-2">
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </label>

      {field.type === 'select' && (
        <select
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none font-medium ${
            errors[field.name]
              ? 'border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20'
              : 'border-border/50 bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20'
          }`}
        >
          <option value="">Selecciona una opción...</option>
          {field.options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {(field.type === 'text' || field.type === 'number' || field.type === 'date') && (
        <input
          type={field.type}
          inputMode={field.type === 'number' ? 'numeric' : undefined}
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(field.name, e.target.value)}
          onWheel={field.type === 'number' ? (e) => e.currentTarget.blur() : undefined}
          onKeyDown={
            field.type === 'number'
              ? (e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault()
                  }
                }
              : undefined
          }
          placeholder={field.placeholder}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none font-medium ${
            errors[field.name]
              ? 'border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20'
              : 'border-border/50 bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20'
          }`}
        />
      )}

      {errors[field.name] && (
        <p className="text-destructive text-sm mt-2">{errors[field.name]}</p>
      )}
    </div>
  )
}

export function ProductForm({ productId, open, onOpenChange, onSubmit }: ProductFormProps) {
  const allFields = formConfigs[productId] || []
  const productName = productNames[productId] || 'Producto'
  const steps = splitIntoSteps(allFields)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateCurrentStep = () => {
    const currentFields = steps[currentStep] || []
    const newErrors: Record<string, string> = {}
    currentFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es requerido`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateCurrentStep()) return

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onSubmit(formData)
      setCurrentStep(0)
      setFormData({})
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onOpenChange(false)
    }
  }

  const stepperSteps = steps.map((_, i) => ({
    id: `step-${i}`,
    title: i === 0 ? 'Información básica' : 'Detalles adicionales',
    description: `Paso ${i + 1}`,
  }))

  const currentFields = steps[currentStep] || []
  const isStepValid = currentFields.some(f => f.required ? formData[f.name] : true) || true

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={productName}
      description="Completa la información para obtener tu recomendación personalizada"
      steps={stepperSteps}
      currentStep={currentStep}
      onNext={handleNext}
      onBack={handleBack}
      isFirstStep={currentStep === 0}
      isLastStep={currentStep === steps.length - 1}
      isStepValid={isStepValid}
      nextLabel={currentStep === steps.length - 1 ? 'Enviar' : undefined}
    >
      <div className="space-y-5">
        {currentFields.map(field =>
          renderField(field, formData, errors, handleChange)
        )}
      </div>
    </FormModal>
  )
}
