# Guía de Personalización - InterSeguro Comparador

Este documento te guía a través de cómo personalizar la aplicación según tus necesidades.

## 🎨 Cambiar Paleta de Colores

Edita `/app/globals.css` en la sección `:root`:

```css
:root {
  --primary: #003B87         /* Azul corporativo - CAMBIA AQUÍ */
  --secondary: #0055c1       /* Azul complementario */
  --accent: #ffc107          /* Amarillo dorado */
  --background: #ffffff      /* Blanco */
  --foreground: #1a1a1a      /* Texto oscuro */
  /* ... más colores ... */
}
```

### Ejemplos de combinaciones corporativas:
- **Profesional**: `#003B87` (azul), `#0055c1` (azul claro), `#ffc107` (oro)
- **Moderno**: `#1e40af` (azul), `#3b82f6` (azul claro), `#06b6d4` (cyan)
- **Energético**: `#d97706` (naranja), `#f59e0b` (naranja claro), `#059669` (verde)

## 📝 Agregar o Modificar Productos

Edita `/components/product-selector.tsx`:

```typescript
const products: Product[] = [
  {
    id: 'tu-producto-id',
    name: 'Nombre del Producto',
    description: 'Descripción corta',
    icon: <TuIcono className="w-8 h-8" />,
    color: 'from-blue-600 to-blue-800',  // Gradient Tailwind
    url: 'https://enlace-producto.pe/',
  },
  // ... más productos
]
```

**Iconos disponibles** (de Lucide React):
- `Car` - Vehículos
- `Heart` - Salud/Vida
- `DollarSign` - Dinero
- `Plane` - Viajes
- `TrendingUp` - Inversión
- `Briefcase` - Negocios
- `Shield` - Protección
- Y muchos más...

## 📋 Personalizar Formularios

Edita `/components/product-form.tsx` en `formConfigs`:

```typescript
'tu-producto': [
  { 
    name: 'edad', 
    label: 'Tu edad', 
    type: 'number', 
    placeholder: '25',
    required: true 
  },
  { 
    name: 'tipo', 
    label: 'Tipo de cobertura', 
    type: 'select',
    required: true,
    options: [
      { value: 'basico', label: 'Básico' },
      { value: 'premium', label: 'Premium' },
    ]
  },
]
```

### Tipos de campo soportados:
- `text` - Texto normal
- `number` - Números
- `date` - Fechas
- `select` - Desplegable
- `radio` - Botones de radio

## 💬 Cambiar Recomendaciones

Edita `/components/recommendation-result.tsx` en `recommendations`:

```typescript
const recommendations: Record<string, RecommendationDetail> = {
  'tu-producto': {
    title: 'Título de la recomendación',
    description: 'Descripción del análisis',
    benefits: [
      'Beneficio 1',
      'Beneficio 2',
      'Beneficio 3',
    ],
    considerations: [
      'Consideración importante',
    ],
    priceEstimate: 'Desde S/ XXX mensuales',
    url: 'https://enlace-contratacion.pe/',
    cta: 'Texto del botón CTA',
  },
}
```

## 🎯 Modificar Texto Principal

### Hero Section
Archivo: `/components/product-selector.tsx`
```typescript
// Línea ~88
<h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
  Tu Título Aquí  {/* CAMBIA AQUÍ */}
</h1>
<p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
  Tu descripción aquí  {/* CAMBIA AQUÍ */}
</p>
```

### Nombre de Página
Archivo: `/app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: 'Nuevo Título - Subtítulo',  {/* CAMBIA AQUÍ */}
  description: 'Nueva descripción SEO',  {/* CAMBIA AQUÍ */}
}
```

## 📱 Ajustar Estilos Responsive

Tailwind utiliza breakpoints:
- `sm:` - 640px (teléfono grande)
- `md:` - 768px (tablet)
- `lg:` - 1024px (desktop pequeño)
- `xl:` - 1280px (desktop)
- `2xl:` - 1536px (desktop grande)

Ejemplo:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* 1 columna móvil, 2 tablet, 4 desktop */}
</div>
```

## 🔗 Actualizar Enlaces

### Enlaces de Contratación
Edita en `/components/recommendation-result.tsx`:
```typescript
url: 'https://nuevo-enlace-producto.pe/'
```

### Enlaces de Productos
Edita en `/components/product-selector.tsx`:
```typescript
url: 'https://nuevo-enlace.pe/'
```

## 🔤 Cambiar Fuentes

Edita `/app/layout.tsx`:
```typescript
import { Geist, Geist_Mono, YourFont } from 'next/font/google'

const _yourFont = YourFont({ 
  subsets: ['latin'],
  weight: ['400', '700'], 
})
```

Luego en `/app/globals.css`:
```css
@theme inline {
  --font-sans: 'Your Font', 'Fallback';
}
```

## 🎬 Agregar Animaciones

En `/app/globals.css`, puedes agregar animaciones personalizadas:
```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideInUp 0.3s ease-out;
}
```

## 📊 Datos Dinámicos

### Para integrar con base de datos
Crea un archivo `lib/products.ts`:
```typescript
export async function getProducts() {
  // Obtener de API o base de datos
  return fetch('tu-api.com/products');
}
```

Luego usa en `ProductSelector`:
```typescript
const products = await getProducts();
```

## 🧪 Testing

### Verificar en diferentes tamaños
```bash
# Desktop
agent-browser set viewport 1920 1080

# Tablet
agent-browser set viewport 768 1024

# Mobile
agent-browser set viewport 375 667
```

## 🚀 Variables de Entorno

Crea `.env.local`:
```
NEXT_PUBLIC_INTERSEGURO_API=https://api.interseguro.pe
NEXT_PUBLIC_GA_ID=tu-google-analytics-id
```

Úsalas en componentes:
```typescript
const API_URL = process.env.NEXT_PUBLIC_INTERSEGURO_API;
```

## 📦 Agregar Nuevas Dependencias

```bash
npm install nueva-libreria
# o
pnpm add nueva-libreria
```

## 🔍 Debugging

Agrega logs en componentes:
```typescript
console.log('[v0] Datos del formulario:', formData);
```

Usa React DevTools:
```bash
agent-browser open --enable react-devtools "http://localhost:3000"
```

## 🎨 Ajustar Espaciado

Tailwind spacing scale (4px base):
- `p-4` = 16px (padding)
- `m-8` = 32px (margin)
- `gap-6` = 24px (gap)
- `py-12` = 48px (padding vertical)

## ✅ Checklist de Personalización

- [ ] Cambié colores corporativos
- [ ] Agregué/modifiqué productos
- [ ] Personalizé formularios
- [ ] Actualicé recomendaciones
- [ ] Cambié enlaces de contratación
- [ ] Actualicé metadata (SEO)
- [ ] Probé en móvil, tablet y desktop
- [ ] Verifiqué formularios funcionan
- [ ] Testeé flujo completo
- [ ] Agregué contenido específico de región

## 📞 Soporte

Para preguntas sobre Tailwind CSS: https://tailwindcss.com
Para iconos Lucide: https://lucide.dev
Para componentes React: https://react.dev
Para Next.js: https://nextjs.org

---

**Recuerda**: Después de hacer cambios, reinicia el servidor con `npm run dev`
