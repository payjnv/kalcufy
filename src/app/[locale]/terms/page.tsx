"use client";

import { useLocale } from "next-intl";
import Header from "@/components/Header";
import Link from "next/link";

const content = {
  en: {
    skipToMain: "Skip to main content",
    backToHome: "Back to Home",
    title: "Terms of Service",
    lastUpdated: "Last updated: January 24, 2026",
    agreement: {
      title: "1. Agreement to Terms",
      p1: "By accessing or using Kalcufy, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you do not have permission to access the Service.",
      p2: "These Terms apply to all visitors, users, and others who access or use the Service.",
    },
    description: {
      title: "2. Description of Service",
      text: "Kalcufy provides online calculators for financial planning, health metrics, and other computational tools. Our Service includes free calculators and optional premium features available through paid subscriptions.",
    },
    disclaimer: {
      title: "3. Important Disclaimer",
      warning: "THE CALCULATORS AND TOOLS PROVIDED BY KALCUFY ARE FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY.",
      notAdvice: "NOT PROFESSIONAL ADVICE: The results and calculations provided do NOT constitute financial, investment, tax, legal, or medical advice.",
      estimates: "ESTIMATES ONLY: All calculations are estimates based on general formulas. Actual results may vary significantly.",
      seek: "SEEK PROFESSIONAL GUIDANCE: Before making important decisions, consult with qualified professionals.",
      noGuarantee: "NO GUARANTEE OF ACCURACY: While we strive to provide accurate calculations, we make no warranties about the completeness or accuracy of the information provided.",
    },
    accounts: {
      title: "4. User Accounts",
      p1: "When you create an account, you must provide accurate and complete information.",
      p2: "You are responsible for safeguarding your password and for any activities under your account.",
      p3: "You must notify us immediately of any unauthorized use of your account.",
    },
    subscriptions: {
      title: "5. Subscriptions and Payments",
      free: "Some parts of the Service are available for free. Other parts require a paid subscription (PRO Plan).",
      billing: "Subscription fees are billed in advance. All payments are processed securely through Stripe.",
      cancel: "You may cancel your subscription at any time. No refunds will be provided for partial months.",
    },
    ip: {
      title: "6. Intellectual Property",
      p1: "The Service and its original content are the exclusive property of Kalcufy and protected by copyright laws.",
      p2: "Our trademarks may not be used without our prior written consent.",
    },
    content: {
      title: "7. User Content",
      p1: "When you save data to our Service, you retain ownership. We only store, backup, and display that content to you.",
      p2: "You may delete your data at any time through your account settings.",
    },
    prohibited: {
      title: "8. Prohibited Uses",
      intro: "You agree not to use the Service:",
      items: [
        "For any unlawful purpose",
        "To harass or harm another person",
        "To interfere with or disrupt the Service",
        "To introduce viruses or malicious code",
        "To scrape or extract data without permission",
        "To use bots or automated systems",
      ],
    },
    thirdParty: {
      title: "9. Third-Party Services",
      intro: "We use the following third-party services: Stripe for payments, Google Analytics for usage analytics, Google AdSense for advertising.",
      disclaimer: "We have no control over the content or practices of third-party services.",
    },
    liability: {
      title: "10. Limitation of Liability",
      intro: "IN NO EVENT SHALL KALCUFY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.",
      items: [
        "Loss of profits, revenue, or data",
        "Financial losses based on calculator results",
        "Health decisions based on calculator results",
        "Business interruption",
      ],
    },
    warranties: {
      title: "11. Disclaimer of Warranties",
      text: "THE SERVICE IS PROVIDED AS IS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.",
    },
    changes: {
      title: "12. Changes to Terms",
      text: "We reserve the right to modify these Terms at any time. We will notify users of significant changes.",
    },
    contact: {
      title: "13. Contact Us",
      text: "If you have questions about these Terms, contact us at:",
    },
    acknowledgment: "By using Kalcufy, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.",
    links: { privacy: "Privacy Policy →", cookies: "Cookie Policy →" },
  },
  es: {
    skipToMain: "Saltar al contenido principal",
    backToHome: "Volver al Inicio",
    title: "Términos de Servicio",
    lastUpdated: "Última actualización: 24 de enero de 2026",
    agreement: {
      title: "1. Acuerdo con los Términos",
      p1: "Al acceder o usar Kalcufy, aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con cualquier parte de estos términos, no tienes permiso para acceder al Servicio.",
      p2: "Estos Términos se aplican a todos los visitantes, usuarios y otras personas que accedan o usen el Servicio.",
    },
    description: {
      title: "2. Descripción del Servicio",
      text: "Kalcufy proporciona calculadoras en línea para planificación financiera, métricas de salud y otras herramientas computacionales. Nuestro Servicio incluye calculadoras gratuitas y funciones premium opcionales disponibles a través de suscripciones de pago.",
    },
    disclaimer: {
      title: "3. Descargo de Responsabilidad Importante",
      warning: "LAS CALCULADORAS Y HERRAMIENTAS PROPORCIONADAS POR KALCUFY SON ÚNICAMENTE CON FINES INFORMATIVOS Y EDUCATIVOS.",
      notAdvice: "NO ES ASESORAMIENTO PROFESIONAL: Los resultados y cálculos proporcionados NO constituyen asesoramiento financiero, de inversión, fiscal, legal o médico.",
      estimates: "SOLO ESTIMACIONES: Todos los cálculos son estimaciones basadas en fórmulas generales. Los resultados reales pueden variar significativamente.",
      seek: "BUSQUE ORIENTACIÓN PROFESIONAL: Antes de tomar decisiones importantes, consulte con profesionales calificados.",
      noGuarantee: "SIN GARANTÍA DE PRECISIÓN: Aunque nos esforzamos por proporcionar cálculos precisos, no ofrecemos garantías sobre la integridad o precisión de la información proporcionada.",
    },
    accounts: {
      title: "4. Cuentas de Usuario",
      p1: "Al crear una cuenta, debe proporcionar información precisa y completa.",
      p2: "Usted es responsable de proteger su contraseña y de cualquier actividad bajo su cuenta.",
      p3: "Debe notificarnos inmediatamente de cualquier uso no autorizado de su cuenta.",
    },
    subscriptions: {
      title: "5. Suscripciones y Pagos",
      free: "Algunas partes del Servicio están disponibles de forma gratuita. Otras partes requieren una suscripción paga (Plan PRO).",
      billing: "Las tarifas de suscripción se cobran por adelantado. Todos los pagos se procesan de forma segura a través de Stripe.",
      cancel: "Puede cancelar su suscripción en cualquier momento. No se proporcionarán reembolsos por meses parciales.",
    },
    ip: {
      title: "6. Propiedad Intelectual",
      p1: "El Servicio y su contenido original son propiedad exclusiva de Kalcufy y están protegidos por las leyes de derechos de autor.",
      p2: "Nuestras marcas comerciales no pueden ser utilizadas sin nuestro consentimiento previo por escrito.",
    },
    content: {
      title: "7. Contenido del Usuario",
      p1: "Cuando guardas datos en nuestro Servicio, conservas la propiedad. Solo almacenamos, respaldamos y mostramos ese contenido para ti.",
      p2: "Puedes eliminar tus datos en cualquier momento a través de la configuración de tu cuenta.",
    },
    prohibited: {
      title: "8. Usos Prohibidos",
      intro: "Aceptas no usar el Servicio:",
      items: [
        "Para cualquier propósito ilegal",
        "Acosar o dañar a otra persona",
        "Interferir con o interrumpir el Servicio",
        "Introducir virus o código malicioso",
        "Extraer o recopilar datos sin permiso",
        "Usar bots o sistemas automatizados",
      ],
    },
    thirdParty: {
      title: "9. Servicios de Terceros",
      intro: "Utilizamos los siguientes servicios de terceros: Stripe para pagos, Google Analytics para análisis de uso, Google AdSense para publicidad.",
      disclaimer: "No tenemos control sobre el contenido o las prácticas de los servicios de terceros.",
    },
    liability: {
      title: "10. Limitación de Responsabilidad",
      intro: "EN NINGÚN CASO KALCUFY SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES O CONSECUENCIALES.",
      items: [
        "Pérdida de ganancias, ingresos o datos",
        "Pérdidas financieras basadas en resultados de calculadoras",
        "Decisiones de salud basadas en resultados de calculadoras",
        "Interrupción del negocio",
      ],
    },
    warranties: {
      title: "11. Exención de Garantías",
      text: "EL SERVICIO SE PROPORCIONA TAL COMO ESTÁ SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS O IMPLÍCITAS.",
    },
    changes: {
      title: "12. Cambios en los Términos",
      text: "Nos reservamos el derecho de modificar estos Términos en cualquier momento. Notificaremos a los usuarios sobre cambios significativos.",
    },
    contact: {
      title: "13. Contáctanos",
      text: "Si tienes preguntas sobre estos Términos, contáctanos en:",
    },
    acknowledgment: "Al usar Kalcufy, reconoces que has leído, entendido y aceptas estar sujeto a estos Términos de Servicio.",
    links: { privacy: "Política de Privacidad →", cookies: "Política de Cookies →" },
  },
  pt: {
    skipToMain: "Pular para o conteúdo principal",
    backToHome: "Voltar ao Início",
    title: "Termos de Serviço",
    lastUpdated: "Última atualização: 24 de janeiro de 2026",
    agreement: {
      title: "1. Concordância com os Termos",
      p1: "Ao acessar ou usar o Kalcufy, você concorda em ficar vinculado a estes Termos de Serviço. Se você discorda de qualquer parte destes termos, você não tem permissão para acessar o Serviço.",
      p2: "Estes Termos se aplicam a todos os visitantes, usuários e outras pessoas que acessam ou usam o Serviço.",
    },
    description: {
      title: "2. Descrição do Serviço",
      text: "A Kalcufy fornece calculadoras online para planejamento financeiro, métricas de saúde e outras ferramentas computacionais. Nosso Serviço inclui calculadoras gratuitas e recursos premium opcionais disponíveis através de assinaturas pagas.",
    },
    disclaimer: {
      title: "3. Aviso Importante",
      warning: "AS CALCULADORAS E FERRAMENTAS FORNECIDAS PELA KALCUFY SÃO APENAS PARA FINS INFORMATIVOS E EDUCACIONAIS.",
      notAdvice: "NÃO É ACONSELHAMENTO PROFISSIONAL: Os resultados e cálculos fornecidos NÃO constituem aconselhamento financeiro, de investimento, fiscal, jurídico ou médico.",
      estimates: "APENAS ESTIMATIVAS: Todos os cálculos são estimativas baseadas em fórmulas gerais. Os resultados reais podem variar significativamente.",
      seek: "PROCURE ORIENTAÇÃO PROFISSIONAL: Antes de tomar decisões importantes, consulte profissionais qualificados.",
      noGuarantee: "NENHUMA GARANTIA DE PRECISÃO: Embora nos esforcemos para fornecer cálculos precisos, não oferecemos garantias sobre a integridade ou precisão das informações fornecidas.",
    },
    accounts: {
      title: "4. Contas de Usuário",
      p1: "Quando você criar uma conta, deve fornecer informações precisas e completas.",
      p2: "Você é responsável por proteger sua senha e por quaisquer atividades em sua conta.",
      p3: "Você deve nos notificar imediatamente sobre qualquer uso não autorizado de sua conta.",
    },
    subscriptions: {
      title: "5. Assinaturas e Pagamentos",
      free: "Algumas partes do Serviço estão disponíveis gratuitamente. Outras partes requerem uma assinatura paga (Plano PRO).",
      billing: "As taxas de assinatura são cobradas antecipadamente. Todos os pagamentos são processados com segurança através do Stripe.",
      cancel: "Você pode cancelar sua assinatura a qualquer momento. Não serão fornecidos reembolsos para meses parciais.",
    },
    ip: {
      title: "6. Propriedade Intelectual",
      p1: "O Serviço e seu conteúdo original são propriedade exclusiva da Kalcufy e protegidos por leis de direitos autorais.",
      p2: "Nossas marcas registradas não podem ser usadas sem nosso consentimento prévio por escrito.",
    },
    content: {
      title: "7. Conteúdo do Usuário",
      p1: "Quando você salva dados em nosso Serviço, você mantém a propriedade. Nós apenas armazenamos, fazemos backup e exibimos esse conteúdo para você.",
      p2: "Você pode excluir seus dados a qualquer momento através das configurações da sua conta.",
    },
    prohibited: {
      title: "8. Usos Proibidos",
      intro: "Você concorda em não usar o Serviço:",
      items: [
        "Para qualquer propósito ilegal",
        "Assediar ou prejudicar outra pessoa",
        "Interferir ou interromper o Serviço",
        "Introduzir vírus ou código malicioso",
        "Extrair ou coletar dados sem permissão",
        "Usar bots ou sistemas automatizados",
      ],
    },
    thirdParty: {
      title: "9. Serviços de Terceiros",
      intro: "Utilizamos os seguintes serviços de terceiros: Stripe para pagamentos, Google Analytics para análise de uso, Google AdSense para publicidade.",
      disclaimer: "Não temos controle sobre o conteúdo ou práticas de serviços de terceiros.",
    },
    liability: {
      title: "10. Limitação de Responsabilidade",
      intro: "EM NENHUMA CIRCUNSTÂNCIA A KALCUFY SERÁ RESPONSÁVEL POR QUAISQUER DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS OU CONSEQUENCIAIS.",
      items: [
        "Perda de lucros, receitas ou dados",
        "Perdas financeiras baseadas em resultados de calculadora",
        "Decisões de saúde baseadas em resultados de calculadora",
        "Interrupção de negócios",
      ],
    },
    warranties: {
      title: "11. Exclusão de Garantias",
      text: "O SERVIÇO É FORNECIDO COMO ESTÁ, SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS.",
    },
    changes: {
      title: "12. Alterações aos Termos",
      text: "Reservamos o direito de modificar estes Termos a qualquer momento. Notificaremos os utilizadores sobre alterações significativas.",
    },
    contact: {
      title: "13. Contacte-nos",
      text: "Se tiver questões sobre estes Termos, contacte-nos em:",
    },
    acknowledgment: "Ao utilizar o Kalcufy, reconhece que leu, compreendeu e concorda em ficar vinculado por estes Termos de Serviço.",
    links: { privacy: "Política de Privacidade →", cookies: "Política de Cookies →" },
  },
  fr: {
    skipToMain: "Aller au contenu principal",
    backToHome: "Retour à l'accueil",
    title: "Conditions d'utilisation",
    lastUpdated: "Dernière mise à jour : 24 janvier 2026",
    agreement: {
      title: "1. Acceptation des conditions",
      p1: "En accédant à Kalcufy ou en l'utilisant, vous acceptez d'être lié par ces Conditions d'utilisation. Si vous n'êtes pas d'accord avec une partie de ces conditions, vous n'avez pas l'autorisation d'accéder au Service.",
      p2: "Ces Conditions s'appliquent à tous les visiteurs, utilisateurs et autres personnes qui accèdent au Service ou l'utilisent.",
    },
    description: {
      title: "2. Description du service",
      text: "Kalcufy fournit des calculatrices en ligne pour la planification financière, les métriques de santé et d'autres outils de calcul. Notre Service comprend des calculatrices gratuites et des fonctionnalités premium optionnelles disponibles via des abonnements payants.",
    },
    disclaimer: {
      title: "3. Avertissement Important",
      warning: "LES CALCULATRICES ET OUTILS FOURNIS PAR KALCUFY SONT DESTINÉS À DES FINS INFORMATIVES ET ÉDUCATIVES UNIQUEMENT.",
      notAdvice: "PAS DE CONSEIL PROFESSIONNEL : Les résultats et calculs fournis ne constituent PAS des conseils financiers, d'investissement, fiscaux, juridiques ou médicaux.",
      estimates: "ESTIMATIONS UNIQUEMENT : Tous les calculs sont des estimations basées sur des formules générales. Les résultats réels peuvent varier considérablement.",
      seek: "RECHERCHEZ DES CONSEILS PROFESSIONNELS : Avant de prendre des décisions importantes, consultez des professionnels qualifiés.",
      noGuarantee: "AUCUNE GARANTIE D'EXACTITUDE : Bien que nous nous efforcions de fournir des calculs précis, nous ne donnons aucune garantie quant à l'exhaustivité ou l'exactitude des informations fournies.",
    },
    accounts: {
      title: "4. Comptes Utilisateur",
      p1: "Lorsque vous créez un compte, vous devez fournir des informations exactes et complètes.",
      p2: "Vous êtes responsable de la protection de votre mot de passe et de toute activité sous votre compte.",
      p3: "Vous devez nous notifier immédiatement de toute utilisation non autorisée de votre compte.",
    },
    subscriptions: {
      title: "5. Abonnements et Paiements",
      free: "Certaines parties du Service sont disponibles gratuitement. D'autres parties nécessitent un abonnement payant (Plan PRO).",
      billing: "Les frais d'abonnement sont facturés à l'avance. Tous les paiements sont traités de manière sécurisée via Stripe.",
      cancel: "Vous pouvez annuler votre abonnement à tout moment. Aucun remboursement ne sera accordé pour les mois partiels.",
    },
    ip: {
      title: "6. Propriété Intellectuelle",
      p1: "Le Service et son contenu original sont la propriété exclusive de Kalcufy et protégés par les lois sur le droit d'auteur.",
      p2: "Nos marques de commerce ne peuvent être utilisées sans notre consentement écrit préalable.",
    },
    content: {
      title: "7. Contenu utilisateur",
      p1: "Lorsque vous enregistrez des données sur notre Service, vous en conservez la propriété. Nous ne faisons que stocker, sauvegarder et vous afficher ce contenu.",
      p2: "Vous pouvez supprimer vos données à tout moment via les paramètres de votre compte.",
    },
    prohibited: {
      title: "8. Utilisations interdites",
      intro: "Vous acceptez de ne pas utiliser le Service :",
      items: [
        "À des fins illégales",
        "Harceler ou nuire à autrui",
        "Interférer avec ou perturber le Service",
        "Introduire des virus ou du code malveillant",
        "Extraire ou récupérer des données sans autorisation",
        "Utiliser des bots ou des systèmes automatisés",
      ],
    },
    thirdParty: {
      title: "9. Services tiers",
      intro: "Nous utilisons les services tiers suivants : Stripe pour les paiements, Google Analytics pour l'analyse d'utilisation, Google AdSense pour la publicité.",
      disclaimer: "Nous n'avons aucun contrôle sur le contenu ou les pratiques des services tiers.",
    },
    liability: {
      title: "10. Limitation de responsabilité",
      intro: "EN AUCUN CAS KALCUFY NE POURRA ÊTRE TENUE RESPONSABLE DE DOMMAGES INDIRECTS, ACCESSOIRES, SPÉCIAUX OU CONSÉCUTIFS.",
      items: [
        "Perte de profits, revenus ou données",
        "Pertes financières basées sur les résultats de calculatrice",
        "Décisions de santé basées sur les résultats de calculatrice",
        "Interruption d'activité",
      ],
    },
    warranties: {
      title: "11. Exclusion de garanties",
      text: "LE SERVICE EST FOURNI EN L'ÉTAT SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE.",
    },
    changes: {
      title: "12. Modifications des Conditions",
      text: "Nous nous réservons le droit de modifier ces Conditions à tout moment. Nous informerons les utilisateurs des changements importants.",
    },
    contact: {
      title: "13. Nous Contacter",
      text: "Si vous avez des questions concernant ces Conditions, contactez-nous à :",
    },
    acknowledgment: "En utilisant Kalcufy, vous reconnaissez avoir lu, compris et accepté d'être lié par ces Conditions d'Utilisation.",
    links: { privacy: "Politique de Confidentialité →", cookies: "Politique des Cookies →" },
  },
  de: {
    skipToMain: "Zum Hauptinhalt springen",
    backToHome: "Zurück zur Startseite",
    title: "Nutzungsbedingungen",
    lastUpdated: "Zuletzt aktualisiert: 24. Januar 2026",
    agreement: {
      title: "1. Zustimmung zu den Bedingungen",
      p1: "Durch den Zugriff auf oder die Nutzung von Kalcufy erklären Sie sich damit einverstanden, an diese Nutzungsbedingungen gebunden zu sein. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, haben Sie keine Berechtigung, auf den Service zuzugreifen.",
      p2: "Diese Bedingungen gelten für alle Besucher, Nutzer und andere, die auf den Service zugreifen oder ihn nutzen.",
    },
    description: {
      title: "2. Beschreibung des Services",
      text: "Kalcufy bietet Online-Rechner für Finanzplanung, Gesundheitskennzahlen und andere Berechnungstools. Unser Service umfasst kostenlose Rechner und optionale Premium-Funktionen, die über kostenpflichtige Abonnements verfügbar sind.",
    },
    disclaimer: {
      title: "3. Wichtiger Haftungsausschluss",
      warning: "DIE VON KALCUFY BEREITGESTELLTEN RECHNER UND TOOLS DIENEN NUR ZU INFORMATIONS- UND BILDUNGSZWECKEN.",
      notAdvice: "KEINE PROFESSIONELLE BERATUNG: Die bereitgestellten Ergebnisse und Berechnungen stellen KEINE Finanz-, Anlage-, Steuer-, Rechts- oder medizinische Beratung dar.",
      estimates: "NUR SCHÄTZUNGEN: Alle Berechnungen sind Schätzungen basierend auf allgemeinen Formeln. Tatsächliche Ergebnisse können erheblich abweichen.",
      seek: "PROFESSIONELLE BERATUNG EINHOLEN: Konsultieren Sie vor wichtigen Entscheidungen qualifizierte Fachkräfte.",
      noGuarantee: "KEINE GENAUIGKEITSGARANTIE: Obwohl wir uns bemühen, genaue Berechnungen zu liefern, geben wir keine Gewährleistungen für die Vollständigkeit oder Genauigkeit der bereitgestellten Informationen ab.",
    },
    accounts: {
      title: "4. Benutzerkonten",
      p1: "Bei der Erstellung eines Kontos müssen Sie genaue und vollständige Informationen angeben.",
      p2: "Sie sind verantwortlich für den Schutz Ihres Passworts und für alle Aktivitäten unter Ihrem Konto.",
      p3: "Sie müssen uns unverzüglich über jede unbefugte Nutzung Ihres Kontos benachrichtigen.",
    },
    subscriptions: {
      title: "5. Abonnements und Zahlungen",
      free: "Einige Teile des Dienstes sind kostenlos verfügbar. Andere Teile erfordern ein kostenpflichtiges Abonnement (PRO-Plan).",
      billing: "Abonnementgebühren werden im Voraus abgerechnet. Alle Zahlungen werden sicher über Stripe verarbeitet.",
      cancel: "Sie können Ihr Abonnement jederzeit kündigen. Für Teilmonate werden keine Rückerstattungen gewährt.",
    },
    ip: {
      title: "6. Geistiges Eigentum",
      p1: "Der Dienst und seine ursprünglichen Inhalte sind das ausschließliche Eigentum von Kalcufy und durch Urheberrechtsgesetze geschützt.",
      p2: "Unsere Markenzeichen dürfen nicht ohne unsere vorherige schriftliche Zustimmung verwendet werden.",
    },
    content: {
      title: "7. Benutzerinhalte",
      p1: "Wenn Sie Daten in unserem Dienst speichern, behalten Sie das Eigentumsrecht. Wir speichern, sichern und zeigen diese Inhalte nur Ihnen an.",
      p2: "Sie können Ihre Daten jederzeit über Ihre Kontoeinstellungen löschen.",
    },
    prohibited: {
      title: "8. Verbotene Nutzung",
      intro: "Sie verpflichten sich, den Dienst nicht zu verwenden:",
      items: [
        "Für rechtswidrige Zwecke",
        "Eine andere Person zu belästigen oder zu schädigen",
        "Den Service zu beeinträchtigen oder zu stören",
        "Viren oder schädlichen Code einzuführen",
        "Daten ohne Erlaubnis zu scrapen oder zu extrahieren",
        "Bots oder automatisierte Systeme zu verwenden",
      ],
    },
    thirdParty: {
      title: "9. Drittanbieter-Services",
      intro: "Wir nutzen die folgenden Drittanbieter-Services: Stripe für Zahlungen, Google Analytics für Nutzungsanalysen, Google AdSense für Werbung.",
      disclaimer: "Wir haben keine Kontrolle über die Inhalte oder Praktiken von Drittanbieter-Services.",
    },
    liability: {
      title: "10. Limitation of Liability",
      intro: "IN NO EVENT SHALL KALCUFY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.",
      items: [
        "Loss of profits, revenue, or data",
        "Financial losses based on calculator results",
        "Health decisions based on calculator results",
        "Business interruption",
      ],
    },
    warranties: {
      title: "11. Disclaimer of Warranties",
      text: "THE SERVICE IS PROVIDED AS IS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.",
    },
    changes: {
      title: "12. Änderungen der Bedingungen",
      text: "Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Wir werden die Nutzer über wesentliche Änderungen informieren.",
    },
    contact: {
      title: "13. Kontakt",
      text: "Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns unter:",
    },
    acknowledgment: "Durch die Nutzung von Kalcufy bestätigen Sie, dass Sie diese Nutzungsbedingungen gelesen, verstanden haben und sich daran gebunden erklären.",
    links: { privacy: "Datenschutzerklärung →", cookies: "Cookie-Richtlinie →" },
  }
};

export default function TermsPage() {
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
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.agreement.title}</h2>
              <p className="text-slate-600 mb-3">{t.agreement.p1}</p>
              <p className="text-slate-600">{t.agreement.p2}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.description.title}</h2>
              <p className="text-slate-600">{t.description.text}</p>
            </section>
            <section className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
              <h2 className="text-xl font-bold text-amber-800 mb-4">{t.disclaimer.title}</h2>
              <p className="text-amber-900 font-semibold mb-4">{t.disclaimer.warning}</p>
              <ul className="space-y-3 text-amber-800">
                <li><strong>•</strong> {t.disclaimer.notAdvice}</li>
                <li><strong>•</strong> {t.disclaimer.estimates}</li>
                <li><strong>•</strong> {t.disclaimer.seek}</li>
                <li><strong>•</strong> {t.disclaimer.noGuarantee}</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.accounts.title}</h2>
              <p className="text-slate-600 mb-3">{t.accounts.p1}</p>
              <p className="text-slate-600 mb-3">{t.accounts.p2}</p>
              <p className="text-slate-600">{t.accounts.p3}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.subscriptions.title}</h2>
              <p className="text-slate-600 mb-3">{t.subscriptions.free}</p>
              <p className="text-slate-600 mb-3">{t.subscriptions.billing}</p>
              <p className="text-slate-600">{t.subscriptions.cancel}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.ip.title}</h2>
              <p className="text-slate-600 mb-3">{t.ip.p1}</p>
              <p className="text-slate-600">{t.ip.p2}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.content.title}</h2>
              <p className="text-slate-600 mb-3">{t.content.p1}</p>
              <p className="text-slate-600">{t.content.p2}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.prohibited.title}</h2>
              <p className="text-slate-600 mb-4">{t.prohibited.intro}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                {t.prohibited.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.thirdParty.title}</h2>
              <p className="text-slate-600 mb-3">{t.thirdParty.intro}</p>
              <p className="text-slate-600">{t.thirdParty.disclaimer}</p>
            </section>
            <section className="p-6 bg-red-50 border border-red-200 rounded-xl">
              <h2 className="text-xl font-bold text-red-800 mb-4">{t.liability.title}</h2>
              <p className="text-red-800 mb-4">{t.liability.intro}</p>
              <ul className="list-disc pl-6 space-y-2 text-red-700">
                {t.liability.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.warranties.title}</h2>
              <p className="text-slate-600">{t.warranties.text}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.changes.title}</h2>
              <p className="text-slate-600">{t.changes.text}</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{t.contact.title}</h2>
              <p className="text-slate-600 mb-4">{t.contact.text}</p>
              <p><strong>Email:</strong> <a href="mailto:legal@kalcufy.com" className="text-blue-600 hover:underline">legal@kalcufy.com</a></p>
            </section>
            <div className="p-4 bg-slate-100 rounded-xl">
              <p className="text-slate-700 text-sm">{t.acknowledgment}</p>
            </div>
          </article>
          <nav className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href={`/${locale}/privacy`} className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md text-center font-medium text-slate-700 hover:text-blue-600">{t.links.privacy}</Link>
            <Link href={`/${locale}/cookies`} className="flex-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md text-center font-medium text-slate-700 hover:text-blue-600">{t.links.cookies}</Link>
          </nav>
        </div>
      </main>
      
    </>
  );
}
