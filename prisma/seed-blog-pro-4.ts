import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  // ========================================
  // POST 16: INVESTMENT CALCULATOR
  // ========================================
  {
    slugEn: "investment-calculator-guide",
    slugEs: "guia-calculadora-inversiones",
    slugPt: "guia-calculadora-investimentos",
    titleEn: "Investment Calculator: Project Your Portfolio Growth",
    titleEs: "Calculadora de Inversiones: Proyecta el Crecimiento de Tu Portafolio",
    titlePt: "Calculadora de Investimentos: Projete o Crescimento do Seu Portfólio",
    excerptEn: "Calculate how your investments will grow over time with compound returns and regular contributions.",
    excerptEs: "Calcula cómo crecerán tus inversiones con el tiempo con rendimientos compuestos y contribuciones regulares.",
    excerptPt: "Calcule como seus investimentos crescerão ao longo do tempo com retornos compostos e contribuições regulares.",
    contentEn: `Investing is one of the most effective ways to build long-term wealth. Understanding how your money can grow helps you set realistic goals.

Use our [Investment Calculator](/en/investment-calculator) to project your portfolio growth.

## How Investment Growth Is Calculated

Investment growth combines your initial investment, regular contributions, and compound returns.

**FV = P(1+r)^n + PMT × [((1+r)^n - 1) / r]**

Where:
- **FV** = Future value
- **P** = Initial investment
- **r** = Expected return rate per period
- **n** = Number of periods
- **PMT** = Regular contribution

### Example Calculation

$10,000 initial + $500/month at 8% return for 20 years:

| Component | Amount |
|-----------|--------|
| Initial Investment | $10,000 |
| Total Contributions | $120,000 |
| Investment Growth | $224,513 |
| **Final Value** | **$354,513** |

## Important Considerations

- **Returns Are Not Guaranteed**: Historical averages don't predict future results
- **Volatility**: Markets fluctuate; expect ups and downs
- **Fees**: Fund expenses reduce effective returns
- **Taxes**: Consider tax-advantaged accounts (401k, IRA)
- **Inflation**: Real returns = nominal returns - inflation (~3%)

*This calculator provides estimates for educational purposes only.*

## Frequently Asked Questions

### What is a realistic expected return?

Historically, a diversified stock portfolio returns 7-10% annually. Bonds return 3-5%. A balanced portfolio might expect 6-8%.

### How much should I invest each month?

Aim for 15-20% of income for retirement. Start with what you can afford and increase over time.

### When should I start investing?

As soon as possible. Time is the most powerful factor in compound growth.

## Related Calculators

- [Compound Interest Calculator](/en/compound-interest-calculator)
- [Retirement Calculator](/en/retirement-calculator)
- [401(k) Calculator](/en/401k-calculator)`,
    contentEs: `Invertir es una de las formas más efectivas de construir riqueza a largo plazo. Entender cómo puede crecer tu dinero te ayuda a establecer metas realistas.

Usa nuestra [Calculadora de Inversiones](/es/investment-calculator) para proyectar el crecimiento de tu portafolio.

## Cómo se Calcula el Crecimiento de Inversiones

El crecimiento de inversiones combina tu inversión inicial, contribuciones regulares y rendimientos compuestos.

**VF = P(1+r)^n + PMT × [((1+r)^n - 1) / r]**

### Ejemplo de Cálculo

$10,000 inicial + $500/mes al 8% de rendimiento por 20 años:

| Componente | Monto |
|------------|-------|
| Inversión Inicial | $10,000 |
| Contribuciones Totales | $120,000 |
| Crecimiento | $224,513 |
| **Valor Final** | **$354,513** |

## Consideraciones Importantes

- **Los Rendimientos No Están Garantizados**: Los promedios históricos no predicen resultados futuros
- **Volatilidad**: Los mercados fluctúan
- **Comisiones**: Los gastos reducen los rendimientos

*Esta calculadora proporciona estimaciones solo con fines educativos.*

## Preguntas Frecuentes

### ¿Cuál es un rendimiento esperado realista?

Históricamente, un portafolio diversificado de acciones rinde 7-10% anualmente.

### ¿Cuánto debo invertir cada mes?

Apunta al 15-20% del ingreso para jubilación.

## Calculadoras Relacionadas

- [Calculadora de Interés Compuesto](/es/compound-interest-calculator)
- [Calculadora de Jubilación](/es/retirement-calculator)
- [Calculadora 401(k)](/es/401k-calculator)`,
    contentPt: `Investir é uma das formas mais eficazes de construir riqueza a longo prazo.

Use nossa [Calculadora de Investimentos](/pt/investment-calculator) para projetar o crescimento do seu portfólio.

## Como o Crescimento de Investimentos É Calculado

**VF = P(1+r)^n + PMT × [((1+r)^n - 1) / r]**

### Exemplo de Cálculo

R$10.000 inicial + R$500/mês a 8% de retorno por 20 anos:

| Componente | Valor |
|------------|-------|
| Investimento Inicial | R$10.000 |
| Contribuições Totais | R$120.000 |
| Crescimento | R$224.513 |
| **Valor Final** | **R$354.513** |

## Considerações Importantes

- **Retornos Não São Garantidos**: Médias históricas não preveem resultados futuros
- **Volatilidade**: Mercados flutuam

*Esta calculadora fornece estimativas apenas para fins educacionais.*

## Perguntas Frequentes

### Qual é um retorno esperado realista?

Historicamente, um portfólio diversificado de ações rende 7-10% anualmente.

## Calculadoras Relacionadas

- [Calculadora de Juros Compostos](/pt/compound-interest-calculator)
- [Calculadora de Aposentadoria](/pt/retirement-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=630&fit=crop",
    relatedCalculator: "investment-calculator",
    tags: ["investment", "portfolio", "stocks", "finance"],
    category: "finance",
    readingTime: 7,
  },

  // ========================================
  // POST 17: 401K CALCULATOR
  // ========================================
  {
    slugEn: "401k-calculator-guide",
    slugEs: "guia-calculadora-401k",
    slugPt: "guia-calculadora-401k",
    titleEn: "401(k) Calculator: Maximize Your Retirement Savings",
    titleEs: "Calculadora 401(k): Maximiza Tus Ahorros para el Retiro",
    titlePt: "Calculadora 401(k): Maximize Sua Poupança para Aposentadoria",
    excerptEn: "Calculate your 401(k) growth and see how employer matching can boost your retirement savings significantly.",
    excerptEs: "Calcula el crecimiento de tu 401(k) y ve cómo el match del empleador puede impulsar tus ahorros para el retiro.",
    excerptPt: "Calcule o crescimento do seu 401(k) e veja como o match do empregador pode impulsionar sua poupança.",
    contentEn: `A 401(k) is one of the most powerful retirement savings tools available, especially when your employer offers matching contributions.

Use our [401(k) Calculator](/en/401k-calculator) to project your retirement savings.

## How 401(k) Growth Works

Your 401(k) grows through three sources:
1. **Your contributions** (pre-tax or Roth)
2. **Employer match** (free money!)
3. **Investment returns** (compound growth)

### 2024 Contribution Limits

| Age | Employee Limit | With Catch-up |
|-----|----------------|---------------|
| Under 50 | $23,000 | $23,000 |
| 50+ | $23,000 | $30,500 |

### Example: The Power of Employer Match

$60,000 salary, 6% contribution, 50% employer match up to 6%:

| Component | Annual |
|-----------|--------|
| Your Contribution (6%) | $3,600 |
| Employer Match (3%) | $1,800 |
| **Total Annual** | **$5,400** |

That's 50% more than contributing alone!

## Important Considerations

- **Always Get Full Match**: Not contributing enough to get full match = leaving money on table
- **Vesting Schedule**: Employer contributions may vest over 3-6 years
- **Investment Options**: Choose low-cost index funds when available
- **Tax Treatment**: Traditional = tax-deferred; Roth = tax-free growth

*Consult a financial advisor for personalized advice.*

## Frequently Asked Questions

### How much should I contribute to my 401(k)?

At minimum, contribute enough to get your full employer match. Ideally, aim for 15% of salary including match.

### Traditional or Roth 401(k)?

If you expect higher taxes in retirement, choose Roth. If you expect lower taxes, choose Traditional. When unsure, split between both.

### What happens to my 401(k) if I leave my job?

You can leave it, roll it to new employer's plan, or roll it to an IRA. Never cash out early (10% penalty + taxes).

## Related Calculators

- [Retirement Calculator](/en/retirement-calculator)
- [Investment Calculator](/en/investment-calculator)
- [Compound Interest Calculator](/en/compound-interest-calculator)`,
    contentEs: `Un 401(k) es una de las herramientas de ahorro para el retiro más poderosas disponibles, especialmente cuando tu empleador ofrece contribuciones de igualación.

Usa nuestra [Calculadora 401(k)](/es/401k-calculator) para proyectar tus ahorros de jubilación.

## Cómo Funciona el Crecimiento del 401(k)

Tu 401(k) crece a través de tres fuentes:
1. **Tus contribuciones** (pre-impuestos o Roth)
2. **Match del empleador** (¡dinero gratis!)
3. **Rendimientos de inversión** (crecimiento compuesto)

### Ejemplo: El Poder del Match del Empleador

Salario de $60,000, contribución del 6%, match del empleador del 50% hasta el 6%:

| Componente | Anual |
|------------|-------|
| Tu Contribución (6%) | $3,600 |
| Match del Empleador (3%) | $1,800 |
| **Total Anual** | **$5,400** |

¡Eso es 50% más que contribuir solo!

## Consideraciones Importantes

- **Siempre Obtén el Match Completo**: No contribuir suficiente = dejar dinero en la mesa
- **Calendario de Vesting**: Las contribuciones del empleador pueden vestear en 3-6 años
- **Opciones de Inversión**: Elige fondos índice de bajo costo

*Consulta a un asesor financiero para consejos personalizados.*

## Preguntas Frecuentes

### ¿Cuánto debo contribuir a mi 401(k)?

Como mínimo, contribuye suficiente para obtener el match completo. Idealmente, apunta al 15% del salario.

### ¿401(k) Tradicional o Roth?

Si esperas impuestos más altos en el retiro, elige Roth. Si esperas impuestos más bajos, elige Tradicional.

## Calculadoras Relacionadas

- [Calculadora de Jubilación](/es/retirement-calculator)
- [Calculadora de Inversiones](/es/investment-calculator)`,
    contentPt: `Um 401(k) é uma das ferramentas de poupança para aposentadoria mais poderosas disponíveis.

Use nossa [Calculadora 401(k)](/pt/401k-calculator) para projetar suas economias de aposentadoria.

## Como o Crescimento do 401(k) Funciona

Seu 401(k) cresce através de três fontes:
1. **Suas contribuições**
2. **Match do empregador** (dinheiro grátis!)
3. **Retornos de investimento**

### Exemplo: O Poder do Match do Empregador

Salário de R$60.000, contribuição de 6%, match do empregador de 50% até 6%:

| Componente | Anual |
|------------|-------|
| Sua Contribuição (6%) | R$3.600 |
| Match do Empregador (3%) | R$1.800 |
| **Total Anual** | **R$5.400** |

## Considerações Importantes

- **Sempre Obtenha o Match Completo**: Não contribuir suficiente = deixar dinheiro na mesa
- **Cronograma de Vesting**: Contribuições do empregador podem vestir em 3-6 anos

## Perguntas Frequentes

### Quanto devo contribuir para meu 401(k)?

No mínimo, contribua suficiente para obter o match completo.

## Calculadoras Relacionadas

- [Calculadora de Aposentadoria](/pt/retirement-calculator)
- [Calculadora de Investimentos](/pt/investment-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=630&fit=crop",
    relatedCalculator: "401k-calculator",
    tags: ["401k", "retirement", "employer-match", "finance"],
    category: "finance",
    readingTime: 7,
  },

  // ========================================
  // POST 18: BUDGET CALCULATOR
  // ========================================
  {
    slugEn: "budget-calculator-guide",
    slugEs: "guia-calculadora-presupuesto",
    slugPt: "guia-calculadora-orcamento",
    titleEn: "Budget Calculator: Take Control of Your Money",
    titleEs: "Calculadora de Presupuesto: Toma el Control de Tu Dinero",
    titlePt: "Calculadora de Orçamento: Tome o Controle do Seu Dinheiro",
    excerptEn: "Create a budget that works for you. Track income, expenses, and find money for savings and debt payoff.",
    excerptEs: "Crea un presupuesto que funcione para ti. Rastrea ingresos, gastos y encuentra dinero para ahorros.",
    excerptPt: "Crie um orçamento que funcione para você. Rastreie renda, despesas e encontre dinheiro para poupança.",
    contentEn: `A budget is the foundation of financial success. Knowing where your money goes helps you make intentional decisions and reach your goals faster.

Use our [Budget Calculator](/en/budget-calculator) to create your personalized spending plan.

## Popular Budgeting Methods

### The 50/30/20 Rule

| Category | Percentage | Example ($5,000 income) |
|----------|------------|-------------------------|
| Needs | 50% | $2,500 |
| Wants | 30% | $1,500 |
| Savings/Debt | 20% | $1,000 |

**Needs**: Housing, utilities, groceries, insurance, minimum debt payments
**Wants**: Dining out, entertainment, subscriptions, shopping
**Savings**: Emergency fund, retirement, extra debt payments

### Zero-Based Budget

Every dollar has a job. Income - Expenses = $0

### Example Monthly Budget

| Category | Amount |
|----------|--------|
| Housing | $1,500 |
| Transportation | $400 |
| Groceries | $500 |
| Utilities | $200 |
| Insurance | $300 |
| Debt Payments | $400 |
| Savings | $500 |
| Entertainment | $200 |
| **Total** | **$4,000** |

## Important Considerations

- **Track Spending First**: Know where money goes before making a budget
- **Be Realistic**: Too restrictive = failure
- **Include Fun Money**: Deprivation doesn't work long-term
- **Review Monthly**: Adjust as life changes
- **Automate Savings**: Pay yourself first

*A budget is a plan, not a restriction.*

## Frequently Asked Questions

### How do I start budgeting?

Track all spending for one month. Categorize expenses. Then allocate future income based on priorities.

### What if I can't stick to my budget?

Review and adjust. A budget that's too restrictive won't work. Build in flexibility and small rewards.

### Should I use cash or cards?

Whatever helps you spend less. Some people spend less with cash (envelope method). Others prefer tracking apps with cards.

## Related Calculators

- [Savings Calculator](/en/savings-calculator)
- [Credit Card Payoff Calculator](/en/credit-card-payoff-calculator)
- [Net Worth Calculator](/en/net-worth-calculator)`,
    contentEs: `Un presupuesto es la base del éxito financiero. Saber a dónde va tu dinero te ayuda a tomar decisiones intencionales.

Usa nuestra [Calculadora de Presupuesto](/es/budget-calculator) para crear tu plan de gastos personalizado.

## Métodos Populares de Presupuesto

### La Regla 50/30/20

| Categoría | Porcentaje | Ejemplo ($5,000 ingreso) |
|-----------|------------|--------------------------|
| Necesidades | 50% | $2,500 |
| Deseos | 30% | $1,500 |
| Ahorros/Deudas | 20% | $1,000 |

**Necesidades**: Vivienda, servicios, comestibles, seguros
**Deseos**: Comer fuera, entretenimiento, suscripciones
**Ahorros**: Fondo de emergencia, jubilación, pagos extra de deudas

### Ejemplo de Presupuesto Mensual

| Categoría | Monto |
|-----------|-------|
| Vivienda | $1,500 |
| Transporte | $400 |
| Comestibles | $500 |
| Servicios | $200 |
| Seguros | $300 |
| Pagos de Deudas | $400 |
| Ahorros | $500 |
| Entretenimiento | $200 |
| **Total** | **$4,000** |

## Consideraciones Importantes

- **Rastrea Gastos Primero**: Sabe a dónde va el dinero antes de hacer un presupuesto
- **Sé Realista**: Demasiado restrictivo = fracaso
- **Incluye Dinero para Diversión**: La privación no funciona a largo plazo

*Un presupuesto es un plan, no una restricción.*

## Preguntas Frecuentes

### ¿Cómo empiezo a presupuestar?

Rastrea todos los gastos por un mes. Categoriza los gastos. Luego asigna ingresos futuros según prioridades.

## Calculadoras Relacionadas

- [Calculadora de Ahorros](/es/savings-calculator)
- [Calculadora de Pago de Tarjeta](/es/credit-card-payoff-calculator)
- [Calculadora de Patrimonio Neto](/es/net-worth-calculator)`,
    contentPt: `Um orçamento é a base do sucesso financeiro. Saber para onde seu dinheiro vai ajuda a tomar decisões intencionais.

Use nossa [Calculadora de Orçamento](/pt/budget-calculator) para criar seu plano de gastos personalizado.

## Métodos Populares de Orçamento

### A Regra 50/30/20

| Categoria | Porcentagem | Exemplo (R$5.000 renda) |
|-----------|-------------|-------------------------|
| Necessidades | 50% | R$2.500 |
| Desejos | 30% | R$1.500 |
| Poupança/Dívidas | 20% | R$1.000 |

### Exemplo de Orçamento Mensal

| Categoria | Valor |
|-----------|-------|
| Moradia | R$1.500 |
| Transporte | R$400 |
| Alimentação | R$500 |
| Serviços | R$200 |
| Seguros | R$300 |
| Pagamentos de Dívidas | R$400 |
| Poupança | R$500 |
| Entretenimento | R$200 |
| **Total** | **R$4.000** |

## Considerações Importantes

- **Rastreie Gastos Primeiro**: Saiba para onde o dinheiro vai antes de fazer um orçamento
- **Seja Realista**: Muito restritivo = fracasso

*Um orçamento é um plano, não uma restrição.*

## Perguntas Frequentes

### Como começo a fazer orçamento?

Rastreie todos os gastos por um mês. Categorize as despesas.

## Calculadoras Relacionadas

- [Calculadora de Poupança](/pt/savings-calculator)
- [Calculadora de Pagamento de Cartão](/pt/credit-card-payoff-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop",
    relatedCalculator: "budget-calculator",
    tags: ["budget", "spending", "money-management", "finance"],
    category: "finance",
    readingTime: 7,
  },

  // ========================================
  // POST 19: AUTO LOAN CALCULATOR
  // ========================================
  {
    slugEn: "auto-loan-calculator-guide",
    slugEs: "guia-calculadora-prestamo-auto",
    slugPt: "guia-calculadora-financiamento-veiculo",
    titleEn: "Auto Loan Calculator: Find Your Car Payment",
    titleEs: "Calculadora de Préstamo de Auto: Encuentra Tu Pago de Carro",
    titlePt: "Calculadora de Financiamento de Veículo: Encontre Seu Pagamento",
    excerptEn: "Calculate your monthly car payment and total loan cost. Compare different terms and down payments to find the best deal.",
    excerptEs: "Calcula tu pago mensual del auto y costo total del préstamo. Compara diferentes plazos y enganches.",
    excerptPt: "Calcule seu pagamento mensal do carro e custo total do empréstimo. Compare diferentes prazos e entradas.",
    contentEn: `Buying a car is a major financial decision. Understanding your payment before you shop helps you stay within budget and negotiate better.

Use our [Auto Loan Calculator](/en/auto-loan-calculator) to estimate your car payment.

## How Auto Loans Are Calculated

Auto loans use simple amortization, similar to other installment loans.

**M = P[r(1+r)^n] / [(1+r)^n - 1]**

### Example Calculation

$30,000 car, $5,000 down payment, 6% APR for 60 months:

| Detail | Amount |
|--------|--------|
| Loan Amount | $25,000 |
| Monthly Payment | $483 |
| Total Interest | $3,999 |
| **Total Cost** | **$28,999** |

### Term Comparison

Same $25,000 loan at 6%:

| Term | Payment | Total Interest |
|------|---------|----------------|
| 36 months | $760 | $2,362 |
| 48 months | $587 | $3,175 |
| 60 months | $483 | $3,999 |
| 72 months | $414 | $4,833 |

Longer terms = lower payments but much more interest.

## Important Considerations

- **Total Cost, Not Payment**: Focus on total cost, not just monthly payment
- **20/4/10 Rule**: 20% down, 4-year max term, 10% of income for payment
- **Gap Insurance**: Consider if loan exceeds car value
- **New vs Used Rates**: Used cars often have higher rates
- **Dealer Markup**: Compare dealer financing to bank/credit union rates

*Get pre-approved before shopping to know your budget and negotiate better.*

## Frequently Asked Questions

### How much car can I afford?

Follow the 20/4/10 rule: 20% down, max 4-year loan, payment under 10% of gross monthly income.

### Should I make a larger down payment?

Yes, if possible. Larger down payments mean lower payments, less interest, and avoiding being "underwater" on the loan.

### Is 0% financing a good deal?

Sometimes. Compare the 0% price to the cash price with rebates. Often you can get a lower total cost with rebates + regular financing.

### Should I pay off my car early?

If no prepayment penalty, yes. This saves interest. But prioritize high-interest debt and emergency fund first.

## Related Calculators

- [Loan Calculator](/en/loan-calculator)
- [Budget Calculator](/en/budget-calculator)
- [Credit Card Payoff Calculator](/en/credit-card-payoff-calculator)`,
    contentEs: `Comprar un auto es una decisión financiera importante. Entender tu pago antes de comprar te ayuda a mantenerte dentro del presupuesto.

Usa nuestra [Calculadora de Préstamo de Auto](/es/auto-loan-calculator) para estimar tu pago del carro.

## Cómo se Calculan los Préstamos de Auto

**M = P[r(1+r)^n] / [(1+r)^n - 1]**

### Ejemplo de Cálculo

Auto de $30,000, $5,000 de enganche, 6% APR por 60 meses:

| Detalle | Monto |
|---------|-------|
| Monto del Préstamo | $25,000 |
| Pago Mensual | $483 |
| Interés Total | $3,999 |
| **Costo Total** | **$28,999** |

### Comparación de Plazos

Mismo préstamo de $25,000 al 6%:

| Plazo | Pago | Interés Total |
|-------|------|---------------|
| 36 meses | $760 | $2,362 |
| 48 meses | $587 | $3,175 |
| 60 meses | $483 | $3,999 |
| 72 meses | $414 | $4,833 |

Plazos más largos = pagos más bajos pero mucho más interés.

## Consideraciones Importantes

- **Costo Total, No Pago**: Enfócate en el costo total, no solo el pago mensual
- **Regla 20/4/10**: 20% enganche, máximo 4 años, 10% del ingreso para pago
- **Tasas Nuevos vs Usados**: Autos usados frecuentemente tienen tasas más altas

*Obtén pre-aprobación antes de comprar para conocer tu presupuesto.*

## Preguntas Frecuentes

### ¿Cuánto auto puedo pagar?

Sigue la regla 20/4/10: 20% enganche, máximo préstamo de 4 años, pago bajo 10% del ingreso mensual bruto.

### ¿Debo hacer un enganche más grande?

Sí, si es posible. Enganches más grandes significan pagos más bajos y menos interés.

## Calculadoras Relacionadas

- [Calculadora de Préstamos](/es/loan-calculator)
- [Calculadora de Presupuesto](/es/budget-calculator)`,
    contentPt: `Comprar um carro é uma decisão financeira importante. Entender seu pagamento antes de comprar ajuda a ficar dentro do orçamento.

Use nossa [Calculadora de Financiamento de Veículo](/pt/auto-loan-calculator) para estimar seu pagamento do carro.

## Como os Financiamentos de Veículos São Calculados

**M = P[r(1+r)^n] / [(1+r)^n - 1]**

### Exemplo de Cálculo

Carro de R$30.000, R$5.000 de entrada, 6% ao ano por 60 meses:

| Detalhe | Valor |
|---------|-------|
| Valor do Empréstimo | R$25.000 |
| Pagamento Mensal | R$483 |
| Juros Totais | R$3.999 |
| **Custo Total** | **R$28.999** |

### Comparação de Prazos

Mesmo empréstimo de R$25.000 a 6%:

| Prazo | Pagamento | Juros Totais |
|-------|-----------|--------------|
| 36 meses | R$760 | R$2.362 |
| 48 meses | R$587 | R$3.175 |
| 60 meses | R$483 | R$3.999 |

## Considerações Importantes

- **Custo Total, Não Pagamento**: Foque no custo total, não apenas no pagamento mensal
- **Regra 20/4/10**: 20% entrada, máximo 4 anos, 10% da renda para pagamento

*Obtenha pré-aprovação antes de comprar para conhecer seu orçamento.*

## Perguntas Frequentes

### Quanto carro posso pagar?

Siga a regra 20/4/10: 20% entrada, máximo empréstimo de 4 anos.

## Calculadoras Relacionadas

- [Calculadora de Empréstimos](/pt/loan-calculator)
- [Calculadora de Orçamento](/pt/budget-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=630&fit=crop",
    relatedCalculator: "auto-loan-calculator",
    tags: ["auto-loan", "car", "financing", "finance"],
    category: "finance",
    readingTime: 7,
  },

  // ========================================
  // POST 20: MACRO CALCULATOR
  // ========================================
  {
    slugEn: "macro-calculator-guide",
    slugEs: "guia-calculadora-macros",
    slugPt: "guia-calculadora-macros",
    titleEn: "Macro Calculator: Optimize Your Protein, Carbs & Fats",
    titleEs: "Calculadora de Macros: Optimiza Tus Proteínas, Carbos y Grasas",
    titlePt: "Calculadora de Macros: Otimize Suas Proteínas, Carbos e Gorduras",
    excerptEn: "Calculate your ideal macronutrient split for weight loss, muscle gain, or maintenance. Personalized to your goals and activity level.",
    excerptEs: "Calcula tu división ideal de macronutrientes para pérdida de peso, ganancia muscular o mantenimiento.",
    excerptPt: "Calcule sua divisão ideal de macronutrientes para perda de peso, ganho muscular ou manutenção.",
    contentEn: `Counting macros takes nutrition beyond just calories. By tracking protein, carbs, and fats, you can optimize body composition and performance.

Use our [Macro Calculator](/en/macro-calculator) to find your ideal macro split.

## Understanding Macronutrients

### Protein (4 calories per gram)
- Builds and repairs muscle
- Keeps you full longer
- **Target**: 1.6-2.2g per kg bodyweight for active individuals

### Carbohydrates (4 calories per gram)
- Primary energy source
- Fuels workouts and brain function
- **Target**: 3-5g per kg for moderate activity

### Fat (9 calories per gram)
- Hormone production
- Nutrient absorption
- **Target**: 0.5-1.5g per kg bodyweight

## Common Macro Splits

| Goal | Protein | Carbs | Fat |
|------|---------|-------|-----|
| Fat Loss | 40% | 30% | 30% |
| Maintenance | 30% | 40% | 30% |
| Muscle Gain | 30% | 45% | 25% |
| Keto | 25% | 5% | 70% |

### Example Calculation

2,000 calorie diet for fat loss (40/30/30):

| Macro | Calories | Grams |
|-------|----------|-------|
| Protein (40%) | 800 | 200g |
| Carbs (30%) | 600 | 150g |
| Fat (30%) | 600 | 67g |

## Important Considerations

- **Protein Priority**: Hit protein target first; adjust carbs/fats around it
- **Quality Matters**: Whole foods beat processed regardless of macros
- **Flexibility**: Exact percentages matter less than consistency
- **Activity Adjustments**: More carbs on training days, less on rest days

*Macros are a tool, not a strict rule. Listen to your body.*

## Frequently Asked Questions

### Do I need to track macros?

Not everyone needs to. If you have specific fitness goals (gaining muscle, losing fat, performance), tracking helps. For general health, focusing on whole foods is often enough.

### What if I can't hit my protein target?

Protein supplements (whey, casein) can help. But try food first: chicken, fish, eggs, Greek yogurt, legumes.

### Should I count fiber in carbs?

Most people count total carbs. If you're very precise, you can use net carbs (total - fiber).

## Related Calculators

- [Calorie Calculator](/en/calorie-calculator)
- [TDEE Calculator](/en/tdee-calculator)
- [Protein Calculator](/en/protein-calculator)`,
    contentEs: `Contar macros lleva la nutrición más allá de solo calorías. Al rastrear proteínas, carbos y grasas, puedes optimizar la composición corporal.

Usa nuestra [Calculadora de Macros](/es/macro-calculator) para encontrar tu división ideal de macros.

## Entendiendo los Macronutrientes

### Proteína (4 calorías por gramo)
- Construye y repara músculo
- Te mantiene lleno más tiempo
- **Objetivo**: 1.6-2.2g por kg de peso corporal

### Carbohidratos (4 calorías por gramo)
- Fuente principal de energía
- Alimenta entrenamientos y función cerebral
- **Objetivo**: 3-5g por kg para actividad moderada

### Grasa (9 calorías por gramo)
- Producción de hormonas
- Absorción de nutrientes
- **Objetivo**: 0.5-1.5g por kg de peso corporal

## Divisiones Comunes de Macros

| Meta | Proteína | Carbos | Grasa |
|------|----------|--------|-------|
| Pérdida de Grasa | 40% | 30% | 30% |
| Mantenimiento | 30% | 40% | 30% |
| Ganancia Muscular | 30% | 45% | 25% |

### Ejemplo de Cálculo

Dieta de 2,000 calorías para pérdida de grasa (40/30/30):

| Macro | Calorías | Gramos |
|-------|----------|--------|
| Proteína (40%) | 800 | 200g |
| Carbos (30%) | 600 | 150g |
| Grasa (30%) | 600 | 67g |

## Consideraciones Importantes

- **Prioridad de Proteína**: Alcanza el objetivo de proteína primero
- **La Calidad Importa**: Alimentos enteros superan a procesados

*Los macros son una herramienta, no una regla estricta.*

## Preguntas Frecuentes

### ¿Necesito rastrear macros?

No todos necesitan hacerlo. Si tienes metas específicas de fitness, el rastreo ayuda.

### ¿Qué pasa si no puedo alcanzar mi objetivo de proteína?

Los suplementos de proteína pueden ayudar. Pero intenta comida primero: pollo, pescado, huevos, yogur griego.

## Calculadoras Relacionadas

- [Calculadora de Calorías](/es/calorie-calculator)
- [Calculadora TDEE](/es/tdee-calculator)
- [Calculadora de Proteína](/es/protein-calculator)`,
    contentPt: `Contar macros leva a nutrição além de apenas calorias. Ao rastrear proteínas, carbos e gorduras, você pode otimizar a composição corporal.

Use nossa [Calculadora de Macros](/pt/macro-calculator) para encontrar sua divisão ideal de macros.

## Entendendo os Macronutrientes

### Proteína (4 calorias por grama)
- Constrói e repara músculo
- Mantém você satisfeito por mais tempo
- **Meta**: 1,6-2,2g por kg de peso corporal

### Carboidratos (4 calorias por grama)
- Fonte principal de energia
- **Meta**: 3-5g por kg para atividade moderada

### Gordura (9 calorias por grama)
- Produção de hormônios
- **Meta**: 0,5-1,5g por kg de peso corporal

## Divisões Comuns de Macros

| Meta | Proteína | Carbos | Gordura |
|------|----------|--------|---------|
| Perda de Gordura | 40% | 30% | 30% |
| Manutenção | 30% | 40% | 30% |
| Ganho Muscular | 30% | 45% | 25% |

### Exemplo de Cálculo

Dieta de 2.000 calorias para perda de gordura (40/30/30):

| Macro | Calorias | Gramas |
|-------|----------|--------|
| Proteína (40%) | 800 | 200g |
| Carbos (30%) | 600 | 150g |
| Gordura (30%) | 600 | 67g |

## Considerações Importantes

- **Prioridade de Proteína**: Alcance a meta de proteína primeiro
- **Qualidade Importa**: Alimentos integrais superam processados

*Macros são uma ferramenta, não uma regra rígida.*

## Perguntas Frequentes

### Preciso rastrear macros?

Nem todos precisam. Se você tem metas específicas de fitness, o rastreamento ajuda.

## Calculadoras Relacionadas

- [Calculadora de Calorias](/pt/calorie-calculator)
- [Calculadora TDEE](/pt/tdee-calculator)
- [Calculadora de Proteína](/pt/protein-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=630&fit=crop",
    relatedCalculator: "macro-calculator",
    tags: ["macros", "nutrition", "protein", "diet"],
    category: "health",
    readingTime: 8,
  },

  // ========================================
  // POST 21: BMR CALCULATOR
  // ========================================
  {
    slugEn: "bmr-calculator-guide",
    slugEs: "guia-calculadora-tmb",
    slugPt: "guia-calculadora-tmb",
    titleEn: "BMR Calculator: Your Basal Metabolic Rate Explained",
    titleEs: "Calculadora de TMB: Tu Tasa Metabólica Basal Explicada",
    titlePt: "Calculadora de TMB: Sua Taxa Metabólica Basal Explicada",
    excerptEn: "Calculate how many calories your body burns at rest. Understanding BMR is the first step to effective weight management.",
    excerptEs: "Calcula cuántas calorías quema tu cuerpo en reposo. Entender la TMB es el primer paso para manejar el peso.",
    excerptPt: "Calcule quantas calorias seu corpo queima em repouso. Entender a TMB é o primeiro passo para gerenciar o peso.",
    contentEn: `Your Basal Metabolic Rate (BMR) is the number of calories your body needs to perform basic life-sustaining functions while at complete rest.

Use our [BMR Calculator](/en/bmr-calculator) to find your baseline calorie burn.

## What Is BMR?

BMR accounts for 60-75% of daily calorie burn and includes:
- Breathing
- Blood circulation
- Cell production
- Brain function
- Body temperature regulation

### The Mifflin-St Jeor Formula

**Men**: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5

**Women**: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161

### Example Calculation

30-year-old man, 180 cm, 80 kg:

BMR = (10 × 80) + (6.25 × 180) - (5 × 30) + 5
BMR = 800 + 1,125 - 150 + 5 = **1,780 calories/day**

This is calories burned doing absolutely nothing.

## BMR vs TDEE

| Metric | What It Measures |
|--------|------------------|
| BMR | Calories at complete rest |
| TDEE | BMR + all daily activity |

TDEE = BMR × Activity Factor (1.2 to 1.9)

## Factors That Affect BMR

- **Age**: BMR decreases ~2% per decade after 20
- **Muscle Mass**: More muscle = higher BMR
- **Sex**: Men typically have higher BMR
- **Genetics**: Natural variation of 5-10%
- **Hormones**: Thyroid function affects metabolism

## Important Considerations

- **BMR Is Not Eating Target**: You need more calories for daily function
- **Crash Diets Lower BMR**: Severe restriction slows metabolism
- **Build Muscle**: Strength training can raise BMR
- **Accuracy**: Formulas estimate; actual BMR varies

*BMR is a starting point for calculating total calorie needs.*

## Frequently Asked Questions

### Can I eat at my BMR to lose weight?

No. Eating at BMR means severe deficit since you're active. Eat at TDEE minus 300-500 for safe weight loss.

### How can I increase my BMR?

Build muscle through strength training. Each pound of muscle burns ~6 calories at rest vs ~2 for fat.

### Why is my friend's BMR higher than mine?

Muscle mass, height, age, and genetics all play roles. Someone taller or more muscular will have higher BMR.

## Related Calculators

- [TDEE Calculator](/en/tdee-calculator)
- [Calorie Calculator](/en/calorie-calculator)
- [Macro Calculator](/en/macro-calculator)`,
    contentEs: `Tu Tasa Metabólica Basal (TMB) es el número de calorías que tu cuerpo necesita para realizar funciones básicas de mantenimiento de vida en reposo completo.

Usa nuestra [Calculadora de TMB](/es/bmr-calculator) para encontrar tu quema calórica base.

## ¿Qué es la TMB?

La TMB representa el 60-75% de la quema calórica diaria e incluye:
- Respiración
- Circulación sanguínea
- Producción celular
- Función cerebral
- Regulación de temperatura corporal

### La Fórmula Mifflin-St Jeor

**Hombres**: TMB = (10 × peso en kg) + (6.25 × altura en cm) - (5 × edad) + 5

**Mujeres**: TMB = (10 × peso en kg) + (6.25 × altura en cm) - (5 × edad) - 161

### Ejemplo de Cálculo

Hombre de 30 años, 180 cm, 80 kg:

TMB = (10 × 80) + (6.25 × 180) - (5 × 30) + 5
TMB = 800 + 1,125 - 150 + 5 = **1,780 calorías/día**

## TMB vs TDEE

| Métrica | Qué Mide |
|---------|----------|
| TMB | Calorías en reposo completo |
| TDEE | TMB + toda actividad diaria |

## Factores que Afectan la TMB

- **Edad**: La TMB disminuye ~2% por década después de los 20
- **Masa Muscular**: Más músculo = mayor TMB
- **Sexo**: Los hombres típicamente tienen mayor TMB

## Consideraciones Importantes

- **TMB No Es Meta de Alimentación**: Necesitas más calorías para función diaria
- **Dietas Extremas Bajan la TMB**: La restricción severa ralentiza el metabolismo
- **Construye Músculo**: El entrenamiento de fuerza puede aumentar la TMB

*La TMB es un punto de partida para calcular necesidades calóricas totales.*

## Preguntas Frecuentes

### ¿Puedo comer en mi TMB para perder peso?

No. Comer en TMB significa déficit severo ya que estás activo. Come en TDEE menos 300-500 para pérdida segura.

### ¿Cómo puedo aumentar mi TMB?

Construye músculo a través del entrenamiento de fuerza.

## Calculadoras Relacionadas

- [Calculadora TDEE](/es/tdee-calculator)
- [Calculadora de Calorías](/es/calorie-calculator)
- [Calculadora de Macros](/es/macro-calculator)`,
    contentPt: `Sua Taxa Metabólica Basal (TMB) é o número de calorias que seu corpo precisa para realizar funções básicas de manutenção da vida em repouso completo.

Use nossa [Calculadora de TMB](/pt/bmr-calculator) para encontrar sua queima calórica base.

## O Que É TMB?

A TMB representa 60-75% da queima calórica diária e inclui:
- Respiração
- Circulação sanguínea
- Produção celular
- Função cerebral

### A Fórmula Mifflin-St Jeor

**Homens**: TMB = (10 × peso em kg) + (6.25 × altura em cm) - (5 × idade) + 5

**Mulheres**: TMB = (10 × peso em kg) + (6.25 × altura em cm) - (5 × idade) - 161

### Exemplo de Cálculo

Homem de 30 anos, 180 cm, 80 kg:

TMB = (10 × 80) + (6.25 × 180) - (5 × 30) + 5
TMB = 800 + 1.125 - 150 + 5 = **1.780 calorias/dia**

## TMB vs TDEE

| Métrica | O Que Mede |
|---------|------------|
| TMB | Calorias em repouso completo |
| TDEE | TMB + toda atividade diária |

## Fatores que Afetam a TMB

- **Idade**: A TMB diminui ~2% por década após os 20
- **Massa Muscular**: Mais músculo = maior TMB
- **Sexo**: Homens tipicamente têm maior TMB

## Considerações Importantes

- **TMB Não É Meta de Alimentação**: Você precisa de mais calorias para função diária
- **Dietas Extremas Baixam a TMB**: Restrição severa desacelera o metabolismo

*A TMB é um ponto de partida para calcular necessidades calóricas totais.*

## Perguntas Frequentes

### Posso comer na minha TMB para perder peso?

Não. Comer na TMB significa déficit severo já que você está ativo.

## Calculadoras Relacionadas

- [Calculadora TDEE](/pt/tdee-calculator)
- [Calculadora de Calorias](/pt/calorie-calculator)
- [Calculadora de Macros](/pt/macro-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=630&fit=crop",
    relatedCalculator: "bmr-calculator",
    tags: ["bmr", "metabolism", "calories", "health"],
    category: "health",
    readingTime: 7,
  },

  // ========================================
  // POST 22: AGE CALCULATOR
  // ========================================
  {
    slugEn: "age-calculator-guide",
    slugEs: "guia-calculadora-edad",
    slugPt: "guia-calculadora-idade",
    titleEn: "Age Calculator: Find Your Exact Age",
    titleEs: "Calculadora de Edad: Encuentra Tu Edad Exacta",
    titlePt: "Calculadora de Idade: Encontre Sua Idade Exata",
    excerptEn: "Calculate your exact age in years, months, and days. Find out how many days you have lived and when your next birthday is.",
    excerptEs: "Calcula tu edad exacta en años, meses y días. Descubre cuántos días has vivido y cuándo es tu próximo cumpleaños.",
    excerptPt: "Calcule sua idade exata em anos, meses e dias. Descubra quantos dias você viveu e quando é seu próximo aniversário.",
    contentEn: `Sometimes you need to know your exact age - for legal documents, insurance, or just curiosity. Our calculator gives you the precise answer.

Use our [Age Calculator](/en/age-calculator) to find your exact age.

## How Age Is Calculated

Age calculation considers:
- Birth date
- Current date (or target date)
- Calendar variations (leap years, month lengths)

### Example Calculation

Born: March 15, 1990
Today: January 26, 2025

| Measure | Value |
|---------|-------|
| Years | 34 |
| Months | 10 |
| Days | 11 |
| **Exact Age** | **34 years, 10 months, 11 days** |

### Additional Stats

| Metric | Value |
|--------|-------|
| Total Days Lived | 12,735 |
| Total Weeks | 1,819 |
| Total Months | 418 |
| Next Birthday | March 15, 2025 (48 days) |

## Common Uses for Age Calculation

- **Legal Requirements**: Voting, driving, drinking age verification
- **Insurance**: Life insurance age bands
- **Retirement**: Social Security eligibility
- **Medical**: Age-specific health screenings
- **Documents**: Visa applications, passports

## Important Considerations

- **Legal Age**: Some jurisdictions count from birth date, others from day after
- **Time Zones**: Birth certificate time zone may differ from current
- **Leap Year Births**: Feb 29 birthdays celebrated Mar 1 or Feb 28 in non-leap years

*For legal purposes, consult official guidelines for your jurisdiction.*

## Frequently Asked Questions

### How do I calculate age in months?

Count complete months from birth date. Partial months are counted as days.

### What if I was born on February 29?

In non-leap years, your birthday is typically recognized as February 28 or March 1, depending on jurisdiction.

### Does time of birth matter for age?

For most purposes, only the date matters. For precise legal age (like turning 21), some jurisdictions consider exact time.

## Related Calculators

- [Pregnancy Calculator](/en/pregnancy-calculator)
- [Date Calculator](/en/date-calculator)
- [BMI Calculator](/en/bmi-calculator)`,
    contentEs: `A veces necesitas saber tu edad exacta - para documentos legales, seguros o simplemente curiosidad.

Usa nuestra [Calculadora de Edad](/es/age-calculator) para encontrar tu edad exacta.

## Cómo se Calcula la Edad

El cálculo de edad considera:
- Fecha de nacimiento
- Fecha actual (o fecha objetivo)
- Variaciones del calendario (años bisiestos, longitud de meses)

### Ejemplo de Cálculo

Nacido: 15 de marzo de 1990
Hoy: 26 de enero de 2025

| Medida | Valor |
|--------|-------|
| Años | 34 |
| Meses | 10 |
| Días | 11 |
| **Edad Exacta** | **34 años, 10 meses, 11 días** |

### Estadísticas Adicionales

| Métrica | Valor |
|---------|-------|
| Total de Días Vividos | 12,735 |
| Total de Semanas | 1,819 |
| Próximo Cumpleaños | 15 de marzo de 2025 (48 días) |

## Usos Comunes del Cálculo de Edad

- **Requisitos Legales**: Verificación de edad para votar, conducir
- **Seguros**: Bandas de edad para seguros de vida
- **Jubilación**: Elegibilidad de Seguro Social
- **Documentos**: Solicitudes de visa, pasaportes

## Consideraciones Importantes

- **Edad Legal**: Algunas jurisdicciones cuentan desde la fecha de nacimiento, otras desde el día después
- **Nacimientos en Año Bisiesto**: Los cumpleaños del 29 de febrero se celebran el 1 de marzo o 28 de febrero

*Para propósitos legales, consulta las guías oficiales de tu jurisdicción.*

## Preguntas Frecuentes

### ¿Cómo calculo la edad en meses?

Cuenta los meses completos desde la fecha de nacimiento.

### ¿Qué pasa si nací el 29 de febrero?

En años no bisiestos, tu cumpleaños típicamente se reconoce como 28 de febrero o 1 de marzo.

## Calculadoras Relacionadas

- [Calculadora de Embarazo](/es/pregnancy-calculator)
- [Calculadora de Fechas](/es/date-calculator)
- [Calculadora de IMC](/es/bmi-calculator)`,
    contentPt: `Às vezes você precisa saber sua idade exata - para documentos legais, seguros ou apenas curiosidade.

Use nossa [Calculadora de Idade](/pt/age-calculator) para encontrar sua idade exata.

## Como a Idade É Calculada

O cálculo de idade considera:
- Data de nascimento
- Data atual (ou data alvo)
- Variações do calendário (anos bissextos, comprimento dos meses)

### Exemplo de Cálculo

Nascido: 15 de março de 1990
Hoje: 26 de janeiro de 2025

| Medida | Valor |
|--------|-------|
| Anos | 34 |
| Meses | 10 |
| Dias | 11 |
| **Idade Exata** | **34 anos, 10 meses, 11 dias** |

### Estatísticas Adicionais

| Métrica | Valor |
|---------|-------|
| Total de Dias Vividos | 12.735 |
| Total de Semanas | 1.819 |
| Próximo Aniversário | 15 de março de 2025 (48 dias) |

## Usos Comuns do Cálculo de Idade

- **Requisitos Legais**: Verificação de idade para votar, dirigir
- **Seguros**: Faixas de idade para seguros de vida
- **Documentos**: Solicitações de visto, passaportes

## Considerações Importantes

- **Idade Legal**: Algumas jurisdições contam desde a data de nascimento, outras desde o dia seguinte
- **Nascimentos em Ano Bissexto**: Aniversários de 29 de fevereiro são celebrados em 1 de março ou 28 de fevereiro

*Para fins legais, consulte as diretrizes oficiais da sua jurisdição.*

## Perguntas Frequentes

### Como calculo a idade em meses?

Conte os meses completos desde a data de nascimento.

### E se eu nasci em 29 de fevereiro?

Em anos não bissextos, seu aniversário tipicamente é reconhecido como 28 de fevereiro ou 1 de março.

## Calculadoras Relacionadas

- [Calculadora de Gravidez](/pt/pregnancy-calculator)
- [Calculadora de Datas](/pt/date-calculator)
- [Calculadora de IMC](/pt/bmi-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop",
    relatedCalculator: "age-calculator",
    tags: ["age", "birthday", "date", "everyday"],
    category: "everyday",
    readingTime: 5,
  },

  // ========================================
  // POST 23: NET WORTH CALCULATOR
  // ========================================
  {
    slugEn: "net-worth-calculator-guide",
    slugEs: "guia-calculadora-patrimonio-neto",
    slugPt: "guia-calculadora-patrimonio-liquido",
    titleEn: "Net Worth Calculator: What Are You Really Worth?",
    titleEs: "Calculadora de Patrimonio Neto: ¿Cuánto Vales Realmente?",
    titlePt: "Calculadora de Patrimônio Líquido: Quanto Você Realmente Vale?",
    excerptEn: "Calculate your net worth by totaling assets and subtracting liabilities. Track your financial progress over time.",
    excerptEs: "Calcula tu patrimonio neto sumando activos y restando pasivos. Rastrea tu progreso financiero con el tiempo.",
    excerptPt: "Calcule seu patrimônio líquido somando ativos e subtraindo passivos. Acompanhe seu progresso financeiro.",
    contentEn: `Net worth is the single best measure of your overall financial health. It shows the big picture beyond just income or savings.

Use our [Net Worth Calculator](/en/net-worth-calculator) to calculate your current financial position.

## How Net Worth Is Calculated

**Net Worth = Total Assets - Total Liabilities**

### Assets (What You Own)

| Category | Examples |
|----------|----------|
| Cash & Savings | Bank accounts, emergency fund |
| Investments | Stocks, bonds, 401(k), IRA |
| Real Estate | Home equity, rental properties |
| Vehicles | Car, motorcycle (current value) |
| Other | Business equity, valuables |

### Liabilities (What You Owe)

| Category | Examples |
|----------|----------|
| Mortgage | Remaining home loan balance |
| Student Loans | Education debt |
| Auto Loans | Car financing balance |
| Credit Cards | Outstanding balances |
| Other Debt | Personal loans, medical debt |

### Example Calculation

| Assets | Amount |
|--------|--------|
| Savings | $15,000 |
| 401(k) | $85,000 |
| Home Value | $350,000 |
| Car Value | $20,000 |
| **Total Assets** | **$470,000** |

| Liabilities | Amount |
|-------------|--------|
| Mortgage | $280,000 |
| Student Loans | $25,000 |
| Car Loan | $12,000 |
| Credit Cards | $3,000 |
| **Total Liabilities** | **$320,000** |

**Net Worth = $470,000 - $320,000 = $150,000**

## Important Considerations

- **Track Over Time**: Net worth change matters more than a single number
- **Home Equity**: Your home is an asset, but don't count on it for retirement income
- **Illiquid Assets**: Some assets can't be easily converted to cash
- **Negative Net Worth**: Common when young; focus on the trend

*Calculate your net worth quarterly or annually to track progress.*

## Frequently Asked Questions

### What is a good net worth?

It depends on age and income. A common benchmark: by 30, have 1x salary saved; by 40, have 3x; by 50, have 6x.

### Should I include my home in net worth?

Yes, but track "investable net worth" (excluding home) separately for retirement planning.

### Is negative net worth bad?

It's common when young with student loans or a new mortgage. Focus on the trend improving over time.

## Related Calculators

- [Budget Calculator](/en/budget-calculator)
- [Savings Calculator](/en/savings-calculator)
- [Retirement Calculator](/en/retirement-calculator)`,
    contentEs: `El patrimonio neto es la mejor medida individual de tu salud financiera general. Muestra el panorama general más allá de solo ingresos o ahorros.

Usa nuestra [Calculadora de Patrimonio Neto](/es/net-worth-calculator) para calcular tu posición financiera actual.

## Cómo se Calcula el Patrimonio Neto

**Patrimonio Neto = Total de Activos - Total de Pasivos**

### Activos (Lo que Posees)

| Categoría | Ejemplos |
|-----------|----------|
| Efectivo y Ahorros | Cuentas bancarias, fondo de emergencia |
| Inversiones | Acciones, bonos, 401(k), IRA |
| Bienes Raíces | Valor de la casa, propiedades de alquiler |
| Vehículos | Auto, moto (valor actual) |

### Pasivos (Lo que Debes)

| Categoría | Ejemplos |
|-----------|----------|
| Hipoteca | Balance restante del préstamo |
| Préstamos Estudiantiles | Deuda de educación |
| Préstamos de Auto | Balance de financiamiento |
| Tarjetas de Crédito | Balances pendientes |

### Ejemplo de Cálculo

| Activos | Monto |
|---------|-------|
| Ahorros | $15,000 |
| 401(k) | $85,000 |
| Valor de Casa | $350,000 |
| Valor de Auto | $20,000 |
| **Total Activos** | **$470,000** |

| Pasivos | Monto |
|---------|-------|
| Hipoteca | $280,000 |
| Préstamos Estudiantiles | $25,000 |
| Préstamo de Auto | $12,000 |
| Tarjetas de Crédito | $3,000 |
| **Total Pasivos** | **$320,000** |

**Patrimonio Neto = $470,000 - $320,000 = $150,000**

## Consideraciones Importantes

- **Rastrea con el Tiempo**: El cambio de patrimonio neto importa más que un solo número
- **Patrimonio Neto Negativo**: Común cuando eres joven; enfócate en la tendencia

*Calcula tu patrimonio neto trimestral o anualmente para rastrear el progreso.*

## Preguntas Frecuentes

### ¿Qué es un buen patrimonio neto?

Depende de edad e ingresos. Un punto de referencia común: a los 30, tener 1x salario ahorrado; a los 40, 3x; a los 50, 6x.

### ¿Debo incluir mi casa en el patrimonio neto?

Sí, pero rastrea el "patrimonio neto invertible" (excluyendo casa) por separado.

## Calculadoras Relacionadas

- [Calculadora de Presupuesto](/es/budget-calculator)
- [Calculadora de Ahorros](/es/savings-calculator)
- [Calculadora de Jubilación](/es/retirement-calculator)`,
    contentPt: `O patrimônio líquido é a melhor medida individual da sua saúde financeira geral.

Use nossa [Calculadora de Patrimônio Líquido](/pt/net-worth-calculator) para calcular sua posição financeira atual.

## Como o Patrimônio Líquido É Calculado

**Patrimônio Líquido = Total de Ativos - Total de Passivos**

### Ativos (O que Você Possui)

| Categoria | Exemplos |
|-----------|----------|
| Dinheiro e Poupança | Contas bancárias, fundo de emergência |
| Investimentos | Ações, títulos, previdência |
| Imóveis | Valor da casa, propriedades de aluguel |
| Veículos | Carro, moto (valor atual) |

### Passivos (O que Você Deve)

| Categoria | Exemplos |
|-----------|----------|
| Financiamento Imobiliário | Saldo restante do empréstimo |
| Empréstimos Estudantis | Dívida de educação |
| Financiamento de Veículo | Saldo do financiamento |
| Cartões de Crédito | Saldos pendentes |

### Exemplo de Cálculo

**Patrimônio Líquido = R$470.000 - R$320.000 = R$150.000**

## Considerações Importantes

- **Acompanhe ao Longo do Tempo**: A mudança do patrimônio líquido importa mais que um único número
- **Patrimônio Líquido Negativo**: Comum quando jovem; foque na tendência

*Calcule seu patrimônio líquido trimestral ou anualmente para acompanhar o progresso.*

## Perguntas Frequentes

### O que é um bom patrimônio líquido?

Depende da idade e renda. Um benchmark comum: aos 30, ter 1x salário poupado; aos 40, 3x; aos 50, 6x.

### Devo incluir minha casa no patrimônio líquido?

Sim, mas acompanhe o "patrimônio líquido investível" (excluindo casa) separadamente.

## Calculadoras Relacionadas

- [Calculadora de Orçamento](/pt/budget-calculator)
- [Calculadora de Poupança](/pt/savings-calculator)
- [Calculadora de Aposentadoria](/pt/retirement-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1565373679579-af5cf42fb9ef?w=1200&h=630&fit=crop",
    relatedCalculator: "net-worth-calculator",
    tags: ["net-worth", "assets", "liabilities", "finance"],
    category: "finance",
    readingTime: 7,
  },

  // ========================================
  // POST 24: WATER INTAKE CALCULATOR
  // ========================================
  {
    slugEn: "water-intake-calculator-guide",
    slugEs: "guia-calculadora-consumo-agua",
    slugPt: "guia-calculadora-consumo-agua",
    titleEn: "Water Intake Calculator: How Much Water Do You Need?",
    titleEs: "Calculadora de Consumo de Agua: ¿Cuánta Agua Necesitas?",
    titlePt: "Calculadora de Consumo de Água: Quanta Água Você Precisa?",
    excerptEn: "Calculate your daily water intake needs based on weight, activity level, and climate. Stay properly hydrated for optimal health.",
    excerptEs: "Calcula tus necesidades diarias de agua según peso, nivel de actividad y clima. Mantente hidratado para salud óptima.",
    excerptPt: "Calcule suas necessidades diárias de água com base no peso, nível de atividade e clima. Fique hidratado para saúde ideal.",
    contentEn: `Proper hydration is essential for energy, focus, digestion, and overall health. But how much water do you actually need?

Use our [Water Intake Calculator](/en/water-intake-calculator) to find your personalized hydration goal.

## How Water Needs Are Calculated

A common formula: **0.5-1 oz per pound of body weight**

Or in metric: **30-40 ml per kg of body weight**

### Factors That Increase Water Needs

- **Exercise**: Add 12 oz (350ml) per 30 minutes of activity
- **Hot Weather**: Add 16-32 oz (500-1000ml) on hot days
- **Altitude**: Higher altitudes increase water loss
- **Caffeine/Alcohol**: Both are diuretics; drink extra water
- **Illness**: Fever, vomiting, diarrhea increase needs

### Example Calculation

160 lb person, moderately active:

| Factor | Amount |
|--------|--------|
| Base (0.5 oz/lb) | 80 oz |
| Exercise (45 min) | +18 oz |
| **Daily Total** | **98 oz (~3 liters)** |

## Signs of Dehydration

- Dark yellow urine (aim for pale yellow)
- Thirst (you're already dehydrated)
- Fatigue and low energy
- Headaches
- Dry mouth and skin

## Important Considerations

- **Food Counts**: ~20% of water intake comes from food
- **All Fluids Count**: Coffee, tea, and other beverages contribute
- **Don't Overhydrate**: Hyponatremia (too much water) is dangerous
- **Spread Intake**: Don't drink it all at once; sip throughout day

*Adjust based on how you feel and urine color.*

## Frequently Asked Questions

### Does coffee count toward water intake?

Yes, despite being a mild diuretic. The water in coffee still hydrates you.

### Is 8 glasses a day enough?

It depends on your size and activity. 8 glasses (64 oz) is a reasonable starting point for sedentary adults.

### Can I drink too much water?

Yes. Hyponatremia (water intoxication) is rare but dangerous. Don't force excessive water intake.

## Related Calculators

- [Calorie Calculator](/en/calorie-calculator)
- [TDEE Calculator](/en/tdee-calculator)
- [Macro Calculator](/en/macro-calculator)`,
    contentEs: `La hidratación adecuada es esencial para la energía, concentración, digestión y salud general. Pero, ¿cuánta agua realmente necesitas?

Usa nuestra [Calculadora de Consumo de Agua](/es/water-intake-calculator) para encontrar tu meta de hidratación personalizada.

## Cómo se Calculan las Necesidades de Agua

Una fórmula común: **30-40 ml por kg de peso corporal**

### Factores que Aumentan las Necesidades de Agua

- **Ejercicio**: Agrega 350ml por 30 minutos de actividad
- **Clima Caliente**: Agrega 500-1000ml en días calurosos
- **Altitud**: Altitudes más altas aumentan la pérdida de agua
- **Cafeína/Alcohol**: Ambos son diuréticos; bebe agua extra
- **Enfermedad**: Fiebre, vómitos, diarrea aumentan las necesidades

### Ejemplo de Cálculo

Persona de 70 kg, moderadamente activa:

| Factor | Cantidad |
|--------|----------|
| Base (35 ml/kg) | 2,450 ml |
| Ejercicio (45 min) | +500 ml |
| **Total Diario** | **~3 litros** |

## Señales de Deshidratación

- Orina amarillo oscuro (apunta a amarillo pálido)
- Sed (ya estás deshidratado)
- Fatiga y baja energía
- Dolores de cabeza
- Boca y piel secas

## Consideraciones Importantes

- **La Comida Cuenta**: ~20% de la ingesta de agua viene de alimentos
- **Todos los Líquidos Cuentan**: Café, té y otras bebidas contribuyen
- **No Te Sobrehidrates**: La hiponatremia es peligrosa

*Ajusta según cómo te sientas y el color de la orina.*

## Preguntas Frecuentes

### ¿El café cuenta como ingesta de agua?

Sí, a pesar de ser un diurético leve. El agua en el café todavía te hidrata.

### ¿Son suficientes 8 vasos al día?

Depende de tu tamaño y actividad. 8 vasos es un punto de partida razonable para adultos sedentarios.

## Calculadoras Relacionadas

- [Calculadora de Calorías](/es/calorie-calculator)
- [Calculadora TDEE](/es/tdee-calculator)
- [Calculadora de Macros](/es/macro-calculator)`,
    contentPt: `A hidratação adequada é essencial para energia, foco, digestão e saúde geral. Mas quanta água você realmente precisa?

Use nossa [Calculadora de Consumo de Água](/pt/water-intake-calculator) para encontrar sua meta de hidratação personalizada.

## Como as Necessidades de Água São Calculadas

Uma fórmula comum: **30-40 ml por kg de peso corporal**

### Fatores que Aumentam as Necessidades de Água

- **Exercício**: Adicione 350ml por 30 minutos de atividade
- **Clima Quente**: Adicione 500-1000ml em dias quentes
- **Altitude**: Altitudes mais altas aumentam a perda de água
- **Cafeína/Álcool**: Ambos são diuréticos; beba água extra

### Exemplo de Cálculo

Pessoa de 70 kg, moderadamente ativa:

| Fator | Quantidade |
|-------|------------|
| Base (35 ml/kg) | 2.450 ml |
| Exercício (45 min) | +500 ml |
| **Total Diário** | **~3 litros** |

## Sinais de Desidratação

- Urina amarelo escuro (mire amarelo claro)
- Sede (você já está desidratado)
- Fadiga e baixa energia
- Dores de cabeça

## Considerações Importantes

- **A Comida Conta**: ~20% da ingestão de água vem de alimentos
- **Todos os Líquidos Contam**: Café, chá e outras bebidas contribuem
- **Não Se Sobrehidrate**: A hiponatremia é perigosa

*Ajuste com base em como você se sente e na cor da urina.*

## Perguntas Frequentes

### O café conta como ingestão de água?

Sim, apesar de ser um diurético leve. A água no café ainda hidrata você.

### 8 copos por dia são suficientes?

Depende do seu tamanho e atividade. 8 copos é um ponto de partida razoável.

## Calculadoras Relacionadas

- [Calculadora de Calorias](/pt/calorie-calculator)
- [Calculadora TDEE](/pt/tdee-calculator)
- [Calculadora de Macros](/pt/macro-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1200&h=630&fit=crop",
    relatedCalculator: "water-intake-calculator",
    tags: ["water", "hydration", "health", "fitness"],
    category: "health",
    readingTime: 6,
  },

  // ========================================
  // POST 25: PROTEIN CALCULATOR
  // ========================================
  {
    slugEn: "protein-calculator-guide",
    slugEs: "guia-calculadora-proteina",
    slugPt: "guia-calculadora-proteina",
    titleEn: "Protein Calculator: How Much Protein Do You Need?",
    titleEs: "Calculadora de Proteína: ¿Cuánta Proteína Necesitas?",
    titlePt: "Calculadora de Proteína: Quanta Proteína Você Precisa?",
    excerptEn: "Calculate your daily protein needs for muscle building, weight loss, or general health. Personalized to your goals and activity level.",
    excerptEs: "Calcula tus necesidades diarias de proteína para construcción muscular, pérdida de peso o salud general.",
    excerptPt: "Calcule suas necessidades diárias de proteína para construção muscular, perda de peso ou saúde geral.",
    contentEn: `Protein is essential for muscle building, recovery, and satiety. Getting the right amount supports your fitness goals and overall health.

Use our [Protein Calculator](/en/protein-calculator) to find your optimal protein intake.

## How Protein Needs Are Calculated

Protein needs vary based on goals and activity:

| Goal | Protein (g/kg bodyweight) |
|------|---------------------------|
| Sedentary Adult | 0.8g |
| Active Adult | 1.2-1.6g |
| Muscle Building | 1.6-2.2g |
| Weight Loss (preserve muscle) | 1.6-2.4g |
| Endurance Athlete | 1.2-1.6g |

### Example Calculation

180 lb (82 kg) person building muscle:

Target: 1.8g per kg
**Daily Protein = 82 × 1.8 = 148g**

### Protein Timing

| Timing | Purpose |
|--------|---------|
| Morning | Break overnight fast |
| Pre-workout (1-2 hrs) | Available energy |
| Post-workout (within 2 hrs) | Muscle recovery |
| Before bed | Overnight repair |

Aim for 20-40g per meal, spread throughout the day.

## Best Protein Sources

| Source | Protein per serving |
|--------|---------------------|
| Chicken breast (6 oz) | 54g |
| Greek yogurt (1 cup) | 20g |
| Eggs (2 large) | 12g |
| Salmon (6 oz) | 40g |
| Lentils (1 cup) | 18g |
| Whey protein (1 scoop) | 25g |

## Important Considerations

- **Quality Matters**: Complete proteins have all essential amino acids
- **Spread Intake**: Body can only use ~40g per sitting optimally
- **Kidney Health**: High protein is safe for healthy kidneys; consult doctor if kidney issues
- **Vegetarian Options**: Combine legumes + grains for complete protein

*Adjust based on results and how you feel.*

## Frequently Asked Questions

### Can I eat too much protein?

Excess protein is converted to energy or stored. It's hard to overeat protein, but balance with other nutrients.

### Is plant protein as good as animal protein?

Plant proteins can be complete if combined properly (rice + beans, for example). Some people may need slightly higher total protein on plant-based diets.

### Do I need protein supplements?

Only if you can't meet needs through food. Whole foods are preferable, but protein powder is convenient.

## Related Calculators

- [Macro Calculator](/en/macro-calculator)
- [Calorie Calculator](/en/calorie-calculator)
- [TDEE Calculator](/en/tdee-calculator)`,
    contentEs: `La proteína es esencial para la construcción muscular, recuperación y saciedad. Obtener la cantidad correcta apoya tus metas de fitness.

Usa nuestra [Calculadora de Proteína](/es/protein-calculator) para encontrar tu ingesta óptima de proteína.

## Cómo se Calculan las Necesidades de Proteína

Las necesidades de proteína varían según las metas y actividad:

| Meta | Proteína (g/kg peso corporal) |
|------|-------------------------------|
| Adulto Sedentario | 0.8g |
| Adulto Activo | 1.2-1.6g |
| Construcción Muscular | 1.6-2.2g |
| Pérdida de Peso | 1.6-2.4g |
| Atleta de Resistencia | 1.2-1.6g |

### Ejemplo de Cálculo

Persona de 82 kg construyendo músculo:

Objetivo: 1.8g por kg
**Proteína Diaria = 82 × 1.8 = 148g**

### Timing de Proteína

| Momento | Propósito |
|---------|-----------|
| Mañana | Romper el ayuno nocturno |
| Pre-entrenamiento (1-2 hrs) | Energía disponible |
| Post-entrenamiento (dentro de 2 hrs) | Recuperación muscular |
| Antes de dormir | Reparación nocturna |

Apunta a 20-40g por comida, distribuidos durante el día.

## Mejores Fuentes de Proteína

| Fuente | Proteína por porción |
|--------|----------------------|
| Pechuga de pollo (170g) | 54g |
| Yogur griego (1 taza) | 20g |
| Huevos (2 grandes) | 12g |
| Salmón (170g) | 40g |
| Lentejas (1 taza) | 18g |

## Consideraciones Importantes

- **La Calidad Importa**: Las proteínas completas tienen todos los aminoácidos esenciales
- **Distribuye la Ingesta**: El cuerpo solo puede usar ~40g por sentada óptimamente

*Ajusta según los resultados y cómo te sientas.*

## Preguntas Frecuentes

### ¿Puedo comer demasiada proteína?

El exceso de proteína se convierte en energía o se almacena. Es difícil comer demasiada proteína.

### ¿La proteína vegetal es tan buena como la animal?

Las proteínas vegetales pueden ser completas si se combinan adecuadamente (arroz + frijoles, por ejemplo).

## Calculadoras Relacionadas

- [Calculadora de Macros](/es/macro-calculator)
- [Calculadora de Calorías](/es/calorie-calculator)
- [Calculadora TDEE](/es/tdee-calculator)`,
    contentPt: `A proteína é essencial para construção muscular, recuperação e saciedade. Obter a quantidade certa apoia suas metas de fitness.

Use nossa [Calculadora de Proteína](/pt/protein-calculator) para encontrar sua ingestão ideal de proteína.

## Como as Necessidades de Proteína São Calculadas

As necessidades de proteína variam com base nas metas e atividade:

| Meta | Proteína (g/kg peso corporal) |
|------|-------------------------------|
| Adulto Sedentário | 0,8g |
| Adulto Ativo | 1,2-1,6g |
| Construção Muscular | 1,6-2,2g |
| Perda de Peso | 1,6-2,4g |

### Exemplo de Cálculo

Pessoa de 82 kg construindo músculo:

Meta: 1,8g por kg
**Proteína Diária = 82 × 1,8 = 148g**

### Timing de Proteína

| Momento | Propósito |
|---------|-----------|
| Manhã | Quebrar o jejum noturno |
| Pré-treino (1-2 hrs) | Energia disponível |
| Pós-treino (dentro de 2 hrs) | Recuperação muscular |
| Antes de dormir | Reparo noturno |

Mire 20-40g por refeição, distribuídos ao longo do dia.

## Melhores Fontes de Proteína

| Fonte | Proteína por porção |
|-------|---------------------|
| Peito de frango (170g) | 54g |
| Iogurte grego (1 xícara) | 20g |
| Ovos (2 grandes) | 12g |
| Salmão (170g) | 40g |
| Lentilhas (1 xícara) | 18g |

## Considerações Importantes

- **Qualidade Importa**: Proteínas completas têm todos os aminoácidos essenciais
- **Distribua a Ingestão**: O corpo só pode usar ~40g por refeição de forma ideal

*Ajuste com base nos resultados e em como você se sente.*

## Perguntas Frequentes

### Posso comer muita proteína?

O excesso de proteína é convertido em energia ou armazenado. É difícil comer proteína demais.

## Calculadoras Relacionadas

- [Calculadora de Macros](/pt/macro-calculator)
- [Calculadora de Calorias](/pt/calorie-calculator)
- [Calculadora TDEE](/pt/tdee-calculator)`,
    featuredImage: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=1200&h=630&fit=crop",
    relatedCalculator: "protein-calculator",
    tags: ["protein", "nutrition", "muscle", "fitness"],
    category: "health",
    readingTime: 7,
  },
];

async function main() {
  console.log("Seeding professional blog posts (Part 4 - MASSIVE)...\n");

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

  console.log(`\nPart 4 complete! Created ${created} posts.`);
  console.log(`Total posts in this batch: ${posts.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
