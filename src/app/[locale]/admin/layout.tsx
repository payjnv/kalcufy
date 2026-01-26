"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { SessionProvider } from "next-auth/react";
import { dataProvider } from "@/providers/data-provider";
import { authProvider } from "@/providers/auth-provider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      // Not logged in → redirect to login
      const locale = pathname.split('/')[1] || 'en';
      router.push(`/${locale}/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if ((session.user as any)?.role !== "ADMIN") {
      // Not admin → redirect to home
      const locale = pathname.split('/')[1] || 'en';
      router.push(`/${locale}?error=unauthorized`);
      return;
    }

    // Is admin → allow
    setIsAuthorized(true);
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        authProvider={authProvider}
        resources={[
          {
            name: "users",
            list: "/admin/users",
            show: "/admin/users/:id",
            edit: "/admin/users/:id/edit",
            meta: { label: "Users", icon: "users" },
          },
          {
            name: "subscriptions",
            list: "/admin/subscriptions",
            show: "/admin/subscriptions/:id",
            meta: { label: "Subscriptions", icon: "credit-card" },
          },
          {
            name: "calculators",
            list: "/admin/calculators",
            meta: { label: "Calculators", icon: "calculator" },
          },
          {
            name: "calculator-usage",
            list: "/admin/analytics",
            meta: { label: "Analytics", icon: "bar-chart" },
          },
          {
            name: "newsletter",
            list: "/admin/newsletter",
            meta: { label: "Newsletter", icon: "mail" },
          },
          {
            name: "contact-messages",
            list: "/admin/messages",
            show: "/admin/messages/:id",
            meta: { label: "Messages", icon: "message-square" },
          },
          {
            name: "posts",
            list: "/admin/posts",
            create: "/admin/posts/new",
            edit: "/admin/posts/:id/edit",
            show: "/admin/posts/:id",
            meta: { label: "Blog Posts", icon: "file-text" },
          },
          {
            name: "ad-slots",
            list: "/admin/ads",
            edit: "/admin/ads/:id/edit",
            meta: { label: "Ad Slots", icon: "layout" },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        <div className="min-h-screen bg-slate-50">
          <AdminHeader />
          <div className="flex">
            <AdminSidebar />
            <main className="flex-1 p-6 ml-64 mt-16">
              {children}
            </main>
          </div>
        </div>
      </Refine>
    </AdminGuard>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}
