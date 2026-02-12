"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Bell, Search, Menu } from "lucide-react";
import { useState } from "react";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const initials = user?.name?.substring(0, 2).toUpperCase() || "AD";
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-40">
      <div className="flex items-center justify-between h-full px-3 sm:px-6">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-2">
          {/* Hamburger — visible on mobile only */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-1 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-slate-900 hidden sm:inline">Kalcufy</span>
            <span className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-semibold rounded-full hidden sm:inline">
              Admin
            </span>
          </Link>
        </div>

        {/* Search — hidden on mobile */}
        <div className="flex-1 max-w-lg mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users, calculations, posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-slate-400 bg-slate-100 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* User */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-slate-200">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || ""}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                {initials}
              </div>
            )}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
