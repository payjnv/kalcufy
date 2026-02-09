"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Header from "@/components/Header";
import AuthModal from "@/components/AuthModal";

export default function RegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/${locale}/dashboard`);
    }
  }, [status, router, locale]);

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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Create Your Account</h1>
          <p className="text-slate-600">Join thousands of users making smarter decisions every day.</p>
        </div>
      </main>
      
      <AuthModal isOpen={modalOpen} onClose={handleClose} defaultTab="signup" />
    </>
  );
}
