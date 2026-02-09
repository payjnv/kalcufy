import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ============================================================================
// ACCESSIBILITY STATEMENT PAGE
// Important for legal protection - shows commitment to accessibility
// ============================================================================

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Accessibility Statement
          </h1>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8">
              Kalcufy is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant 
              accessibility standards.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Conformance Status
              </h2>
              <p className="text-slate-600 mb-4">
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers 
                and developers to improve accessibility for people with disabilities. It defines three 
                levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p className="text-slate-600">
                <strong>Kalcufy is partially conformant with WCAG 2.1 Level AA.</strong> Partially 
                conformant means that some parts of the content do not fully conform to the 
                accessibility standard.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Accessibility Features
              </h2>
              <p className="text-slate-600 mb-4">
                We have implemented the following accessibility features:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Keyboard navigation support throughout the site</li>
                <li>Skip to main content link</li>
                <li>ARIA labels and landmarks for screen readers</li>
                <li>Sufficient color contrast ratios (minimum 4.5:1)</li>
                <li>Focus indicators on all interactive elements</li>
                <li>Responsive design that works on all devices</li>
                <li>Reduced motion support for users who prefer it</li>
                <li>Semantic HTML structure</li>
                <li>Alt text for images</li>
                <li>Form labels and error messages</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Compatibility
              </h2>
              <p className="text-slate-600 mb-4">
                Kalcufy is designed to be compatible with:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Modern web browsers (Chrome, Firefox, Safari, Edge)</li>
                <li>Screen readers (VoiceOver, NVDA, JAWS)</li>
                <li>Keyboard-only navigation</li>
                <li>Browser zoom up to 200%</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Known Limitations
              </h2>
              <p className="text-slate-600 mb-4">
                Despite our best efforts to ensure accessibility of Kalcufy, there may be some 
                limitations. We are actively working to address these issues:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Some third-party content (advertisements) may not be fully accessible</li>
                <li>Complex calculator visualizations may have limited screen reader support</li>
                <li>PDF exports may not be fully accessible</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Feedback
              </h2>
              <p className="text-slate-600 mb-4">
                We welcome your feedback on the accessibility of Kalcufy. Please let us know if 
                you encounter accessibility barriers:
              </p>
              <ul className="list-none text-slate-600 space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a 
                    href="mailto:accessibility@kalcufy.com" 
                    className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    accessibility@kalcufy.com
                  </a>
                </li>
              </ul>
              <p className="text-slate-600 mt-4">
                We try to respond to feedback within 5 business days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Assessment Approach
              </h2>
              <p className="text-slate-600">
                Kalcufy assessed the accessibility of this site by the following approaches:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mt-4">
                <li>Self-evaluation using WCAG 2.1 guidelines</li>
                <li>Automated testing with axe DevTools and Lighthouse</li>
                <li>Manual keyboard navigation testing</li>
                <li>Screen reader testing with VoiceOver</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Date
              </h2>
              <p className="text-slate-600">
                This statement was created on <strong>January 24, 2026</strong> and was last 
                reviewed on <strong>January 24, 2026</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
