"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        p3: "So we built Kalcufy. Not another calculator site with hundreds of mediocre tools, but a focused set of calculators that are actually useful, beautifully designed, and work perfectly on any device.",
      },

      mission: {
        badge: "Our Mission",
        title: "Make Smart Decisions Easy",
        text: "Financial and health calculations shouldn't require a finance degree. We build tools that anyone can use to make better decisions about their money and their wellbeing. No jargon. No hidden fees. No account required.",
      },

      values: [
        {
          icon: "✨",
          title: "Simplicity First",
          text: "Complex math shouldn't mean complex interfaces. Every calculator is designed to be intuitive.",
        },
        {
          icon: "🆓",
          title: "Actually Free",
          text: "No tricks, no paywalls for basic features. Everyone deserves access to good financial tools.",
        },
        {
          icon: "📱",
          title: "Mobile Ready",
          text: "70% of our users are on mobile. Every calculator works perfectly on any screen size.",
        },
        {
          icon: "🔒",
          title: "Your Privacy",
          text: "Your calculations stay on your device. We don't sell data or track what you calculate.",
        },
      ],

      team: {
        badge: "The Team",
        title: "Small Team, Big Mission",
        text: "Kalcufy is built by a small team of developers and designers based in the United States. We're passionate about creating tools that actually help people make better financial decisions.",
      },

      stats: [
        { number: "500K+", label: "Calculations" },
        { number: "50K+", label: "Happy Users" },
        { number: "9+", label: "Calculators" },
        { number: "3", label: "Languages" },
      ],

      cta: {
        title: "Ready to Calculate?",
        subtitle: "Try any of our calculators. Completely free.",
        button: "Explore Calculators",
      },

      contact: {
        title: "Questions?",
        text: "We'd love to hear from you.",
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
        p3: "Así que construimos Kalcufy. No otro sitio con cientos de herramientas mediocres, sino un conjunto enfocado de calculadoras que son realmente útiles, bellamente diseñadas, y funcionan perfectamente en cualquier dispositivo.",
      },

      mission: {
        badge: "Nuestra Misión",
        title: "Hacer Fácil las Decisiones Inteligentes",
        text: "Los cálculos financieros y de salud no deberían requerir un título en finanzas. Construimos herramientas que cualquiera puede usar para tomar mejores decisiones. Sin jerga. Sin tarifas ocultas. Sin necesidad de cuenta.",
      },

      values: [
        {
          icon: "✨",
          title: "Simplicidad Primero",
          text: "Matemáticas complejas no significa interfaces complejas. Cada calculadora es intuitiva.",
        },
        {
          icon: "🆓",
          title: "Realmente Gratis",
          text: "Sin trucos ni muros de pago. Todos merecen acceso a buenas herramientas financieras.",
        },
        {
          icon: "📱",
          title: "Listo para Móvil",
          text: "70% de nuestros usuarios están en móvil. Cada calculadora funciona en cualquier pantalla.",
        },
        {
          icon: "🔒",
          title: "Tu Privacidad",
          text: "Tus cálculos se quedan en tu dispositivo. No vendemos datos ni rastreamos lo que calculas.",
        },
      ],

      team: {
        badge: "El Equipo",
        title: "Equipo Pequeño, Gran Misión",
        text: "Kalcufy está construido por un pequeño equipo de desarrolladores y diseñadores basados en Estados Unidos. Nos apasiona crear herramientas que realmente ayuden a las personas a tomar mejores decisiones financieras.",
      },

      stats: [
        { number: "500K+", label: "Cálculos" },
        { number: "50K+", label: "Usuarios Felices" },
        { number: "9+", label: "Calculadoras" },
        { number: "3", label: "Idiomas" },
      ],

      cta: {
        title: "¿Listo para Calcular?",
        subtitle: "Prueba cualquiera de nuestras calculadoras. Completamente gratis.",
        button: "Explorar Calculadoras",
      },

      contact: {
        title: "¿Preguntas?",
        text: "Nos encantaría saber de ti.",
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
        p3: "Então construímos Kalcufy. Não mais um site com centenas de ferramentas medíocres, mas um conjunto focado de calculadoras que são realmente úteis, lindamente projetadas, e funcionam perfeitamente em qualquer dispositivo.",
      },

      mission: {
        badge: "Nossa Missão",
        title: "Tornar Decisões Inteligentes Fáceis",
        text: "Cálculos financeiros e de saúde não deveriam exigir diploma em finanças. Construímos ferramentas que qualquer um pode usar para tomar melhores decisões. Sem jargões. Sem taxas ocultas. Sem necessidade de conta.",
      },

      values: [
        {
          icon: "✨",
          title: "Simplicidade Primeiro",
          text: "Matemática complexa não significa interfaces complexas. Cada calculadora é intuitiva.",
        },
        {
          icon: "🆓",
          title: "Realmente Grátis",
          text: "Sem truques ou paywalls. Todos merecem acesso a boas ferramentas financeiras.",
        },
        {
          icon: "📱",
          title: "Pronto para Mobile",
          text: "70% dos nossos usuários estão no celular. Cada calculadora funciona em qualquer tela.",
        },
        {
          icon: "🔒",
          title: "Sua Privacidade",
          text: "Seus cálculos ficam no seu dispositivo. Não vendemos dados nem rastreamos o que você calcula.",
        },
      ],

      team: {
        badge: "A Equipe",
        title: "Equipe Pequena, Grande Missão",
        text: "Kalcufy é construído por uma pequena equipe de desenvolvedores e designers baseados nos Estados Unidos. Somos apaixonados por criar ferramentas que realmente ajudem as pessoas a tomar melhores decisões financeiras.",
      },

      stats: [
        { number: "500K+", label: "Cálculos" },
        { number: "50K+", label: "Usuários Felizes" },
        { number: "9+", label: "Calculadoras" },
        { number: "3", label: "Idiomas" },
      ],

      cta: {
        title: "Pronto para Calcular?",
        subtitle: "Experimente qualquer uma das nossas calculadoras. Completamente grátis.",
        button: "Explorar Calculadoras",
      },

      contact: {
        title: "Perguntas?",
        text: "Adoraríamos ouvir de você.",
        email: "hello@kalcufy.com",
      },
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-28 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-100 text-blue-700 text-base font-semibold mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              {t.badge}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5">
              {t.title1}
              <br />
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
                alt="Team working together"
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-white">
          <div className="container max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
              {t.story.title}
            </h2>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>{t.story.p1}</p>
              <p className="font-medium text-slate-800">{t.story.p2}</p>
              <p>{t.story.p3}</p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 bg-slate-50">
          <div className="container max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
              {t.mission.badge}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              {t.mission.title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {t.mission.text}
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-slate-50">
          <div className="container">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
              {/* Image */}
              <div className="flex-1">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                    alt="Our team"
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
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {t.team.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {t.team.text}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {t.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-500">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.cta.title}
            </h2>
            <p className="text-blue-100 mb-8">{t.cta.subtitle}</p>
            <Link
              href={`/${locale}/calculators`}
              className="inline-block px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 shadow-lg transition-colors"
            >
              {t.cta.button}
            </Link>
          </div>
        </section>

        {/* Contact */}
        <section className="py-12 bg-white">
          <div className="container text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {t.contact.title}
            </h3>
            <p className="text-slate-600 mb-2">{t.contact.text}</p>
            <a
              href={`mailto:${t.contact.email}`}
              className="text-blue-600 font-semibold hover:underline"
            >
              {t.contact.email}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
