"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Calculator, CreditCard, BarChart3,
  Mail, MessageSquare, FileText, Layout, LogOut, ExternalLink,
  Tag, Languages, Settings, Activity, X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Calculators", href: "/admin/calculators", icon: Calculator },
  { name: "Translations", href: "/admin/translations", icon: Languages },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Deep Analytics", href: "/admin/deep-analytics", icon: Activity },
  { name: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Ad Slots", href: "/admin/ads", icon: Layout },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";

  const getHref = (href: string) => `/${locale}${href}`;
  const isActivePath = (href: string) => {
    const fullHref = getHref(href);
    return pathname === fullHref || (href !== "/admin" && pathname.startsWith(fullHref));
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Mobile overlay ── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 z-50
          flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = isActivePath(item.href);
            return (
              <Link
                key={item.name}
                href={getHref(item.href)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border-l-4 border-blue-600 -ml-1 pl-5"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-200 space-y-2">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors"
          >
            <ExternalLink className="w-5 h-5 text-slate-400 shrink-0" />
            View Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}` })}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
