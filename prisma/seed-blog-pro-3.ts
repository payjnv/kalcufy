import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  // ========================================
  // POST 11: IDEAL WEIGHT CALCULATOR
  // ========================================
  {
    slugEn: "ideal-weight-calculator-guide",
    slugEs: "guia-calculadora-peso-ideal",
    slugPt: "guia-calculadora-peso-ideal",
    
    titleEn: "Ideal Weight Calculator: Find Your Healthy Weight Range",
    titleEs: "Calculadora de Peso Ideal: Encuentra Tu Rango de Peso Saludable",
    titlePt: "Calculadora de Peso Ideal: Encontre Sua Faixa de Peso Saudável",
    
    excerptEn: "Calculate your ideal weight using multiple scientific formulas. Understand what a healthy weight looks like for your height, age, and body type.",
    excerptEs: "Calcula tu peso ideal usando múltiples fórmulas científicas. Entiende cómo es un peso saludable para tu altura, edad y tipo de cuerpo.",
    excerptPt: "Calcule seu peso ideal usando múltiplas fórmulas científicas. Entenda como é um peso saudável para sua altura, idade e tipo de corpo.",
    
    contentEn: `There is no single "ideal weight" - it varies based on height, body composition, and individual factors. Our calculator uses multiple formulas to give you a healthy weight range.

Use our [Ideal Weight Calculator](/en/ideal-weight-calculator) to find your personalized range.

## How Ideal Weight Is Calculated

Several formulas estimate ideal weight based on height:

### Common Formulas

**Devine Formula (commonly used for medication dosing)**
- Men: 50 kg + 2.3 kg per inch over 5 feet
- Women: 45.5 kg + 2.3 kg per inch over 5 feet

**Robinson Formula**
- Men: 52 kg + 1.9 kg per inch over 5 feet
- Women: 49 kg + 1.7 kg per inch over 5 feet

**Miller Formula**
- Men: 56.2 kg + 1.41 kg per inch over 5 feet
- Women: 53.1 kg + 1.36 kg per inch over 5 feet

### Example Calculation

For a 5'8" (173 cm) man:

| Formula | Ideal Weight |
|---------|--------------|
| Devine | 72.6 kg (160 lbs) |
| Robinson | 67.2 kg (148 lbs) |
| Miller | 67.5 kg (149 lbs) |
| **Range** | **67-73 kg (148-160 lbs)** |

## How to Interpret Your Results

The calculator shows:

- **Multiple Formula Results**: Different estimates from validated formulas
- **Healthy Range**: A span rather than a single number
- **BMI Comparison**: How your current weight compares to BMI guidelines

Use the range as a guide, not an absolute target.

## Important Limitations

Ideal weight formulas do NOT account for:

- **Muscle Mass**: Athletes may weigh more due to muscle
- **Body Frame**: Small vs large frame affects ideal weight
- **Age**: Body composition changes with age
- **Ethnicity**: Health risks vary across populations
- **Individual Health**: Your optimal weight depends on many factors

*These are estimates. Consult a healthcare provider for personalized advice.*

## Frequently Asked Questions

### Which ideal weight formula is most accurate?

No formula is universally accurate. The range from multiple formulas is more useful than any single number.

### Is ideal weight the same as healthy weight?

Not exactly. Ideal weight formulas are estimates. A "healthy weight" considers overall health markers, not just a number.

### Can I be healthy above my ideal weight?

Yes. Health depends on many factors including fitness level, body composition, blood markers, and lifestyle habits.

### How often should I check my ideal weight?

The formulas don't change, but checking periodically (every few months) can help track progress toward goals.

## Related Calculators

- [BMI Calculator](/en/bmi-calculator) - Body mass index
- [Body Fat Calculator](/en/body-fat-calculator) - Body composition
- [Calorie Calculator](/en/calorie-calculator) - Daily calorie needs`,

    contentEs: `No existe un único "peso ideal" - varía según la altura, composición corporal y factores individuales. Nuestra calculadora usa múltiples fórmulas para darte un rango de peso saludable.

Usa nuestra [Calculadora de Peso Ideal](/es/ideal-weight-calculator) para encontrar tu rango personalizado.

## Cómo se Calcula el Peso Ideal

Varias fórmulas estiman el peso ideal basado en la altura:

### Fórmulas Comunes

**Fórmula de Devine (comúnmente usada para dosificación de medicamentos)**
- Hombres: 50 kg + 2.3 kg por pulgada sobre 5 pies
- Mujeres: 45.5 kg + 2.3 kg por pulgada sobre 5 pies

**Fórmula de Robinson**
- Hombres: 52 kg + 1.9 kg por pulgada sobre 5 pies
- Mujeres: 49 kg + 1.7 kg por pulgada sobre 5 pies

### Ejemplo de Cálculo

Para un hombre de 1.73 m:

| Fórmula | Peso Ideal |
|---------|------------|
| Devine | 72.6 kg |
| Robinson | 67.2 kg |
| Miller | 67.5 kg |
| **Rango** | **67-73 kg** |

## Cómo Interpretar los Resultados

La calculadora muestra:

- **Resultados de Múltiples Fórmulas**: Diferentes estimaciones de fórmulas validadas
- **Rango Saludable**: Un rango en lugar de un solo número
- **Comparación con IMC**: Cómo tu peso actual se compara con las guías de IMC

Usa el rango como guía, no como objetivo absoluto.

## Limitaciones Importantes

Las fórmulas de peso ideal NO consideran:

- **Masa Muscular**: Los atletas pueden pesar más debido al músculo
- **Complexión Corporal**: Complexión pequeña vs grande afecta el peso ideal
- **Edad**: La composición corporal cambia con la edad

*Estas son estimaciones. Consulta a un profesional de salud para consejos personalizados.*

## Preguntas Frecuentes

### ¿Qué fórmula de peso ideal es más precisa?

Ninguna fórmula es universalmente precisa. El rango de múltiples fórmulas es más útil que cualquier número único.

### ¿El peso ideal es lo mismo que peso saludable?

No exactamente. Las fórmulas de peso ideal son estimaciones. Un "peso saludable" considera marcadores de salud general.

### ¿Puedo estar saludable por encima de mi peso ideal?

Sí. La salud depende de muchos factores incluyendo nivel de fitness, composición corporal y hábitos de vida.

## Calculadoras Relacionadas

- [Calculadora de IMC](/es/bmi-calculator)
- [Calculadora de Grasa Corporal](/es/body-fat-calculator)
- [Calculadora de Calorías](/es/calorie-calculator)`,

    contentPt: `Não existe um único "peso ideal" - ele varia com base na altura, composição corporal e fatores individuais. Nossa calculadora usa múltiplas fórmulas para dar uma faixa de peso saudável.

Use nossa [Calculadora de Peso Ideal](/pt/ideal-weight-calculator) para encontrar sua faixa personalizada.

## Como o Peso Ideal É Calculado

Várias fórmulas estimam o peso ideal com base na altura:

### Fórmulas Comuns

**Fórmula de Devine (comumente usada para dosagem de medicamentos)**
- Homens: 50 kg + 2.3 kg por polegada acima de 5 pés
- Mulheres: 45.5 kg + 2.3 kg por polegada acima de 5 pés

**Fórmula de Robinson**
- Homens: 52 kg + 1.9 kg por polegada acima de 5 pés
- Mulheres: 49 kg + 1.7 kg por polegada acima de 5 pés

### Exemplo de Cálculo

Para um homem de 1,73 m:

| Fórmula | Peso Ideal |
|---------|------------|
| Devine | 72,6 kg |
| Robinson | 67,2 kg |
| Miller | 67,5 kg |
| **Faixa** | **67-73 kg** |

## Como Interpretar os Resultados

A calculadora mostra:

- **Resultados de Múltiplas Fórmulas**: Diferentes estimativas de fórmulas validadas
- **Faixa Saudável**: Uma faixa em vez de um único número

Use a faixa como guia, não como meta absoluta.

## Limitações Importantes

Fórmulas de peso ideal NÃO consideram:

- **Massa Muscular**: Atletas podem pesar mais devido ao músculo
- **Estrutura Corporal**: Estrutura pequena vs grande afeta o peso ideal
- **Idade**: A composição corporal muda com a idade

*Estas são estimativas. Consulte um profissional de saúde para aconselhamento personalizado.*

## Perguntas Frequentes

### Qual fórmula de peso ideal é mais precisa?

Nenhuma fórmula é universalmente precisa. A faixa de múltiplas fórmulas é mais útil que qualquer número único.

### Peso ideal é o mesmo que peso saudável?

Não exatamente. Fórmulas de peso ideal são estimativas. Um "peso saudável" considera marcadores de saúde geral.

## Calculadoras Relacionadas

- [Calculadora de IMC](/pt/bmi-calculator)
- [Calculadora de Gordura Corporal](/pt/body-fat-calculator)
- [Calculadora de Calorias](/pt/calorie-calculator)`,

    featuredImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop",
    relatedCalculator: "ideal-weight-calculator",
    tags: ["ideal-weight", "health", "fitness", "weight"],
    category: "health",
    readingTime: 7,
  },

  // ========================================
  // POST 12: CREDIT CARD PAYOFF
  // ========================================
  {
    slugEn: "credit-card-payoff-calculator-guide",
    slugEs: "guia-calculadora-pago-tarjeta-credito",
    slugPt: "guia-calculadora-pagamento-cartao-credito",
    
    titleEn: "Credit Card Payoff Calculator: Get Out of Debt Faster",
    titleEs: "Calculadora de Pago de Tarjeta: Sal de Deudas Más Rápido",
    titlePt: "Calculadora de Pagamento de Cartão: Saia das Dívidas Mais Rápido",
    
    excerptEn: "Calculate how long it will take to pay off your credit card and how much interest you will pay. See how extra payments can save you thousands.",
    excerptEs: "Calcula cuánto tiempo tomará pagar tu tarjeta de crédito y cuánto interés pagarás. Ve cómo pagos extra pueden ahorrarte miles.",
    excerptPt: "Calcule quanto tempo levará para pagar seu cartão de crédito e quantos juros você pagará. Veja como pagamentos extras podem economizar milhares.",
    
    contentEn: `Credit card debt can feel overwhelming, but with a clear plan, you can become debt-free faster than you think. Understanding your payoff timeline is the first step.

Use our [Credit Card Payoff Calculator](/en/credit-card-payoff-calculator) to create your debt elimination plan.

## How Credit Card Payoff Is Calculated

Credit card interest compounds daily, making it harder to pay down than simple loans.

### Key Variables

- **Balance**: Current amount owed
- **APR**: Annual percentage rate
- **Monthly Payment**: What you pay each month
- **Minimum Payment**: Usually 1-3% of balance

### Example Calculation

$5,000 balance at 19.99% APR:

| Payment | Time to Payoff | Total Interest |
|---------|----------------|----------------|
| Minimum (~$100) | 9 years | $4,311 |
| $150/month | 4 years | $1,842 |
| $250/month | 2 years | $968 |
| $500/month | 11 months | $459 |

Paying double the minimum saves over $3,000 and 7 years.

## Payoff Strategies

### Avalanche Method (save most money)
Pay minimums on all cards, put extra toward highest APR first.

### Snowball Method (psychological wins)
Pay minimums on all cards, put extra toward smallest balance first.

### Balance Transfer
Move debt to 0% APR card and pay aggressively during promotional period.

## How to Interpret Your Results

The calculator shows:

- **Payoff Date**: When you will be debt-free
- **Total Interest**: Cost of carrying the debt
- **Interest Savings**: What you save with higher payments
- **Monthly Schedule**: How balance decreases over time

Even small payment increases make a significant difference.

## Important Considerations

- **Minimum Payments**: Barely cover interest; avoid paying only minimums
- **Promotional Rates**: 0% APR offers end; have a payoff plan
- **Credit Score Impact**: High utilization hurts your score
- **Emergency Fund First**: Have $1,000 saved before aggressive debt payoff

*This calculator provides estimates. Contact your card issuer for exact payoff amounts.*

## Frequently Asked Questions

### Should I pay off credit cards or save?

Build a small emergency fund ($1,000) first, then attack credit card debt aggressively. The interest rate on cards usually exceeds savings rates.

### Does paying more than minimum hurt my credit?

No. Paying more than minimum helps your credit by reducing utilization and showing responsible behavior.

### Should I close cards after paying them off?

Usually no. Closing cards reduces available credit and can hurt your score. Keep them open with zero balance.

### Is debt consolidation a good idea?

It can be, if you get a lower rate AND commit to not adding new debt. Otherwise, you may end up with more debt.

## Related Calculators

- [Loan Calculator](/en/loan-calculator) - Personal loan options
- [Budget Calculator](/en/budget-calculator) - Find extra money for payments
- [Savings Calculator](/en/savings-calculator) - Post-debt savings goals`,

    contentEs: `La deuda de tarjeta de crédito puede sentirse abrumadora, pero con un plan claro, puedes liberarte de deudas más rápido de lo que piensas.

Usa nuestra [Calculadora de Pago de Tarjeta de Crédito](/es/credit-card-payoff-calculator) para crear tu plan de eliminación de deudas.

## Cómo se Calcula el Pago de Tarjeta de Crédito

El interés de tarjeta de crédito se capitaliza diariamente, haciéndolo más difícil de pagar que préstamos simples.

### Variables Clave

- **Saldo**: Monto actual adeudado
- **APR**: Tasa de porcentaje anual
- **Pago Mensual**: Lo que pagas cada mes
- **Pago Mínimo**: Usualmente 1-3% del saldo

### Ejemplo de Cálculo

Saldo de $5,000 al 19.99% APR:

| Pago | Tiempo para Pagar | Interés Total |
|------|-------------------|---------------|
| Mínimo (~$100) | 9 años | $4,311 |
| $150/mes | 4 años | $1,842 |
| $250/mes | 2 años | $968 |
| $500/mes | 11 meses | $459 |

Pagar el doble del mínimo ahorra más de $3,000 y 7 años.

## Estrategias de Pago

### Método Avalancha (ahorra más dinero)
Paga mínimos en todas las tarjetas, pon extra hacia el APR más alto primero.

### Método Bola de Nieve (victorias psicológicas)
Paga mínimos en todas las tarjetas, pon extra hacia el saldo más pequeño primero.

### Transferencia de Saldo
Mueve la deuda a tarjeta con 0% APR y paga agresivamente durante el período promocional.

## Cómo Interpretar los Resultados

La calculadora muestra:

- **Fecha de Pago**: Cuándo estarás libre de deudas
- **Interés Total**: Costo de mantener la deuda
- **Ahorro en Interés**: Lo que ahorras con pagos más altos

Incluso pequeños aumentos en el pago hacen una diferencia significativa.

## Consideraciones Importantes

- **Pagos Mínimos**: Apenas cubren el interés; evita pagar solo mínimos
- **Tasas Promocionales**: Las ofertas de 0% APR terminan; ten un plan de pago
- **Impacto en Crédito**: Alta utilización daña tu puntaje

*Esta calculadora proporciona estimaciones. Contacta a tu emisor de tarjeta para montos exactos.*

## Preguntas Frecuentes

### ¿Debo pagar tarjetas de crédito o ahorrar?

Construye un pequeño fondo de emergencia ($1,000) primero, luego ataca la deuda de tarjeta agresivamente.

### ¿Pagar más del mínimo daña mi crédito?

No. Pagar más del mínimo ayuda tu crédito al reducir utilización y mostrar comportamiento responsable.

### ¿Debo cerrar tarjetas después de pagarlas?

Usualmente no. Cerrar tarjetas reduce el crédito disponible y puede dañar tu puntaje.

## Calculadoras Relacionadas

- [Calculadora de Préstamos](/es/loan-calculator)
- [Calculadora de Presupuesto](/es/budget-calculator)
- [Calculadora de Ahorros](/es/savings-calculator)`,

    contentPt: `A dívida de cartão de crédito pode parecer esmagadora, mas com um plano claro, você pode se livrar das dívidas mais rápido do que pensa.

Use nossa [Calculadora de Pagamento de Cartão de Crédito](/pt/credit-card-payoff-calculator) para criar seu plano de eliminação de dívidas.

## Como o Pagamento de Cartão de Crédito É Calculado

Os juros do cartão de crédito são compostos diariamente, tornando mais difícil de pagar do que empréstimos simples.

### Variáveis Chave

- **Saldo**: Valor atual devido
- **Taxa Anual**: Taxa de juros anual
- **Pagamento Mensal**: O que você paga cada mês
- **Pagamento Mínimo**: Geralmente 1-3% do saldo

### Exemplo de Cálculo

Saldo de R$5.000 a 19,99% ao ano:

| Pagamento | Tempo para Pagar | Juros Totais |
|-----------|------------------|--------------|
| Mínimo (~R$100) | 9 anos | R$4.311 |
| R$150/mês | 4 anos | R$1.842 |
| R$250/mês | 2 anos | R$968 |
| R$500/mês | 11 meses | R$459 |

Pagar o dobro do mínimo economiza mais de R$3.000 e 7 anos.

## Estratégias de Pagamento

### Método Avalanche (economiza mais dinheiro)
Pague mínimos em todos os cartões, coloque extra no maior juros primeiro.

### Método Bola de Neve (vitórias psicológicas)
Pague mínimos em todos os cartões, coloque extra no menor saldo primeiro.

## Como Interpretar os Resultados

A calculadora mostra:

- **Data de Quitação**: Quando você estará livre de dívidas
- **Juros Totais**: Custo de manter a dívida
- **Economia de Juros**: O que você economiza com pagamentos maiores

Mesmo pequenos aumentos no pagamento fazem uma diferença significativa.

## Considerações Importantes

- **Pagamentos Mínimos**: Mal cobrem os juros; evite pagar apenas mínimos
- **Taxas Promocionais**: Ofertas de 0% terminam; tenha um plano de pagamento

*Esta calculadora fornece estimativas. Contate sua operadora para valores exatos.*

## Perguntas Frequentes

### Devo pagar cartões de crédito ou poupar?

Construa um pequeno fundo de emergência (R$1.000) primeiro, depois ataque a dívida de cartão agressivamente.

### Pagar mais que o mínimo prejudica meu crédito?

Não. Pagar mais que o mínimo ajuda seu crédito ao reduzir utilização.

## Calculadoras Relacionadas

- [Calculadora de Empréstimos](/pt/loan-calculator)
- [Calculadora de Orçamento](/pt/budget-calculator)
- [Calculadora de Poupança](/pt/savings-calculator)`,

    featuredImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop",
    relatedCalculator: "credit-card-payoff-calculator",
    tags: ["credit-card", "debt", "payoff", "finance"],
    category: "finance",
    readingTime: 8,
  },

  // ========================================
  // POST 13: BODY FAT CALCULATOR
  // ========================================
  {
    slugEn: "body-fat-calculator-guide",
    slugEs: "guia-calculadora-grasa-corporal",
    slugPt: "guia-calculadora-gordura-corporal",
    
    titleEn: "Body Fat Calculator: Estimate Your Body Composition",
    titleEs: "Calculadora de Grasa Corporal: Estima Tu Composición Corporal",
    titlePt: "Calculadora de Gordura Corporal: Estime Sua Composição Corporal",
    
    excerptEn: "Estimate your body fat percentage using measurements. Understand what the numbers mean for your health and fitness goals.",
    excerptEs: "Estima tu porcentaje de grasa corporal usando medidas. Entiende qué significan los números para tu salud y metas de fitness.",
    excerptPt: "Estime sua porcentagem de gordura corporal usando medidas. Entenda o que os números significam para sua saúde e metas de fitness.",
    
    contentEn: `Body fat percentage is a better indicator of health and fitness than weight alone. It tells you how much of your body is fat versus lean mass.

Use our [Body Fat Calculator](/en/body-fat-calculator) to estimate your body composition.

## How Body Fat Is Estimated

Our calculator uses the U.S. Navy method, which estimates body fat from measurements.

### Measurements Needed

**Men**: Waist (at navel), Neck, Height
**Women**: Waist, Hip, Neck, Height

### The Navy Method Formula

**Men**: 86.010 × log10(waist - neck) - 70.041 × log10(height) + 36.76

**Women**: 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387

### Body Fat Categories

| Category | Men | Women |
|----------|-----|-------|
| Essential Fat | 2-5% | 10-13% |
| Athletes | 6-13% | 14-20% |
| Fitness | 14-17% | 21-24% |
| Average | 18-24% | 25-31% |
| Obese | 25%+ | 32%+ |

Women naturally carry more essential fat for reproductive health.

## How to Interpret Your Results

The calculator shows:

- **Body Fat Percentage**: Estimated fat mass
- **Category**: Where you fall on the scale
- **Fat Mass**: Pounds/kg of body fat
- **Lean Mass**: Muscle, bone, water weight

Focus on trends over time rather than single measurements.

## Important Considerations

- **Measurement Accuracy**: Results depend on consistent, accurate measurements
- **Estimation Only**: Navy method has ~3-4% margin of error
- **More Accurate Methods**: DEXA scan, hydrostatic weighing, or bod pod
- **Individual Variation**: Healthy body fat varies by individual

*This is an estimate. For accurate body composition, consult a fitness professional.*

## Frequently Asked Questions

### How accurate is the Navy method?

The Navy method is reasonably accurate (~3-4% error) when measurements are taken correctly. It is less accurate for very lean or very overweight individuals.

### What is a healthy body fat percentage?

For men: 10-20%. For women: 18-28%. Athletes may be lower. "Healthy" depends on individual factors and goals.

### Can I lose fat without losing weight?

Yes. Through strength training and proper nutrition, you can lose fat while gaining muscle, keeping weight stable but improving body composition.

### How often should I check body fat?

Every 4-6 weeks is reasonable. Body composition changes slowly, and daily fluctuations in measurements can be misleading.

## Related Calculators

- [BMI Calculator](/en/bmi-calculator) - Body mass index
- [Ideal Weight Calculator](/en/ideal-weight-calculator) - Weight ranges
- [TDEE Calculator](/en/tdee-calculator) - Daily calorie burn`,

    contentEs: `El porcentaje de grasa corporal es un mejor indicador de salud y fitness que solo el peso. Te dice cuánto de tu cuerpo es grasa versus masa magra.

Usa nuestra [Calculadora de Grasa Corporal](/es/body-fat-calculator) para estimar tu composición corporal.

## Cómo se Estima la Grasa Corporal

Nuestra calculadora usa el método de la Marina de EE.UU., que estima la grasa corporal a partir de medidas.

### Medidas Necesarias

**Hombres**: Cintura (en el ombligo), Cuello, Altura
**Mujeres**: Cintura, Cadera, Cuello, Altura

### Categorías de Grasa Corporal

| Categoría | Hombres | Mujeres |
|-----------|---------|---------|
| Grasa Esencial | 2-5% | 10-13% |
| Atletas | 6-13% | 14-20% |
| Fitness | 14-17% | 21-24% |
| Promedio | 18-24% | 25-31% |
| Obeso | 25%+ | 32%+ |

Las mujeres naturalmente tienen más grasa esencial para la salud reproductiva.

## Cómo Interpretar los Resultados

La calculadora muestra:

- **Porcentaje de Grasa Corporal**: Masa de grasa estimada
- **Categoría**: Dónde caes en la escala
- **Masa Grasa**: Libras/kg de grasa corporal
- **Masa Magra**: Músculo, hueso, peso de agua

Enfócate en tendencias a lo largo del tiempo en lugar de mediciones individuales.

## Consideraciones Importantes

- **Precisión de Medidas**: Los resultados dependen de medidas consistentes y precisas
- **Solo Estimación**: El método Navy tiene ~3-4% de margen de error
- **Métodos Más Precisos**: Escaneo DEXA, pesaje hidrostático

*Esta es una estimación. Para composición corporal precisa, consulta a un profesional.*

## Preguntas Frecuentes

### ¿Qué tan preciso es el método Navy?

El método Navy es razonablemente preciso (~3-4% de error) cuando las medidas se toman correctamente.

### ¿Cuál es un porcentaje de grasa corporal saludable?

Para hombres: 10-20%. Para mujeres: 18-28%. Los atletas pueden ser más bajos.

### ¿Puedo perder grasa sin perder peso?

Sí. A través del entrenamiento de fuerza y nutrición adecuada, puedes perder grasa mientras ganas músculo.

## Calculadoras Relacionadas

- [Calculadora de IMC](/es/bmi-calculator)
- [Calculadora de Peso Ideal](/es/ideal-weight-calculator)
- [Calculadora TDEE](/es/tdee-calculator)`,

    contentPt: `A porcentagem de gordura corporal é um melhor indicador de saúde e fitness do que apenas o peso. Ela diz quanto do seu corpo é gordura versus massa magra.

Use nossa [Calculadora de Gordura Corporal](/pt/body-fat-calculator) para estimar sua composição corporal.

## Como a Gordura Corporal É Estimada

Nossa calculadora usa o método da Marinha dos EUA, que estima a gordura corporal a partir de medidas.

### Medidas Necessárias

**Homens**: Cintura (no umbigo), Pescoço, Altura
**Mulheres**: Cintura, Quadril, Pescoço, Altura

### Categorias de Gordura Corporal

| Categoria | Homens | Mulheres |
|-----------|--------|----------|
| Gordura Essencial | 2-5% | 10-13% |
| Atletas | 6-13% | 14-20% |
| Fitness | 14-17% | 21-24% |
| Média | 18-24% | 25-31% |
| Obeso | 25%+ | 32%+ |

Mulheres naturalmente têm mais gordura essencial para saúde reprodutiva.

## Como Interpretar os Resultados

A calculadora mostra:

- **Porcentagem de Gordura Corporal**: Massa de gordura estimada
- **Categoria**: Onde você se enquadra na escala
- **Massa Gorda**: Quilos de gordura corporal
- **Massa Magra**: Músculo, osso, peso de água

Foque em tendências ao longo do tempo em vez de medições individuais.

## Considerações Importantes

- **Precisão das Medidas**: Os resultados dependem de medidas consistentes e precisas
- **Apenas Estimativa**: O método Navy tem ~3-4% de margem de erro

*Esta é uma estimativa. Para composição corporal precisa, consulte um profissional.*

## Perguntas Frequentes

### Quão preciso é o método Navy?

O método Navy é razoavelmente preciso (~3-4% de erro) quando as medidas são feitas corretamente.

### Qual é uma porcentagem de gordura corporal saudável?

Para homens: 10-20%. Para mulheres: 18-28%. Atletas podem ser mais baixos.

### Posso perder gordura sem perder peso?

Sim. Através do treino de força e nutrição adequada, você pode perder gordura enquanto ganha músculo.

## Calculadoras Relacionadas

- [Calculadora de IMC](/pt/bmi-calculator)
- [Calculadora de Peso Ideal](/pt/ideal-weight-calculator)
- [Calculadora TDEE](/pt/tdee-calculator)`,

    featuredImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=630&fit=crop",
    relatedCalculator: "body-fat-calculator",
    tags: ["body-fat", "fitness", "health", "composition"],
    category: "health",
    readingTime: 7,
  },

  // ========================================
  // POST 14: DISCOUNT CALCULATOR
  // ========================================
  {
    slugEn: "discount-calculator-guide",
    slugEs: "guia-calculadora-descuento",
    slugPt: "guia-calculadora-desconto",
    
    titleEn: "Discount Calculator: Calculate Sale Prices Instantly",
    titleEs: "Calculadora de Descuento: Calcula Precios de Venta al Instante",
    titlePt: "Calculadora de Desconto: Calcule Preços de Venda Instantaneamente",
    
    excerptEn: "Calculate discounts, sale prices, and savings instantly. Find the final price after single or multiple discounts.",
    excerptEs: "Calcula descuentos, precios de venta y ahorros al instante. Encuentra el precio final después de uno o múltiples descuentos.",
    excerptPt: "Calcule descontos, preços de venda e economias instantaneamente. Encontre o preço final após um ou múltiplos descontos.",
    
    contentEn: `Shopping sales can be confusing, especially with stacked discounts. Our calculator helps you find the true final price before you buy.

Use our [Discount Calculator](/en/discount-calculator) to calculate any discount scenario.

## How Discounts Are Calculated

### Single Discount

**Sale Price = Original Price × (1 - Discount%)**

Example: $100 item at 30% off
Sale Price = $100 × (1 - 0.30) = $100 × 0.70 = **$70**

### Stacked Discounts

Stacked discounts are applied sequentially, not added together.

**Example**: 20% off + extra 15% off on $100:
- First: $100 × 0.80 = $80
- Then: $80 × 0.85 = **$68**

Note: 20% + 15% = 35%, but stacked = 32% total discount

### Finding Original Price

If you know the sale price and discount:
**Original = Sale Price / (1 - Discount%)**

Example: $56 after 30% discount
Original = $56 / 0.70 = **$80**

## Common Discount Calculations

| Scenario | Formula |
|----------|---------|
| Price after X% off | Price × (1 - X/100) |
| Amount saved | Price × (X/100) |
| Stacked discounts | Price × (1-A%) × (1-B%) |
| Find original | Sale Price / (1 - X/100) |
| Find discount % | (Original - Sale) / Original × 100 |

## Important Considerations

- **Stacked vs Combined**: 20% + 20% stacked = 36% total, not 40%
- **Before Tax**: Discounts apply before sales tax
- **Exclusions**: Some items may be excluded from sales
- **Price Matching**: Some stores match competitor prices

*Double-check final prices at checkout.*

## Frequently Asked Questions

### Why don't stacked discounts add up?

Each discount applies to the reduced price, not the original. Two 50% discounts don't make something free - they make it 75% off.

### Should I use a coupon or sale price?

Compare the final prices. Sometimes a coupon gives a better deal than the advertised sale.

### How do I calculate discount percentage?

(Original Price - Sale Price) / Original Price × 100 = Discount %

### Is "up to X% off" the same as X% off?

No. "Up to" means the maximum discount. Most items may be discounted less.

## Related Calculators

- [Percentage Calculator](/en/percentage-calculator) - General percentage math
- [Tip Calculator](/en/tip-calculator) - Restaurant tips
- [Budget Calculator](/en/budget-calculator) - Monthly planning`,

    contentEs: `Las ventas de compras pueden ser confusas, especialmente con descuentos acumulados. Nuestra calculadora te ayuda a encontrar el precio final real antes de comprar.

Usa nuestra [Calculadora de Descuentos](/es/discount-calculator) para calcular cualquier escenario de descuento.

## Cómo se Calculan los Descuentos

### Descuento Único

**Precio de Venta = Precio Original × (1 - Descuento%)**

Ejemplo: Artículo de $100 con 30% de descuento
Precio de Venta = $100 × (1 - 0.30) = $100 × 0.70 = **$70**

### Descuentos Acumulados

Los descuentos acumulados se aplican secuencialmente, no se suman.

**Ejemplo**: 20% de descuento + 15% extra en $100:
- Primero: $100 × 0.80 = $80
- Luego: $80 × 0.85 = **$68**

Nota: 20% + 15% = 35%, pero acumulados = 32% de descuento total

### Encontrar el Precio Original

Si conoces el precio de venta y el descuento:
**Original = Precio de Venta / (1 - Descuento%)**

Ejemplo: $56 después de 30% de descuento
Original = $56 / 0.70 = **$80**

## Cálculos Comunes de Descuento

| Escenario | Fórmula |
|-----------|---------|
| Precio después de X% de descuento | Precio × (1 - X/100) |
| Monto ahorrado | Precio × (X/100) |
| Descuentos acumulados | Precio × (1-A%) × (1-B%) |
| Encontrar original | Precio de Venta / (1 - X/100) |

## Consideraciones Importantes

- **Acumulado vs Combinado**: 20% + 20% acumulado = 36% total, no 40%
- **Antes de Impuestos**: Los descuentos se aplican antes del impuesto de ventas

*Verifica los precios finales en caja.*

## Preguntas Frecuentes

### ¿Por qué los descuentos acumulados no se suman?

Cada descuento se aplica al precio reducido, no al original. Dos descuentos de 50% no hacen algo gratis - lo hacen 75% de descuento.

### ¿Cómo calculo el porcentaje de descuento?

(Precio Original - Precio de Venta) / Precio Original × 100 = % de Descuento

## Calculadoras Relacionadas

- [Calculadora de Porcentajes](/es/percentage-calculator)
- [Calculadora de Propinas](/es/tip-calculator)
- [Calculadora de Presupuesto](/es/budget-calculator)`,

    contentPt: `As vendas de compras podem ser confusas, especialmente com descontos acumulados. Nossa calculadora ajuda você a encontrar o preço final real antes de comprar.

Use nossa [Calculadora de Descontos](/pt/discount-calculator) para calcular qualquer cenário de desconto.

## Como os Descontos São Calculados

### Desconto Único

**Preço de Venda = Preço Original × (1 - Desconto%)**

Exemplo: Item de R$100 com 30% de desconto
Preço de Venda = R$100 × (1 - 0,30) = R$100 × 0,70 = **R$70**

### Descontos Acumulados

Descontos acumulados são aplicados sequencialmente, não somados.

**Exemplo**: 20% de desconto + 15% extra em R$100:
- Primeiro: R$100 × 0,80 = R$80
- Depois: R$80 × 0,85 = **R$68**

Nota: 20% + 15% = 35%, mas acumulados = 32% de desconto total

### Encontrar o Preço Original

Se você conhece o preço de venda e o desconto:
**Original = Preço de Venda / (1 - Desconto%)**

Exemplo: R$56 após 30% de desconto
Original = R$56 / 0,70 = **R$80**

## Cálculos Comuns de Desconto

| Cenário | Fórmula |
|---------|---------|
| Preço após X% de desconto | Preço × (1 - X/100) |
| Valor economizado | Preço × (X/100) |
| Descontos acumulados | Preço × (1-A%) × (1-B%) |

## Considerações Importantes

- **Acumulado vs Combinado**: 20% + 20% acumulado = 36% total, não 40%
- **Antes dos Impostos**: Descontos se aplicam antes do imposto de vendas

*Verifique os preços finais no caixa.*

## Perguntas Frequentes

### Por que os descontos acumulados não somam?

Cada desconto se aplica ao preço reduzido, não ao original. Dois descontos de 50% não tornam algo grátis - tornam 75% de desconto.

### Como calculo a porcentagem de desconto?

(Preço Original - Preço de Venda) / Preço Original × 100 = % de Desconto

## Calculadoras Relacionadas

- [Calculadora de Porcentagens](/pt/percentage-calculator)
- [Calculadora de Gorjetas](/pt/tip-calculator)
- [Calculadora de Orçamento](/pt/budget-calculator)`,

    featuredImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&h=630&fit=crop",
    relatedCalculator: "discount-calculator",
    tags: ["discount", "shopping", "sale", "savings"],
    category: "everyday",
    readingTime: 6,
  },

  // ========================================
  // POST 15: PREGNANCY CALCULATOR
  // ========================================
  {
    slugEn: "pregnancy-calculator-guide",
    slugEs: "guia-calculadora-embarazo",
    slugPt: "guia-calculadora-gravidez",
    
    titleEn: "Pregnancy Due Date Calculator: When Will Your Baby Arrive?",
    titleEs: "Calculadora de Fecha de Parto: ¿Cuándo Llegará Tu Bebé?",
    titlePt: "Calculadora de Data de Parto: Quando Seu Bebê Chegará?",
    
    excerptEn: "Calculate your due date and track your pregnancy week by week. Understand how due dates are estimated and what to expect.",
    excerptEs: "Calcula tu fecha de parto y sigue tu embarazo semana a semana. Entiende cómo se estiman las fechas de parto.",
    excerptPt: "Calcule sua data de parto e acompanhe sua gravidez semana a semana. Entenda como as datas de parto são estimadas.",
    
    contentEn: `Finding out you are pregnant is exciting, and one of the first questions is "when is my due date?" Our calculator helps you estimate when your baby might arrive.

Use our [Pregnancy Calculator](/en/pregnancy-calculator) to find your estimated due date.

## How Due Dates Are Calculated

Due dates are typically calculated from the first day of your last menstrual period (LMP).

### Naegele's Rule

**Due Date = LMP + 280 days (40 weeks)**

This assumes:
- A 28-day menstrual cycle
- Ovulation on day 14
- Conception around day 14

### Alternative Methods

- **Ultrasound**: Most accurate in first trimester
- **Conception Date**: If known, add 266 days
- **IVF Transfer**: Specific calculations based on embryo age

### Example Calculation

LMP: January 1, 2026
Due Date: January 1 + 280 days = **October 8, 2026**

## Understanding Your Results

The calculator shows:

- **Estimated Due Date**: The 40-week mark
- **Current Week**: Where you are in pregnancy
- **Trimester**: First (1-12), Second (13-27), Third (28-40)
- **Key Milestones**: Important dates and developments

Only about 5% of babies arrive on their exact due date. Most arrive within 2 weeks before or after.

## Important Considerations

- **Due Date is Estimated**: A range of 38-42 weeks is considered full term
- **Cycle Length Matters**: Longer cycles may push due date later
- **Ultrasound Dating**: First trimester ultrasound is most accurate
- **Multiple Pregnancies**: Twins often arrive earlier

*This calculator provides estimates. Your healthcare provider will confirm your due date.*

## Frequently Asked Questions

### How accurate is the due date calculator?

Due date calculators provide estimates. First trimester ultrasound is the most accurate dating method, usually within 5-7 days.

### What if my cycle is not 28 days?

Adjust by adding or subtracting the difference. A 35-day cycle would push the due date about 1 week later.

### When should I see a doctor?

Schedule your first prenatal appointment within 8 weeks of your last period, or as soon as you get a positive pregnancy test.

### Can my due date change?

Yes. Your doctor may adjust based on ultrasound measurements, especially if they differ significantly from LMP dating.

## Related Calculators

- [BMI Calculator](/en/bmi-calculator) - Track healthy weight
- [Calorie Calculator](/en/calorie-calculator) - Nutrition needs
- [Age Calculator](/en/age-calculator) - Calculate ages`,

    contentEs: `Descubrir que estás embarazada es emocionante, y una de las primeras preguntas es "¿cuándo es mi fecha de parto?" Nuestra calculadora te ayuda a estimar cuándo podría llegar tu bebé.

Usa nuestra [Calculadora de Embarazo](/es/pregnancy-calculator) para encontrar tu fecha de parto estimada.

## Cómo se Calculan las Fechas de Parto

Las fechas de parto típicamente se calculan desde el primer día de tu último período menstrual (FUM).

### Regla de Naegele

**Fecha de Parto = FUM + 280 días (40 semanas)**

Esto asume:
- Un ciclo menstrual de 28 días
- Ovulación en el día 14
- Concepción alrededor del día 14

### Métodos Alternativos

- **Ultrasonido**: Más preciso en el primer trimestre
- **Fecha de Concepción**: Si se conoce, suma 266 días
- **Transferencia FIV**: Cálculos específicos basados en edad del embrión

### Ejemplo de Cálculo

FUM: 1 de enero de 2026
Fecha de Parto: 1 de enero + 280 días = **8 de octubre de 2026**

## Entendiendo tus Resultados

La calculadora muestra:

- **Fecha de Parto Estimada**: La marca de 40 semanas
- **Semana Actual**: Dónde estás en el embarazo
- **Trimestre**: Primero (1-12), Segundo (13-27), Tercero (28-40)
- **Hitos Clave**: Fechas importantes y desarrollos

Solo alrededor del 5% de los bebés llegan en su fecha de parto exacta. La mayoría llegan dentro de 2 semanas antes o después.

## Consideraciones Importantes

- **La Fecha de Parto es Estimada**: Un rango de 38-42 semanas se considera término completo
- **La Duración del Ciclo Importa**: Ciclos más largos pueden empujar la fecha más tarde
- **Datación por Ultrasonido**: El ultrasonido del primer trimestre es más preciso

*Esta calculadora proporciona estimaciones. Tu proveedor de salud confirmará tu fecha de parto.*

## Preguntas Frecuentes

### ¿Qué tan precisa es la calculadora de fecha de parto?

Las calculadoras de fecha de parto proporcionan estimaciones. El ultrasonido del primer trimestre es el método de datación más preciso.

### ¿Qué pasa si mi ciclo no es de 28 días?

Ajusta sumando o restando la diferencia. Un ciclo de 35 días empujaría la fecha de parto aproximadamente 1 semana más tarde.

### ¿Cuándo debo ver a un médico?

Programa tu primera cita prenatal dentro de 8 semanas de tu último período.

## Calculadoras Relacionadas

- [Calculadora de IMC](/es/bmi-calculator)
- [Calculadora de Calorías](/es/calorie-calculator)
- [Calculadora de Edad](/es/age-calculator)`,

    contentPt: `Descobrir que você está grávida é emocionante, e uma das primeiras perguntas é "quando é minha data de parto?" Nossa calculadora ajuda você a estimar quando seu bebê pode chegar.

Use nossa [Calculadora de Gravidez](/pt/pregnancy-calculator) para encontrar sua data de parto estimada.

## Como as Datas de Parto São Calculadas

As datas de parto são tipicamente calculadas a partir do primeiro dia do seu último período menstrual (DUM).

### Regra de Naegele

**Data de Parto = DUM + 280 dias (40 semanas)**

Isso assume:
- Um ciclo menstrual de 28 dias
- Ovulação no dia 14
- Concepção por volta do dia 14

### Métodos Alternativos

- **Ultrassom**: Mais preciso no primeiro trimestre
- **Data de Concepção**: Se conhecida, adicione 266 dias
- **Transferência FIV**: Cálculos específicos baseados na idade do embrião

### Exemplo de Cálculo

DUM: 1 de janeiro de 2026
Data de Parto: 1 de janeiro + 280 dias = **8 de outubro de 2026**

## Entendendo seus Resultados

A calculadora mostra:

- **Data de Parto Estimada**: A marca de 40 semanas
- **Semana Atual**: Onde você está na gravidez
- **Trimestre**: Primeiro (1-12), Segundo (13-27), Terceiro (28-40)
- **Marcos Chave**: Datas importantes e desenvolvimentos

Apenas cerca de 5% dos bebês chegam na data de parto exata. A maioria chega dentro de 2 semanas antes ou depois.

## Considerações Importantes

- **A Data de Parto é Estimada**: Uma faixa de 38-42 semanas é considerada termo completo
- **A Duração do Ciclo Importa**: Ciclos mais longos podem empurrar a data mais tarde
- **Datação por Ultrassom**: O ultrassom do primeiro trimestre é mais preciso

*Esta calculadora fornece estimativas. Seu profissional de saúde confirmará sua data de parto.*

## Perguntas Frequentes

### Quão precisa é a calculadora de data de parto?

Calculadoras de data de parto fornecem estimativas. O ultrassom do primeiro trimestre é o método de datação mais preciso.

### E se meu ciclo não for de 28 dias?

Ajuste adicionando ou subtraindo a diferença. Um ciclo de 35 dias empurraria a data de parto aproximadamente 1 semana mais tarde.

### Quando devo ver um médico?

Agende sua primeira consulta pré-natal dentro de 8 semanas do seu último período.

## Calculadoras Relacionadas

- [Calculadora de IMC](/pt/bmi-calculator)
- [Calculadora de Calorias](/pt/calorie-calculator)
- [Calculadora de Idade](/pt/age-calculator)`,

    featuredImage: "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=1200&h=630&fit=crop",
    relatedCalculator: "pregnancy-calculator",
    tags: ["pregnancy", "due-date", "baby", "health"],
    category: "health",
    readingTime: 7,
  },
];

async function main() {
  console.log("Seeding professional blog posts (Part 3)...\n");

  const financeCategory = await prisma.blogCategory.findUnique({ where: { slug: "finance" } });
  const healthCategory = await prisma.blogCategory.findUnique({ where: { slug: "health" } });
  const everydayCategory = await prisma.blogCategory.findUnique({ where: { slug: "everyday" } });

  const categoryMap: Record<string, string | null> = {
    finance: financeCategory?.id || null,
    health: healthCategory?.id || null,
    everyday: everydayCategory?.id || null,
  };

  let created = 0;
  for (const post of posts) {
    try {
      const existing = await prisma.post.findFirst({ where: { slugEn: post.slugEn } });
      if (existing) {
        console.log(`Skipped (exists): ${post.titleEn}`);
        continue;
      }

      await prisma.post.create({
        data: {
          slugEn: post.slugEn,
          slugEs: post.slugEs,
          slugPt: post.slugPt,
          titleEn: post.titleEn,
          titleEs: post.titleEs,
          titlePt: post.titlePt,
          excerptEn: post.excerptEn,
          excerptEs: post.excerptEs,
          excerptPt: post.excerptPt,
          contentEn: post.contentEn,
          contentEs: post.contentEs,
          contentPt: post.contentPt,
          metaTitleEn: post.titleEn + " | Kalcufy",
          metaTitleEs: post.titleEs + " | Kalcufy",
          metaTitlePt: post.titlePt + " | Kalcufy",
          metaDescriptionEn: post.excerptEn,
          metaDescriptionEs: post.excerptEs,
          metaDescriptionPt: post.excerptPt,
          featuredImage: post.featuredImage,
          relatedCalculator: post.relatedCalculator,
          tags: post.tags,
          categoryId: categoryMap[post.category],
          status: "PUBLISHED",
          publishedAt: new Date(),
          readingTime: post.readingTime,
          views: Math.floor(Math.random() * 300) + 50,
        },
      });
      created++;
      console.log(`Created: ${post.titleEn}`);
    } catch (error: any) {
      console.error(`Error creating ${post.slugEn}: ${error.message}`);
    }
  }

  console.log(`\nPart 3 complete! Created ${created} posts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
