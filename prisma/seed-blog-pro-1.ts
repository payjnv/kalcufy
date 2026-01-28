import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  // ========================================
  // POST 1: COMPOUND INTEREST
  // ========================================
  {
    slugEn: "compound-interest-calculator-guide",
    slugEs: "guia-calculadora-interes-compuesto",
    slugPt: "guia-calculadora-juros-compostos",
    
    titleEn: "How Compound Interest Works (+ Free Calculator)",
    titleEs: "Como Funciona el Interes Compuesto (+ Calculadora Gratis)",
    titlePt: "Como Funcionam os Juros Compostos (+ Calculadora Gratis)",
    
    excerptEn: "Learn how compound interest grows your money exponentially. Use our free calculator to see your potential returns over time.",
    excerptEs: "Aprende como el interes compuesto hace crecer tu dinero exponencialmente. Usa nuestra calculadora gratis para ver tus retornos potenciales.",
    excerptPt: "Aprenda como os juros compostos fazem seu dinheiro crescer exponencialmente. Use nossa calculadora gratis para ver seus retornos potenciais.",
    
    contentEn: `Compound interest is one of the most powerful concepts in finance. Understanding how it works can help you make better decisions about saving and investing.

Use our [Compound Interest Calculator](/en/compound-interest-calculator) to see how your money can grow over time.

## How Compound Interest Works

Unlike simple interest, which only earns on your principal, compound interest earns interest on both your principal AND previously earned interest. This creates exponential growth.

### The Formula

**A = P(1 + r/n)^(nt)**

Where:
- **A** = Final amount
- **P** = Principal (initial investment)
- **r** = Annual interest rate (as decimal)
- **n** = Compounding frequency per year
- **t** = Time in years

### Example Calculation

Invest $10,000 at 7% annual interest for 20 years:

| Compounding | Final Amount | Interest Earned |
|-------------|--------------|-----------------|
| Annual | $38,697 | $28,697 |
| Monthly | $40,387 | $30,387 |
| Daily | $40,552 | $30,552 |

More frequent compounding = more growth.

## How to Interpret Your Results

After using the calculator, you will see:

- **Future Value**: Total amount after the investment period
- **Total Interest**: Money earned from interest alone
- **Growth Chart**: Visual representation of growth over time

A higher future value means your money worked harder for you.

## Important Considerations

- **Inflation**: A 7% return with 3% inflation gives ~4% real return
- **Taxes**: Investment gains may be taxable
- **Fees**: Account fees reduce effective returns
- **Risk**: Higher returns typically mean higher risk

*This calculator provides estimates for educational purposes only.*

## Frequently Asked Questions

### What is a good compound interest rate?

Historically, the stock market averages 7-10% annually. High-yield savings accounts offer 4-5% in 2024. A "good" rate depends on your risk tolerance.

### How often should interest compound?

More frequent compounding (daily or monthly) yields slightly more than annual compounding. The difference is more noticeable with higher rates and longer timeframes.

### When should I start investing?

As early as possible. Time is the most important factor in compound interest. Starting 10 years earlier can double your final amount.

### Is compound interest guaranteed?

No. Savings accounts offer guaranteed rates, but investment returns vary. Past performance does not guarantee future results.

## Related Calculators

- [Savings Calculator](/en/savings-calculator) - Plan your savings goals
- [Investment Calculator](/en/investment-calculator) - Project investment growth
- [Retirement Calculator](/en/retirement-calculator) - Plan for retirement`,

    contentEs: `El interes compuesto es uno de los conceptos mas poderosos en finanzas. Entender como funciona te ayudara a tomar mejores decisiones sobre ahorro e inversion.

Usa nuestra [Calculadora de Interes Compuesto](/es/compound-interest-calculator) para ver como puede crecer tu dinero con el tiempo.

## Como Funciona el Interes Compuesto

A diferencia del interes simple, que solo gana sobre tu capital, el interes compuesto gana interes sobre tu capital Y los intereses previamente ganados. Esto crea crecimiento exponencial.

### La Formula

**A = P(1 + r/n)^(nt)**

Donde:
- **A** = Monto final
- **P** = Principal (inversion inicial)
- **r** = Tasa de interes anual (como decimal)
- **n** = Frecuencia de capitalizacion por ano
- **t** = Tiempo en anos

### Ejemplo de Calculo

Invierte $10,000 al 7% de interes anual por 20 anos:

| Capitalizacion | Monto Final | Interes Ganado |
|----------------|-------------|----------------|
| Anual | $38,697 | $28,697 |
| Mensual | $40,387 | $30,387 |
| Diaria | $40,552 | $30,552 |

Mayor frecuencia de capitalizacion = mayor crecimiento.

## Como Interpretar tus Resultados

Despues de usar la calculadora, veras:

- **Valor Futuro**: Monto total despues del periodo de inversion
- **Interes Total**: Dinero ganado solo por intereses
- **Grafico de Crecimiento**: Representacion visual del crecimiento

Un valor futuro mas alto significa que tu dinero trabajo mas para ti.

## Consideraciones Importantes

- **Inflacion**: Un retorno del 7% con 3% de inflacion da ~4% de retorno real
- **Impuestos**: Las ganancias de inversion pueden ser gravables
- **Comisiones**: Las comisiones de cuenta reducen los retornos efectivos
- **Riesgo**: Mayores retornos tipicamente significan mayor riesgo

*Esta calculadora proporciona estimaciones solo con fines educativos.*

## Preguntas Frecuentes

### Cual es una buena tasa de interes compuesto?

Historicamente, el mercado de valores promedia 7-10% anualmente. Las cuentas de ahorro de alto rendimiento ofrecen 4-5% en 2024. Una tasa "buena" depende de tu tolerancia al riesgo.

### Con que frecuencia debe capitalizarse el interes?

La capitalizacion mas frecuente (diaria o mensual) rinde un poco mas que la anual. La diferencia es mas notable con tasas mas altas y plazos mas largos.

### Cuando debo empezar a invertir?

Lo antes posible. El tiempo es el factor mas importante en el interes compuesto. Empezar 10 anos antes puede duplicar tu monto final.

### Esta garantizado el interes compuesto?

No. Las cuentas de ahorro ofrecen tasas garantizadas, pero los retornos de inversion varian. El rendimiento pasado no garantiza resultados futuros.

## Calculadoras Relacionadas

- [Calculadora de Ahorros](/es/savings-calculator) - Planifica tus metas de ahorro
- [Calculadora de Inversiones](/es/investment-calculator) - Proyecta el crecimiento de inversiones
- [Calculadora de Jubilacion](/es/retirement-calculator) - Planifica tu retiro`,

    contentPt: `Os juros compostos sao um dos conceitos mais poderosos em financas. Entender como funcionam pode ajuda-lo a tomar melhores decisoes sobre poupanca e investimento.

Use nossa [Calculadora de Juros Compostos](/pt/compound-interest-calculator) para ver como seu dinheiro pode crescer ao longo do tempo.

## Como Funcionam os Juros Compostos

Diferente dos juros simples, que so rendem sobre seu principal, os juros compostos rendem juros sobre seu principal E os juros previamente ganhos. Isso cria crescimento exponencial.

### A Formula

**A = P(1 + r/n)^(nt)**

Onde:
- **A** = Montante final
- **P** = Principal (investimento inicial)
- **r** = Taxa de juros anual (como decimal)
- **n** = Frequencia de capitalizacao por ano
- **t** = Tempo em anos

### Exemplo de Calculo

Invista R$10.000 a 7% de juros anuais por 20 anos:

| Capitalizacao | Montante Final | Juros Ganhos |
|---------------|----------------|--------------|
| Anual | R$38.697 | R$28.697 |
| Mensal | R$40.387 | R$30.387 |
| Diaria | R$40.552 | R$30.552 |

Maior frequencia de capitalizacao = maior crescimento.

## Como Interpretar seus Resultados

Apos usar a calculadora, voce vera:

- **Valor Futuro**: Montante total apos o periodo de investimento
- **Juros Totais**: Dinheiro ganho apenas com juros
- **Grafico de Crescimento**: Representacao visual do crescimento

Um valor futuro maior significa que seu dinheiro trabalhou mais para voce.

## Consideracoes Importantes

- **Inflacao**: Um retorno de 7% com 3% de inflacao da ~4% de retorno real
- **Impostos**: Ganhos de investimento podem ser tributaveis
- **Taxas**: Taxas de conta reduzem os retornos efetivos
- **Risco**: Maiores retornos tipicamente significam maior risco

*Esta calculadora fornece estimativas apenas para fins educacionais.*

## Perguntas Frequentes

### Qual e uma boa taxa de juros compostos?

Historicamente, o mercado de acoes tem media de 7-10% anualmente. Contas de poupanca de alto rendimento oferecem 4-5% em 2024. Uma taxa "boa" depende da sua tolerancia ao risco.

### Com que frequencia os juros devem ser capitalizados?

Capitalizacao mais frequente (diaria ou mensal) rende um pouco mais que anual. A diferenca e mais notavel com taxas mais altas e prazos mais longos.

### Quando devo comecar a investir?

O mais cedo possivel. O tempo e o fator mais importante nos juros compostos. Comecar 10 anos antes pode dobrar seu montante final.

### Os juros compostos sao garantidos?

Nao. Contas de poupanca oferecem taxas garantidas, mas retornos de investimento variam. Desempenho passado nao garante resultados futuros.

## Calculadoras Relacionadas

- [Calculadora de Poupanca](/pt/savings-calculator) - Planeje suas metas de poupanca
- [Calculadora de Investimentos](/pt/investment-calculator) - Projete o crescimento de investimentos
- [Calculadora de Aposentadoria](/pt/retirement-calculator) - Planeje sua aposentadoria`,

    featuredImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop",
    relatedCalculator: "compound-interest-calculator",
    tags: ["compound-interest", "investing", "savings", "finance"],
    category: "finance",
    readingTime: 8,
  },

  // ========================================
  // POST 2: MORTGAGE CALCULATOR
  // ========================================
  {
    slugEn: "mortgage-calculator-guide",
    slugEs: "guia-calculadora-hipoteca",
    slugPt: "guia-calculadora-hipoteca",
    
    titleEn: "How to Calculate Your Mortgage Payment (+ Free Calculator)",
    titleEs: "Como Calcular tu Pago de Hipoteca (+ Calculadora Gratis)",
    titlePt: "Como Calcular seu Pagamento de Hipoteca (+ Calculadora Gratis)",
    
    excerptEn: "Understand how mortgage payments are calculated. Use our free calculator to estimate your monthly payment, total interest, and amortization schedule.",
    excerptEs: "Entiende como se calculan los pagos de hipoteca. Usa nuestra calculadora gratis para estimar tu pago mensual, interes total y calendario de amortizacion.",
    excerptPt: "Entenda como os pagamentos de hipoteca sao calculados. Use nossa calculadora gratis para estimar seu pagamento mensal, juros totais e cronograma de amortizacao.",
    
    contentEn: `Buying a home is likely the biggest financial decision you will make. Understanding how mortgage payments work helps you budget accurately and choose the right loan.

Use our [Mortgage Calculator](/en/mortgage-calculator) to estimate your monthly payment before you start house hunting.

## How Mortgage Payments Are Calculated

Your monthly mortgage payment consists of principal (the loan amount) and interest. Most calculators also include property taxes and insurance (PITI).

### The Formula

**M = P[r(1+r)^n] / [(1+r)^n - 1]**

Where:
- **M** = Monthly payment
- **P** = Principal (loan amount)
- **r** = Monthly interest rate (annual rate / 12)
- **n** = Total number of payments (years x 12)

### Example Calculation

$300,000 home with 20% down payment at 7% interest for 30 years:

| Component | Amount |
|-----------|--------|
| Loan Amount | $240,000 |
| Monthly P&I | $1,597 |
| Est. Taxes | $250 |
| Est. Insurance | $100 |
| **Total Payment** | **$1,947** |

Over 30 years, you will pay $335,000 in interest alone.

## How to Interpret Your Results

The calculator shows:

- **Monthly Payment**: What you pay each month
- **Total Interest**: Interest paid over the loan life
- **Amortization Schedule**: How each payment splits between principal and interest

In early years, most of your payment goes to interest. This shifts over time.

## Important Considerations

- **Down Payment**: 20% avoids PMI (private mortgage insurance)
- **Interest Rate**: Even 0.5% difference = thousands over loan life
- **Loan Term**: 15-year loans have higher payments but less total interest
- **Property Taxes**: Vary significantly by location
- **HOA Fees**: Not included in basic calculations

*Estimates are for planning purposes. Get official quotes from lenders.*

## Frequently Asked Questions

### How much house can I afford?

A common guideline is the 28/36 rule: spend no more than 28% of gross income on housing costs, and no more than 36% on total debt.

### Should I choose 15 or 30 year mortgage?

15-year mortgages have higher monthly payments but lower interest rates and total interest paid. 30-year offers flexibility with lower payments.

### What credit score do I need?

Conventional loans typically require 620+. FHA loans may accept 580+. Better scores get better rates.

### How much should my down payment be?

20% is ideal to avoid PMI. FHA allows 3.5%, some conventional loans allow 3%. Larger down payments mean lower monthly costs.

## Related Calculators

- [Loan Calculator](/en/loan-calculator) - General loan calculations
- [Budget Calculator](/en/budget-calculator) - Plan your housing budget
- [Net Worth Calculator](/en/net-worth-calculator) - Track your equity`,

    contentEs: `Comprar una casa es probablemente la decision financiera mas grande que tomaras. Entender como funcionan los pagos de hipoteca te ayuda a presupuestar con precision y elegir el prestamo correcto.

Usa nuestra [Calculadora de Hipoteca](/es/mortgage-calculator) para estimar tu pago mensual antes de empezar a buscar casa.

## Como se Calculan los Pagos de Hipoteca

Tu pago mensual de hipoteca consiste en principal (el monto del prestamo) e intereses. La mayoria de las calculadoras tambien incluyen impuestos de propiedad y seguro (PITI).

### La Formula

**M = P[r(1+r)^n] / [(1+r)^n - 1]**

Donde:
- **M** = Pago mensual
- **P** = Principal (monto del prestamo)
- **r** = Tasa de interes mensual (tasa anual / 12)
- **n** = Numero total de pagos (anos x 12)

### Ejemplo de Calculo

Casa de $300,000 con 20% de enganche al 7% de interes por 30 anos:

| Componente | Monto |
|------------|-------|
| Monto del Prestamo | $240,000 |
| P&I Mensual | $1,597 |
| Est. Impuestos | $250 |
| Est. Seguro | $100 |
| **Pago Total** | **$1,947** |

En 30 anos, pagaras $335,000 solo en intereses.

## Como Interpretar tus Resultados

La calculadora muestra:

- **Pago Mensual**: Lo que pagas cada mes
- **Interes Total**: Interes pagado durante la vida del prestamo
- **Calendario de Amortizacion**: Como se divide cada pago entre principal e interes

En los primeros anos, la mayor parte de tu pago va a intereses. Esto cambia con el tiempo.

## Consideraciones Importantes

- **Enganche**: 20% evita PMI (seguro hipotecario privado)
- **Tasa de Interes**: Incluso 0.5% de diferencia = miles durante la vida del prestamo
- **Plazo del Prestamo**: Prestamos de 15 anos tienen pagos mas altos pero menos interes total
- **Impuestos de Propiedad**: Varian significativamente por ubicacion
- **Cuotas HOA**: No incluidas en calculos basicos

*Las estimaciones son para fines de planificacion. Obtén cotizaciones oficiales de prestamistas.*

## Preguntas Frecuentes

### Cuanta casa puedo pagar?

Una guia comun es la regla 28/36: gasta no mas del 28% del ingreso bruto en costos de vivienda, y no mas del 36% en deuda total.

### Debo elegir hipoteca de 15 o 30 anos?

Las hipotecas de 15 anos tienen pagos mensuales mas altos pero tasas de interes mas bajas y menos interes total pagado. 30 anos ofrece flexibilidad con pagos mas bajos.

### Que puntaje de credito necesito?

Los prestamos convencionales tipicamente requieren 620+. Los prestamos FHA pueden aceptar 580+. Mejores puntajes obtienen mejores tasas.

### Cuanto debe ser mi enganche?

20% es ideal para evitar PMI. FHA permite 3.5%, algunos prestamos convencionales permiten 3%. Mayores enganches significan menores costos mensuales.

## Calculadoras Relacionadas

- [Calculadora de Prestamos](/es/loan-calculator) - Calculos generales de prestamos
- [Calculadora de Presupuesto](/es/budget-calculator) - Planifica tu presupuesto de vivienda
- [Calculadora de Patrimonio Neto](/es/net-worth-calculator) - Rastrea tu equidad`,

    contentPt: `Comprar uma casa e provavelmente a maior decisao financeira que voce fara. Entender como funcionam os pagamentos de hipoteca ajuda a orcar com precisao e escolher o emprestimo certo.

Use nossa [Calculadora de Hipoteca](/pt/mortgage-calculator) para estimar seu pagamento mensal antes de comecar a procurar casa.

## Como os Pagamentos de Hipoteca Sao Calculados

Seu pagamento mensal de hipoteca consiste em principal (o valor do emprestimo) e juros. A maioria das calculadoras tambem inclui impostos de propriedade e seguro (PITI).

### A Formula

**M = P[r(1+r)^n] / [(1+r)^n - 1]**

Onde:
- **M** = Pagamento mensal
- **P** = Principal (valor do emprestimo)
- **r** = Taxa de juros mensal (taxa anual / 12)
- **n** = Numero total de pagamentos (anos x 12)

### Exemplo de Calculo

Casa de R$300.000 com 20% de entrada a 7% de juros por 30 anos:

| Componente | Valor |
|------------|-------|
| Valor do Emprestimo | R$240.000 |
| P&J Mensal | R$1.597 |
| Est. Impostos | R$250 |
| Est. Seguro | R$100 |
| **Pagamento Total** | **R$1.947** |

Em 30 anos, voce pagara R$335.000 so em juros.

## Como Interpretar seus Resultados

A calculadora mostra:

- **Pagamento Mensal**: O que voce paga cada mes
- **Juros Totais**: Juros pagos durante a vida do emprestimo
- **Cronograma de Amortizacao**: Como cada pagamento se divide entre principal e juros

Nos primeiros anos, a maior parte do seu pagamento vai para juros. Isso muda com o tempo.

## Consideracoes Importantes

- **Entrada**: 20% evita PMI (seguro hipotecario privado)
- **Taxa de Juros**: Mesmo 0.5% de diferenca = milhares durante a vida do emprestimo
- **Prazo do Emprestimo**: Emprestimos de 15 anos tem pagamentos mais altos mas menos juros total
- **Impostos de Propriedade**: Variam significativamente por localizacao
- **Taxas de Condominio**: Nao incluidas em calculos basicos

*Estimativas sao para fins de planejamento. Obtenha cotacoes oficiais de credores.*

## Perguntas Frequentes

### Quanta casa posso pagar?

Uma diretriz comum e a regra 28/36: gaste no maximo 28% da renda bruta em custos de moradia, e no maximo 36% em divida total.

### Devo escolher hipoteca de 15 ou 30 anos?

Hipotecas de 15 anos tem pagamentos mensais mais altos mas taxas de juros mais baixas e menos juros total pago. 30 anos oferece flexibilidade com pagamentos mais baixos.

### Que pontuacao de credito preciso?

Emprestimos convencionais tipicamente requerem 620+. Emprestimos FHA podem aceitar 580+. Melhores pontuacoes conseguem melhores taxas.

### Quanto deve ser minha entrada?

20% e ideal para evitar PMI. FHA permite 3.5%, alguns emprestimos convencionais permitem 3%. Maiores entradas significam menores custos mensais.

## Calculadoras Relacionadas

- [Calculadora de Emprestimos](/pt/loan-calculator) - Calculos gerais de emprestimos
- [Calculadora de Orcamento](/pt/budget-calculator) - Planeje seu orcamento de moradia
- [Calculadora de Patrimonio Liquido](/pt/net-worth-calculator) - Rastreie seu patrimonio`,

    featuredImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=630&fit=crop",
    relatedCalculator: "mortgage-calculator",
    tags: ["mortgage", "home-buying", "real-estate", "finance"],
    category: "finance",
    readingTime: 9,
  },

  // ========================================
  // POST 3: BMI CALCULATOR
  // ========================================
  {
    slugEn: "bmi-calculator-guide",
    slugEs: "guia-calculadora-imc",
    slugPt: "guia-calculadora-imc",
    
    titleEn: "How to Calculate BMI and What It Means (+ Free Calculator)",
    titleEs: "Como Calcular el IMC y Que Significa (+ Calculadora Gratis)",
    titlePt: "Como Calcular o IMC e o Que Significa (+ Calculadora Gratis)",
    
    excerptEn: "Learn how Body Mass Index is calculated and what your BMI number actually means. Includes limitations and when to consult a doctor.",
    excerptEs: "Aprende como se calcula el Indice de Masa Corporal y que significa realmente tu numero de IMC. Incluye limitaciones y cuando consultar a un medico.",
    excerptPt: "Aprenda como o Indice de Massa Corporal e calculado e o que seu numero de IMC realmente significa. Inclui limitacoes e quando consultar um medico.",
    
    contentEn: `Body Mass Index (BMI) is a screening tool used to assess weight relative to height. While not a diagnostic tool, it provides a starting point for health conversations.

Use our [BMI Calculator](/en/bmi-calculator) to find your BMI and understand what it means.

## How BMI Is Calculated

BMI uses a simple formula that relates your weight to your height.

### The Formula

**BMI = weight (kg) / height (m)^2**

Or in imperial units:
**BMI = (weight (lbs) x 703) / height (inches)^2**

### Example Calculation

A person who is 5'10" (70 inches) and weighs 170 lbs:

BMI = (170 x 703) / (70 x 70) = 119,510 / 4,900 = **24.4**

This falls in the "Normal weight" category.

## BMI Categories

| BMI Range | Category |
|-----------|----------|
| Below 18.5 | Underweight |
| 18.5 - 24.9 | Normal weight |
| 25.0 - 29.9 | Overweight |
| 30.0 - 34.9 | Obesity Class I |
| 35.0 - 39.9 | Obesity Class II |
| 40.0+ | Obesity Class III |

These categories are based on WHO guidelines for adults.

## How to Interpret Your Results

BMI is a screening tool, not a diagnosis:

- **Normal range (18.5-24.9)**: Generally associated with lower health risks
- **Above 25**: May indicate increased risk for certain conditions
- **Below 18.5**: May indicate nutritional deficiency

Your actual health depends on many factors BMI does not measure.

## Important Limitations

BMI does NOT account for:

- **Muscle mass**: Athletes may have high BMI but low body fat
- **Age**: Body composition changes with age
- **Sex**: Men and women have different body compositions
- **Ethnicity**: Health risks vary across populations
- **Body fat distribution**: Where fat is stored matters

*BMI is one data point. Consult healthcare providers for complete assessment.*

## Frequently Asked Questions

### Is BMI accurate for athletes?

No. BMI cannot distinguish between muscle and fat. A muscular athlete may have a high BMI but excellent health. Body fat percentage is more accurate for athletes.

### Does BMI work for children?

Children use age and sex-specific BMI percentiles, not adult categories. A pediatrician should interpret childrens BMI.

### What is a healthy BMI for older adults?

Research suggests slightly higher BMI (23-30) may be protective for adults over 65. Discuss with your doctor.

### Should I try to achieve a specific BMI?

Focus on overall health habits rather than a number. Regular exercise, balanced nutrition, and preventive care matter more than BMI alone.

## Related Calculators

- [Body Fat Calculator](/en/body-fat-calculator) - More detailed body composition
- [Ideal Weight Calculator](/en/ideal-weight-calculator) - Multiple formulas
- [Calorie Calculator](/en/calorie-calculator) - Daily calorie needs`,

    contentEs: `El Indice de Masa Corporal (IMC) es una herramienta de deteccion utilizada para evaluar el peso en relacion con la altura. Aunque no es una herramienta de diagnostico, proporciona un punto de partida para conversaciones sobre salud.

Usa nuestra [Calculadora de IMC](/es/bmi-calculator) para encontrar tu IMC y entender lo que significa.

## Como se Calcula el IMC

El IMC usa una formula simple que relaciona tu peso con tu altura.

### La Formula

**IMC = peso (kg) / altura (m)^2**

O en unidades imperiales:
**IMC = (peso (lbs) x 703) / altura (pulgadas)^2**

### Ejemplo de Calculo

Una persona que mide 1.78m y pesa 77 kg:

IMC = 77 / (1.78 x 1.78) = 77 / 3.17 = **24.3**

Esto cae en la categoria de "Peso normal".

## Categorias de IMC

| Rango de IMC | Categoria |
|--------------|-----------|
| Menor a 18.5 | Bajo peso |
| 18.5 - 24.9 | Peso normal |
| 25.0 - 29.9 | Sobrepeso |
| 30.0 - 34.9 | Obesidad Clase I |
| 35.0 - 39.9 | Obesidad Clase II |
| 40.0+ | Obesidad Clase III |

Estas categorias se basan en las guias de la OMS para adultos.

## Como Interpretar tus Resultados

El IMC es una herramienta de deteccion, no un diagnostico:

- **Rango normal (18.5-24.9)**: Generalmente asociado con menores riesgos de salud
- **Mayor a 25**: Puede indicar mayor riesgo de ciertas condiciones
- **Menor a 18.5**: Puede indicar deficiencia nutricional

Tu salud real depende de muchos factores que el IMC no mide.

## Limitaciones Importantes

El IMC NO considera:

- **Masa muscular**: Los atletas pueden tener IMC alto pero baja grasa corporal
- **Edad**: La composicion corporal cambia con la edad
- **Sexo**: Hombres y mujeres tienen diferentes composiciones corporales
- **Etnia**: Los riesgos de salud varian entre poblaciones
- **Distribucion de grasa**: Donde se almacena la grasa importa

*El IMC es un dato. Consulta proveedores de salud para una evaluacion completa.*

## Preguntas Frecuentes

### Es preciso el IMC para atletas?

No. El IMC no puede distinguir entre musculo y grasa. Un atleta musculoso puede tener un IMC alto pero excelente salud. El porcentaje de grasa corporal es mas preciso para atletas.

### Funciona el IMC para ninos?

Los ninos usan percentiles de IMC especificos para edad y sexo, no categorias de adultos. Un pediatra debe interpretar el IMC de los ninos.

### Cual es un IMC saludable para adultos mayores?

La investigacion sugiere que un IMC ligeramente mas alto (23-30) puede ser protector para adultos mayores de 65. Discute con tu medico.

### Debo intentar alcanzar un IMC especifico?

Enfocate en habitos de salud generales en lugar de un numero. El ejercicio regular, la nutricion balanceada y el cuidado preventivo importan mas que solo el IMC.

## Calculadoras Relacionadas

- [Calculadora de Grasa Corporal](/es/body-fat-calculator) - Composicion corporal mas detallada
- [Calculadora de Peso Ideal](/es/ideal-weight-calculator) - Multiples formulas
- [Calculadora de Calorias](/es/calorie-calculator) - Necesidades caloricas diarias`,

    contentPt: `O Indice de Massa Corporal (IMC) e uma ferramenta de triagem usada para avaliar o peso em relacao a altura. Embora nao seja uma ferramenta de diagnostico, fornece um ponto de partida para conversas sobre saude.

Use nossa [Calculadora de IMC](/pt/bmi-calculator) para encontrar seu IMC e entender o que significa.

## Como o IMC e Calculado

O IMC usa uma formula simples que relaciona seu peso com sua altura.

### A Formula

**IMC = peso (kg) / altura (m)^2**

Ou em unidades imperiais:
**IMC = (peso (lbs) x 703) / altura (polegadas)^2**

### Exemplo de Calculo

Uma pessoa que mede 1.78m e pesa 77 kg:

IMC = 77 / (1.78 x 1.78) = 77 / 3.17 = **24.3**

Isso cai na categoria de "Peso normal".

## Categorias de IMC

| Faixa de IMC | Categoria |
|--------------|-----------|
| Abaixo de 18.5 | Abaixo do peso |
| 18.5 - 24.9 | Peso normal |
| 25.0 - 29.9 | Sobrepeso |
| 30.0 - 34.9 | Obesidade Classe I |
| 35.0 - 39.9 | Obesidade Classe II |
| 40.0+ | Obesidade Classe III |

Estas categorias sao baseadas nas diretrizes da OMS para adultos.

## Como Interpretar seus Resultados

O IMC e uma ferramenta de triagem, nao um diagnostico:

- **Faixa normal (18.5-24.9)**: Geralmente associada com menores riscos de saude
- **Acima de 25**: Pode indicar maior risco de certas condicoes
- **Abaixo de 18.5**: Pode indicar deficiencia nutricional

Sua saude real depende de muitos fatores que o IMC nao mede.

## Limitacoes Importantes

O IMC NAO considera:

- **Massa muscular**: Atletas podem ter IMC alto mas baixa gordura corporal
- **Idade**: A composicao corporal muda com a idade
- **Sexo**: Homens e mulheres tem diferentes composicoes corporais
- **Etnia**: Os riscos de saude variam entre populacoes
- **Distribuicao de gordura**: Onde a gordura e armazenada importa

*O IMC e um dado. Consulte profissionais de saude para avaliacao completa.*

## Perguntas Frequentes

### O IMC e preciso para atletas?

Nao. O IMC nao pode distinguir entre musculo e gordura. Um atleta musculoso pode ter um IMC alto mas excelente saude. A porcentagem de gordura corporal e mais precisa para atletas.

### O IMC funciona para criancas?

Criancas usam percentis de IMC especificos para idade e sexo, nao categorias de adultos. Um pediatra deve interpretar o IMC das criancas.

### Qual e um IMC saudavel para idosos?

Pesquisas sugerem que um IMC ligeiramente mais alto (23-30) pode ser protetor para adultos acima de 65. Discuta com seu medico.

### Devo tentar alcancar um IMC especifico?

Foque em habitos de saude gerais em vez de um numero. Exercicio regular, nutricao balanceada e cuidado preventivo importam mais que apenas o IMC.

## Calculadoras Relacionadas

- [Calculadora de Gordura Corporal](/pt/body-fat-calculator) - Composicao corporal mais detalhada
- [Calculadora de Peso Ideal](/pt/ideal-weight-calculator) - Multiplas formulas
- [Calculadora de Calorias](/pt/calorie-calculator) - Necessidades caloricas diarias`,

    featuredImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=630&fit=crop",
    relatedCalculator: "bmi-calculator",
    tags: ["bmi", "health", "weight", "fitness"],
    category: "health",
    readingTime: 8,
  },
];

async function main() {
  console.log("Seeding professional blog posts (Part 1)...\n");

  // Get or create categories
  const categories = [
    { slug: "finance", nameEn: "Finance", nameEs: "Finanzas", namePt: "Financas", color: "blue", icon: "dollar-sign" },
    { slug: "health", nameEn: "Health", nameEs: "Salud", namePt: "Saude", color: "green", icon: "heart" },
    { slug: "everyday", nameEn: "Everyday", nameEs: "Cotidiano", namePt: "Cotidiano", color: "purple", icon: "calculator" },
  ];

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

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

  console.log(`\nPart 1 complete! Created ${created} posts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
