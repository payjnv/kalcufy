"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import Header from "@/components/Header";
import AuthModal from "@/components/AuthModal";

function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(true);

  // Get callback URL from query params
  const callbackUrl = searchParams.get("callbackUrl") || `/${locale}/dashboard`;

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleClose = () => {
    setModalOpen(false);
    router.push(`/${locale}`);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container py-20 text-center opacity-50 blur-sm pointer-events-none">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Welcome Back</h1>
          <p className="text-slate-600">Log in to access your calculations and saved data.</p>
        </div>
      </main>
      
      <AuthModal 
        isOpen={modalOpen} 
        onClose={handleClose} 
        defaultTab="login" 
        callbackUrl={callbackUrl}
      />
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
