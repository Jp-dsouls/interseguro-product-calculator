# InterSeguro Comparador de Productos

Una web moderna y profesional para comparar y elegir los mejores productos de seguros de InterSeguro. Diseñada con experiencia de usuario intuitiva, paleta de colores corporativa y flujo de recomendación personalizada.

## 🎯 Características Principales

### 1. **Selector de Productos**
- Grid responsivo con 7 productos de InterSeguro
- Iconos coloridos y descriptivos para cada producto
- Información clara y concisa
- Sección de beneficios corporativos

### 2. **Formularios Dinámicos Contextuales**
Cada producto tiene campos específicos:
- **SOAT Digital**: Placa, marca, año, uso del vehículo
- **Vida Cash Plus**: Edad, género, monto de cobertura
- **Ingreso Seguro**: Edad, profesión, ingreso mensual
- **Seguros Viajes**: Destino, duración, cantidad de personas
- **Endoso Devolución**: Edad, plazo, monto mensual
- **Seguros Asesoría**: Tipo de seguro, datos de contacto
- **Rumbo**: Edad, estado civil, beneficiarios

### 3. **Sistema de Recomendaciones**
- Análisis basado en datos ingresados
- Recomendación personalizada por producto
- Descripción de beneficios y coberturas
- Consideraciones importantes
- Precios estimados
- CTAs directos a InterSeguro

### 4. **Diseño Responsivo**
- Optimizado para desktop, tablet y móvil
- Paleta corporativa de InterSeguro (#003B87 azul principal)
- Interfaz limpia y moderna
- Animaciones suaves y transiciones

## 🎨 Paleta de Colores

```css
--primary: #003B87         /* Azul corporativo InterSeguro */
--secondary: #0055c1       /* Azul complementario */
--accent: #ffc107          /* Amarillo dorado */
--background: #ffffff      /* Blanco */
--foreground: #1a1a1a      /* Texto oscuro */
--muted: #e9ecef           /* Gris claro */
```

## 📦 Productos Incluidos

1. **SOAT Digital** - Seguro vehicular 100% digital
2. **Vida Cash Plus** - Seguro de vida con rendimientos
3. **Ingreso Seguro** - Protección ante desempleo
4. **Seguros Viajes** - Cobertura completa internacional
5. **Endoso Devolución** - Ahorro protegido con devolución
6. **Seguros Asesoría** - Soluciones personalizadas
7. **Rumbo** - Seguro de vida flexible

## 🚀 Flujo de Uso

```
1. Usuario accede a la página principal
   ↓
2. Ve grid de 7 productos con descripción
   ↓
3. Selecciona un producto de interés
   ↓
4. Completa formulario contextual (3-4 campos)
   ↓
5. Recibe recomendación personalizada
   ↓
6. Puede hacer clic en CTA para contratar
   ↓
7. O volver para comparar otros productos
```

## 💻 Tecnologías Utilizadas

- **Frontend**: Next.js 16 + React 19
- **Estilos**: Tailwind CSS v4 + Diseño tokens
- **Componentes**: shadcn/ui + Lucide Icons
- **Iconografía**: Lucide React (19 iconos)
- **TypeScript**: Para type-safety

## 📱 Componentes

### `ProductSelector`
Página principal con grid de productos y hero section

### `ProductForm`
Formulario dinámico que se adapta al producto seleccionado

### `RecommendationResult`
Página de resultado con recomendación personalizada

## 🎯 UX Highlights

✅ **Navegación intuitiva** - Flujo claro: Ver → Seleccionar → Completar → Recibir
✅ **Validación en tiempo real** - Mensajes de error claros
✅ **Indicadores de progreso** - Barra de progreso en formulario
✅ **Recomendaciones contextuales** - Datos relevantes por producto
✅ **CTAs prominentes** - Botones call-to-action visibles
✅ **Información transparente** - Beneficios y consideraciones claras
✅ **Navegación sin fricción** - Opción de volver/reiniciar en cada paso

## 📊 Información Mostrada en Recomendación

Cada recomendación incluye:
- Título personalizado
- Descripción de la recomendación
- Precio estimado
- 5+ Beneficios principales
- Consideraciones importantes
- Botón para contratar (con link a InterSeguro)
- Opción de contacto directo
- Enlace para explorar otros productos

## 🔗 Enlaces Integrados

Todos los botones de "Contratar" dirigen a los productos reales de InterSeguro:
- soat-digital → https://www.interseguro.pe/soat-digital/
- vida-cash-plus → https://www.interseguro.pe/seguro-de-vida/vida-cash-plus
- Y así sucesivamente para cada producto

## 📈 Mejoras Implementadas vs ComparaBien

✨ **Formularios contextuales** en lugar de genéricos
✨ **Recomendación personalizada** basada en datos
✨ **Animaciones modernas** y transiciones suaves
✨ **Paleta corporativa** de InterSeguro
✨ **Mejor accesibilidad** con semántica HTML
✨ **Indicadores de progreso** visuales
✨ **Validación mejorada** de formularios
✨ **Diseño responsivo** optimizado

## 🎬 Versiones Verificadas

✓ Desktop (1920x1080) - Completamente responsivo
✓ Tablet (768x1024) - Optimizado
✓ Móvil (375x667) - Perfecto flujo

## 📝 Notas de Implementación

- Componentes reutilizables y modulares
- Estado manejado con React hooks
- Validación de formularios integrada
- Manejo de errores amigable
- Sin dependencias externas innecesarias
- Código TypeScript strictly typed
- Optimizado para performance
- SEO metadata actualizado

## 🚢 Deploy

Listo para desplegar en Vercel:
```bash
npm run build
npm run start
```

O usar Vercel CLI para deploy automático.

## 📧 Contacto y Soporte

Para preguntas sobre los productos, la página indica:
"¿Preguntas adicionales? Nuestro equipo de atención está disponible de lunes a viernes de 8am a 6pm"

---

**Desarrollado con experiencia de 10 años en diseño UX/UI y desarrollo web moderno.**
