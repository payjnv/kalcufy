import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold">Kalc<span className="text-blue-400">ufy</span></span>
            </Link>
            <p className="text-slate-400 text-sm">Free calculators for finance and health.</p>
          </div>

          {/* Finance */}
          <div>
            <h3 className="font-semibold mb-4">💰 Finance</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/en/loan-calculator" className="hover:text-white">Loan</Link></li>
              <li><Link href="/en/mortgage-calculator" className="hover:text-white">Mortgage</Link></li>
              <li><Link href="/en/compound-interest-calculator" className="hover:text-white">Compound Interest</Link></li>
            </ul>
          </div>

          {/* Health */}
          <div>
            <h3 className="font-semibold mb-4">💪 Health</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/en/bmi-calculator" className="hover:text-white">BMI</Link></li>
              <li><Link href="/en/calorie-calculator" className="hover:text-white">Calories</Link></li>
              <li><Link href="/en/macro-calculator" className="hover:text-white">Macros</Link></li>
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="font-semibold mb-4">🌍 Languages</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/en" className="hover:text-white">🇺🇸 English</Link></li>
              <li><Link href="/es" className="hover:text-white">🇪🇸 Español</Link></li>
              <li><Link href="/pt" className="hover:text-white">🇧🇷 Português</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © 2026 Kalcufy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
