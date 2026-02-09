# 🚀 Engine V4 Standalone

## ✅ Características

- **0 dependencias de V3** - Completamente independiente
- **59% menos código** - De ~437K a ~180K de JavaScript
- **Traducciones inline** - `t.en`, `t.es`, `t.pt`, `t.fr`, `t.de`
- **Features V4.1** - Presets, Compare, Sensitivity, Share URL
- **Lazy Loading** - Secciones cargan al hacer scroll
- **Full Accessibility** - ARIA, skip links, live regions

---

## 📦 Instalación

### Paso 1: Backup del engine actual
```bash
# Hacer backup del V4 actual
mv src/engine/v4 src/engine/v4-backup
```

### Paso 2: Copiar el nuevo V4
```bash
# Extraer el ZIP y copiar
unzip v4-standalone.zip -d src/engine/
mv src/engine/v4-standalone src/engine/v4
```

### Paso 3: Verificar dependencias
El engine usa estos imports externos que ya deberían existir:
- `@/components/Header`
- `@/components/CalculatorSidebar`
- `@/components/ads/AdBlock`
- `@/components/ads/MobileAdContainer`
- `@/components/ads/SideSkyscraperAds`
- `@/lib/currency-helper`
- `next-auth/react`
- `next/navigation`
- `next/link`

### Paso 4: Test
```bash
npm run dev
# Visitar una calculadora V4 para verificar
```

---

## 📁 Estructura

```
engine/v4/
├── CalculatorEngineV4.tsx     # Engine principal (~600 líneas)
├── index.ts                   # Exportaciones
│
├── types/
│   └── engine.types.ts        # Tipos TypeScript
│
├── components/
│   ├── InputCardV4.tsx        # Inputs con currency
│   ├── ResultsCardV4.tsx      # Resultados con tooltips
│   ├── InfoCardV4.tsx         # Cards de info
│   ├── ReferenceGridV4.tsx    # Grid de referencia
│   ├── FAQAccordionV4.tsx     # FAQs con Schema.org
│   ├── ProseSectionV4.tsx     # Secciones de texto
│   ├── ConsiderationsListV4.tsx
│   ├── ExampleSectionV4.tsx
│   ├── SourcesSectionV4.tsx
│   ├── DistributionBarsV4.tsx
│   ├── ModeSelectorV4.tsx
│   ├── MobileResultsBarV4.tsx
│   ├── RatingShareWidgetV4.tsx
│   ├── RelatedCalculatorsV4.tsx
│   ├── ExportUtils.tsx        # PDF/CSV export
│   ├── AnimatedNumber.tsx
│   └── index.ts
│
└── internal-components/
    └── index.tsx              # PresetSelector, ComparePanel, etc.
```

---

## 🔧 Uso

```tsx
// src/app/[locale]/v4/[calculator]/page.tsx

import { CalculatorEngineV4 } from "@/engine/v4";
import { mortgageConfig, calculateMortgage } from "@/config/calculators/v4/mortgage.config";

export default function MortgagePage({ params }: { params: { locale: string } }) {
  return (
    <CalculatorEngineV4
      config={mortgageConfig}
      calculate={calculateMortgage}
      locale={params.locale as "en" | "es" | "pt" | "fr" | "de"}
    />
  );
}
```

---

## 📊 Comparación de Tamaños

| Métrica | V4 Anterior | V4 Standalone |
|---------|-------------|---------------|
| Engine principal | 1,798 líneas | ~600 líneas |
| Total JS | ~437K | ~180K |
| Componentes | 8 propios + 9 de V3 | 17 propios |
| Dependencia V3 | 80% | 0% |

---

## ⚠️ Notas Importantes

1. **El diseño visual es idéntico** - Solo cambia la estructura interna
2. **Las calculadoras V3 existentes siguen funcionando** - No se tocan
3. **Los configs V4 existentes son compatibles** - No requieren cambios

---

## 🐛 Troubleshooting

### Error: Module not found
Verificar que existan:
- `@/lib/currency-helper`
- `@/components/Header`
- `@/components/CalculatorSidebar`

### Error: Type errors
Asegurarse de que los tipos estén actualizados:
```bash
rm -rf .next
npm run dev
```

### Componente no renderiza
Verificar que las traducciones en el config tengan el formato correcto:
```typescript
t: {
  en: {
    inputs: {
      fieldId: { label: "Label" }  // ✅ Correcto
    }
  }
}
```

---

## 🚀 Siguiente Paso: Eliminar V3

Una vez que todas las calculadoras V4 funcionen correctamente:

```bash
# Solo si ya no hay calculadoras V3 activas
rm -rf src/engine/v3
```

**Importante**: Verificar primero que no haya imports de V3 en ningún archivo:
```bash
grep -r "from.*engine/v3" src/
```
