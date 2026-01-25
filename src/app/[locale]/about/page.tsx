"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function AboutPage() {
  const locale = useLocale();

  const content = {
    en: {
      badge: "Our Story",
      title1: "Built for People Who",
      title2: "Hate Bad Calculators",
      subtitle: "We got tired of ugly, outdated calculator sites. So we built something better.",
      
      story: {
        title: "Why Kalcufy Exists",
        p1: "Ever searched for a simple loan calculator and ended up on a site that looks like it was built in 2005? Covered in ads, confusing to use, and completely broken on mobile?",
        p2: "Yeah, us too. And it drove us crazy.",
        p3: "Kalcufy was created by developers and financial analysts who use calculators daily—and were frustrated by how unreliable and confusing most of them are. We built a focused set of tools that are actually useful, beautifully designed, and work perfectly on any device.",
      },

      mission: {
        badge: "Our Mission",
        title: "Make Smart Decisions Easy",
        text: "Financial and health calculations shouldn't require a finance degree. We build tools that anyone can use to make better decisions about their money and their wellbeing. No jargon. No hidden fees. No account required.",
      },

      methodology: {
        badge: "Accuracy & Methodology",
        title: "Built on Trusted Standards",
        subtitle: "Every calculator is developed using industry-standard formulas and verified sources.",
        points: [
          {
            icon: "🏦",
            title: "Financial Standards",
            text: "Our financial calculators use formulas commonly employed by banks, credit unions, and certified financial planners.",
          },
          {
            icon: "📊",
            title: "Government Data",
            text: "Tax and retirement calculators reference publicly available data from the IRS, Social Security Administration, and other official sources.",
          },
          {
            icon: "🏥",
            title: "Health Guidelines",
            text: "Health calculators follow guidelines from recognized organizations including WHO, CDC, and peer-reviewed medical research.",
          },
          {
            icon: "🔄",
            title: "Regular Updates",
            text: "We continuously review and update our tools to ensure accuracy with current rates, regulations, and best practices.",
          },
        ],
        disclaimer: "Kalcufy is designed for educational and informational purposes. Our tools do not replace professional financial, medical, or legal advice. Always consult qualified professionals for important decisions.",
      },

      values: [
        {
          icon: "✨",
          title: "Simplicity First",
          text: "Complex math shouldn't mean complex interfaces. Every calculator is designed to be intuitive and easy to understand.",
        },
        {
          icon: "🆓",
          title: "Actually Free",
          text: "No tricks, no paywalls for basic features. Everyone deserves access to reliable financial and health tools.",
        },
        {
          icon: "📱",
          title: "Mobile Ready",
          text: "Over 70% of our users are on mobile. Every calculator is built mobile-first and works flawlessly on any screen size.",
        },
        {
          icon: "🔒",
          title: "Privacy by Design",
          text: "Your calculations run entirely in your browser. We don't sell personal data or track individual calculations.",
        },
      ],

      team: {
        badge: "The Team",
        title: "Small Team, Big Mission",
        text: "Kalcufy is built by a dedicated team of developers, designers, and financial analysts based in the United States. We're passionate about accuracy, accessibility, and creating tools that people can actually trust.",
        commitment: "We're committed to building the most reliable, user-friendly calculator platform on the web—one that respects your time, your privacy, and your intelligence.",
      },

      trust: {
        title: "Why People Trust Kalcufy",
        items: [
          { icon: "✓", text: "No account required for any calculator" },
          { icon: "✓", text: "No ads on calculation results" },
          { icon: "✓", text: "Transparent formulas explained" },
          { icon: "✓", text: "Regular accuracy audits" },
          { icon: "✓", text: "Open to user feedback" },
        ],
      },

      stats: [
        { number: "500K+", label: "Calculations", srLabel: "Over 500 thousand calculations performed" },
        { number: "50K+", label: "Happy Users", srLabel: "Over 50 thousand happy users" },
        { number: "40+", label: "Calculators", srLabel: "More than 40 calculators available" },
        { number: "3", label: "Languages", srLabel: "Available in 3 languages" },
      ],

      cta: {
        title: "Ready to Calculate?",
        subtitle: "Try any of our calculators. Completely free, no signup required.",
        button: "Explore Calculators",
      },

      contact: {
        title: "Questions or Feedback?",
        text: "We're always looking to improve. Reach out anytime.",
        email: "hello@kalcufy.com",
      },
    },

    es: {
      badge: "Nuestra Historia",
      title1: "Hecho para Quienes",
      title2: "Odian las Malas Calculadoras",
      subtitle: "Nos cansamos de sitios de calculadoras feos y anticuados. Así que construimos algo mejor.",
      
      story: {
        title: "Por Qué Existe Kalcufy",
        p1: "¿Alguna vez buscaste una calculadora de préstamos simple y terminaste en un sitio que parece de 2005? Lleno de anuncios, confuso de usar, y completamente roto en el celular.",
        p2: "Sí, a nosotros también nos pasó. Y nos volvió locos.",
        p3: "Kalcufy fue creado por desarrolladores y analistas financieros que usan calculadoras a diario—y estaban frustrados por lo poco confiables y confusas que son la mayoría. Construimos un conjunto enfocado de herramientas que son realmente útiles, bellamente diseñadas, y funcionan perfectamente en cualquier dispositivo.",
      },

      mission: {
        badge: "Nuestra Misión",
        title: "Hacer Fácil las Decisiones Inteligentes",
        text: "Los cálculos financieros y de salud no deberían requerir un título en finanzas. Construimos herramientas que cualquiera puede usar para tomar mejores decisiones. Sin jerga. Sin tarifas ocultas. Sin necesidad de cuenta.",
      },

      methodology: {
        badge: "Precisión y Metodología",
        title: "Basado en Estándares Confiables",
        subtitle: "Cada calculadora se desarrolla usando fórmulas estándar de la industria y fuentes verificadas.",
        points: [
          {
            icon: "🏦",
            title: "Estándares Financieros",
            text: "Nuestras calculadoras financieras usan fórmulas empleadas por bancos, cooperativas de crédito y planificadores financieros certificados.",
          },
          {
            icon: "📊",
            title: "Datos Gubernamentales",
            text: "Las calculadoras de impuestos y jubilación referencian datos públicos de agencias oficiales y fuentes gubernamentales.",
          },
          {
            icon: "🏥",
            title: "Guías de Salud",
            text: "Las calculadoras de salud siguen guías de organizaciones reconocidas incluyendo OMS, CDC e investigación médica revisada por pares.",
          },
          {
            icon: "🔄",
            title: "Actualizaciones Regulares",
            text: "Revisamos y actualizamos continuamente nuestras herramientas para asegurar precisión con tasas, regulaciones y mejores prácticas actuales.",
          },
        ],
        disclaimer: "Kalcufy está diseñado con fines educativos e informativos. Nuestras herramientas no reemplazan el asesoramiento profesional financiero, médico o legal. Siempre consulta a profesionales calificados para decisiones importantes.",
      },

      values: [
        {
          icon: "✨",
          title: "Simplicidad Primero",
          text: "Matemáticas complejas no significa interfaces complejas. Cada calculadora está diseñada para ser intuitiva y fácil de entender.",
        },
        {
          icon: "🆓",
          title: "Realmente Gratis",
          text: "Sin trucos ni muros de pago. Todos merecen acceso a herramientas financieras y de salud confiables.",
        },
        {
          icon: "📱",
          title: "Listo para Móvil",
          text: "Más del 70% de nuestros usuarios están en móvil. Cada calculadora está construida mobile-first y funciona en cualquier pantalla.",
        },
        {
          icon: "🔒",
          title: "Privacidad por Diseño",
          text: "Tus cálculos se ejecutan completamente en tu navegador. No vendemos datos personales ni rastreamos cálculos individuales.",
        },
      ],

      team: {
        badge: "El Equipo",
        title: "Equipo Pequeño, Gran Misión",
        text: "Kalcufy está construido por un equipo dedicado de desarrolladores, diseñadores y analistas financieros basados en Estados Unidos. Nos apasiona la precisión, la accesibilidad y crear herramientas en las que la gente realmente pueda confiar.",
        commitment: "Estamos comprometidos a construir la plataforma de calculadoras más confiable y fácil de usar en la web—una que respete tu tiempo, tu privacidad y tu inteligencia.",
      },

      trust: {
        title: "Por Qué la Gente Confía en Kalcufy",
        items: [
          { icon: "✓", text: "Sin necesidad de cuenta para ninguna calculadora" },
          { icon: "✓", text: "Sin anuncios en los resultados" },
          { icon: "✓", text: "Fórmulas transparentes explicadas" },
          { icon: "✓", text: "Auditorías regulares de precisión" },
          { icon: "✓", text: "Abiertos a comentarios de usuarios" },
        ],
      },

      stats: [
        { number: "500K+", label: "Cálculos", srLabel: "Más de 500 mil cálculos realizados" },
        { number: "50K+", label: "Usuarios Felices", srLabel: "Más de 50 mil usuarios felices" },
        { number: "40+", label: "Calculadoras", srLabel: "Más de 40 calculadoras disponibles" },
        { number: "3", label: "Idiomas", srLabel: "Disponible en 3 idiomas" },
      ],

      cta: {
        title: "¿Listo para Calcular?",
        subtitle: "Prueba cualquiera de nuestras calculadoras. Completamente gratis, sin registro.",
        button: "Explorar Calculadoras",
      },

      contact: {
        title: "¿Preguntas o Comentarios?",
        text: "Siempre buscamos mejorar. Contáctanos cuando quieras.",
        email: "hello@kalcufy.com",
      },
    },

    pt: {
      badge: "Nossa História",
      title1: "Feito para Quem",
      title2: "Odeia Calculadoras Ruins",
      subtitle: "Cansamos de sites de calculadoras feios e desatualizados. Então construímos algo melhor.",
      
      story: {
        title: "Por Que Kalcufy Existe",
        p1: "Já procurou uma calculadora de empréstimo simples e acabou em um site que parece de 2005? Cheio de anúncios, confuso de usar, e completamente quebrado no celular.",
        p2: "É, nós também. E isso nos deixou loucos.",
        p3: "Kalcufy foi criado por desenvolvedores e analistas financeiros que usam calculadoras diariamente—e estavam frustrados com o quão não confiáveis e confusas a maioria delas são. Construímos um conjunto focado de ferramentas que são realmente úteis, lindamente projetadas, e funcionam perfeitamente em qualquer dispositivo.",
      },

      mission: {
        badge: "Nossa Missão",
        title: "Tornar Decisões Inteligentes Fáceis",
        text: "Cálculos financeiros e de saúde não deveriam exigir diploma em finanças. Construímos ferramentas que qualquer um pode usar para tomar melhores decisões. Sem jargões. Sem taxas ocultas. Sem necessidade de conta.",
      },

      methodology: {
        badge: "Precisão e Metodologia",
        title: "Baseado em Padrões Confiáveis",
        subtitle: "Cada calculadora é desenvolvida usando fórmulas padrão da indústria e fontes verificadas.",
        points: [
          {
            icon: "🏦",
            title: "Padrões Financeiros",
            text: "Nossas calculadoras financeiras usam fórmulas empregadas por bancos, cooperativas de crédito e planejadores financeiros certificados.",
          },
          {
            icon: "📊",
            title: "Dados Governamentais",
            text: "Calculadoras de impostos e aposentadoria referenciam dados públicos de agências oficiais e fontes governamentais.",
          },
          {
            icon: "🏥",
            title: "Diretrizes de Saúde",
            text: "Calculadoras de saúde seguem diretrizes de organizações reconhecidas incluindo OMS, CDC e pesquisa médica revisada por pares.",
          },
          {
            icon: "🔄",
            title: "Atualizações Regulares",
            text: "Revisamos e atualizamos continuamente nossas ferramentas para garantir precisão com taxas, regulamentos e melhores práticas atuais.",
          },
        ],
        disclaimer: "Kalcufy é projetado para fins educacionais e informativos. Nossas ferramentas não substituem aconselhamento profissional financeiro, médico ou legal. Sempre consulte profissionais qualificados para decisões importantes.",
      },

      values: [
        {
          icon: "✨",
          title: "Simplicidade Primeiro",
          text: "Matemática complexa não significa interfaces complexas. Cada calculadora é projetada para ser intuitiva e fácil de entender.",
        },
        {
          icon: "🆓",
          title: "Realmente Grátis",
          text: "Sem truques ou paywalls. Todos merecem acesso a ferramentas financeiras e de saúde confiáveis.",
        },
        {
          icon: "📱",
          title: "Pronto para Mobile",
          text: "Mais de 70% dos nossos usuários estão no celular. Cada calculadora é construída mobile-first e funciona em qualquer tela.",
        },
        {
          icon: "🔒",
          title: "Privacidade por Design",
          text: "Seus cálculos rodam inteiramente no seu navegador. Não vendemos dados pessoais nem rastreamos cálculos individuais.",
        },
      ],

      team: {
        badge: "A Equipe",
        title: "Equipe Pequena, Grande Missão",
        text: "Kalcufy é construído por uma equipe dedicada de desenvolvedores, designers e analistas financeiros baseados nos Estados Unidos. Somos apaixonados por precisão, acessibilidade e criar ferramentas em que as pessoas possam realmente confiar.",
        commitment: "Estamos comprometidos em construir a plataforma de calculadoras mais confiável e fácil de usar na web—uma que respeite seu tempo, sua privacidade e sua inteligência.",
      },

      trust: {
        title: "Por Que as Pessoas Confiam no Kalcufy",
        items: [
          { icon: "✓", text: "Sem necessidade de conta para nenhuma calculadora" },
          { icon: "✓", text: "Sem anúncios nos resultados" },
          { icon: "✓", text: "Fórmulas transparentes explicadas" },
          { icon: "✓", text: "Auditorias regulares de precisão" },
          { icon: "✓", text: "Abertos a feedback dos usuários" },
        ],
      },

      stats: [
        { number: "500K+", label: "Cálculos", srLabel: "Mais de 500 mil cálculos realizados" },
        { number: "50K+", label: "Usuários Felizes", srLabel: "Mais de 50 mil usuários felizes" },
        { number: "40+", label: "Calculadoras", srLabel: "Mais de 40 calculadoras disponíveis" },
        { number: "3", label: "Idiomas", srLabel: "Disponível em 3 idiomas" },
      ],

      cta: {
        title: "Pronto para Calcular?",
        subtitle: "Experimente qualquer uma de nossas calculadoras. Completamente grátis, sem cadastro.",
        button: "Explorar Calculadoras",
      },

      contact: {
        title: "Perguntas ou Feedback?",
        text: "Estamos sempre buscando melhorar. Entre em contato a qualquer momento.",
        email: "hello@kalcufy.com",
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section 
        aria-labelledby="hero-heading"
        className="pt-24 pb-16 bg-gradient-to-b from-white to-slate-50"
      >
        <div className="container text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
            <span aria-hidden="true">📖</span>
            {t.badge}
          </div>

          {/* Title */}
          <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            {t.title1}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              {t.title2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            {t.subtitle}
          </p>

          {/* Team Image */}
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop"
              alt="Diverse team of professionals collaborating around a table with laptops in a modern office"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section 
        aria-labelledby="story-heading"
        className="py-16 bg-white"
      >
        <div className="container max-w-3xl">
          <h2 id="story-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            {t.story.title}
          </h2>
          <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
            <p>{t.story.p1}</p>
            <p className="font-medium text-slate-800">{t.story.p2}</p>
            <p>{t.story.p3}</p>
          </div>
        </div>
      </section>

      {/* Methodology Section - CRITICAL FOR EEAT */}
      <section 
        aria-labelledby="methodology-heading"
        className="py-16 bg-slate-50"
      >
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
              <span aria-hidden="true">🎯</span>
              {t.methodology.badge}
            </div>
            <h2 id="methodology-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              {t.methodology.title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t.methodology.subtitle}
            </p>
          </div>

          {/* Methodology Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
            {t.methodology.points.map((point, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all"
              >
                <div 
                  className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl mb-4"
                  aria-hidden="true"
                >
                  {point.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="max-w-3xl mx-auto bg-slate-100 rounded-xl p-6 border border-slate-200">
            <p className="text-sm text-slate-600 text-center leading-relaxed">
              <span className="font-semibold text-slate-700">Important:</span> {t.methodology.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section 
        aria-labelledby="mission-heading"
        className="py-16 bg-white"
      >
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
            {t.mission.badge}
          </div>
          <h2 id="mission-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {t.mission.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t.mission.text}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section 
        aria-labelledby="values-heading"
        className="py-16 bg-slate-50"
      >
        <div className="container">
          <h2 id="values-heading" className="sr-only">Our Values</h2>
          
          <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {t.values.map((value, index) => (
              <li
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div 
                  className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl mb-4"
                  aria-hidden="true"
                >
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {value.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team Section - Enhanced */}
      <section 
        aria-labelledby="team-heading"
        className="py-16 bg-white"
      >
        <div className="container">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
            {/* Image */}
            <div className="flex-1 w-full">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                  alt="Team members collaborating and discussing ideas in a bright office space"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            {/* Text */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
                {t.team.badge}
              </div>
              <h2 id="team-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {t.team.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {t.team.text}
              </p>
              <p className="text-slate-700 font-medium leading-relaxed">
                {t.team.commitment}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section 
        aria-labelledby="trust-heading"
        className="py-12 bg-slate-50"
      >
        <div className="container">
          <h2 id="trust-heading" className="text-xl md:text-2xl font-bold text-slate-900 text-center mb-8">
            {t.trust.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto">
            {t.trust.items.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm"
              >
                <span className="text-emerald-600 font-bold">{item.icon}</span>
                <span className="text-slate-700 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        aria-labelledby="stats-heading"
        className="py-16 bg-white"
      >
        <div className="container">
          <h2 id="stats-heading" className="sr-only">Our Impact in Numbers</h2>
          
          <ul className="flex flex-wrap justify-center gap-10 md:gap-16" role="list">
            {t.stats.map((stat, index) => (
              <li key={index} className="text-center">
                <span className="sr-only">{stat.srLabel}</span>
                <div className="text-3xl md:text-4xl font-bold text-blue-600" aria-hidden="true">
                  {stat.number}
                </div>
                <div className="text-slate-600 text-sm" aria-hidden="true">
                  {stat.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        aria-labelledby="cta-heading"
        className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500"
      >
        <div className="container text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-blue-100 mb-8">{t.cta.subtitle}</p>
          <Link
            href={`/${locale}/calculators`}
            className="inline-block px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        aria-labelledby="contact-heading"
        className="py-12 bg-white"
      >
        <div className="container text-center">
          <h2 id="contact-heading" className="text-xl font-bold text-slate-900 mb-2">
            {t.contact.title}
          </h2>
          <p className="text-slate-600 mb-2">{t.contact.text}</p>
          <a
            href={`mailto:${t.contact.email}`}
            className="text-blue-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            {t.contact.email}
          </a>
        </div>
      </section>
    </main>
  );
}
