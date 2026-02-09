"use client";

import { useLocale } from "next-intl";
import Header from "@/components/Header";
import Link from "next/link";

const content = {
  en: {
    skipToMain: "Skip to main content",
    backToHome: "Back to Home",
    title: "Cookie Policy",
    lastUpdated: "Last updated: January 24, 2026",
    whatAreCookies: {
      title: "What Are Cookies?",
      p1: "Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.",
      p2: "This Cookie Policy explains what cookies are, how Kalcufy uses them, and your choices regarding cookies.",
    },
    howWeUse: {
      title: "How We Use Cookies",
      intro: "Kalcufy uses cookies for various purposes:",
      items: [
        "To enable certain functions of the website",
        "To provide analytics and understand how you use our website",
        "To store your preferences",
        "To enable advertisements delivery and measure their effectiveness",
        "To keep you signed in to your account",
      ],
    },
    types: {
      title: "Types of Cookies We Use",
      essential: { title: "Essential Cookies (Required)", desc: "These cookies are necessary for the website to function properly. They cannot be disabled." },
      analytics: { title: "Analytics Cookies", desc: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously." },
      advertising: { title: "Advertising Cookies", desc: "These cookies are used to deliver advertisements that are relevant to you and your interests." },
      preference: { title: "Preference Cookies", desc: "These cookies allow the website to remember choices you make to provide a more personalized experience." },
    },
    choices: {
      title: "Your Cookie Choices",
      browser: { title: "Browser Settings", desc: "Most web browsers allow you to control cookies through their settings." },
      optOut: { title: "Opt-Out of Interest-Based Advertising", desc: "You can opt out of interest-based advertising from participating companies at:" },
      gaOptOut: { title: "Google Analytics Opt-Out", desc: "You can opt out of Google Analytics by installing the", link: "Google Analytics Opt-out Browser Add-on" },
    },
    impact: {
      title: "Impact of Disabling Cookies",
      desc: "Please note that if you choose to disable cookies, some features of Kalcufy may not function properly:",
      items: [
        "You may not be able to stay signed in",
        "Your language preference may not be saved",
        "Some features may not work as expected",
        "Calculator settings may not be remembered",
      ],
    },
    updates: { title: "Updates to This Cookie Policy", desc: "We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices." },
    contact: { title: "Contact Us", desc: "If you have any questions about our use of cookies, please contact us:" },
    links: { terms: "Terms of Service →", privacy: "Privacy Policy →" },
  },
  es: {
    skipToMain: "Ir al contenido principal",
    backToHome: "Volver al inicio",
    title: "Política de Cookies",
    lastUpdated: "Última actualización: 24 de enero de 2026",
    whatAreCookies: {
      title: "¿Qué son las Cookies?",
      p1: "Las cookies son pequeños archivos de texto que se almacenan en su computadora o dispositivo móvil cuando visita un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente y proporcionar información a los propietarios del sitio web.",
      p2: "Esta Política de Cookies explica qué son las cookies, cómo las utiliza Kalcufy y sus opciones con respecto a las cookies.",
    },
    howWeUse: {
      title: "Cómo Utilizamos las Cookies",
      intro: "Kalcufy utiliza cookies para varios propósitos:",
      items: [
        "Para habilitar ciertas funciones del sitio web",
        "Para proporcionar análisis y entender cómo usas nuestro sitio web",
        "Para almacenar tus preferencias",
        "Para habilitar la entrega de anuncios y medir su efectividad",
        "Para mantenerte conectado a tu cuenta",
      ],
    },
    types: {
      title: "Tipos de Cookies que Utilizamos",
      essential: { title: "Cookies Esenciales (Requeridas)", desc: "Estas cookies son necesarias para que el sitio web funcione correctamente. No se pueden desactivar." },
      analytics: { title: "Cookies de Análisis", desc: "Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando e informando datos de forma anónima." },
      advertising: { title: "Cookies de Publicidad", desc: "Estas cookies se utilizan para mostrar anuncios que son relevantes para usted y sus intereses." },
      preference: { title: "Cookies de Preferencias", desc: "Estas cookies permiten al sitio web recordar las decisiones que toma para ofrecer una experiencia más personalizada." },
    },
    choices: {
      title: "Sus Opciones de Cookies",
      browser: { title: "Configuración del Navegador", desc: "La mayoría de los navegadores web te permiten controlar las cookies a través de su configuración." },
      optOut: { title: "Exclusión de Publicidad Basada en Intereses", desc: "Puedes excluirte de la publicidad basada en intereses de las empresas participantes en:" },
      gaOptOut: { title: "Exclusión de Google Analytics", desc: "Puedes excluirte de Google Analytics instalando el", link: "Complemento de Navegador para Excluirse de Google Analytics" },
    },
    impact: {
      title: "Impacto de Desactivar las Cookies",
      desc: "Ten en cuenta que si eliges desactivar las cookies, algunas características de Kalcufy pueden no funcionar correctamente:",
      items: [
        "Es posible que no puedas mantener la sesión iniciada",
        "Tu preferencia de idioma puede no guardarse",
        "Algunas características pueden no funcionar como se espera",
        "La configuración de la calculadora puede no recordarse",
      ],
    },
    updates: { title: "Actualizaciones de Esta Política de Cookies", desc: "Podemos actualizar esta Política de Cookies de vez en cuando para reflejar cambios en la tecnología, legislación o nuestras prácticas." },
    contact: { title: "Contáctanos", desc: "Si tiene alguna pregunta sobre nuestro uso de cookies, contáctenos:" },
    links: { terms: "Términos de Servicio →", privacy: "Política de Privacidad →" },
  },
  pt: {
    skipToMain: "Ir para o conteúdo principal",
    backToHome: "Voltar ao Início",
    title: "Política de Cookies",
    lastUpdated: "Última atualização: 24 de janeiro de 2026",
    whatAreCookies: {
      title: "O Que São Cookies?",
      p1: "Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita um website. Eles são amplamente utilizados para fazer os websites funcionarem de forma mais eficiente e fornecer informações aos proprietários dos websites.",
      p2: "Esta Política de Cookies explica o que são cookies, como a Kalcufy os utiliza, e suas opções em relação aos cookies.",
    },
    howWeUse: {
      title: "Como Utilizamos Cookies",
      intro: "A Kalcufy usa cookies para vários propósitos:",
      items: [
        "Para habilitar certas funções do site",
        "Para fornecer análises e entender como você usa nosso site",
        "Para armazenar suas preferências",
        "Para permitir a entrega de anúncios e medir sua eficácia",
        "Para mantê-lo conectado à sua conta",
      ],
    },
    types: {
      title: "Tipos de Cookies Que Usamos",
      essential: { title: "Cookies Essenciais (Obrigatórios)", desc: "Estes cookies são necessários para o funcionamento adequado do website. Não podem ser desativados." },
      analytics: { title: "Cookies de Análise", desc: "Estes cookies ajudam-nos a compreender como os visitantes interagem com o nosso website através da recolha e comunicação de informações de forma anónima." },
      advertising: { title: "Cookies de Publicidade", desc: "Estes cookies são utilizados para fornecer anúncios que são relevantes para si e para os seus interesses." },
      preference: { title: "Cookies de Preferência", desc: "Estes cookies permitem ao website lembrar-se das escolhas que faz para proporcionar uma experiência mais personalizada." },
    },
    choices: {
      title: "As Suas Escolhas de Cookies",
      browser: { title: "Configurações do Navegador", desc: "A maioria dos navegadores web permite controlar cookies através das suas configurações." },
      optOut: { title: "Cancelar Publicidade Baseada em Interesses", desc: "Pode cancelar a publicidade baseada em interesses das empresas participantes em:" },
      gaOptOut: { title: "Cancelar Google Analytics", desc: "Pode cancelar o Google Analytics instalando o", link: "Complemento do Navegador para Cancelar Google Analytics" },
    },
    impact: {
      title: "Impacto de Desativar Cookies",
      desc: "Observe que, se escolher desativar os cookies, algumas funcionalidades do Kalcufy podem não funcionar corretamente:",
      items: [
        "Pode não conseguir manter-se conectado",
        "A sua preferência de idioma pode não ser guardada",
        "Algumas funcionalidades podem não funcionar como esperado",
        "As configurações da calculadora podem não ser lembradas",
      ],
    },
    updates: { title: "Atualizações a Esta Política de Cookies", desc: "Podemos atualizar esta Política de Cookies ocasionalmente para refletir mudanças na tecnologia, legislação ou nas nossas práticas." },
    contact: { title: "Entre em Contacto Connosco", desc: "Se tiver alguma questão sobre o uso de cookies, contacte-nos:" },
    links: { terms: "Termos de Serviço →", privacy: "Política de Privacidade →" },
  },
  fr: {
    skipToMain: "Passer au contenu principal",
    backToHome: "Retour à l'accueil",
    title: "Politique des cookies",
    lastUpdated: "Dernière mise à jour : 24 janvier 2026",
    whatAreCookies: {
      title: "Que sont les cookies ?",
      p1: "Les cookies sont de petits fichiers texte qui sont stockés sur votre ordinateur ou appareil mobile lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web plus efficacement et fournir des informations aux propriétaires de sites web.",
      p2: "Cette Politique des cookies explique ce que sont les cookies, comment Kalcufy les utilise, et vos choix concernant les cookies.",
    },
    howWeUse: {
      title: "Comment nous utilisons les cookies",
      intro: "Kalcufy utilise des cookies à diverses fins :",
      items: [
        "Pour activer certaines fonctions du site web",
        "Pour fournir des analyses et comprendre comment vous utilisez notre site web",
        "Pour stocker vos préférences",
        "Pour permettre la diffusion de publicités et mesurer leur efficacité",
        "Pour vous maintenir connecté à votre compte",
      ],
    },
    types: {
      title: "Types de Cookies que Nous Utilisons",
      essential: { title: "Cookies Essentiels (Requis)", desc: "Ces cookies sont nécessaires au bon fonctionnement du site web. Ils ne peuvent pas être désactivés." },
      analytics: { title: "Cookies d'analyse", desc: "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et rapportant des informations de manière anonyme." },
      advertising: { title: "Cookies publicitaires", desc: "Ces cookies sont utilisés pour diffuser des publicités qui sont pertinentes pour vous et vos intérêts." },
      preference: { title: "Cookies de préférence", desc: "Ces cookies permettent au site web de se souvenir des choix que vous faites pour offrir une expérience plus personnalisée." },
    },
    choices: {
      title: "Vos choix de cookies",
      browser: { title: "Paramètres du navigateur", desc: "La plupart des navigateurs web vous permettent de contrôler les cookies via leurs paramètres." },
      optOut: { title: "Désactivation de la publicité basée sur les centres d'intérêt", desc: "Vous pouvez désactiver la publicité basée sur les centres d'intérêt des entreprises participantes à :" },
      gaOptOut: { title: "Désactivation de Google Analytics", desc: "Vous pouvez désactiver Google Analytics en installant l'", link: "Extension de navigateur de désactivation de Google Analytics" },
    },
    impact: {
      title: "Impact de la désactivation des cookies",
      desc: "Veuillez noter que si vous choisissez de désactiver les cookies, certaines fonctionnalités de Kalcufy peuvent ne pas fonctionner correctement :",
      items: [
        "Vous pourriez ne pas pouvoir rester connecté",
        "Votre préférence de langue pourrait ne pas être sauvegardée",
        "Certaines fonctionnalités pourraient ne pas fonctionner comme prévu",
        "Les paramètres de la calculatrice pourraient ne pas être mémorisés",
      ],
    },
    updates: { title: "Mises à jour de cette Politique de Cookies", desc: "Nous pouvons mettre à jour cette Politique de Cookies de temps à autre pour refléter les changements technologiques, législatifs ou dans nos pratiques." },
    contact: { title: "Nous Contacter", desc: "Si vous avez des questions concernant notre utilisation des cookies, veuillez nous contacter :" },
    links: { terms: "Conditions d'utilisation →", privacy: "Politique de confidentialité →" },
  },
  de: {
    skipToMain: "Zum Hauptinhalt springen",
    backToHome: "Zurück zur Startseite",
    title: "Cookie-Richtlinie",
    lastUpdated: "Zuletzt aktualisiert: 24. Januar 2026",
    whatAreCookies: {
      title: "Was sind Cookies?",
      p1: "Cookies sind kleine Textdateien, die auf Ihrem Computer oder mobilen Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie werden häufig verwendet, um Websites effizienter zu machen und den Website-Betreibern Informationen zu liefern.",
      p2: "Diese Cookie-Richtlinie erklärt, was Cookies sind, wie Kalcufy sie verwendet und welche Wahlmöglichkeiten Sie bezüglich Cookies haben.",
    },
    howWeUse: {
      title: "Wie wir Cookies verwenden",
      intro: "Kalcufy verwendet Cookies für verschiedene Zwecke:",
      items: [
        "Um bestimmte Funktionen der Website zu ermöglichen",
        "Um Analysen bereitzustellen und zu verstehen, wie Sie unsere Website nutzen",
        "Um Ihre Einstellungen zu speichern",
        "Um die Bereitstellung von Werbung zu ermöglichen und deren Wirksamkeit zu messen",
        "Um Sie in Ihrem Konto angemeldet zu halten",
      ],
    },
    types: {
      title: "Arten von Cookies, die wir verwenden",
      essential: { title: "Wesentliche Cookies (Erforderlich)", desc: "Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich. Sie können nicht deaktiviert werden." },
      analytics: { title: "Analyse-Cookies", desc: "Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und berichten." },
      advertising: { title: "Werbe-Cookies", desc: "Diese Cookies werden verwendet, um Werbung zu liefern, die für Sie und Ihre Interessen relevant ist." },
      preference: { title: "Präferenz-Cookies", desc: "Diese Cookies ermöglichen es der Website, sich an Entscheidungen zu erinnern, die Sie treffen, um eine personalisiertere Erfahrung zu bieten." },
    },
    choices: {
      title: "Ihre Cookie-Entscheidungen",
      browser: { title: "Browser-Einstellungen", desc: "Die meisten Webbrowser ermöglichen es Ihnen, Cookies über ihre Einstellungen zu kontrollieren." },
      optOut: { title: "Abmeldung von interessensbasierter Werbung", desc: "Sie können sich von interessensbasierter Werbung teilnehmender Unternehmen abmelden unter:" },
      gaOptOut: { title: "Google Analytics Abmeldung", desc: "Sie können sich von Google Analytics abmelden, indem Sie das", link: "Google Analytics Opt-out Browser Add-on" },
    },
    impact: {
      title: "Auswirkungen der Deaktivierung von Cookies",
      desc: "Bitte beachten Sie, dass einige Funktionen von Kalcufy möglicherweise nicht ordnungsgemäß funktionieren, wenn Sie Cookies deaktivieren:",
      items: [
        "Sie können möglicherweise nicht angemeldet bleiben",
        "Ihre Spracheinstellung wird möglicherweise nicht gespeichert",
        "Einige Funktionen funktionieren möglicherweise nicht wie erwartet",
        "Rechner-Einstellungen werden möglicherweise nicht gespeichert",
      ],
    },
    updates: { title: "Aktualisierungen dieser Cookie-Richtlinie", desc: "Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren, um Änderungen in der Technologie, Gesetzgebung oder unseren Praktiken widerzuspiegeln." },
    contact: { title: "Kontaktieren Sie uns", desc: "Wenn Sie Fragen zu unserer Verwendung von Cookies haben, kontaktieren Sie uns bitte:" },
    links: { terms: "Nutzungsbedingungen →", privacy: "Datenschutzrichtlinie →" },
  }
};

export default function CookiesPage() {
  const locale = useLocale();
  const t = content[locale as keyof typeof content] || content.en;

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">{t.skipToMain}</a>
      <Header />
      <main id="main-content" className="pt-24 pb-16 min-h-screen bg-slate-50">
        <div className="container max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link href={`/${locale}`} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {t.backToHome}
            </Link>
          </nav>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{t.title}</h1>
            <p className="text-slate-600"><time dateTime="2026-01-24">{t.lastUpdated}</time></p>
          </header>
          <article className="bg-white rounded-xl shadow-sm p-6 md:p-10 space-y-10">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.whatAreCookies.title}</h2>
              <p className="text-slate-600 mb-4">{t.whatAreCookies.p1}</p>
              <p className="text-slate-600">{t.whatAreCookies.p2}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.howWeUse.title}</h2>
              <p className="text-slate-600 mb-4">{t.howWeUse.intro}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                {t.howWeUse.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6">{t.types.title}</h2>
              <div className="space-y-6">
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                  <h3 className="text-lg font-bold text-green-800 mb-2">{t.types.essential.title}</h3>
                  <p className="text-green-700">{t.types.essential.desc}</p>
                </div>
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">{t.types.analytics.title}</h3>
                  <p className="text-blue-700">{t.types.analytics.desc}</p>
                </div>
                <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
                  <h3 className="text-lg font-bold text-amber-800 mb-2">{t.types.advertising.title}</h3>
                  <p className="text-amber-700">{t.types.advertising.desc}</p>
                </div>
                <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
                  <h3 className="text-lg font-bold text-purple-800 mb-2">{t.types.preference.title}</h3>
                  <p className="text-purple-700">{t.types.preference.desc}</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.choices.title}</h2>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{t.choices.browser.title}</h3>
              <p className="text-slate-600 mb-4">{t.choices.browser.desc}</p>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{t.choices.optOut.title}</h3>
              <p className="text-slate-600 mb-4">{t.choices.optOut.desc}</p>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{t.choices.gaOptOut.title}</h3>
              <p className="text-slate-600">{t.choices.gaOptOut.desc} <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t.choices.gaOptOut.link}</a>.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.impact.title}</h2>
              <p className="text-slate-600 mb-4">{t.impact.desc}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                {t.impact.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.updates.title}</h2>
              <p className="text-slate-600">{t.updates.desc}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.contact.title}</h2>
              <p className="text-slate-600 mb-4">{t.contact.desc}</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@kalcufy.com" className="text-blue-600 hover:underline">privacy@kalcufy.com</a></p>
            </section>
          </article>
          <nav className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/terms`} className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md text-center font-medium text-slate-700 hover:text-blue-600">{t.links.terms}</Link>
            <Link href={`/${locale}/privacy`} className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md text-center font-medium text-slate-700 hover:text-blue-600">{t.links.privacy}</Link>
          </nav>
        </div>
      </main>
      
    </>
  );
}
