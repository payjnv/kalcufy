"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";

interface AuthModalProps {
  callbackUrl?: string;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, defaultTab = "signup", callbackUrl }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  // WCAG 2.4.3: Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(defaultTab);
      setEmail("");
      setPassword("");
      setName("");
      setError("");
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    setError("");
  }, [mode]);

  // WCAG 2.1.1 & 2.4.3: Keyboard navigation and focus trap
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    // WCAG: Focus trap - keep focus inside modal
    if (e.key === "Tab" && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // WCAG 2.4.3: Save current focus to restore later
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      
      // WCAG 2.4.3: Move focus to modal
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      
      // WCAG 2.4.3: Return focus on close
      if (previousActiveElement.current && !isOpen) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, handleKeyDown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");

        const loginResult = await signIn("credentials", { email, password, redirect: false });
        if (loginResult?.ok) {
          onClose();
          router.push(callbackUrl || `/${locale}/dashboard`);
          router.refresh();
        }
      } else {
        const result = await signIn("credentials", { email, password, redirect: false });
        if (result?.error) throw new Error("Invalid email or password");
        if (result?.ok) {
          onClose();
          router.push(callbackUrl || `/${locale}/dashboard`);
          router.refresh();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: callbackUrl || `/${locale}/dashboard` });
  };

  if (!isOpen) return null;

  const testimonials = {
    login: {
      quote: "Kalcufy helped me understand my mortgage options and saved me $15,000.",
      name: "Sarah M.",
      role: "Homeowner"
    },
    signup: {
      quote: "I have tried many calculator apps, but Kalcufy is by far the most comprehensive and easy to use.",
      name: "Michael R.",
      role: "Financial Analyst"
    }
  };

  const currentTestimonial = testimonials[mode];
  const modalTitleId = "auth-modal-title";
  const modalDescId = "auth-modal-description";

  return (
    // WCAG 4.1.2: role="dialog" with proper ARIA attributes
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      aria-describedby={modalDescId}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* WCAG: Backdrop - clicking closes modal */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[1000px] max-h-[90vh] overflow-hidden flex"
      >
        {/* Left Side - Blue Panel */}
        <div className="hidden lg:flex lg:w-[450px] bg-gradient-to-br from-blue-600 to-blue-700 p-10 flex-col relative">
          {/* WCAG 4.1.2: Close button with accessible name */}
          <button 
            ref={closeButtonRef}
            onClick={onClose} 
            aria-label="Close dialog"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center" aria-hidden="true">
              <span className="text-blue-600 font-bold text-xl">K</span>
            </div>
            <span className="text-2xl font-bold text-white">Kalcufy</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2 italic">
              {mode === "signup" ? "Start your journey" : "Welcome back to"}
            </h2>
            <h2 className="text-3xl font-bold text-white mb-6">
              {mode === "signup" ? "to smarter decisions." : "smarter calculations."}
            </h2>
            
            <p className="text-blue-100 mb-8">
              {mode === "signup" 
                ? "Join thousands of users making better financial and health decisions with Kalcufy."
                : "Access your saved calculations, export reports, and unlock PRO features."}
            </p>
            
            {/* Features list with proper list semantics */}
            <ul className="space-y-4" role="list" aria-label="Features">
              {mode === "signup" ? (
                <>
                  <li className="flex items-center gap-3 text-white">
                    <span className="w-6 h-6 rounded bg-blue-500/50 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    </span>
                    30+ Professional calculators
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <span className="w-6 h-6 rounded bg-blue-500/50 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </span>
                    Save & sync your calculations
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <span className="w-6 h-6 rounded bg-blue-500/50 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </span>
                    Export to PDF & Excel
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <span className="w-6 h-6 rounded bg-blue-500/50 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </span>
                    100% Free forever
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-3 text-white">
                    <svg className="w-5 h-5 text-cyan-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Sync across all devices
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <svg className="w-5 h-5 text-cyan-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Export to PDF & Excel
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <svg className="w-5 h-5 text-cyan-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Unlimited calculations
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Testimonial with proper figure/blockquote semantics */}
          <figure className="mt-auto pt-8 border-t border-blue-500/30">
            <blockquote className="text-blue-100 italic mb-4">"{currentTestimonial.quote}"</blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-blue-900 font-bold" aria-hidden="true">
                {currentTestimonial.name.charAt(0)}
              </span>
              <span>
                <span className="text-white font-semibold block">{currentTestimonial.name}</span>
                <span className="text-blue-200 text-sm">{currentTestimonial.role}</span>
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-8 lg:p-10 overflow-y-auto">
          {/* Back/Close button for mobile */}
          <button 
            onClick={onClose} 
            aria-label="Close dialog and return to home"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 lg:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to home</span>
          </button>

          {/* Desktop back button */}
          <button 
            onClick={onClose} 
            aria-label="Close dialog and return to home"
            className="hidden lg:flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-6 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to home</span>
          </button>

          {/* Header */}
          <div className="mb-8">
            <h1 id={modalTitleId} className="text-2xl font-bold text-slate-900 mb-2">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p id={modalDescId} className="text-slate-500">
              {mode === "signup" ? "Free forever. No credit card required." : "Sign in to your account"}
            </p>
          </div>

          {/* WCAG 4.1.3: Error with aria-live for screen readers */}
          {error && (
            <div 
              role="alert" 
              aria-live="assertive"
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
            >
              {error}
            </div>
          )}

          {/* Social Buttons */}
          <div className="space-y-3 mb-6" role="group" aria-label="Sign in with social accounts">
            <button 
              type="button" 
              onClick={() => handleSocialLogin("google")} 
              className="w-full py-3 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {mode === "signup" ? "Sign up with Google" : "Continue with Google"}
            </button>

            <button 
              type="button" 
              onClick={() => handleSocialLogin("apple")} 
              className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-3 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {mode === "signup" ? "Sign up with Apple" : "Continue with Apple"}
            </button>

            <button 
              type="button" 
              onClick={() => handleSocialLogin("github")} 
              className="w-full py-3 px-4 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {mode === "signup" ? "Sign up with GitHub" : "Continue with GitHub"}
            </button>
          </div>

          {/* Divider with proper semantics */}
          <div className="flex items-center gap-4 mb-6" role="separator" aria-orientation="horizontal">
            <div className="flex-1 h-px bg-slate-200" aria-hidden="true" />
            <span className="text-slate-400 text-sm">or</span>
            <div className="flex-1 h-px bg-slate-200" aria-hidden="true" />
          </div>

          {/* Form with proper label associations */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {mode === "signup" && (
              <div>
                <label htmlFor="auth-name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full name
                </label>
                <input 
                  id="auth-name"
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="John Doe" 
                  required 
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                />
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input 
                id="auth-email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="you@example.com" 
                required 
                autoComplete="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="auth-password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                {mode === "login" && (
                  <Link 
                    href={`/${locale}/forgot-password`} 
                    className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <input 
                id="auth-password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                required 
                minLength={mode === "signup" ? 6 : undefined}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                aria-describedby={mode === "signup" ? "password-requirements" : undefined}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
              />
              {mode === "signup" && (
                <p id="password-requirements" className="text-xs text-slate-500 mt-1">
                  Must be at least 6 characters
                </p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              aria-busy={loading}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                mode === "signup" ? "Create account" : "Sign In"
              )}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="text-center text-slate-600 mt-6">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button 
                  type="button"
                  onClick={() => setMode("login")} 
                  className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button 
                  type="button"
                  onClick={() => setMode("signup")} 
                  className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  Create one free
                </button>
              </>
            )}
          </p>

          {/* Legal links */}
          <p className="text-center text-xs text-slate-500 mt-6">
            By {mode === "signup" ? "creating an account" : "signing in"}, you agree to our{" "}
            <Link 
              href={`/${locale}/terms`} 
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link 
              href={`/${locale}/privacy`} 
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
