import type { CalculatorData } from '@/components/calculator-wizard'

export interface Product {
  id: string
  name: string
  shortName: string
  description: string
  url: string
  benefits: string[]
  considerations: string[]
}

export interface Recommendation {
  product: Product
  score: number
  reasons: string[]
  alternatives: Array<{
    product: Product
    score: number
  }>
}

const PRODUCTS: Record<string, Product> = {
  vida_cash_plus: {
    id: 'vida_cash_plus',
    name: 'Vida Cash Plus',
    shortName: 'Vida Cash Plus',
    description: 'Seguro de vida con rendimientos, protección integral y créditos contra póliza',
    url: 'https://www.interseguro.pe/seguro-de-vida/vida-cash-plus',
    benefits: [
      'Rendimiento anual garantizado',
      'Protección de vida completa',
      'Créditos contra póliza disponibles',
      'Beneficiarios múltiples'
    ],
    considerations: [
      'Requiere compromiso a largo plazo para máximos rendimientos',
      'Costos administrativos incluidos',
      'Mejor para edades entre 18-65 años'
    ]
  },
  ingreso_seguro: {
    id: 'ingreso_seguro',
    name: 'Ingreso Seguro',
    shortName: 'Ingreso Seguro',
    description: 'Protección por desempleo e incapacidad, complementa tu seguridad financiera',
    url: 'https://www.interseguro.pe/ingreso-seguro',
    benefits: [
      'Ingresos mensuales por desempleo',
      'Cobertura de incapacidad temporal',
      'Contribuciones deducibles de impuestos',
      'Sin período de espera prolongado'
    ],
    considerations: [
      'Requiere estar empleado',
      'Límite máximo de cobertura según ingresos',
      'Mejor para independientes y PYMEs'
    ]
  },
  endoso_devolucion: {
    id: 'endoso_devolucion',
    name: 'Endoso con Devolución',
    shortName: 'Endoso Devolución',
    description: 'Ahorro protegido con garantía de devolución de póliza y rendimientos',
    url: 'https://www.interseguro.pe/seguro-de-vida/endoso-con-devolucion',
    benefits: [
      'Devolución garantizada de póliza',
      'Rendimientos asegurados',
      'Sin exposición al riesgo de mercado',
      'Acceso a créditos contra póliza'
    ],
    considerations: [
      'Rendimientos moderados pero seguros',
      'Plazo mínimo recomendado de 5 años',
      'Ideal para ahorro sistemático'
    ]
  },
  seguros_asesoria: {
    id: 'seguros_asesoria',
    name: 'Seguros con Asesoría',
    shortName: 'Seguros Asesoría',
    description: 'Soluciones personalizadas con asesor dedicado y planes a medida',
    url: 'https://www.interseguro.pe/seguros-con-asesoria',
    benefits: [
      'Asesor dedicado personalizado',
      'Planes adaptados a tu situación',
      'Revisión periódica de cobertura',
      'Opciones de inversión flexible'
    ],
    considerations: [
      'Recomendado para montos altos',
      'Requiere consulta inicial',
      'Mejor para perfiles complejos'
    ]
  },
  rumbo: {
    id: 'rumbo',
    name: 'Rumbo',
    shortName: 'Rumbo',
    description: 'Seguro flexible con cobertura modular, pagos a medida de tu presupuesto',
    url: 'https://www.interseguro.pe/seguro-de-vida/rumbo/',
    benefits: [
      'Flexibilidad en cobertura',
      'Primas competitivas',
      'Modificaciones sin penalidad',
      'Perfecto para iniciar'
    ],
    considerations: [
      'Ideal para presupuestos limitados',
      'Cobertura base limitada',
      'Mejor para jóvenes sin dependientes'
    ]
  },
  inversion_segura: {
    id: 'inversion_segura',
    name: 'Inversión Segura',
    shortName: 'Inversión Segura',
    description: 'Producto de inversión con rentabilidad garantizada y capital protegido',
    url: 'https://www.interseguro.pe/inversion-segura/',
    benefits: [
      'Rentabilidad garantizada sin variabilidad',
      'Capital protegido garantizado',
      'Tasa fija predeterminada',
      'Ideal para inversiones conservadoras'
    ],
    considerations: [
      'Rendimientos moderados pero predecibles',
      'Requiere plazo mínimo',
      'No hay exposición a mercados volátiles'
    ]
  }
}

export function calculateRecommendation(data: CalculatorData): Recommendation {
  const scores: Record<string, number> = {
    vida_cash_plus: 0,
    ingreso_seguro: 0,
    endoso_devolucion: 0,
    seguros_asesoria: 0,
    rumbo: 0,
    inversion_segura: 0
  }

  const reasons: Record<string, string[]> = {
    vida_cash_plus: [],
    ingreso_seguro: [],
    endoso_devolucion: [],
    seguros_asesoria: [],
    rumbo: [],
    inversion_segura: []
  }

  // Monto logic
  if (data.monto < 2000) {
    scores.rumbo += 40
    reasons.rumbo.push('Ideal para iniciar con presupuesto limitado')
    scores.vida_cash_plus += 20
    scores.inversion_segura += 15
  } else if (data.monto < 5000) {
    scores.endoso_devolucion += 35
    reasons.endoso_devolucion.push('Monto perfecto para ahorro protegido')
    scores.vida_cash_plus += 30
    scores.inversion_segura += 28
    reasons.inversion_segura.push('Inversión inicial perfecta con rentabilidad garantizada')
    scores.rumbo += 10
  } else if (data.monto < 15000) {
    scores.vida_cash_plus += 35
    reasons.vida_cash_plus.push('Monto adecuado para maximizar rendimientos')
    scores.inversion_segura += 32
    reasons.inversion_segura.push('Capital significativo para inversión con protección garantizada')
    scores.endoso_devolucion += 25
    scores.seguros_asesoria += 15
  } else {
    scores.seguros_asesoria += 40
    reasons.seguros_asesoria.push('Monto significativo merece asesoría personalizada')
    scores.inversion_segura += 35
    reasons.inversion_segura.push('Inversión grande con seguridad y rentabilidad garantizada')
    scores.vida_cash_plus += 30
    scores.endoso_devolucion += 15
  }

  // Plazo logic
  if (data.plazo === '6meses') {
    scores.rumbo += 30
    reasons.rumbo.push('Plazo corto, sin compromisos a largo plazo')
    scores.inversion_segura += 15
    scores.endoso_devolucion -= 10
  } else if (data.plazo === '1año') {
    scores.vida_cash_plus += 20
    scores.inversion_segura += 25
    reasons.inversion_segura.push('Plazo mediano ideal para ver rendimientos garantizados')
    scores.rumbo += 15
    reasons.rumbo.push('Flexibilidad perfecta para mediano plazo')
  } else if (data.plazo === '3años') {
    scores.endoso_devolucion += 25
    reasons.endoso_devolucion.push('Plazo excelente para ver rendimientos seguros')
    scores.inversion_segura += 32
    reasons.inversion_segura.push('Tiempo óptimo para capitalizar rentabilidad garantizada')
    scores.vida_cash_plus += 20
  } else if (data.plazo === '5+años') {
    scores.endoso_devolucion += 35
    reasons.endoso_devolucion.push('Largo plazo maximiza el potencial de devolución')
    scores.inversion_segura += 38
    reasons.inversion_segura.push('Largo plazo maximiza rentabilidad acumulada garantizada')
    scores.vida_cash_plus += 25
    reasons.vida_cash_plus.push('Tiempo suficiente para rendimientos compuestos')
  }

  // Objetivo logic
  if (data.objetivo === 'ahorro') {
    scores.endoso_devolucion += 40
    reasons.endoso_devolucion.push('Devolución garantizada, ideal para ahorro protegido')
    scores.inversion_segura += 38
    reasons.inversion_segura.push('Ahorro seguro con rentabilidad garantizada sin riesgo')
    scores.rumbo += 10
  } else if (data.objetivo === 'protección') {
    scores.vida_cash_plus += 30
    reasons.vida_cash_plus.push('Cobertura completa + protección integral')
    scores.ingreso_seguro += 25
    reasons.ingreso_seguro.push('Cobertura complementaria ante emergencias')
    scores.inversion_segura += 10
  } else if (data.objetivo === 'rentabilidad') {
    scores.vida_cash_plus += 40
    reasons.vida_cash_plus.push('Rendimientos optimizados según perfil de riesgo')
    scores.inversion_segura += 35
    reasons.inversion_segura.push('Rentabilidad garantizada predeterminada')
    if (data.perfil === 'agresivo') {
      scores.vida_cash_plus += 15
      reasons.vida_cash_plus.push('Perfil agresivo + objetivo de rentabilidad = máxima oportunidad')
      scores.inversion_segura -= 5
    } else if (data.perfil === 'conservador') {
      scores.inversion_segura += 15
      reasons.inversion_segura.push('Perfil conservador prefiere rentabilidad garantizada sin riesgo')
    }
  } else if (data.objetivo === 'flexibilidad') {
    scores.rumbo += 35
    reasons.rumbo.push('Cobertura modular y ajustable en cualquier momento')
    scores.vida_cash_plus += 15
    scores.inversion_segura += 5
  }

  // Perfil de riesgo (si existe)
  if (data.perfil) {
    if (data.perfil === 'conservador') {
      scores.endoso_devolucion += 20
      reasons.endoso_devolucion.push('Sin riesgo de mercado, ideal para conservadores')
      scores.rumbo += 5
    } else if (data.perfil === 'moderado') {
      scores.vida_cash_plus += 15
      reasons.vida_cash_plus.push('Balance perfecto entre rendimiento y seguridad')
      scores.endoso_devolucion += 10
    } else if (data.perfil === 'agresivo') {
      scores.vida_cash_plus += 20
      scores.seguros_asesoria += 10
    }
  }

  // Dependientes
  if ((data.dependientes && data.dependientes > 0) || data.objetivo === 'protección') {
    scores.ingreso_seguro += 20
    reasons.ingreso_seguro.push('Protección adicional para dependientes')
    scores.vida_cash_plus += 10
  }

  // Normalize scores to 0-100
  const maxScore = Math.max(...Object.values(scores))
  Object.keys(scores).forEach(key => {
    scores[key] = Math.round((scores[key] / maxScore) * 100)
  })

  // Get sorted products by score
  const sorted = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([productId, score]) => ({
      productId,
      score,
      reasons: reasons[productId] || []
    }))

  const topProduct = sorted[0]
  const topProductObj = PRODUCTS[topProduct.productId]

  if (!topProductObj) {
    throw new Error(`Product not found: ${topProduct.productId}`)
  }

  return {
    product: topProductObj,
    score: topProduct.score,
    reasons: topProduct.reasons.length > 0 
      ? topProduct.reasons 
      : [`Este es el producto que mejor se adapta a tu perfil: ${topProduct.score}% de compatibilidad`],
    alternatives: sorted.slice(1, 3).map(item => ({
      product: PRODUCTS[item.productId],
      score: item.score
    }))
  }
}
