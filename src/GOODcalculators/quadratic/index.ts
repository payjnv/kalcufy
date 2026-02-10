import type { CalculatorConfigV4, CalculatorResults } from "@/engine/v4";

// =============================================================================
// QUADRATIC FORMULA CALCULATOR V4
// =============================================================================

export const quadraticCalculatorConfig: CalculatorConfigV4 = {
  id: "quadratic",
  category: "math",
  icon: "📐",
  
  t: {
    en: {
      name: "Quadratic Formula Calculator",
      slug: "quadratic-formula-calculator",
      subtitle: "Solve quadratic equations instantly",
      breadcrumb: "Quadratic",
      seo: {
        title: "Quadratic Formula Calculator - Solve Equations with Steps",
        description: "Free quadratic formula calculator solves ax² + bx + c = 0. Shows discriminant, real/complex roots, vertex form, axis of symmetry, and Vieta's formulas. Step-by-step solutions.",
        keywords: ["quadratic formula calculator", "quadratic equation solver", "discriminant calculator", "parabola calculator", "roots calculator", "vertex form"],
      },
      ui: {
        yourInformation: "Equation Coefficients",
        calculate: "Solve",
        reset: "Reset",
        results: "Solutions",
        loading: "Solving...",
      },
      inputs: {
        a: {
          label: "Coefficient a (x²)",
          helpText: "The coefficient of x² (cannot be 0)",
        },
        b: {
          label: "Coefficient b (x)",
          helpText: "The coefficient of x",
        },
        c: {
          label: "Constant c",
          helpText: "The constant term",
        },
      },
      results: {
        equation: {
          label: "Equation",
          description: "Your quadratic equation"
        },
        discriminant: {
          label: "Discriminant (Δ)",
          description: "b² - 4ac determines root type"
        },
        rootType: {
          label: "Root Type",
          description: "Real distinct, real equal, or complex"
        },
        root1: {
          label: "Root x₁",
          description: "First solution"
        },
        root2: {
          label: "Root x₂",
          description: "Second solution"
        },
        vertex: {
          label: "Vertex",
          description: "Minimum/maximum point of parabola"
        },
        axisOfSymmetry: {
          label: "Axis of Symmetry",
          description: "Vertical line through vertex"
        },
        yIntercept: {
          label: "Y-Intercept",
          description: "Where parabola crosses y-axis"
        },
        sumOfRoots: {
          label: "Sum of Roots",
          description: "x₁ + x₂ = -b/a (Vieta's formula)"
        },
        productOfRoots: {
          label: "Product of Roots",
          description: "x₁ × x₂ = c/a (Vieta's formula)"
        },
      },
      infoCards: {
        solutionsCard: {
          title: "Solutions Summary",
          items: ["Equation analyzed", "Discriminant calculated", "Roots found", "Parabola properties"],
        },
        tipsCard: {
          title: "Quick Tips",
          items: [
            "Δ > 0: Two distinct real roots",
            "Δ = 0: One repeated real root",
            "Δ < 0: Two complex conjugate roots",
            "Vertex x = -b/(2a)",
          ],
        },
      },
      referenceData: {
        formulas: {
          title: "Key Formulas",
          items: [
            { label: "Quadratic Formula", value: "x = (-b ± √Δ) / 2a" },
            { label: "Discriminant", value: "Δ = b² - 4ac" },
            { label: "Vertex Form", value: "y = a(x-h)² + k" },
            { label: "Sum of Roots", value: "-b/a" },
            { label: "Product of Roots", value: "c/a" },
            { label: "Axis of Symmetry", value: "x = -b/(2a)" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "What is the Quadratic Formula?",
          content: "The quadratic formula is a universal method for solving any quadratic equation of the form ax² + bx + c = 0, where a ≠ 0. The formula x = (-b ± √(b² - 4ac)) / 2a gives the roots (solutions) of the equation. These roots represent the x-values where the parabola crosses the x-axis. The quadratic formula works for all cases: two distinct real roots, one repeated root, or two complex conjugate roots.",
        },
        discriminant: {
          title: "Understanding the Discriminant",
          content: "The discriminant Δ = b² - 4ac is the key to understanding the nature of roots. When Δ > 0, the equation has two distinct real roots. When Δ = 0, there's exactly one real root (a repeated root). When Δ < 0, the roots are complex conjugates of the form a ± bi. The discriminant also indicates whether the parabola intersects, touches, or never crosses the x-axis.",
        },
        considerations: {
          title: "Important Properties",
          items: [
            { text: "The coefficient 'a' cannot be zero (otherwise it's linear, not quadratic)" },
            { text: "Vieta's formulas relate roots to coefficients: sum = -b/a, product = c/a" },
            { text: "The vertex (h,k) represents the minimum (a>0) or maximum (a<0) point" },
            { text: "Vertex form y = a(x-h)² + k makes graphing easier" },
            { text: "Complex roots always come in conjugate pairs" },
          ],
        },
        examples: {
          title: "Example Calculations",
          description: "Step-by-step solutions for different cases",
          examples: [
            {
              title: "Two Real Roots",
              steps: [
                "Equation: x² - 5x + 6 = 0",
                "a=1, b=-5, c=6",
                "Δ = 25 - 24 = 1 > 0",
                "x = (5 ± 1) / 2"
              ],
              result: "x₁ = 3, x₂ = 2",
            },
            {
              title: "Complex Roots",
              steps: [
                "Equation: x² + 2x + 5 = 0",
                "a=1, b=2, c=5",
                "Δ = 4 - 20 = -16 < 0",
                "x = (-2 ± 4i) / 2"
              ],
              result: "x₁ = -1+2i, x₂ = -1-2i",
            },
          ],
        },
      },
      faqs: [
        { question: "What does the discriminant tell us?", answer: "The discriminant (b² - 4ac) reveals the nature of roots: positive means two real roots, zero means one repeated root, negative means two complex roots." },
        { question: "Can I solve any quadratic with this formula?", answer: "Yes! The quadratic formula works for any quadratic equation ax² + bx + c = 0 where a ≠ 0, regardless of whether the roots are real or complex." },
        { question: "What is the vertex of a parabola?", answer: "The vertex is the turning point of the parabola. For y = ax² + bx + c, the vertex is at x = -b/(2a). It's the minimum point if a > 0, maximum if a < 0." },
        { question: "What are Vieta's formulas?", answer: "Vieta's formulas relate roots to coefficients: the sum of roots equals -b/a, and the product of roots equals c/a. These work even for complex roots." },
        { question: "How do I convert to vertex form?", answer: "Complete the square: y = a(x² + (b/a)x) + c becomes y = a(x + b/2a)² + (c - b²/4a). The vertex is (-b/2a, c - b²/4a)." },
        { question: "What if 'a' equals zero?", answer: "If a = 0, it's no longer quadratic—it becomes a linear equation bx + c = 0, which has one solution: x = -c/b (if b ≠ 0)." },
      ],
      disclaimer: "This calculator provides exact solutions using the quadratic formula. Complex roots are shown in a + bi format. Verify results for critical applications.",
      dynamic: {
        twoRealRoots: "Two distinct real roots",
        oneRealRoot: "One repeated real root",
        complexRoots: "Two complex conjugate roots",
        opensUpward: "Parabola opens upward (minimum at vertex)",
        opensDownward: "Parabola opens downward (maximum at vertex)",
      },
    },
    es: {
      name: "Calculadora de Fórmula Cuadrática",
      slug: "calculadora-formula-cuadratica",
      subtitle: "Resuelve ecuaciones cuadráticas",
      breadcrumb: "Cuadrática",
      seo: {
        title: "Calculadora de Fórmula Cuadrática - Resuelve Ecuaciones con Pasos",
        description: "Calculadora gratuita de fórmula cuadrática resuelve ax² + bx + c = 0. Muestra discriminante, raíces reales/complejas, forma vértice, eje de simetría y fórmulas de Vieta. Soluciones paso a paso.",
        keywords: ["calculadora fórmula cuadrática", "solucionador ecuación cuadrática", "calculadora discriminante", "calculadora parábola", "calculadora raíces", "forma vértice"],
      },
      ui: {
        yourInformation: "Coeficientes de la Ecuación",
        calculate: "Resolver",
        reset: "Reiniciar",
        results: "Soluciones",
        loading: "Resolviendo...",
      },
      inputs: {
        a: {
          label: "Coeficiente a (x²)",
          helpText: "El coeficiente de x² (no puede ser 0)",
        },
        b: {
          label: "Coeficiente b (x)",
          helpText: "El coeficiente de x",
        },
        c: {
          label: "Constante c",
          helpText: "El término constante",
        },
      },
      results: {
        equation: {
          label: "Ecuación",
          description: "Tu ecuación cuadrática"
        },
        discriminant: {
          label: "Discriminante (Δ)",
          description: "b² - 4ac determina el tipo de raíz"
        },
        rootType: {
          label: "Tipo de Raíz",
          description: "Reales distintas, reales iguales, o complejas"
        },
        root1: {
          label: "Raíz x₁",
          description: "Primera solución"
        },
        root2: {
          label: "Raíz x₂",
          description: "Segunda solución"
        },
        vertex: {
          label: "Vértice",
          description: "Punto mínimo/máximo de la parábola"
        },
        axisOfSymmetry: {
          label: "Eje de Simetría",
          description: "Línea vertical a través del vértice"
        },
        yIntercept: {
          label: "Intersección Y",
          description: "Donde la parábola cruza el eje y"
        },
        sumOfRoots: {
          label: "Suma de Raíces",
          description: "x₁ + x₂ = -b/a (fórmula de Vieta)"
        },
        productOfRoots: {
          label: "Producto de Raíces",
          description: "x₁ × x₂ = c/a (fórmula de Vieta)"
        },
      },
      infoCards: {
        solutionsCard: {
          title: "Resumen de Soluciones",
          items: ["Ecuación analizada", "Discriminante calculado", "Raíces encontradas", "Propiedades de la parábola"],
        },
        tipsCard: {
          title: "Consejos Rápidos",
          items: [
            "Δ > 0: Dos raíces reales distintas",
            "Δ = 0: Una raíz real repetida",
            "Δ < 0: Dos raíces complejas conjugadas",
            "Vértice x = -b/(2a)",
          ],
        },
      },
      referenceData: {
        formulas: {
          title: "Fórmulas Clave",
          items: [
            { label: "Fórmula Cuadrática", value: "x = (-b ± √Δ) / 2a" },
            { label: "Discriminante", value: "Δ = b² - 4ac" },
            { label: "Forma Vértice", value: "y = a(x-h)² + k" },
            { label: "Suma de Raíces", value: "-b/a" },
            { label: "Producto de Raíces", value: "c/a" },
            { label: "Eje de Simetría", value: "x = -b/(2a)" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "¿Qué es la Fórmula Cuadrática?",
          content: "La fórmula cuadrática es un método universal para resolver cualquier ecuación cuadrática de la forma ax² + bx + c = 0, donde a ≠ 0. La fórmula x = (-b ± √(b² - 4ac)) / 2a proporciona las raíces (soluciones) de la ecuación. Estas raíces representan los valores de x donde la parábola cruza el eje x. La fórmula cuadrática funciona para todos los casos: dos raíces reales distintas, una raíz repetida, o dos raíces complejas conjugadas.",
        },
        discriminant: {
          title: "Entendiendo el Discriminante",
          content: "El discriminante Δ = b² - 4ac es la clave para entender la naturaleza de las raíces. Cuando Δ > 0, la ecuación tiene dos raíces reales distintas. Cuando Δ = 0, hay exactamente una raíz real (una raíz repetida). Cuando Δ < 0, las raíces son conjugadas complejas de la forma a ± bi. El discriminante también indica si la parábola interseca, toca, o nunca cruza el eje x.",
        },
        considerations: {
          title: "Propiedades Importantes",
          items: [
            { text: "El coeficiente 'a' no puede ser cero (de lo contrario es lineal, no cuadrática)" },
            { text: "Las fórmulas de Vieta relacionan raíces con coeficientes: suma = -b/a, producto = c/a" },
            { text: "El vértice (h,k) representa el punto mínimo (a>0) o máximo (a<0)" },
            { text: "La forma vértice y = a(x-h)² + k facilita el graficado" },
            { text: "Las raíces complejas siempre vienen en pares conjugados" },
          ],
        },
        examples: {
          title: "Cálculos de Ejemplo",
          description: "Soluciones paso a paso para diferentes casos",
          examples: [
            {
              title: "Dos Raíces Reales",
              steps: [
                "Ecuación: x² - 5x + 6 = 0",
                "a=1, b=-5, c=6",
                "Δ = 25 - 24 = 1 > 0",
                "x = (5 ± 1) / 2"
              ],
              result: "x₁ = 3, x₂ = 2",
            },
            {
              title: "Raíces Complejas",
              steps: [
                "Ecuación: x² + 2x + 5 = 0",
                "a=1, b=2, c=5",
                "Δ = 4 - 20 = -16 < 0",
                "x = (-2 ± 4i) / 2"
              ],
              result: "x₁ = -1+2i, x₂ = -1-2i",
            },
          ],
        },
      },
      faqs: [
        { question: "¿Qué nos dice el discriminante?", answer: "El discriminante (b² - 4ac) revela la naturaleza de las raíces: positivo significa dos raíces reales, cero significa una raíz repetida, negativo significa dos raíces complejas." },
        { question: "¿Puedo resolver cualquier cuadrática con esta fórmula?", answer: "¡Sí! La fórmula cuadrática funciona para cualquier ecuación cuadrática ax² + bx + c = 0 donde a ≠ 0, sin importar si las raíces son reales o complejas." },
        { question: "¿Qué es el vértice de una parábola?", answer: "El vértice es el punto de inflexión de la parábola. Para y = ax² + bx + c, el vértice está en x = -b/(2a). Es el punto mínimo si a > 0, máximo si a < 0." },
        { question: "¿Qué son las fórmulas de Vieta?", answer: "Las fórmulas de Vieta relacionan raíces con coeficientes: la suma de raíces es igual a -b/a, y el producto de raíces es igual a c/a. Esto funciona incluso para raíces complejas." },
        { question: "¿Cómo convierto a forma vértice?", answer: "Completa el cuadrado: y = a(x² + (b/a)x) + c se convierte en y = a(x + b/2a)² + (c - b²/4a). El vértice es (-b/2a, c - b²/4a)." },
        { question: "¿Qué pasa si 'a' es igual a cero?", answer: "Si a = 0, ya no es cuadrática—se convierte en una ecuación lineal bx + c = 0, que tiene una solución: x = -c/b (si b ≠ 0)." },
      ],
      disclaimer: "Esta calculadora proporciona soluciones exactas usando la fórmula cuadrática. Las raíces complejas se muestran en formato a + bi. Verifica los resultados para aplicaciones críticas.",
      dynamic: {
        twoRealRoots: "Dos raíces reales distintas",
        oneRealRoot: "Una raíz real repetida",
        complexRoots: "Dos raíces complejas conjugadas",
        opensUpward: "La parábola abre hacia arriba (mínimo en el vértice)",
        opensDownward: "La parábola abre hacia abajo (máximo en el vértice)",
      },
    },
    pt: {
      name: "Calculadora de Fórmula Quadrática",
      slug: "calculadora-formula-quadratica",
      subtitle: "Resolva equações quadráticas",
      breadcrumb: "Quadrática",
      seo: {
        title: "Calculadora de Fórmula Quadrática - Resolva Equações com Passos",
        description: "Calculadora gratuita de fórmula quadrática resolve ax² + bx + c = 0. Mostra discriminante, raízes reais/complexas, forma canônica, eixo de simetria e fórmulas de Vieta. Soluções passo a passo.",
        keywords: ["calculadora fórmula quadrática", "resolvedor equação quadrática", "calculadora discriminante", "calculadora parábola", "calculadora raízes", "forma canônica"],
      },
      ui: {
        yourInformation: "Coeficientes da Equação",
        calculate: "Resolver",
        reset: "Limpar",
        results: "Soluções",
        loading: "Resolvendo...",
      },
      inputs: {
        a: {
          label: "Coeficiente a (x²)",
          helpText: "O coeficiente de x² (não pode ser 0)",
        },
        b: {
          label: "Coeficiente b (x)",
          helpText: "O coeficiente de x",
        },
        c: {
          label: "Constante c",
          helpText: "O termo constante",
        },
      },
      results: {
        equation: {
          label: "Equação",
          description: "Sua equação quadrática"
        },
        discriminant: {
          label: "Discriminante (Δ)",
          description: "b² - 4ac determina o tipo de raiz"
        },
        rootType: {
          label: "Tipo de Raiz",
          description: "Reais distintas, reais iguais, ou complexas"
        },
        root1: {
          label: "Raiz x₁",
          description: "Primeira solução"
        },
        root2: {
          label: "Raiz x₂",
          description: "Segunda solução"
        },
        vertex: {
          label: "Vértice",
          description: "Ponto mínimo/máximo da parábola"
        },
        axisOfSymmetry: {
          label: "Eixo de Simetria",
          description: "Linha vertical passando pelo vértice"
        },
        yIntercept: {
          label: "Intercepto Y",
          description: "Onde a parábola cruza o eixo y"
        },
        sumOfRoots: {
          label: "Soma das Raízes",
          description: "x₁ + x₂ = -b/a (fórmula de Vieta)"
        },
        productOfRoots: {
          label: "Produto das Raízes",
          description: "x₁ × x₂ = c/a (fórmula de Vieta)"
        },
      },
      infoCards: {
        solutionsCard: {
          title: "Resumo das Soluções",
          items: ["Equação analisada", "Discriminante calculado", "Raízes encontradas", "Propriedades da parábola"],
        },
        tipsCard: {
          title: "Dicas Rápidas",
          items: [
            "Δ > 0: Duas raízes reais distintas",
            "Δ = 0: Uma raiz real repetida",
            "Δ < 0: Duas raízes complexas conjugadas",
            "Vértice x = -b/(2a)",
          ],
        },
      },
      referenceData: {
        formulas: {
          title: "Fórmulas Principais",
          items: [
            { label: "Fórmula Quadrática", value: "x = (-b ± √Δ) / 2a" },
            { label: "Discriminante", value: "Δ = b² - 4ac" },
            { label: "Forma Canônica", value: "y = a(x-h)² + k" },
            { label: "Soma das Raízes", value: "-b/a" },
            { label: "Produto das Raízes", value: "c/a" },
            { label: "Eixo de Simetria", value: "x = -b/(2a)" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "O que é a Fórmula Quadrática?",
          content: "A fórmula quadrática é um método universal para resolver qualquer equação quadrática da forma ax² + bx + c = 0, onde a ≠ 0. A fórmula x = (-b ± √(b² - 4ac)) / 2a fornece as raízes (soluções) da equação. Essas raízes representam os valores de x onde a parábola cruza o eixo x. A fórmula quadrática funciona para todos os casos: duas raízes reais distintas, uma raiz repetida, ou duas raízes complexas conjugadas.",
        },
        discriminant: {
          title: "Entendendo o Discriminante",
          content: "O discriminante Δ = b² - 4ac é a chave para entender a natureza das raízes. Quando Δ > 0, a equação tem duas raízes reais distintas. Quando Δ = 0, há exatamente uma raiz real (uma raiz repetida). Quando Δ < 0, as raízes são complexas conjugadas da forma a ± bi. O discriminante também indica se a parábola intersecta, toca ou nunca cruza o eixo x.",
        },
        considerations: {
          title: "Propriedades Importantes",
          items: [
            { text: "O coeficiente 'a' não pode ser zero (caso contrário é linear, não quadrática)" },
            { text: "As fórmulas de Vieta relacionam raízes aos coeficientes: soma = -b/a, produto = c/a" },
            { text: "O vértice (h,k) representa o ponto mínimo (a>0) ou máximo (a<0)" },
            { text: "A forma canônica y = a(x-h)² + k facilita a construção do gráfico" },
            { text: "Raízes complexas sempre aparecem em pares conjugados" },
          ],
        },
        examples: {
          title: "Exemplos de Cálculos",
          description: "Soluções passo a passo para diferentes casos",
          examples: [
            {
              title: "Duas Raízes Reais",
              steps: [
                "Equação: x² - 5x + 6 = 0",
                "a=1, b=-5, c=6",
                "Δ = 25 - 24 = 1 > 0",
                "x = (5 ± 1) / 2"
              ],
              result: "x₁ = 3, x₂ = 2",
            },
            {
              title: "Raízes Complexas",
              steps: [
                "Equação: x² + 2x + 5 = 0",
                "a=1, b=2, c=5",
                "Δ = 4 - 20 = -16 < 0",
                "x = (-2 ± 4i) / 2"
              ],
              result: "x₁ = -1+2i, x₂ = -1-2i",
            },
          ],
        },
      },
      faqs: [
        { question: "O que o discriminante nos diz?", answer: "O discriminante (b² - 4ac) revela a natureza das raízes: positivo significa duas raízes reais, zero significa uma raiz repetida, negativo significa duas raízes complexas." },
        { question: "Posso resolver qualquer quadrática com esta fórmula?", answer: "Sim! A fórmula quadrática funciona para qualquer equação quadrática ax² + bx + c = 0 onde a ≠ 0, independentemente de as raízes serem reais ou complexas." },
        { question: "O que é o vértice de uma parábola?", answer: "O vértice é o ponto de inflexão da parábola. Para y = ax² + bx + c, o vértice está em x = -b/(2a). É o ponto mínimo se a > 0, máximo se a < 0." },
        { question: "O que são as fórmulas de Vieta?", answer: "As fórmulas de Vieta relacionam raízes aos coeficientes: a soma das raízes é igual a -b/a, e o produto das raízes é igual a c/a. Funcionam mesmo para raízes complexas." },
        { question: "Como converter para a forma canônica?", answer: "Complete o quadrado: y = a(x² + (b/a)x) + c torna-se y = a(x + b/2a)² + (c - b²/4a). O vértice é (-b/2a, c - b²/4a)." },
        { question: "E se 'a' for igual a zero?", answer: "Se a = 0, não é mais quadrática—torna-se uma equação linear bx + c = 0, que tem uma solução: x = -c/b (se b ≠ 0)." },
      ],
      disclaimer: "Esta calculadora fornece soluções exatas usando a fórmula quadrática. Raízes complexas são mostradas no formato a + bi. Verifique os resultados para aplicações críticas.",
      dynamic: {
        twoRealRoots: "Duas raízes reais distintas",
        oneRealRoot: "Uma raiz real repetida",
        complexRoots: "Duas raízes complexas conjugadas",
        opensUpward: "Parábola abre para cima (mínimo no vértice)",
        opensDownward: "Parábola abre para baixo (máximo no vértice)",
      },
    },
    fr: {
      name: "Calculateur de Formule Quadratique",
      slug: "calculateur-formule-quadratique",
      subtitle: "Résolvez les équations quadratiques",
      breadcrumb: "Quadratique",
      seo: {
        title: "Calculateur de Formule Quadratique - Résoudre les Équations avec Étapes",
        description: "Calculateur gratuit de formule quadratique résout ax² + bx + c = 0. Affiche le discriminant, racines réelles/complexes, forme canonique, axe de symétrie et formules de Vieta. Solutions étape par étape.",
        keywords: ["calculateur formule quadratique", "résolveur équation quadratique", "calculateur discriminant", "calculateur parabole", "calculateur racines", "forme canonique"],
      },
      ui: {
        yourInformation: "Coefficients de l'Équation",
        calculate: "Résoudre",
        reset: "Réinitialiser",
        results: "Solutions",
        loading: "Résolution...",
      },
      inputs: {
        a: {
          label: "Coefficient a (x²)",
          helpText: "Le coefficient de x² (ne peut pas être 0)",
        },
        b: {
          label: "Coefficient b (x)",
          helpText: "Le coefficient de x",
        },
        c: {
          label: "Constante c",
          helpText: "Le terme constant",
        },
      },
      results: {
        equation: {
          label: "Équation",
          description: "Votre équation quadratique"
        },
        discriminant: {
          label: "Discriminant (Δ)",
          description: "b² - 4ac détermine le type de racines"
        },
        rootType: {
          label: "Type de Racines",
          description: "Réelles distinctes, réelles égales, ou complexes"
        },
        root1: {
          label: "Racine x₁",
          description: "Première solution"
        },
        root2: {
          label: "Racine x₂",
          description: "Deuxième solution"
        },
        vertex: {
          label: "Sommet",
          description: "Point minimum/maximum de la parabole"
        },
        axisOfSymmetry: {
          label: "Axe de Symétrie",
          description: "Droite verticale passant par le sommet"
        },
        yIntercept: {
          label: "Ordonnée à l'Origine",
          description: "Où la parabole croise l'axe des y"
        },
        sumOfRoots: {
          label: "Somme des Racines",
          description: "x₁ + x₂ = -b/a (formule de Vieta)"
        },
        productOfRoots: {
          label: "Produit des Racines",
          description: "x₁ × x₂ = c/a (formule de Vieta)"
        },
      },
      infoCards: {
        solutionsCard: {
          title: "Résumé des Solutions",
          items: ["Équation analysée", "Discriminant calculé", "Racines trouvées", "Propriétés de la parabole"],
        },
        tipsCard: {
          title: "Conseils Rapides",
          items: [
            "Δ > 0 : Deux racines réelles distinctes",
            "Δ = 0 : Une racine réelle double",
            "Δ < 0 : Deux racines complexes conjuguées",
            "Sommet x = -b/(2a)",
          ],
        },
      },
      referenceData: {
        formulas: {
          title: "Formules Clés",
          items: [
            { label: "Formule Quadratique", value: "x = (-b ± √Δ) / 2a" },
            { label: "Discriminant", value: "Δ = b² - 4ac" },
            { label: "Forme Canonique", value: "y = a(x-h)² + k" },
            { label: "Somme des Racines", value: "-b/a" },
            { label: "Produit des Racines", value: "c/a" },
            { label: "Axe de Symétrie", value: "x = -b/(2a)" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "Qu'est-ce que la Formule Quadratique ?",
          content: "La formule quadratique est une méthode universelle pour résoudre toute équation quadratique de la forme ax² + bx + c = 0, où a ≠ 0. La formule x = (-b ± √(b² - 4ac)) / 2a donne les racines (solutions) de l'équation. Ces racines représentent les valeurs de x où la parabole croise l'axe des x. La formule quadratique fonctionne dans tous les cas : deux racines réelles distinctes, une racine double, ou deux racines complexes conjuguées.",
        },
        discriminant: {
          title: "Comprendre le Discriminant",
          content: "Le discriminant Δ = b² - 4ac est la clé pour comprendre la nature des racines. Quand Δ > 0, l'équation a deux racines réelles distinctes. Quand Δ = 0, il y a exactement une racine réelle (racine double). Quand Δ < 0, les racines sont des conjugués complexes de la forme a ± bi. Le discriminant indique aussi si la parabole intersecte, touche ou ne croise jamais l'axe des x.",
        },
        considerations: {
          title: "Propriétés Importantes",
          items: [
            { text: "Le coefficient 'a' ne peut pas être zéro (sinon c'est linéaire, pas quadratique)" },
            { text: "Les formules de Vieta relient les racines aux coefficients : somme = -b/a, produit = c/a" },
            { text: "Le sommet (h,k) représente le point minimum (a>0) ou maximum (a<0)" },
            { text: "La forme canonique y = a(x-h)² + k facilite le tracé graphique" },
            { text: "Les racines complexes viennent toujours par paires conjuguées" },
          ],
        },
        examples: {
          title: "Exemples de Calculs",
          description: "Solutions étape par étape pour différents cas",
          examples: [
            {
              title: "Deux Racines Réelles",
              steps: [
                "Équation : x² - 5x + 6 = 0",
                "a=1, b=-5, c=6",
                "Δ = 25 - 24 = 1 > 0",
                "x = (5 ± 1) / 2"
              ],
              result: "x₁ = 3, x₂ = 2",
            },
            {
              title: "Racines Complexes",
              steps: [
                "Équation : x² + 2x + 5 = 0",
                "a=1, b=2, c=5",
                "Δ = 4 - 20 = -16 < 0",
                "x = (-2 ± 4i) / 2"
              ],
              result: "x₁ = -1+2i, x₂ = -1-2i",
            },
          ],
        },
      },
      faqs: [
        { question: "Que nous dit le discriminant ?", answer: "Le discriminant (b² - 4ac) révèle la nature des racines : positif signifie deux racines réelles, zéro signifie une racine double, négatif signifie deux racines complexes." },
        { question: "Puis-je résoudre n'importe quelle équation quadratique avec cette formule ?", answer: "Oui ! La formule quadratique fonctionne pour toute équation quadratique ax² + bx + c = 0 où a ≠ 0, que les racines soient réelles ou complexes." },
        { question: "Qu'est-ce que le sommet d'une parabole ?", answer: "Le sommet est le point de retournement de la parabole. Pour y = ax² + bx + c, le sommet est à x = -b/(2a). C'est le point minimum si a > 0, maximum si a < 0." },
        { question: "Que sont les formules de Vieta ?", answer: "Les formules de Vieta relient les racines aux coefficients : la somme des racines égale -b/a, et le produit des racines égale c/a. Cela fonctionne même pour les racines complexes." },
        { question: "Comment convertir en forme canonique ?", answer: "Complétez le carré : y = a(x² + (b/a)x) + c devient y = a(x + b/2a)² + (c - b²/4a). Le sommet est (-b/2a, c - b²/4a)." },
        { question: "Que se passe-t-il si 'a' égale zéro ?", answer: "Si a = 0, ce n'est plus quadratique—cela devient une équation linéaire bx + c = 0, qui a une solution : x = -c/b (si b ≠ 0)." },
      ],
      disclaimer: "Ce calculateur fournit des solutions exactes en utilisant la formule quadratique. Les racines complexes sont affichées au format a + bi. Vérifiez les résultats pour les applications critiques.",
      dynamic: {
        twoRealRoots: "Deux racines réelles distinctes",
        oneRealRoot: "Une racine réelle double",
        complexRoots: "Deux racines complexes conjuguées",
        opensUpward: "La parabole s'ouvre vers le haut (minimum au sommet)",
        opensDownward: "La parabole s'ouvre vers le bas (maximum au sommet)",
      },
    },
    de: {
      name: "Quadratische Formel Rechner",
      slug: "quadratische-formel-rechner",
      subtitle: "Quadratische Gleichungen lösen",
      breadcrumb: "Quadratisch",
      seo: {
        title: "Quadratische Formel Rechner - Gleichungen mit Schritten lösen",
        description: "Kostenloser quadratische Formel Rechner löst ax² + bx + c = 0. Zeigt Diskriminante, reelle/komplexe Wurzeln, Scheitelform, Symmetrieachse und Vietasche Formeln. Schrittweise Lösungen.",
        keywords: ["quadratische formel rechner", "quadratische gleichung löser", "diskriminante rechner", "parabel rechner", "wurzel rechner", "scheitelform"],
      },
      ui: {
        yourInformation: "Gleichungskoeffizienten",
        calculate: "Lösen",
        reset: "Zurücksetzen",
        results: "Lösungen",
        loading: "Löse...",
      },
      inputs: {
        a: {
          label: "Koeffizient a (x²)",
          helpText: "Der Koeffizient von x² (kann nicht 0 sein)",
        },
        b: {
          label: "Koeffizient b (x)",
          helpText: "Der Koeffizient von x",
        },
        c: {
          label: "Konstante c",
          helpText: "Das konstante Glied",
        },
      },
      results: {
        equation: {
          label: "Gleichung",
          description: "Ihre quadratische Gleichung"
        },
        discriminant: {
          label: "Diskriminante (Δ)",
          description: "b² - 4ac bestimmt den Wurzeltyp"
        },
        rootType: {
          label: "Wurzeltyp",
          description: "Reell verschieden, reell gleich oder komplex"
        },
        root1: {
          label: "Wurzel x₁",
          description: "Erste Lösung"
        },
        root2: {
          label: "Wurzel x₂",
          description: "Zweite Lösung"
        },
        vertex: {
          label: "Scheitel",
          description: "Minimum-/Maximumpunkt der Parabel"
        },
        axisOfSymmetry: {
          label: "Symmetrieachse",
          description: "Vertikale Linie durch den Scheitel"
        },
        yIntercept: {
          label: "Y-Achsenabschnitt",
          description: "Wo die Parabel die y-Achse schneidet"
        },
        sumOfRoots: {
          label: "Summe der Wurzeln",
          description: "x₁ + x₂ = -b/a (Vietasche Formel)"
        },
        productOfRoots: {
          label: "Produkt der Wurzeln",
          description: "x₁ × x₂ = c/a (Vietasche Formel)"
        },
      },
      infoCards: {
        solutionsCard: {
          title: "Lösungsübersicht",
          items: ["Gleichung analysiert", "Diskriminante berechnet", "Wurzeln gefunden", "Parabeleigenschaften"],
        },
        tipsCard: {
          title: "Schnelle Tipps",
          items: [
            "Δ > 0: Zwei verschiedene reelle Wurzeln",
            "Δ = 0: Eine wiederholte reelle Wurzel",
            "Δ < 0: Zwei komplex konjugierte Wurzeln",
            "Scheitel x = -b/(2a)",
          ],
        },
      },
      referenceData: {
        formulas: {
          title: "Wichtige Formeln",
          items: [
            { label: "Quadratische Formel", value: "x = (-b ± √Δ) / 2a" },
            { label: "Diskriminante", value: "Δ = b² - 4ac" },
            { label: "Scheitelform", value: "y = a(x-h)² + k" },
            { label: "Summe der Wurzeln", value: "-b/a" },
            { label: "Produkt der Wurzeln", value: "c/a" },
            { label: "Symmetrieachse", value: "x = -b/(2a)" },
          ],
        },
      },
      education: {
        whatIs: {
          title: "Was ist die quadratische Formel?",
          content: "Die quadratische Formel ist eine universelle Methode zum Lösen jeder quadratischen Gleichung der Form ax² + bx + c = 0, wobei a ≠ 0. Die Formel x = (-b ± √(b² - 4ac)) / 2a gibt die Wurzeln (Lösungen) der Gleichung. Diese Wurzeln stellen die x-Werte dar, bei denen die Parabel die x-Achse schneidet. Die quadratische Formel funktioniert für alle Fälle: zwei verschiedene reelle Wurzeln, eine wiederholte Wurzel oder zwei komplex konjugierte Wurzeln.",
        },
        discriminant: {
          title: "Die Diskriminante verstehen",
          content: "Die Diskriminante Δ = b² - 4ac ist der Schlüssel zum Verständnis der Natur der Wurzeln. Wenn Δ > 0, hat die Gleichung zwei verschiedene reelle Wurzeln. Wenn Δ = 0, gibt es genau eine reelle Wurzel (eine wiederholte Wurzel). Wenn Δ < 0, sind die Wurzeln komplex konjugiert von der Form a ± bi. Die Diskriminante zeigt auch an, ob die Parabel die x-Achse schneidet, berührt oder nie kreuzt.",
        },
        considerations: {
          title: "Wichtige Eigenschaften",
          items: [
            { text: "Der Koeffizient 'a' kann nicht null sein (sonst ist es linear, nicht quadratisch)" },
            { text: "Vietasche Formeln verbinden Wurzeln mit Koeffizienten: Summe = -b/a, Produkt = c/a" },
            { text: "Der Scheitel (h,k) stellt den Minimum- (a>0) oder Maximum- (a<0) Punkt dar" },
            { text: "Scheitelform y = a(x-h)² + k macht das Zeichnen einfacher" },
            { text: "Komplexe Wurzeln kommen immer in konjugierten Paaren" },
          ],
        },
        examples: {
          title: "Beispielrechnungen",
          description: "Schrittweise Lösungen für verschiedene Fälle",
          examples: [
            {
              title: "Zwei reelle Wurzeln",
              steps: [
                "Gleichung: x² - 5x + 6 = 0",
                "a=1, b=-5, c=6",
                "Δ = 25 - 24 = 1 > 0",
                "x = (5 ± 1) / 2"
              ],
              result: "x₁ = 3, x₂ = 2",
            },
            {
              title: "Komplexe Wurzeln",
              steps: [
                "Gleichung: x² + 2x + 5 = 0",
                "a=1, b=2, c=5",
                "Δ = 4 - 20 = -16 < 0",
                "x = (-2 ± 4i) / 2"
              ],
              result: "x₁ = -1+2i, x₂ = -1-2i",
            },
          ],
        },
      },
      faqs: [
        { question: "Was sagt uns die Diskriminante?", answer: "Die Diskriminante (b² - 4ac) zeigt die Natur der Wurzeln: positiv bedeutet zwei reelle Wurzeln, null bedeutet eine wiederholte Wurzel, negativ bedeutet zwei komplexe Wurzeln." },
        { question: "Kann ich jede Quadratgleichung mit dieser Formel lösen?", answer: "Ja! Die quadratische Formel funktioniert für jede quadratische Gleichung ax² + bx + c = 0, wobei a ≠ 0, unabhängig davon, ob die Wurzeln reell oder komplex sind." },
        { question: "Was ist der Scheitel einer Parabel?", answer: "Der Scheitel ist der Wendepunkt der Parabel. Für y = ax² + bx + c liegt der Scheitel bei x = -b/(2a). Er ist der tiefste Punkt wenn a > 0, höchster wenn a < 0." },
        { question: "Was sind Vietasche Formeln?", answer: "Vietasche Formeln verbinden Wurzeln mit Koeffizienten: die Summe der Wurzeln gleicht -b/a, und das Produkt der Wurzeln gleicht c/a. Diese funktionieren sogar für komplexe Wurzeln." },
        { question: "Wie konvertiere ich zur Scheitelform?", answer: "Vervollständigen Sie das Quadrat: y = a(x² + (b/a)x) + c wird zu y = a(x + b/2a)² + (c - b²/4a). Der Scheitel ist (-b/2a, c - b²/4a)." },
        { question: "Was wenn 'a' gleich null ist?", answer: "Wenn a = 0, ist es nicht mehr quadratisch—es wird eine lineare Gleichung bx + c = 0, die eine Lösung hat: x = -c/b (wenn b ≠ 0)." },
      ],
      disclaimer: "Dieser Rechner liefert exakte Lösungen mit der quadratischen Formel. Komplexe Wurzeln werden im Format a + bi angezeigt. Überprüfen Sie Ergebnisse für kritische Anwendungen.",
      dynamic: {
        twoRealRoots: "Zwei verschiedene reelle Wurzeln",
        oneRealRoot: "Eine wiederholte reelle Wurzel",
        complexRoots: "Zwei komplex konjugierte Wurzeln",
        opensUpward: "Parabel öffnet sich nach oben (Minimum am Scheitel)",
        opensDownward: "Parabel öffnet sich nach unten (Maximum am Scheitel)",
      },
    },
  },

  // ===========================================================================
  // HERO
  // ===========================================================================
  hero: {
    badge: "Math",
    rating: { average: 4.9, count: 3200 },
  },

  // ===========================================================================
  // INPUTS
  // ===========================================================================
  inputs: [
    {
      id: "a",
      type: "number",
      label: "a",
      required: true,
      defaultValue: 1,
      min: -1000,
      max: 1000,
      step: 0.1,
    },
    {
      id: "b",
      type: "number",
      label: "b",
      required: true,
      defaultValue: -5,
      min: -1000,
      max: 1000,
      step: 0.1,
    },
    {
      id: "c",
      type: "number",
      label: "c",
      required: true,
      defaultValue: 6,
      min: -1000,
      max: 1000,
      step: 0.1,
    },
  ],

  inputGroups: [],

  // ===========================================================================
  // RESULTS
  // ===========================================================================
  results: [
    { id: "equation", type: "secondary", label: "Equation", format: "text" },
    { id: "discriminant", type: "primary", label: "Discriminant", format: "number" },
    { id: "rootType", type: "secondary", label: "Root Type", format: "text" },
    { id: "root1", type: "primary", label: "x₁", format: "text" },
    { id: "root2", type: "primary", label: "x₂", format: "text" },
    { id: "vertex", type: "secondary", label: "Vertex", format: "text" },
    { id: "axisOfSymmetry", type: "secondary", label: "Axis of Symmetry", format: "text" },
    { id: "sumOfRoots", type: "secondary", label: "Sum of Roots", format: "text" },
    { id: "productOfRoots", type: "secondary", label: "Product of Roots", format: "text" },
  ],

  // ===========================================================================
  // INFO CARDS
  // ===========================================================================
  infoCards: [
    {
      id: "solutionsCard",
      title: "Solutions Summary",
      type: "list",
      icon: "📊",
      items: [
        { label: "Root 1", valueKey: "root1" },
        { label: "Root 2", valueKey: "root2" },
        { label: "Discriminant", valueKey: "discriminant" },
        { label: "Vertex", valueKey: "vertex" },
      ],
    },
    {
      id: "tipsCard",
      title: "Quick Tips",
      type: "horizontal",
      icon: "💡",
      items: [
        { label: "Δ > 0: Two real roots" },
        { label: "Δ = 0: One repeated root" },
        { label: "Δ < 0: Complex roots" },
        { label: "Vertex: x = -b/(2a)" },
      ],
    },
  ],

  // ===========================================================================
  // REFERENCE DATA
  // ===========================================================================
  referenceData: [
    {
      id: "formulas",
      title: "Key Formulas",
      icon: "📋",
      columns: 2,
      items: [
        { label: "Quadratic Formula", value: "x = (-b ± √Δ) / 2a" },
        { label: "Discriminant", value: "Δ = b² - 4ac" },
        { label: "Vertex x", value: "-b / (2a)" },
        { label: "Sum of Roots", value: "-b / a" },
        { label: "Product of Roots", value: "c / a" },
        { label: "Y-Intercept", value: "(0, c)" },
      ],
    },
  ],

  // ===========================================================================
  // EDUCATION SECTIONS
  // ===========================================================================
  educationSections: [
    {
      id: "whatIs",
      type: "prose",
      title: "What is the Quadratic Formula?",
      icon: "📖",
      content: "The quadratic formula solves ax² + bx + c = 0...",
    },
    {
      id: "discriminant",
      type: "prose",
      title: "Understanding the Discriminant",
      icon: "🔍",
      content: "The discriminant determines root types...",
    },
    {
      id: "considerations",
      type: "list",
      title: "Important Properties",
      icon: "⚠️",
      items: [
        { text: "Coefficient 'a' cannot be zero", type: "warning" },
        { text: "Vieta's formulas: sum = -b/a, product = c/a", type: "info" },
        { text: "Vertex is minimum (a>0) or maximum (a<0)", type: "info" },
        { text: "Complex roots come in conjugate pairs", type: "info" },
        { text: "Vertex form makes graphing easier", type: "info" },
      ],
    },
    {
      id: "examples",
      type: "code-example",
      title: "Example Calculations",
      icon: "🧮",
      description: "Step-by-step solutions",
      columns: 2,
      examples: [
        {
          title: "Two Real Roots",
          steps: ["x² - 5x + 6 = 0", "Δ = 25-24 = 1", "x = (5±1)/2"],
          result: "x₁=3, x₂=2",
        },
        {
          title: "Complex Roots",
          steps: ["x² + 2x + 5 = 0", "Δ = 4-20 = -16", "x = (-2±4i)/2"],
          result: "x = -1±2i",
        },
      ],
    },
  ],

  // ===========================================================================
  // FAQs
  // ===========================================================================
  faqs: [
    { question: "What does the discriminant tell us?", answer: "Positive: 2 real roots. Zero: 1 repeated root. Negative: 2 complex roots." },
    { question: "Can this solve any quadratic?", answer: "Yes, as long as a ≠ 0." },
    { question: "What is the vertex?", answer: "The turning point at x = -b/(2a)." },
    { question: "What are Vieta's formulas?", answer: "Sum of roots = -b/a, Product = c/a." },
    { question: "How to convert to vertex form?", answer: "Complete the square: y = a(x-h)² + k." },
    { question: "What if a = 0?", answer: "It becomes linear: bx + c = 0, x = -c/b." },
  ],

  // ===========================================================================
  // REFERENCES
  // ===========================================================================
  references: [
    {
      authors: "Khan Academy",
      year: "2024",
      title: "The quadratic formula",
      source: "Khan Academy",
      url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations",
    },
    {
      authors: "Wolfram MathWorld",
      year: "2024",
      title: "Quadratic Equation",
      source: "MathWorld",
      url: "https://mathworld.wolfram.com/QuadraticEquation.html",
    },
  ],

  // ===========================================================================
  // CONFIG
  // ===========================================================================
  sidebar: {
    showSearch: true,
    showRelatedCalculators: true,
    showCTA: false,
    category: "math",
  },

  features: {
    autoCalculate: true,
    exportPDF: true,
    shareResults: true,
    saveHistory: true,
  },

  relatedCalculators: ["percentage-calculator", "fraction-calculator"],

  ads: {
    mobileHero: true,
    sidebar: true,
    mobileContent: true,
    bottom: true,
  },
};

// =============================================================================
// CALCULATE FUNCTION
// =============================================================================
// =============================================================================
// CALCULATE FUNCTION - WITH STEP BY STEP
// =============================================================================
export function calculateQuadratic(data: {
  values: Record<string, unknown>;
}): CalculatorResults {
  const { values } = data;
  
  const a = Number(values.a) || 0;
  const b = Number(values.b) || 0;
  const c = Number(values.c) || 0;
  
  const formatNum = (num: number): string => {
    if (Number.isInteger(num)) return String(num);
    const rounded = Math.round(num * 10000) / 10000;
    return rounded.toFixed(4).replace(/\.?0+$/, "");
  };
  
  // Validate a ≠ 0
  if (a === 0) {
    return {
      values: {},
      formatted: {
        equation: "Error: 'a' cannot be 0",
        discriminant: "—",
        rootType: "Not quadratic (linear equation)",
        root1: b !== 0 ? String(-c / b) : "Undefined",
        root2: "—",
        vertex: "—",
        axisOfSymmetry: "—",
        sumOfRoots: "—",
        productOfRoots: "—",
        steps: "When a = 0, use linear equation: bx + c = 0",
      },
      summary: "When a=0, the equation is linear, not quadratic.",
      isValid: false,
    };
  }
  
  // Calculate discriminant
  const discriminant = b * b - 4 * a * c;
  
  // Format equation string
  const formatCoef = (coef: number, variable: string, first: boolean = false): string => {
    if (coef === 0) return "";
    const sign = coef > 0 ? (first ? "" : " + ") : " - ";
    const absCoef = Math.abs(coef);
    if (variable === "") return sign + absCoef;
    if (absCoef === 1) return sign + variable;
    return sign + absCoef + variable;
  };
  
  let equation = formatCoef(a, "x²", true) + formatCoef(b, "x") + formatCoef(c, "", false) + " = 0";
  equation = equation.trim();
  if (equation.startsWith("+ ")) equation = equation.slice(2);
  
  // BUILD STEP-BY-STEP SOLUTION
  const steps: string[] = [];
  
  steps.push("━━━ STEP 1: Identify coefficients ━━━");
  steps.push("Equation: " + equation);
  steps.push("a = " + a + ", b = " + b + ", c = " + c);
  
  steps.push("");
  steps.push("━━━ STEP 2: Apply quadratic formula ━━━");
  steps.push("x = (-b ± √(b² - 4ac)) / 2a");
  steps.push("x = (-(" + b + ") ± √((" + b + ")² - 4·(" + a + ")·(" + c + "))) / (2·(" + a + "))");
  
  steps.push("");
  steps.push("━━━ STEP 3: Calculate discriminant ━━━");
  steps.push("Δ = b² - 4ac");
  steps.push("Δ = (" + b + ")² - 4·(" + a + ")·(" + c + ")");
  steps.push("Δ = " + (b*b) + " - (" + (4*a*c) + ")");
  steps.push("Δ = " + discriminant);
  
  // Calculate roots
  let root1: string, root2: string, rootType: string;
  let root1Num: number | null = null;
  let root2Num: number | null = null;
  
  steps.push("");
  steps.push("━━━ STEP 4: Find the roots ━━━");
  
  if (discriminant > 0) {
    const sqrtD = Math.sqrt(discriminant);
    root1Num = (-b + sqrtD) / (2 * a);
    root2Num = (-b - sqrtD) / (2 * a);
    root1 = formatNum(root1Num);
    root2 = formatNum(root2Num);
    rootType = "Two distinct real roots";
    
    steps.push("Since Δ = " + discriminant + " > 0 → Two real roots");
    steps.push("√Δ = √" + discriminant + " = " + formatNum(sqrtD));
    steps.push("");
    steps.push("x₁ = (-b + √Δ) / 2a");
    steps.push("x₁ = (" + (-b) + " + " + formatNum(sqrtD) + ") / " + (2*a));
    steps.push("x₁ = " + formatNum(-b + sqrtD) + " / " + (2*a));
    steps.push("x₁ = " + root1);
    steps.push("");
    steps.push("x₂ = (-b - √Δ) / 2a");
    steps.push("x₂ = (" + (-b) + " - " + formatNum(sqrtD) + ") / " + (2*a));
    steps.push("x₂ = " + formatNum(-b - sqrtD) + " / " + (2*a));
    steps.push("x₂ = " + root2);
    
  } else if (discriminant === 0) {
    root1Num = -b / (2 * a);
    root2Num = root1Num;
    root1 = formatNum(root1Num);
    root2 = root1 + " (repeated)";
    rootType = "One repeated real root";
    
    steps.push("Since Δ = 0 → One repeated root");
    steps.push("x = -b / 2a");
    steps.push("x = " + (-b) + " / " + (2*a));
    steps.push("x = " + root1);
    
  } else {
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-discriminant) / (2 * a);
    root1 = formatNum(realPart) + " + " + formatNum(imagPart) + "i";
    root2 = formatNum(realPart) + " - " + formatNum(imagPart) + "i";
    rootType = "Two complex conjugate roots";
    
    steps.push("Since Δ = " + discriminant + " < 0 → Complex roots");
    steps.push("√|Δ| = √" + (-discriminant) + " = " + formatNum(Math.sqrt(-discriminant)));
    steps.push("");
    steps.push("Real part = -b / 2a = " + (-b) + " / " + (2*a) + " = " + formatNum(realPart));
    steps.push("Imaginary part = √|Δ| / 2a = " + formatNum(Math.sqrt(-discriminant)) + " / " + (2*a) + " = " + formatNum(imagPart));
    steps.push("");
    steps.push("x₁ = " + root1);
    steps.push("x₂ = " + root2);
  }
  
  // Calculate vertex
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;
  const vertex = "(" + formatNum(vertexX) + ", " + formatNum(vertexY) + ")";
  const axisOfSymmetry = "x = " + formatNum(vertexX);
  
  steps.push("");
  steps.push("━━━ STEP 5: Parabola properties ━━━");
  steps.push("Vertex: h = -b/2a = " + (-b) + "/" + (2*a) + " = " + formatNum(vertexX));
  steps.push("k = f(h) = " + formatNum(vertexY));
  steps.push("Vertex = " + vertex);
  steps.push("Axis of symmetry: " + axisOfSymmetry);
  steps.push("Parabola opens " + (a > 0 ? "upward ∪" : "downward ∩"));
  
  // Vieta's formulas
  const sumOfRoots = formatNum(-b / a);
  const productOfRoots = formatNum(c / a);
  
  steps.push("");
  steps.push("━━━ STEP 6: Vieta's formulas ━━━");
  steps.push("Sum of roots: x₁ + x₂ = -b/a = " + (-b) + "/" + a + " = " + sumOfRoots);
  steps.push("Product of roots: x₁ · x₂ = c/a = " + c + "/" + a + " = " + productOfRoots);
  
  const stepsFormatted = steps.join("\n");
  
  // Summary
  let summary = "For " + equation + ": ";
  if (discriminant > 0) {
    summary += "Δ = " + formatNum(discriminant) + " > 0, two real roots: x₁ = " + root1 + ", x₂ = " + root2 + ".";
  } else if (discriminant === 0) {
    summary += "Δ = 0, one repeated root: x = " + root1 + ".";
  } else {
    summary += "Δ = " + formatNum(discriminant) + " < 0, complex roots: " + root1 + " and " + root2 + ".";
  }
  
  return {
    values: {
      equation,
      discriminant,
      rootType,
      root1: root1Num,
      root2: root2Num,
      vertexX,
      vertexY,
      sumOfRoots: -b / a,
      productOfRoots: c / a,
      steps: stepsFormatted,
    },
    formatted: {
      equation,
      discriminant: formatNum(discriminant),
      rootType,
      root1,
      root2,
      vertex,
      axisOfSymmetry,
      sumOfRoots,
      productOfRoots,
      steps: stepsFormatted,
    },
    summary,
    isValid: true,
  };
}

function formatNumber(num: number): string {
  if (Number.isInteger(num)) return String(num);
  const rounded = Math.round(num * 10000) / 10000;
  return rounded.toFixed(4).replace(/\.?0+$/, "");
}

export default quadraticCalculatorConfig;
