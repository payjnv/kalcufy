"use client";

import { useLocale } from "next-intl";
import Header from "@/components/Header";

const content = {
  en: {
    title: "Accessibility Statement",
    intro: "Kalcufy is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.",
    sections: {
      conformance: {
        title: "Conformance Status",
        description: "The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.",
        status: "Kalcufy is partially conformant with WCAG 2.1 Level AA.",
        explanation: "Partially conformant means that some parts of the content do not fully conform to the accessibility standard."
      },
      features: {
        title: "Accessibility Features",
        intro: "We have implemented the following accessibility features:",
        items: [
          "Keyboard navigation support throughout the site",
          "Skip to main content link",
          "ARIA labels and landmarks for screen readers",
          "Sufficient color contrast ratios (minimum 4.5:1)",
          "Focus indicators on all interactive elements",
          "Responsive design that works on all devices",
          "Reduced motion support for users who prefer it",
          "Semantic HTML structure",
          "Alt text for images",
          "Form labels and error messages"
        ]
      },
      compatibility: {
        title: "Compatibility",
        intro: "Kalcufy is designed to be compatible with:",
        items: [
          "Modern web browsers (Chrome, Firefox, Safari, Edge)",
          "Screen readers (VoiceOver, NVDA, JAWS)",
          "Keyboard-only navigation",
          "Browser zoom up to 200%"
        ]
      },
      limitations: {
        title: "Known Limitations",
        intro: "Despite our best efforts to ensure accessibility of Kalcufy, there may be some limitations. We are actively working to address these issues:",
        items: [
          "Some third-party content (advertisements) may not be fully accessible",
          "Complex calculator visualizations may have limited screen reader support",
          "PDF exports may not be fully accessible"
        ]
      },
      feedback: {
        title: "Feedback",
        intro: "We welcome your feedback on the accessibility of Kalcufy. Please let us know if you encounter accessibility barriers:",
        email: "Email:",
        emailAddress: "accessibility@kalcufy.com",
        responseTime: "We try to respond to feedback within 5 business days."
      },
      assessment: {
        title: "Assessment Approach",
        intro: "Kalcufy assessed the accessibility of this site by the following approaches:",
        items: [
          "Self-evaluation using WCAG 2.1 guidelines",
          "Automated testing with axe DevTools and Lighthouse",
          "Manual keyboard navigation testing",
          "Screen reader testing with VoiceOver"
        ]
      },
      date: {
        title: "Date",
        text: "This statement was created on",
        lastReviewed: "and was last reviewed on",
        createdDate: "January 24, 2026",
        reviewedDate: "January 24, 2026"
      }
    }
  },
  es: {
    title: "Declaración de Accesibilidad",
    intro: "Kalcufy se compromete a garantizar la accesibilidad digital para personas con discapacidades. Mejoramos continuamente la experiencia del usuario para todos y aplicamos los estándares de accesibilidad relevantes.",
    sections: {
      conformance: {
        title: "Estado de Conformidad",
        description: "Las Pautas de Accesibilidad al Contenido Web (WCAG) definen requisitos para diseñadores y desarrolladores para mejorar la accesibilidad para personas con discapacidades. Define tres niveles de conformidad: Nivel A, Nivel AA y Nivel AAA.",
        status: "Kalcufy es parcialmente conforme con WCAG 2.1 Nivel AA.",
        explanation: "Parcialmente conforme significa que algunas partes del contenido no se ajustan completamente al estándar de accesibilidad."
      },
      features: {
        title: "Características de Accesibilidad",
        intro: "Hemos implementado las siguientes características de accesibilidad:",
        items: [
          "Soporte de navegación por teclado en todo el sitio",
          "Enlace para saltar al contenido principal",
          "Etiquetas ARIA y puntos de referencia para lectores de pantalla",
          "Proporciones de contraste de color suficientes (mínimo 4.5:1)",
          "Indicadores de foco en todos los elementos interactivos",
          "Diseño responsive que funciona en todos los dispositivos",
          "Soporte de movimiento reducido para usuarios que lo prefieren",
          "Estructura HTML semántica",
          "Texto alternativo para imágenes",
          "Etiquetas de formulario y mensajes de error"
        ]
      },
      compatibility: {
        title: "Compatibilidad",
        intro: "Kalcufy está diseñado para ser compatible con:",
        items: [
          "Navegadores web modernos (Chrome, Firefox, Safari, Edge)",
          "Lectores de pantalla (VoiceOver, NVDA, JAWS)",
          "Navegación solo por teclado",
          "Zoom del navegador hasta 200%"
        ]
      },
      limitations: {
        title: "Limitaciones Conocidas",
        intro: "A pesar de nuestros mejores esfuerzos para garantizar la accesibilidad de Kalcufy, puede haber algunas limitaciones. Estamos trabajando activamente para abordar estos problemas:",
        items: [
          "Algún contenido de terceros (anuncios) puede no ser completamente accesible",
          "Las visualizaciones complejas de calculadora pueden tener soporte limitado para lectores de pantalla",
          "Las exportaciones PDF pueden no ser completamente accesibles"
        ]
      },
      feedback: {
        title: "Comentarios",
        intro: "Agradecemos sus comentarios sobre la accesibilidad de Kalcufy. Por favor, háganos saber si encuentran barreras de accesibilidad:",
        email: "Correo electrónico:",
        emailAddress: "accessibility@kalcufy.com",
        responseTime: "Tratamos de responder a los comentarios dentro de 5 días hábiles."
      },
      assessment: {
        title: "Enfoque de Evaluación",
        intro: "Kalcufy evaluó la accesibilidad de este sitio mediante los siguientes enfoques:",
        items: [
          "Autoevaluación usando las pautas WCAG 2.1",
          "Pruebas automatizadas con axe DevTools y Lighthouse",
          "Pruebas manuales de navegación por teclado",
          "Pruebas de lector de pantalla con VoiceOver"
        ]
      },
      date: {
        title: "Fecha",
        text: "Esta declaración fue creada el",
        lastReviewed: "y fue revisada por última vez el",
        createdDate: "24 de enero de 2026",
        reviewedDate: "24 de enero de 2026"
      }
    }
  },
  pt: {
    title: "Declaração de Acessibilidade",
    intro: "A Kalcufy está comprometida em garantir acessibilidade digital para pessoas com deficiências. Estamos continuamente melhorando a experiência do usuário para todos e aplicando os padrões de acessibilidade relevantes.",
    sections: {
      conformance: {
        title: "Status de Conformidade",
        description: "As Diretrizes de Acessibilidade para Conteúdo Web (WCAG) definem requisitos para designers e desenvolvedores melhorarem a acessibilidade para pessoas com deficiências. Define três níveis de conformidade: Nível A, Nível AA e Nível AAA.",
        status: "A Kalcufy é parcialmente conforme com WCAG 2.1 Nível AA.",
        explanation: "Parcialmente conforme significa que algumas partes do conteúdo não estão totalmente em conformidade com o padrão de acessibilidade."
      },
      features: {
        title: "Recursos de Acessibilidade",
        intro: "Implementamos os seguintes recursos de acessibilidade:",
        items: [
          "Suporte de navegação por teclado em todo o site",
          "Link para pular para o conteúdo principal",
          "Rótulos ARIA e marcos para leitores de tela",
          "Proporções de contraste de cor suficientes (mínimo 4.5:1)",
          "Indicadores de foco em todos os elementos interativos",
          "Design responsivo que funciona em todos os dispositivos",
          "Suporte de movimento reduzido para usuários que preferem",
          "Estrutura HTML semântica",
          "Texto alternativo para imagens",
          "Rótulos de formulário e mensagens de erro"
        ]
      },
      compatibility: {
        title: "Compatibilidade",
        intro: "A Kalcufy foi projetada para ser compatível com:",
        items: [
          "Navegadores web modernos (Chrome, Firefox, Safari, Edge)",
          "Leitores de tela (VoiceOver, NVDA, JAWS)",
          "Navegação apenas por teclado",
          "Zoom do navegador até 200%"
        ]
      },
      limitations: {
        title: "Limitações Conhecidas",
        intro: "Apesar de nossos melhores esforços para garantir a acessibilidade da Kalcufy, pode haver algumas limitações. Estamos trabalhando ativamente para resolver essas questões:",
        items: [
          "Algum conteúdo de terceiros (anúncios) pode não ser totalmente acessível",
          "Visualizações complexas de calculadora podem ter suporte limitado para leitores de tela",
          "Exportações de PDF podem não ser totalmente acessíveis"
        ]
      },
      feedback: {
        title: "Feedback",
        intro: "Agradecemos seu feedback sobre a acessibilidade da Kalcufy. Por favor, nos informe se encontrar barreiras de acessibilidade:",
        email: "Email:",
        emailAddress: "accessibility@kalcufy.com",
        responseTime: "Tentamos responder ao feedback dentro de 5 dias úteis."
      },
      assessment: {
        title: "Abordagem de Avaliação",
        intro: "A Kalcufy avaliou a acessibilidade deste site pelas seguintes abordagens:",
        items: [
          "Autoavaliação usando diretrizes WCAG 2.1",
          "Testes automatizados com axe DevTools e Lighthouse",
          "Testes manuais de navegação por teclado",
          "Testes de leitor de tela com VoiceOver"
        ]
      },
      date: {
        title: "Data",
        text: "Esta declaração foi criada em",
        lastReviewed: "e foi revisada pela última vez em",
        createdDate: "24 de janeiro de 2026",
        reviewedDate: "24 de janeiro de 2026"
      }
    }
  },
  fr: {
    title: "Déclaration d'Accessibilité",
    intro: "Kalcufy s'engage à garantir l'accessibilité numérique pour les personnes handicapées. Nous améliorons continuellement l'expérience utilisateur pour tous et appliquons les normes d'accessibilité pertinentes.",
    sections: {
      conformance: {
        title: "Statut de Conformité",
        description: "Les Directives d'Accessibilité au Contenu Web (WCAG) définissent les exigences pour les concepteurs et développeurs afin d'améliorer l'accessibilité pour les personnes handicapées. Elles définissent trois niveaux de conformité : Niveau A, Niveau AA et Niveau AAA.",
        status: "Kalcufy est partiellement conforme avec WCAG 2.1 Niveau AA.",
        explanation: "Partiellement conforme signifie que certaines parties du contenu ne sont pas entièrement conformes à la norme d'accessibilité."
      },
      features: {
        title: "Fonctionnalités d'Accessibilité",
        intro: "Nous avons implémenté les fonctionnalités d'accessibilité suivantes :",
        items: [
          "Support de navigation au clavier dans tout le site",
          "Lien pour passer au contenu principal",
          "Étiquettes ARIA et repères pour les lecteurs d'écran",
          "Ratios de contraste de couleur suffisants (minimum 4.5:1)",
          "Indicateurs de focus sur tous les éléments interactifs",
          "Design responsive qui fonctionne sur tous les appareils",
          "Support de mouvement réduit pour les utilisateurs qui le préfèrent",
          "Structure HTML sémantique",
          "Texte alternatif pour les images",
          "Étiquettes de formulaire et messages d'erreur"
        ]
      },
      compatibility: {
        title: "Compatibilité",
        intro: "Kalcufy est conçu pour être compatible avec :",
        items: [
          "Navigateurs web modernes (Chrome, Firefox, Safari, Edge)",
          "Lecteurs d'écran (VoiceOver, NVDA, JAWS)",
          "Navigation clavier uniquement",
          "Zoom du navigateur jusqu'à 200%"
        ]
      },
      limitations: {
        title: "Limitations Connues",
        intro: "Malgré nos meilleurs efforts pour assurer l'accessibilité de Kalcufy, il peut y avoir certaines limitations. Nous travaillons activement pour résoudre ces problèmes :",
        items: [
          "Certains contenus tiers (publicités) peuvent ne pas être entièrement accessibles",
          "Les visualisations complexes de calculatrice peuvent avoir un support limité pour les lecteurs d'écran",
          "Les exports PDF peuvent ne pas être entièrement accessibles"
        ]
      },
      feedback: {
        title: "Retour d'Information",
        intro: "Nous accueillons vos commentaires sur l'accessibilité de Kalcufy. Veuillez nous faire savoir si vous rencontrez des barrières d'accessibilité :",
        email: "Email :",
        emailAddress: "accessibility@kalcufy.com",
        responseTime: "Nous essayons de répondre aux commentaires dans les 5 jours ouvrables."
      },
      assessment: {
        title: "Approche d'Évaluation",
        intro: "Kalcufy a évalué l'accessibilité de ce site par les approches suivantes :",
        items: [
          "Auto-évaluation utilisant les directives WCAG 2.1",
          "Tests automatisés avec axe DevTools et Lighthouse",
          "Tests manuels de navigation au clavier",
          "Tests de lecteur d'écran avec VoiceOver"
        ]
      },
      date: {
        title: "Date",
        text: "Cette déclaration a été créée le",
        lastReviewed: "et a été révisée pour la dernière fois le",
        createdDate: "24 janvier 2026",
        reviewedDate: "24 janvier 2026"
      }
    }
  },
  de: {
    title: "Erklärung zur Barrierefreiheit",
    intro: "Kalcufy verpflichtet sich, digitale Barrierefreiheit für Menschen mit Behinderungen zu gewährleisten. Wir verbessern kontinuierlich die Benutzererfahrung für alle und wenden die relevanten Barrierefreiheitsstandards an.",
    sections: {
      conformance: {
        title: "Konformitätsstatus",
        description: "Die Web Content Accessibility Guidelines (WCAG) definieren Anforderungen für Designer und Entwickler, um die Barrierefreiheit für Menschen mit Behinderungen zu verbessern. Sie definieren drei Konformitätsstufen: Stufe A, Stufe AA und Stufe AAA.",
        status: "Kalcufy ist teilweise konform mit WCAG 2.1 Stufe AA.",
        explanation: "Teilweise konform bedeutet, dass einige Teile des Inhalts nicht vollständig dem Barrierefreiheitsstandard entsprechen."
      },
      features: {
        title: "Barrierefreiheitsfunktionen",
        intro: "Wir haben die folgenden Barrierefreiheitsfunktionen implementiert:",
        items: [
          "Tastaturnavigation-Unterstützung auf der gesamten Website",
          "Link zum Hauptinhalt springen",
          "ARIA-Labels und Orientierungspunkte für Screenreader",
          "Ausreichende Farbkontrastverhältnisse (mindestens 4.5:1)",
          "Fokusindikatoren auf allen interaktiven Elementen",
          "Responsive Design, das auf allen Geräten funktioniert",
          "Reduzierte Bewegungsunterstützung für Benutzer, die es bevorzugen",
          "Semantische HTML-Struktur",
          "Alt-Text für Bilder",
          "Formularlabels und Fehlermeldungen"
        ]
      },
      compatibility: {
        title: "Kompatibilität",
        intro: "Kalcufy ist designed, um kompatibel zu sein mit:",
        items: [
          "Moderne Webbrowser (Chrome, Firefox, Safari, Edge)",
          "Screenreader (VoiceOver, NVDA, JAWS)",
          "Nur-Tastatur-Navigation",
          "Browser-Zoom bis zu 200%"
        ]
      },
      limitations: {
        title: "Bekannte Einschränkungen",
        intro: "Trotz unserer besten Bemühungen, die Barrierefreiheit von Kalcufy zu gewährleisten, kann es einige Einschränkungen geben. Wir arbeiten aktiv daran, diese Probleme zu beheben:",
        items: [
          "Einige Inhalte von Drittanbietern (Werbung) sind möglicherweise nicht vollständig zugänglich",
          "Komplexe Rechner-Visualisierungen haben möglicherweise begrenzte Screenreader-Unterstützung",
          "PDF-Exporte sind möglicherweise nicht vollständig zugänglich"
        ]
      },
      feedback: {
        title: "Feedback",
        intro: "Wir begrüßen Ihr Feedback zur Barrierefreiheit von Kalcufy. Bitte teilen Sie uns mit, wenn Sie auf Barrierefreiheitshindernisse stoßen:",
        email: "E-Mail:",
        emailAddress: "accessibility@kalcufy.com",
        responseTime: "Wir versuchen, auf Feedback innerhalb von 5 Werktagen zu antworten."
      },
      assessment: {
        title: "Bewertungsansatz",
        intro: "Kalcufy bewertete die Barrierefreiheit dieser Website durch folgende Ansätze:",
        items: [
          "Selbstbewertung mit WCAG 2.1 Richtlinien",
          "Automatisierte Tests mit axe DevTools und Lighthouse",
          "Manuelle Tastaturnavigationstests",
          "Screenreader-Tests mit VoiceOver"
        ]
      },
      date: {
        title: "Datum",
        text: "Diese Erklärung wurde erstellt am",
        lastReviewed: "und zuletzt überprüft am",
        createdDate: "24. Januar 2026",
        reviewedDate: "24. Januar 2026"
      }
    }
  }
};

// ============================================================================
// ACCESSIBILITY STATEMENT PAGE
// Important for legal protection - shows commitment to accessibility
// ============================================================================

export default function AccessibilityPage() {
  const locale = useLocale();
  const t = content[locale as keyof typeof content] || content.en;

  return (
    <>
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            {t.title}
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8">
              {t.intro}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t.sections.conformance.title}
              </h2>
              <p className="text-slate-600 mb-4">
                {t.sections.conformance.description}
              </p>
              <p className="text-slate-600">
                <strong>{t.sections.conformance.status}</strong> {t.sections.conformance.explanation}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t.sections.features.title}
              </h2>
              <p className="text-slate-600 mb-4">
                {t.sections.features.intro}
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                {t.sections.features.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t.sections.compatibility.title}
              </h2>
              <p className="text-slate-600 mb-4">
                {t.sections.compatibility.intro}
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                {t.sections.compatibility.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t.sections.limitations.title}
              </h2>
              <p className="text-slate-600 mb-4">
                {t.sections.limitations.intro}
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                {t.sections.limitations.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t.sections.feedback.title}
              </h2>
              <p className="text-slate-600 mb-4">
                {t.sections.feedback.intro}
              </p>
              <ul className="list-none text-slate-600 space-y-2">
                <li>
                  <strong>{t.sections.feedback.email}</strong>{" "}
                  <a 
                    href="mailto:accessibility@kalcufy.com" 
                    className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    {t.sections.feedback.emailAddress}
                  </a>
                </li>
              </ul>
              <p className="text-slate-600 mt-4">
                {t.sections.feedback.responseTime}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t.sections.assessment.title}
              </h2>
              <p className="text-slate-600">
                {t.sections.assessment.intro}
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mt-4">
                {t.sections.assessment.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {t.sections.date.title}
              </h2>
              <p className="text-slate-600">
                {t.sections.date.text} <strong>{t.sections.date.createdDate}</strong> {t.sections.date.lastReviewed} <strong>{t.sections.date.reviewedDate}</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      
    </>
  );
}