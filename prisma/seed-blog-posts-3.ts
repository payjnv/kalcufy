import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding blog posts 7-9...");

  const financeCategory = await prisma.blogCategory.findFirst({ where: { slug: "finance" } });
  const healthCategory = await prisma.blogCategory.findFirst({ where: { slug: "health" } });

  if (!financeCategory || !healthCategory) {
    console.error("❌ Categories not found.");
    return;
  }

  // ============================================
  // POST 7: CREDIT CARD PAYOFF CALCULATOR
  // ============================================
  const post7 = {
    titleEn: "Credit Card Payoff Calculator: The Fastest Way to Become Debt-Free",
    slugEn: "credit-card-payoff-calculator-fastest-way-debt-free",
    excerptEn: "Drowning in credit card debt? Learn proven strategies to pay off your cards faster, save thousands in interest, and finally achieve financial freedom.",
    contentEn: `Credit card debt is one of the most expensive forms of debt, with average interest rates around 20-25% APR. But with the right strategy, you can eliminate it faster than you think and save thousands in interest.

## The True Cost of Minimum Payments

Let's look at a $10,000 balance at 22% APR, paying only the minimum (usually 2% of balance or $25, whichever is higher):

- **Time to pay off:** 28 years
- **Total interest paid:** $18,932
- **Total paid:** $28,932

You'd pay almost **triple** the original amount!

## How Credit Card Interest Works

Credit cards use **daily compounding**, which means interest is calculated on your balance every day:

**Daily Rate = APR ÷ 365**

At 22% APR:
- Daily rate: 0.0603%
- $10,000 balance accrues $6.03 in interest daily
- That's $181 per month just in interest!

## Two Proven Payoff Strategies

### The Avalanche Method (Save the Most Money)

Pay minimums on all cards, put extra money toward the **highest interest rate** card first.

**Example with $500/month total:**

| Card | Balance | APR | Minimum |
|------|---------|-----|---------|
| Card A | $5,000 | 24% | $100 |
| Card B | $3,000 | 18% | $60 |
| Card C | $2,000 | 15% | $40 |

Pay $340 to Card A ($100 min + $240 extra), minimums on others.

**Result:** Debt-free in 24 months, $2,847 total interest.

### The Snowball Method (Psychological Wins)

Pay minimums on all cards, put extra money toward the **smallest balance** first.

Using same example:

Pay $340 to Card C ($40 min + $300 extra), minimums on others.

**Result:** Debt-free in 25 months, $3,112 total interest.

You pay $265 more, but quick wins keep you motivated.

## Accelerating Your Payoff

### 1. Pay More Than the Minimum
Even $50 extra per month makes a huge difference:

$10,000 at 22% APR:
| Monthly Payment | Months to Payoff | Total Interest |
|-----------------|------------------|----------------|
| Minimum (~$200) | 336 months | $18,932 |
| $300 | 47 months | $4,013 |
| $400 | 32 months | $2,571 |
| $500 | 24 months | $1,904 |

### 2. Balance Transfer Cards
Transfer high-interest debt to a 0% APR promotional card:

- Typical offer: 0% APR for 15-21 months
- Transfer fee: 3-5% of balance
- **Critical:** Pay off before promo ends!

$10,000 transfer with 3% fee:
- Fee: $300
- Monthly payment needed: $573 (18 months)
- Total paid: $10,300
- **Savings vs. 22% APR: $3,500+**

### 3. Debt Consolidation Loan
Personal loan at lower rate than credit cards:

$10,000 at 10% APR for 3 years:
- Monthly payment: $323
- Total interest: $1,616
- **Savings vs. credit card: $2,200+**

### 4. Find Extra Money

- Sell unused items
- Pick up side work
- Cut subscription services
- Reduce dining out
- Tax refund → debt payment

## Avoiding the Debt Cycle

### Stop Adding New Debt
Put cards in a drawer or freeze them (literally). Use cash or debit only.

### Build an Emergency Fund
Even $1,000 prevents using credit cards for unexpected expenses.

### Track Your Spending
Know where every dollar goes. Apps like YNAB or Mint help.

### Change Your Mindset
Credit cards are tools, not free money. Only charge what you can pay in full.

## What to Do After Payoff

1. **Keep cards open** (for credit score)
2. **Pay in full monthly** (never carry a balance)
3. **Redirect payments to savings** (you're used to not having it)
4. **Build 3-6 month emergency fund**
5. **Start investing** (retirement, brokerage)

## Calculate Your Payoff Plan

Ready to create your debt-free strategy? Use our [Credit Card Payoff Calculator](/en/credit-card-payoff-calculator) to:
- See exactly when you'll be debt-free
- Compare avalanche vs. snowball methods
- Calculate interest savings from extra payments
- Stay motivated with a clear finish line

Every dollar extra toward debt brings you closer to freedom.`,
    metaTitleEn: "Credit Card Payoff Calculator: Get Debt-Free Fast | 2024 Guide",
    metaDescriptionEn: "Learn the fastest ways to pay off credit card debt, compare strategies, and calculate your payoff date. Free calculator and proven methods included.",

    titleEs: "Calculadora de Pago de Tarjetas de Crédito: La Forma Más Rápida de Liberarte de Deudas",
    slugEs: "calculadora-pago-tarjetas-credito-liberarte-deudas",
    excerptEs: "¿Ahogado en deudas de tarjetas de crédito? Aprende estrategias comprobadas para pagar tus tarjetas más rápido, ahorrar miles en intereses y lograr la libertad financiera.",
    contentEs: `La deuda de tarjetas de crédito es una de las formas más caras de deuda, con tasas de interés promedio alrededor del 20-25% APR.

## El Verdadero Costo de los Pagos Mínimos

Veamos un saldo de $10,000 al 22% APR, pagando solo el mínimo:

- **Tiempo para pagar:** 28 años
- **Interés total pagado:** $18,932
- **Total pagado:** $28,932

¡Pagarías casi **el triple** del monto original!

## Dos Estrategias de Pago Comprobadas

### El Método Avalancha (Ahorra Más Dinero)

Paga mínimos en todas las tarjetas, pon dinero extra hacia la tarjeta con **tasa de interés más alta** primero.

### El Método Bola de Nieve (Victorias Psicológicas)

Paga mínimos en todas las tarjetas, pon dinero extra hacia el **saldo más pequeño** primero.

## Acelerando Tu Pago

### 1. Paga Más del Mínimo
Incluso $50 extra al mes hace una diferencia enorme.

### 2. Tarjetas de Transferencia de Saldo
Transfiere deuda de alto interés a una tarjeta promocional con 0% APR.

### 3. Préstamo de Consolidación de Deuda
Préstamo personal a tasa más baja que las tarjetas de crédito.

## Calcula Tu Plan de Pago

¿Listo para crear tu estrategia libre de deudas? Usa nuestra [Calculadora de Pago de Tarjetas](/es/credit-card-payoff-calculator) para ver exactamente cuándo estarás libre de deudas.`,
    metaTitleEs: "Calculadora de Pago de Tarjetas: Libérate de Deudas Rápido | 2024",
    metaDescriptionEs: "Aprende las formas más rápidas de pagar deudas de tarjetas de crédito y calcula tu fecha de pago. Calculadora gratuita incluida.",

    titlePt: "Calculadora de Quitação de Cartão de Crédito: A Forma Mais Rápida de Ficar Livre de Dívidas",
    slugPt: "calculadora-quitacao-cartao-credito-livre-dividas",
    excerptPt: "Afogado em dívidas de cartão de crédito? Aprenda estratégias comprovadas para quitar seus cartões mais rápido e alcançar a liberdade financeira.",
    contentPt: `A dívida de cartão de crédito é uma das formas mais caras de dívida, com taxas de juros médias em torno de 20-25% ao ano.

## O Verdadeiro Custo dos Pagamentos Mínimos

Vamos olhar um saldo de R$10.000 a 22% ao ano, pagando apenas o mínimo:

- **Tempo para quitar:** 28 anos
- **Juros total pago:** R$18.932
- **Total pago:** R$28.932

Você pagaria quase **o triplo** do valor original!

## Duas Estratégias de Pagamento Comprovadas

### O Método Avalanche (Economiza Mais Dinheiro)

Pague mínimos em todos os cartões, coloque dinheiro extra no cartão com **maior taxa de juros** primeiro.

### O Método Bola de Neve (Vitórias Psicológicas)

Pague mínimos em todos os cartões, coloque dinheiro extra no **menor saldo** primeiro.

## Acelerando Seu Pagamento

### 1. Pague Mais que o Mínimo
Até R$50 extra por mês faz uma diferença enorme.

### 2. Portabilidade de Dívida
Transfira dívida de juros altos para condições melhores.

## Calcule Seu Plano de Pagamento

Pronto para criar sua estratégia livre de dívidas? Use nossa [Calculadora de Quitação de Cartão](/pt/credit-card-payoff-calculator) para ver exatamente quando você estará livre de dívidas.`,
    metaTitlePt: "Calculadora de Quitação de Cartão: Fique Livre de Dívidas | 2024",
    metaDescriptionPt: "Aprenda as formas mais rápidas de quitar dívidas de cartão de crédito e calcule sua data de quitação. Calculadora gratuita.",

    featuredImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop",
    categoryId: financeCategory.id,
    tags: ["credit card", "debt payoff", "debt free", "financial freedom", "interest"],
    relatedCalculator: "credit-card-payoff-calculator",
    readingTime: 10,
    status: "PUBLISHED",
    publishedAt: new Date("2026-01-14T10:00:00Z"),
  };

  // ============================================
  // POST 8: BMI CALCULATOR
  // ============================================
  const post8 = {
    titleEn: "BMI Calculator Guide: What Your Body Mass Index Really Means",
    slugEn: "bmi-calculator-guide-body-mass-index-means",
    excerptEn: "Learn how to calculate and interpret your BMI, understand its limitations, and discover why it's just one piece of the health puzzle. Get actionable insights for your wellness journey.",
    contentEn: `Body Mass Index (BMI) is one of the most widely used health metrics, but it's also one of the most misunderstood. Understanding what BMI measures—and what it doesn't—helps you use it as a useful tool without overrelying on a single number.

## What Is BMI?

BMI is a simple calculation that uses your height and weight to estimate body fat and categorize weight status:

**BMI = Weight (kg) ÷ Height (m)²**

Or in imperial units:

**BMI = [Weight (lbs) ÷ Height (in)²] × 703**

## BMI Categories

| BMI Range | Category |
|-----------|----------|
| Below 18.5 | Underweight |
| 18.5 - 24.9 | Normal weight |
| 25.0 - 29.9 | Overweight |
| 30.0 - 34.9 | Obese Class I |
| 35.0 - 39.9 | Obese Class II |
| 40.0+ | Obese Class III |

## Calculating Your BMI: Examples

### Example 1: Metric
- Height: 1.75 m (5'9")
- Weight: 70 kg (154 lbs)
- BMI = 70 ÷ (1.75)² = 70 ÷ 3.0625 = **22.9** (Normal)

### Example 2: Imperial
- Height: 5'6" (66 inches)
- Weight: 180 lbs
- BMI = (180 ÷ 66²) × 703 = (180 ÷ 4356) × 703 = **29.1** (Overweight)

## Why BMI Matters

### Population Health Tool
BMI effectively identifies weight-related health risks across large populations. Studies consistently show correlations between high BMI and:
- Type 2 diabetes
- Heart disease
- High blood pressure
- Certain cancers
- Sleep apnea
- Joint problems

### Screening Starting Point
Healthcare providers use BMI as an initial screening to identify individuals who may benefit from further evaluation.

## BMI's Significant Limitations

### 1. Doesn't Distinguish Muscle from Fat
A muscular athlete and an inactive person can have identical BMIs:

- **Athlete:** 5'10", 200 lbs, 10% body fat → BMI: 28.7 (Overweight)
- **Sedentary person:** 5'10", 200 lbs, 30% body fat → BMI: 28.7 (Overweight)

The BMI is identical, but their health profiles are vastly different.

### 2. Ignores Fat Distribution
Where you carry fat matters more than total fat:
- **Visceral fat** (around organs): Higher health risk
- **Subcutaneous fat** (under skin): Lower health risk

Two people with BMI 27 could have very different risk profiles based on fat location.

### 3. Doesn't Account for Age, Sex, or Ethnicity
- Older adults naturally lose muscle, so same BMI may indicate more fat
- Women typically have more body fat than men at same BMI
- Health risks vary by ethnicity at same BMI levels

### 4. Misses "Normal Weight Obesity"
Some people have normal BMI but high body fat percentage and low muscle mass—they face similar health risks as those with high BMI.

## Better Metrics to Consider

### Waist Circumference
Measures abdominal fat directly:
- **Men:** Risk increases above 40 inches
- **Women:** Risk increases above 35 inches

### Waist-to-Hip Ratio
Indicates fat distribution:
- **Men:** Healthy ratio below 0.9
- **Women:** Healthy ratio below 0.85

### Body Fat Percentage
Direct measurement of fat:

| Category | Men | Women |
|----------|-----|-------|
| Essential | 2-5% | 10-13% |
| Athletic | 6-13% | 14-20% |
| Fitness | 14-17% | 21-24% |
| Average | 18-24% | 25-31% |
| Obese | 25%+ | 32%+ |

### Waist-to-Height Ratio
Simple rule: Waist should be less than half your height.

## Using BMI Wisely

### It's a Starting Point, Not a Verdict
BMI provides useful context but shouldn't define your health alone.

### Track Trends, Not Single Numbers
Changes over time matter more than any single measurement.

### Combine with Other Metrics
Use BMI alongside waist circumference, fitness levels, blood work, and how you feel.

### Focus on Behaviors, Not Just Numbers
Healthy habits matter more than hitting a specific BMI:
- Regular physical activity
- Balanced nutrition
- Adequate sleep
- Stress management
- Regular health checkups

## When to Be Concerned

Regardless of BMI, consult a healthcare provider if you experience:
- Unexplained weight changes
- Difficulty with daily activities
- Joint pain related to weight
- Shortness of breath
- Signs of sleep apnea
- Blood sugar or blood pressure concerns

## Calculate Your BMI

Curious about your numbers? Use our [BMI Calculator](/en/bmi-calculator) to:
- Calculate your current BMI
- Understand your weight category
- Set realistic health goals
- Track changes over time

Remember: BMI is just one tool. True health encompasses physical, mental, and emotional well-being.`,
    metaTitleEn: "BMI Calculator Guide: What Body Mass Index Really Means | 2024",
    metaDescriptionEn: "Learn how to calculate BMI, understand what it measures and its limitations. Free BMI calculator and comprehensive health insights included.",

    titleEs: "Guía de Calculadora de IMC: Lo Que Tu Índice de Masa Corporal Realmente Significa",
    slugEs: "guia-calculadora-imc-indice-masa-corporal-significa",
    excerptEs: "Aprende a calcular e interpretar tu IMC, entiende sus limitaciones y descubre por qué es solo una pieza del rompecabezas de la salud.",
    contentEs: `El Índice de Masa Corporal (IMC) es una de las métricas de salud más utilizadas, pero también una de las más malinterpretadas.

## ¿Qué Es el IMC?

El IMC es un cálculo simple que usa tu altura y peso para estimar grasa corporal:

**IMC = Peso (kg) ÷ Altura (m)²**

## Categorías de IMC

| Rango de IMC | Categoría |
|--------------|-----------|
| Menos de 18.5 | Bajo peso |
| 18.5 - 24.9 | Peso normal |
| 25.0 - 29.9 | Sobrepeso |
| 30.0 - 34.9 | Obesidad Clase I |
| 35.0 - 39.9 | Obesidad Clase II |
| 40.0+ | Obesidad Clase III |

## Limitaciones Significativas del IMC

### 1. No Distingue Músculo de Grasa
Un atleta musculoso y una persona inactiva pueden tener IMC idénticos.

### 2. Ignora la Distribución de Grasa
Dónde llevas la grasa importa más que la grasa total.

### 3. No Considera Edad, Sexo o Etnia
Los adultos mayores naturalmente pierden músculo, las mujeres típicamente tienen más grasa corporal.

## Mejores Métricas a Considerar

### Circunferencia de Cintura
- **Hombres:** Riesgo aumenta sobre 102 cm
- **Mujeres:** Riesgo aumenta sobre 88 cm

### Porcentaje de Grasa Corporal
Medición directa de grasa.

## Calcula Tu IMC

¿Curioso sobre tus números? Usa nuestra [Calculadora de IMC](/es/bmi-calculator) para calcular tu IMC actual y entender tu categoría de peso.

Recuerda: El IMC es solo una herramienta. La verdadera salud abarca bienestar físico, mental y emocional.`,
    metaTitleEs: "Guía de Calculadora de IMC: Qué Significa el Índice de Masa Corporal | 2024",
    metaDescriptionEs: "Aprende a calcular el IMC, entiende qué mide y sus limitaciones. Calculadora de IMC gratuita incluida.",

    titlePt: "Guia de Calculadora de IMC: O Que Seu Índice de Massa Corporal Realmente Significa",
    slugPt: "guia-calculadora-imc-indice-massa-corporal-significa",
    excerptPt: "Aprenda a calcular e interpretar seu IMC, entenda suas limitações e descubra por que é apenas uma peça do quebra-cabeça da saúde.",
    contentPt: `O Índice de Massa Corporal (IMC) é uma das métricas de saúde mais utilizadas, mas também uma das mais mal compreendidas.

## O Que É o IMC?

O IMC é um cálculo simples que usa sua altura e peso para estimar gordura corporal:

**IMC = Peso (kg) ÷ Altura (m)²**

## Categorias de IMC

| Faixa de IMC | Categoria |
|--------------|-----------|
| Abaixo de 18.5 | Abaixo do peso |
| 18.5 - 24.9 | Peso normal |
| 25.0 - 29.9 | Sobrepeso |
| 30.0 - 34.9 | Obesidade Classe I |
| 35.0 - 39.9 | Obesidade Classe II |
| 40.0+ | Obesidade Classe III |

## Limitações Significativas do IMC

### 1. Não Distingue Músculo de Gordura
Um atleta musculoso e uma pessoa sedentária podem ter IMCs idênticos.

### 2. Ignora a Distribuição de Gordura
Onde você carrega gordura importa mais que a gordura total.

## Melhores Métricas a Considerar

### Circunferência da Cintura
- **Homens:** Risco aumenta acima de 102 cm
- **Mulheres:** Risco aumenta acima de 88 cm

### Percentual de Gordura Corporal
Medição direta de gordura.

## Calcule Seu IMC

Curioso sobre seus números? Use nossa [Calculadora de IMC](/pt/bmi-calculator) para calcular seu IMC atual e entender sua categoria de peso.

Lembre-se: O IMC é apenas uma ferramenta. A verdadeira saúde engloba bem-estar físico, mental e emocional.`,
    metaTitlePt: "Guia de Calculadora de IMC: O Que o Índice de Massa Corporal Significa | 2024",
    metaDescriptionPt: "Aprenda a calcular o IMC, entenda o que ele mede e suas limitações. Calculadora de IMC gratuita incluída.",

    featuredImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=630&fit=crop",
    categoryId: healthCategory.id,
    tags: ["BMI", "body mass index", "health", "weight", "fitness"],
    relatedCalculator: "bmi-calculator",
    readingTime: 9,
    status: "PUBLISHED",
    publishedAt: new Date("2026-01-13T10:00:00Z"),
  };

  // ============================================
  // POST 9: CALORIE CALCULATOR
  // ============================================
  const post9 = {
    titleEn: "Calorie Calculator Guide: How to Find Your Perfect Daily Intake",
    slugEn: "calorie-calculator-guide-perfect-daily-intake",
    excerptEn: "Whether you want to lose weight, build muscle, or maintain your physique, understanding your calorie needs is essential. Learn how to calculate and optimize your daily intake.",
    contentEn: `Calories are the foundation of nutrition. Whether your goal is weight loss, muscle gain, or maintenance, knowing your daily calorie needs is the first step toward success.

## Understanding Calories

A calorie is simply a unit of energy. Your body needs energy for:
- **Basal Metabolic Rate (BMR):** Energy for basic functions (breathing, circulation, cell production) - about 60-70% of daily calories
- **Thermic Effect of Food (TEF):** Energy to digest food - about 10%
- **Physical Activity:** Exercise and daily movement - about 20-30%

## Calculating Your Calorie Needs

### Step 1: Find Your BMR

The Mifflin-St Jeor equation (most accurate):

**Men:** BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5

**Women:** BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161

### Step 2: Apply Activity Multiplier

| Activity Level | Multiplier | Description |
|---------------|------------|-------------|
| Sedentary | 1.2 | Desk job, minimal exercise |
| Lightly Active | 1.375 | Light exercise 1-3 days/week |
| Moderately Active | 1.55 | Moderate exercise 3-5 days/week |
| Very Active | 1.725 | Hard exercise 6-7 days/week |
| Extremely Active | 1.9 | Athlete, physical job + training |

**TDEE (Total Daily Energy Expenditure) = BMR × Activity Multiplier**

### Example Calculation

30-year-old woman, 165 cm, 65 kg, moderately active:

1. BMR = (10 × 65) + (6.25 × 165) - (5 × 30) - 161
2. BMR = 650 + 1031.25 - 150 - 161 = **1,370 calories**
3. TDEE = 1,370 × 1.55 = **2,124 calories/day**

## Calorie Goals by Objective

### Weight Loss
Create a calorie deficit:
- **Moderate loss (0.5 lb/week):** TDEE - 250 calories
- **Standard loss (1 lb/week):** TDEE - 500 calories
- **Aggressive loss (1.5 lb/week):** TDEE - 750 calories

For our example: 2,124 - 500 = **1,624 calories for weight loss**

**Important:** Never go below 1,200 (women) or 1,500 (men) calories without medical supervision.

### Weight Maintenance
Eat at your TDEE: **2,124 calories**

### Muscle Gain
Create a calorie surplus:
- **Lean bulk:** TDEE + 200-300 calories
- **Standard bulk:** TDEE + 300-500 calories

For our example: 2,124 + 300 = **2,424 calories for muscle gain**

## Macronutrient Distribution

Calories come from three macronutrients:
- **Protein:** 4 calories per gram
- **Carbohydrates:** 4 calories per gram
- **Fat:** 9 calories per gram

### Recommended Macros by Goal

**Weight Loss:**
- Protein: 30-35% (preserves muscle)
- Carbs: 35-40%
- Fat: 25-30%

**Maintenance:**
- Protein: 25-30%
- Carbs: 45-50%
- Fat: 25-30%

**Muscle Gain:**
- Protein: 25-30%
- Carbs: 45-55%
- Fat: 20-25%

### Example: 1,600 Calorie Weight Loss Diet

- Protein: 30% = 480 cal = **120g**
- Carbs: 40% = 640 cal = **160g**
- Fat: 30% = 480 cal = **53g**

## Practical Tips for Hitting Your Targets

### 1. Track Your Food
Use apps like MyFitnessPal, Cronometer, or Lose It! to log everything you eat.

### 2. Weigh Your Food
Eyeballing portions leads to underestimating. A food scale is invaluable.

### 3. Plan Meals in Advance
Knowing what you'll eat prevents impulsive choices.

### 4. Front-Load Protein
Prioritize protein at each meal to hit your target and stay satisfied.

### 5. Don't Drink Your Calories
Liquid calories (soda, juice, alcohol) add up without providing fullness.

### 6. Allow Flexibility
80% whole foods, 20% whatever you enjoy. Sustainability beats perfection.

## Common Calorie Counting Mistakes

### 1. Forgetting Cooking Oils
1 tablespoon olive oil = 120 calories. It adds up fast.

### 2. Ignoring Condiments
Sauces, dressings, and spreads can add 100-300 calories per meal.

### 3. Weekend Overeating
Five good days can be undone by two excessive days.

### 4. Overestimating Exercise Calories
Gym machines and trackers often inflate calorie burns by 20-50%.

### 5. Not Adjusting as You Progress
As you lose weight, your calorie needs decrease. Recalculate every 10-15 lbs.

## When to Adjust Your Calories

**Increase calories if:**
- You're losing more than 1.5 lbs/week consistently
- You feel constantly fatigued
- Your performance is declining
- You're losing muscle mass

**Decrease calories if:**
- You're not losing weight after 2-3 weeks
- You've hit a plateau for 2+ weeks
- You're gaining unintended weight

## Calculate Your Calories

Ready to find your ideal daily intake? Use our [Calorie Calculator](/en/calorie-calculator) to:
- Calculate your personal BMR and TDEE
- Get customized recommendations for your goal
- Understand your macronutrient needs
- Start your journey with accurate numbers

The right calorie target, consistently followed, produces results.`,
    metaTitleEn: "Calorie Calculator Guide: Find Your Perfect Daily Intake | 2024",
    metaDescriptionEn: "Learn how to calculate your daily calorie needs for weight loss, maintenance, or muscle gain. Free calorie calculator and practical nutrition tips included.",

    titleEs: "Guía de Calculadora de Calorías: Cómo Encontrar Tu Ingesta Diaria Perfecta",
    slugEs: "guia-calculadora-calorias-ingesta-diaria-perfecta",
    excerptEs: "Ya sea que quieras perder peso, ganar músculo o mantener tu físico, entender tus necesidades calóricas es esencial. Aprende a calcular y optimizar tu ingesta diaria.",
    contentEs: `Las calorías son la base de la nutrición. Ya sea que tu objetivo sea pérdida de peso, ganancia muscular o mantenimiento, conocer tus necesidades calóricas diarias es el primer paso hacia el éxito.

## Entendiendo las Calorías

Una caloría es simplemente una unidad de energía. Tu cuerpo necesita energía para:
- **Tasa Metabólica Basal (TMB):** Energía para funciones básicas - aproximadamente 60-70% de las calorías diarias
- **Efecto Térmico de los Alimentos:** Energía para digerir - aproximadamente 10%
- **Actividad Física:** Ejercicio y movimiento diario - aproximadamente 20-30%

## Calculando Tus Necesidades Calóricas

### Paso 1: Encuentra Tu TMB

La ecuación Mifflin-St Jeor:

**Hombres:** TMB = (10 × peso en kg) + (6.25 × altura en cm) - (5 × edad) + 5

**Mujeres:** TMB = (10 × peso en kg) + (6.25 × altura en cm) - (5 × edad) - 161

### Paso 2: Aplica el Multiplicador de Actividad

| Nivel de Actividad | Multiplicador |
|-------------------|---------------|
| Sedentario | 1.2 |
| Ligeramente Activo | 1.375 |
| Moderadamente Activo | 1.55 |
| Muy Activo | 1.725 |
| Extremadamente Activo | 1.9 |

## Metas Calóricas por Objetivo

### Pérdida de Peso
Crea un déficit calórico:
- **Pérdida moderada (0.25 kg/semana):** TDEE - 250 calorías
- **Pérdida estándar (0.5 kg/semana):** TDEE - 500 calorías

### Mantenimiento de Peso
Come en tu TDEE.

### Ganancia Muscular
Crea un superávit calórico:
- **Volumen limpio:** TDEE + 200-300 calorías

## Calcula Tus Calorías

¿Listo para encontrar tu ingesta diaria ideal? Usa nuestra [Calculadora de Calorías](/es/calorie-calculator) para calcular tu TMB y TDEE personales.`,
    metaTitleEs: "Guía de Calculadora de Calorías: Encuentra Tu Ingesta Diaria | 2024",
    metaDescriptionEs: "Aprende a calcular tus necesidades calóricas diarias para perder peso, mantener o ganar músculo. Calculadora gratuita incluida.",

    titlePt: "Guia de Calculadora de Calorias: Como Encontrar Sua Ingestão Diária Perfeita",
    slugPt: "guia-calculadora-calorias-ingestao-diaria-perfeita",
    excerptPt: "Se você quer perder peso, ganhar músculo ou manter seu físico, entender suas necessidades calóricas é essencial. Aprenda a calcular e otimizar sua ingestão diária.",
    contentPt: `As calorias são a base da nutrição. Seja seu objetivo perda de peso, ganho muscular ou manutenção, conhecer suas necessidades calóricas diárias é o primeiro passo para o sucesso.

## Entendendo as Calorias

Uma caloria é simplesmente uma unidade de energia. Seu corpo precisa de energia para:
- **Taxa Metabólica Basal (TMB):** Energia para funções básicas - aproximadamente 60-70% das calorias diárias
- **Efeito Térmico dos Alimentos:** Energia para digerir - aproximadamente 10%
- **Atividade Física:** Exercício e movimento diário - aproximadamente 20-30%

## Calculando Suas Necessidades Calóricas

### Passo 1: Encontre Sua TMB

A equação Mifflin-St Jeor:

**Homens:** TMB = (10 × peso em kg) + (6.25 × altura em cm) - (5 × idade) + 5

**Mulheres:** TMB = (10 × peso em kg) + (6.25 × altura em cm) - (5 × idade) - 161

### Passo 2: Aplique o Multiplicador de Atividade

| Nível de Atividade | Multiplicador |
|-------------------|---------------|
| Sedentário | 1.2 |
| Levemente Ativo | 1.375 |
| Moderadamente Ativo | 1.55 |
| Muito Ativo | 1.725 |
| Extremamente Ativo | 1.9 |

## Metas Calóricas por Objetivo

### Perda de Peso
Crie um déficit calórico:
- **Perda moderada:** GASTO - 250 calorias
- **Perda padrão:** GASTO - 500 calorias

### Manutenção de Peso
Coma no seu gasto calórico total.

### Ganho Muscular
Crie um superávit calórico.

## Calcule Suas Calorias

Pronto para encontrar sua ingestão diária ideal? Use nossa [Calculadora de Calorias](/pt/calorie-calculator) para calcular sua TMB e gasto calórico total personalizados.`,
    metaTitlePt: "Guia de Calculadora de Calorias: Encontre Sua Ingestão Diária | 2024",
    metaDescriptionPt: "Aprenda a calcular suas necessidades calóricas diárias para perder peso, manter ou ganhar músculo. Calculadora gratuita incluída.",

    featuredImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop",
    categoryId: healthCategory.id,
    tags: ["calories", "nutrition", "weight loss", "diet", "macros", "TDEE"],
    relatedCalculator: "calorie-calculator",
    readingTime: 11,
    status: "PUBLISHED",
    publishedAt: new Date("2026-01-12T10:00:00Z"),
  };

  // Create posts
  const postsToCreate = [post7, post8, post9];

  for (const post of postsToCreate) {
    const existing = await prisma.post.findFirst({ where: { slugEn: post.slugEn } });
    if (!existing) {
      await prisma.post.create({ data: post });
      console.log(`✅ Created: ${post.titleEn}`);
    } else {
      console.log(`⏭️ Skipped (exists): ${post.titleEn}`);
    }
  }

  console.log("\n✅ All 9 blog posts seeded successfully!");
  console.log("\nPosts created:");
  console.log("1. Compound Interest");
  console.log("2. Mortgage Calculator");
  console.log("3. Personal Loan");
  console.log("4. Auto Loan");
  console.log("5. Retirement");
  console.log("6. Savings");
  console.log("7. Credit Card Payoff");
  console.log("8. BMI");
  console.log("9. Calorie Calculator");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
