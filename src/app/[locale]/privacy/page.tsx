"use client";

import { useLocale } from "next-intl";
import Header from "@/components/Header";
import Link from "next/link";

const content = {
  en: {
    skipToMain: "Skip to main content",
    backToHome: "Back to Home",
    title: "Privacy Policy",
    lastUpdated: "Last updated: January 24, 2026",
    intro: {
      title: "Introduction",
      text: "Kalcufy is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
    },
    collect: {
      title: "Information We Collect",
      intro: "We may collect information about you in various ways:",
      personal: "Personal Data: Name, email address when you create an account or subscribe to PRO.",
      usage: "Usage Data: Browser type, pages visited, time spent, referring URLs.",
      device: "Device Data: IP address, device type, operating system.",
      calc: "Calculator Data: Your calculations are processed in your browser and are not stored on our servers unless you explicitly save them.",
    },
    use: {
      title: "How We Use Your Information",
      intro: "We use the information we collect to:",
      items: [
        "Provide and maintain our Service",
        "Process transactions and send related information",
        "Send you technical notices and support messages",
        "Respond to your comments and questions",
        "Analyze usage patterns to improve our Service",
        "Detect and prevent fraud and abuse",
      ],
    },
    cookies: {
      title: "Cookies and Tracking",
      text: "We use cookies and similar tracking technologies to track activity on our Service. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.",
      link: "For more details, see our Cookie Policy.",
    },
    sharing: {
      title: "Information Sharing",
      intro: "We may share your information with:",
      items: [
        "Service Providers: Companies that help us operate our business (Stripe, Google Analytics).",
        "Legal Requirements: When required by law or to protect our rights.",
        "Business Transfers: In connection with a merger or acquisition.",
      ],
      noSell: "We do not sell your personal information to third parties.",
    },
    security: {
      title: "Data Security",
      text: "We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.",
    },
    retention: {
      title: "Data Retention",
      text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.",
    },
    rights: {
      title: "Your Rights",
      intro: "Depending on your location, you may have the right to:",
      items: [
        "Access the personal information we hold about you",
        "Request correction of inaccurate data",
        "Request deletion of your data",
        "Object to processing of your data",
        "Request data portability",
      ],
      contact: "To exercise these rights, contact us at privacy@kalcufy.com.",
    },
    children: {
      title: "Children's Privacy",
      text: "Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13.",
    },
    changes: {
      title: "Changes to This Policy",
      text: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.",
    },
    contact: {
      title: "Contact Us",
      text: "If you have questions about this Privacy Policy, contact us at:",
    },
    links: { terms: "Terms of Service →", cookies: "Cookie Policy →" },
  },
  es: {
    skipToMain: "Ir al contenido principal",
    backToHome: "Volver al inicio",
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: 24 de enero de 2026",
    intro: {
      title: "Introducción",
      text: "Kalcufy se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando visita nuestro sitio web.",
    },
    collect: {
      title: "Información que Recopilamos",
      intro: "Podemos recopilar información sobre usted de varias maneras:",
      personal: "Datos Personales: Nombre, dirección de correo electrónico cuando creas una cuenta o te suscribes a PRO.",
      usage: "Datos de Uso: Tipo de navegador, páginas visitadas, tiempo empleado, URLs de referencia.",
      device: "Datos del Dispositivo: Dirección IP, tipo de dispositivo, sistema operativo.",
      calc: "Datos de la Calculadora: Tus cálculos se procesan en tu navegador y no se almacenan en nuestros servidores a menos que los guardes explícitamente.",
    },
    use: {
      title: "Cómo Utilizamos Tu Información",
      intro: "Utilizamos la información que recopilamos para:",
      items: [
        "Proporcionar y mantener nuestro Servicio",
        "Procesar transacciones y enviar información relacionada",
        "Send you technical notices and support messages",
        "Respond to your comments and questions",
        "Analyze usage patterns to improve our Service",
        "Detect and prevent fraud and abuse",
      ],
    },
    cookies: {
      title: "Cookies y Seguimiento",
      text: "Utilizamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro Servicio. Puedes configurar tu navegador para rechazar todas las cookies o indicar cuándo se está enviando una cookie.",
      link: "Para más detalles, consulta nuestra Política de Cookies.",
    },
    sharing: {
      title: "Compartir Información",
      intro: "Podemos compartir tu información con:",
      items: [
        "Proveedores de Servicios: Empresas que nos ayudan a operar nuestro negocio (Stripe, Google Analytics).",
        "Requisitos Legales: Cuando sea requerido por ley o para proteger nuestros derechos.",
        "Transferencias Comerciales: En relación con una fusión o adquisición.",
      ],
      noSell: "No vendemos tu información personal a terceros.",
    },
    security: {
      title: "Seguridad de Datos",
      text: "Implementamos medidas de seguridad apropiadas para proteger tu información personal. Sin embargo, ningún método de transmisión por Internet es 100% seguro.",
    },
    retention: {
      title: "Retención de Datos",
      text: "Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta Política de Privacidad, a menos que la ley requiera un período de retención más largo.",
    },
    rights: {
      title: "Sus Derechos",
      intro: "Dependiendo de su ubicación, usted puede tener derecho a:",
      items: [
        "Acceder a la información personal que tenemos sobre usted",
        "Solicitar la corrección de datos inexactos",
        "Solicitar la eliminación de sus datos",
        "Oponerse al procesamiento de sus datos",
        "Solicitar la portabilidad de datos",
      ],
      contact: "Para ejercer estos derechos, contáctenos en privacy@kalcufy.com.",
    },
    children: {
      title: "Privacidad de Menores",
      text: "Nuestro Servicio no está dirigido a menores de 13 años. No recopilamos intencionalmente información personal de menores de 13 años.",
    },
    changes: {
      title: "Cambios a Esta Política",
      text: "Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos sobre cualquier cambio publicando la nueva Política de Privacidad en esta página.",
    },
    contact: {
      title: "Contáctenos",
      text: "Si tiene preguntas sobre esta Política de Privacidad, contáctenos en:",
    },
    links: { terms: "Términos de Servicio →", cookies: "Política de Cookies →" },
  },
  pt: {
    skipToMain: "Skip to main content",
    backToHome: "Back to Home",
    title: "Privacy Policy",
    lastUpdated: "Last updated: January 24, 2026",
    intro: {
      title: "Introduction",
      text: "Kalcufy is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
    },
    collect: {
      title: "Information We Collect",
      intro: "We may collect information about you in various ways:",
      personal: "Dados Pessoais: Nome, endereço de email quando você cria uma conta ou se inscreve no PRO.",
      usage: "Dados de Uso: Tipo de navegador, páginas visitadas, tempo gasto, URLs de referência.",
      device: "Dados do Dispositivo: Endereço IP, tipo de dispositivo, sistema operacional.",
      calc: "Dados da Calculadora: Seus cálculos são processados no seu navegador e não são armazenados em nossos servidores, a menos que você os salve explicitamente.",
    },
    use: {
      title: "Como Utilizamos Suas Informações",
      intro: "Utilizamos as informações que coletamos para:",
      items: [
        "Fornecer e manter nosso Serviço",
        "Processar transações e enviar informações relacionadas",
        "Enviar-lhe avisos técnicos e mensagens de suporte",
        "Responder aos seus comentários e perguntas",
        "Analisar padrões de utilização para melhorar o nosso Serviço",
        "Detetar e prevenir fraude e abuso",
      ],
    },
    cookies: {
      title: "Cookies e Rastreamento",
      text: "Utilizamos cookies e tecnologias de rastreamento semelhantes para acompanhar a atividade no nosso Serviço. Pode instruir o seu navegador a recusar todos os cookies ou indicar quando um cookie está a ser enviado.",
      link: "Para mais detalhes, consulte a nossa Política de Cookies.",
    },
    sharing: {
      title: "Partilha de Informações",
      intro: "Podemos compartilhar suas informações com:",
      items: [
        "Prestadores de Serviços: Empresas que nos ajudam a operar nosso negócio (Stripe, Google Analytics).",
        "Requisitos Legais: Quando exigido por lei ou para proteger nossos direitos.",
        "Transferências Comerciais: Em conexão com uma fusão ou aquisição.",
      ],
      noSell: "Não vendemos suas informações pessoais para terceiros.",
    },
    security: {
      title: "Segurança de Dados",
      text: "Implementamos medidas de segurança apropriadas para proteger suas informações pessoais. No entanto, nenhum método de transmissão pela Internet é 100% seguro.",
    },
    retention: {
      title: "Retenção de Dados",
      text: "Retemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido por lei.",
    },
    rights: {
      title: "Seus Direitos",
      intro: "Dependendo da sua localização, você pode ter o direito de:",
      items: [
        "Acessar as informações pessoais que mantemos sobre você",
        "Solicitar correção de dados imprecisos",
        "Solicitar exclusão dos seus dados",
        "Objetar ao processamento dos seus dados",
        "Solicitar portabilidade de dados",
      ],
      contact: "Para exercer esses direitos, entre em contato conosco em privacy@kalcufy.com.",
    },
    children: {
      title: "Privacidade de Crianças",
      text: "Nosso Serviço não se destina a crianças menores de 13 anos. Não coletamos conscientemente informações pessoais de crianças menores de 13 anos.",
    },
    changes: {
      title: "Alterações nesta Política",
      text: "Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.",
    },
    contact: {
      title: "Entre em Contato",
      text: "Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco em:",
    },
    links: { terms: "Termos de Serviço →", cookies: "Política de Cookies →" },
  },
  fr: {
    skipToMain: "Aller au contenu principal",
    backToHome: "Retour à l'accueil",
    title: "Politique de confidentialité",
    lastUpdated: "Dernière mise à jour : 24 janvier 2026",
    intro: {
      title: "Introduction",
      text: "Kalcufy s'engage à protéger votre vie privée. Cette Politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web.",
    },
    collect: {
      title: "Informations que nous collectons",
      intro: "Nous pouvons collecter des informations vous concernant de diverses manières :",
      personal: "Données personnelles : Nom, adresse e-mail lorsque vous créez un compte ou vous abonnez à PRO.",
      usage: "Données d'utilisation : Type de navigateur, pages visitées, temps passé, URLs de référence.",
      device: "Données d'appareil : Adresse IP, type d'appareil, système d'exploitation.",
      calc: "Données de calculatrice : Vos calculs sont traités dans votre navigateur et ne sont pas stockés sur nos serveurs sauf si vous les sauvegardez explicitement.",
    },
    use: {
      title: "Comment nous utilisons vos informations",
      intro: "Nous utilisons les informations que nous collectons pour :",
      items: [
        "Fournir et maintenir notre Service",
        "Traiter les transactions et envoyer les informations connexes",
        "Vous envoyer des notifications techniques et des messages de support",
        "Répondre à vos commentaires et questions",
        "Analyser les habitudes d'utilisation pour améliorer notre Service",
        "Détecter et prévenir la fraude et les abus",
      ],
    },
    cookies: {
      title: "Cookies et Suivi",
      text: "Nous utilisons des cookies et des technologies de suivi similaires pour suivre l'activité sur notre Service. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou indiquer quand un cookie est envoyé.",
      link: "Pour plus de détails, consultez notre Politique de Cookies.",
    },
    sharing: {
      title: "Partage d'Informations",
      intro: "Nous pouvons partager vos informations avec :",
      items: [
        "Prestataires de services : Entreprises qui nous aident à exploiter notre activité (Stripe, Google Analytics).",
        "Exigences légales : Lorsque requis par la loi ou pour protéger nos droits.",
        "Transferts d'entreprise : Dans le cadre d'une fusion ou d'une acquisition.",
      ],
      noSell: "Nous ne vendons pas vos informations personnelles à des tiers.",
    },
    security: {
      title: "Sécurité des données",
      text: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles. Cependant, aucune méthode de transmission sur Internet n'est sécurisée à 100%.",
    },
    retention: {
      title: "Conservation des données",
      text: "Nous conservons vos informations personnelles uniquement le temps nécessaire pour accomplir les objectifs décrits dans cette Politique de Confidentialité, sauf si une période de conservation plus longue est requise par la loi.",
    },
    rights: {
      title: "Vos Droits",
      intro: "Selon votre localisation, vous pourriez avoir le droit de :",
      items: [
        "Accéder aux informations personnelles que nous détenons à votre sujet",
        "Demander la correction de données inexactes",
        "Demander la suppression de vos données",
        "Vous opposer au traitement de vos données",
        "Demander la portabilité des données",
      ],
      contact: "Pour exercer ces droits, contactez-nous à privacy@kalcufy.com.",
    },
    children: {
      title: "Confidentialité des Enfants",
      text: "Notre Service n'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans.",
    },
    changes: {
      title: "Modifications de cette Politique",
      text: "Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle Politique de Confidentialité sur cette page.",
    },
    contact: {
      title: "Nous Contacter",
      text: "Si vous avez des questions concernant cette Politique de Confidentialité, contactez-nous à:",
    },
    links: { terms: "Conditions d'Utilisation →", cookies: "Politique de cookies →" },
  },
  de: {
    skipToMain: "Zum Hauptinhalt springen",
    backToHome: "Zurück zur Startseite",
    title: "Datenschutzerklärung",
    lastUpdated: "Zuletzt aktualisiert: 24. Januar 2026",
    intro: {
      title: "Einführung",
      text: "Kalcufy verpflichtet sich, Ihre Privatsphäre zu schützen. Diese Datenschutzerklärung erklärt, wie wir Ihre Informationen erfassen, verwenden, weitergeben und schützen, wenn Sie unsere Website besuchen.",
    },
    collect: {
      title: "Informationen, die wir erfassen",
      intro: "Wir können Informationen über Sie auf verschiedene Weise erfassen:",
      personal: "Persönliche Daten: Name, E-Mail-Adresse, wenn Sie ein Konto erstellen oder PRO abonnieren.",
      usage: "Nutzungsdaten: Browser-Typ, besuchte Seiten, Verweildauer, verweisende URLs.",
      device: "Gerätedaten: IP-Adresse, Gerätetyp, Betriebssystem.",
      calc: "Rechner-Daten: Ihre Berechnungen werden in Ihrem Browser verarbeitet und nicht auf unseren Servern gespeichert, es sei denn, Sie speichern sie explizit.",
    },
    use: {
      title: "Wie wir Ihre Informationen verwenden",
      intro: "Wir verwenden die gesammelten Informationen, um:",
      items: [
        "Unseren Service bereitzustellen und zu pflegen",
        "Transaktionen zu verarbeiten und zugehörige Informationen zu senden",
        "Ihnen technische Hinweise und Support-Nachrichten senden",
        "Auf Ihre Kommentare und Fragen antworten",
        "Nutzungsmuster analysieren, um unseren Service zu verbessern",
        "Betrug und Missbrauch erkennen und verhindern",
      ],
    },
    cookies: {
      title: "Cookies und Tracking",
      text: "Wir verwenden Cookies und ähnliche Tracking-Technologien, um Aktivitäten in unserem Service zu verfolgen. Sie können Ihren Browser anweisen, alle Cookies abzulehnen oder anzuzeigen, wenn ein Cookie gesendet wird.",
      link: "Weitere Details finden Sie in unserer Cookie-Richtlinie.",
    },
    sharing: {
      title: "Informationsaustausch",
      intro: "Wir können Ihre Informationen teilen mit:",
      items: [
        "Dienstleistern: Unternehmen, die uns beim Betrieb unseres Geschäfts helfen (Stripe, Google Analytics).",
        "Rechtlichen Anforderungen: Wenn gesetzlich vorgeschrieben oder zum Schutz unserer Rechte.",
        "Geschäftsübertragungen: Im Zusammenhang mit einer Fusion oder Übernahme.",
      ],
      noSell: "Wir verkaufen Ihre persönlichen Daten nicht an Dritte.",
    },
    security: {
      title: "Datensicherheit",
      text: "Wir setzen angemessene Sicherheitsmaßnahmen zum Schutz Ihrer persönlichen Daten um. Jedoch ist keine Übertragungsmethode über das Internet zu 100% sicher.",
    },
    retention: {
      title: "Datenspeicherung",
      text: "Wir speichern Ihre personenbezogenen Daten nur so lange, wie es zur Erfüllung der in dieser Datenschutzerklärung beschriebenen Zwecke erforderlich ist, es sei denn, eine längere Aufbewahrungsfrist ist gesetzlich vorgeschrieben.",
    },
    rights: {
      title: "Ihre Rechte",
      intro: "Je nach Ihrem Standort haben Sie möglicherweise das Recht zu:",
      items: [
        "Auf die personenbezogenen Daten zugreifen, die wir über Sie gespeichert haben",
        "Berichtigung unrichtiger Daten verlangen",
        "Löschung Ihrer Daten verlangen",
        "Der Verarbeitung Ihrer Daten widersprechen",
        "Datenübertragbarkeit verlangen",
      ],
      contact: "Um diese Rechte auszuüben, kontaktieren Sie uns unter privacy@kalcufy.com.",
    },
    children: {
      title: "Datenschutz für Kinder",
      text: "Unser Service ist nicht für Kinder unter 13 Jahren bestimmt. Wir sammeln wissentlich keine persönlichen Informationen von Kindern unter 13 Jahren.",
    },
    changes: {
      title: "Änderungen an dieser Richtlinie",
      text: "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir werden Sie über Änderungen informieren, indem wir die neue Datenschutzrichtlinie auf dieser Seite veröffentlichen.",
    },
    contact: {
      title: "Kontaktieren Sie uns",
      text: "Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns unter:",
    },
    links: { terms: "Nutzungsbedingungen →", cookies: "Cookie-Richtlinie →" },
  }
};

export default function PrivacyPage() {
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
          <article className="bg-white rounded-xl shadow-sm p-6 md:p-10 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.intro.title}</h2>
              <p className="text-slate-600">{t.intro.text}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.collect.title}</h2>
              <p className="text-slate-600 mb-4">{t.collect.intro}</p>
              <ul className="space-y-3 text-slate-600">
                <li><strong>•</strong> {t.collect.personal}</li>
                <li><strong>•</strong> {t.collect.usage}</li>
                <li><strong>•</strong> {t.collect.device}</li>
                <li><strong>•</strong> {t.collect.calc}</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.use.title}</h2>
              <p className="text-slate-600 mb-4">{t.use.intro}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                {t.use.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.cookies.title}</h2>
              <p className="text-slate-600 mb-3">{t.cookies.text}</p>
              <p className="text-slate-600"><Link href={`/${locale}/cookies`} className="text-blue-600 hover:underline">{t.cookies.link}</Link></p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.sharing.title}</h2>
              <p className="text-slate-600 mb-4">{t.sharing.intro}</p>
              <ul className="space-y-3 text-slate-600 mb-4">
                {t.sharing.items.map((item, i) => <li key={i}><strong>•</strong> {item}</li>)}
              </ul>
              <p className="text-slate-700 font-medium">{t.sharing.noSell}</p>
            </section>
            <section className="p-6 bg-green-50 border border-green-200 rounded-xl">
              <h2 className="text-xl font-bold text-green-800 mb-4">{t.security.title}</h2>
              <p className="text-green-700">{t.security.text}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.retention.title}</h2>
              <p className="text-slate-600">{t.retention.text}</p>
            </section>
            <section className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
              <h2 className="text-xl font-bold text-blue-800 mb-4">{t.rights.title}</h2>
              <p className="text-blue-700 mb-4">{t.rights.intro}</p>
              <ul className="list-disc pl-6 space-y-2 text-blue-700 mb-4">
                {t.rights.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className="text-blue-800 font-medium">{t.rights.contact}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.children.title}</h2>
              <p className="text-slate-600">{t.children.text}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.changes.title}</h2>
              <p className="text-slate-600">{t.changes.text}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.contact.title}</h2>
              <p className="text-slate-600 mb-4">{t.contact.text}</p>
              <p><strong>Email:</strong> <a href="mailto:privacy@kalcufy.com" className="text-blue-600 hover:underline">privacy@kalcufy.com</a></p>
            </section>
          </article>
          <nav className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/terms`} className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md text-center font-medium text-slate-700 hover:text-blue-600">{t.links.terms}</Link>
            <Link href={`/${locale}/cookies`} className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md text-center font-medium text-slate-700 hover:text-blue-600">{t.links.cookies}</Link>
          </nav>
        </div>
      </main>
      
    </>
  );
}
