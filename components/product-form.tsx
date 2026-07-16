'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ChevronRight } from 'lucide-react'

interface ProductFormProps {
  productId: string
  onSubmit: (data: any) => void
  onBack: () => void
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

export function ProductForm({ productId, onSubmit, onBack }: ProductFormProps) {
  const fields = formConfigs[productId] || []
  const productName = productNames[productId] || 'Producto'
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es requerido`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 py-12">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Header */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver</span>
        </button>

        {/* Form Card */}
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 backdrop-blur hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/5">
          {/* Title */}
          <div className="mb-10">
            <div className="inline-block mb-3">
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                PASO 1 DE 2
              </span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">
              {productName}
            </h1>
            <p className="text-muted-foreground text-lg">
              Completa la información para obtener tu recomendación personalizada
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">
                Progreso: {Object.keys(formData).length} de {fields.length} campos
              </span>
              <span className="text-sm font-bold text-primary">
                {Math.round((Object.keys(formData).length / fields.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500"
                style={{ width: `${(Object.keys(formData).length / fields.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, idx) => (
              <div key={field.name} className="group animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 30}ms` }}>
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
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none font-medium ${
                      errors[field.name]
                        ? 'border-destructive bg-destructive/5 focus:border-destructive focus:ring-2 focus:ring-destructive/20'
                        : 'border-border/50 bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20'
                    }`}
                  />
                )}

                {errors[field.name] && (
                  <p className="text-destructive text-sm mt-2 flex items-center gap-1">
                    <span className="text-lg">⚠</span>
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex gap-4 mt-10 pt-8 border-t border-border/50">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-6 py-3 rounded-xl border border-border/50 text-foreground font-semibold hover:bg-muted transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95"
              >
                Siguiente
                <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-primary/5 rounded-xl p-5 border border-primary/20 backdrop-blur group hover:bg-primary/10 transition-colors duration-300">
          <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
            <span className="font-bold text-primary">ℹ Consejo:</span> Esta información nos ayuda a proporcionarte recomendaciones personalizadas y precisas.
          </p>
        </div>
      </div>
    </div>
  )
}
