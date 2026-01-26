"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Mail,
  MailOpen,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Reply,
  CheckCircle,
  Clock,
} from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "replied">("all");
  const [page, setPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const pageSize = 10;

  useEffect(() => {
    fetchMessages();
  }, [page, filter]);

  async function fetchMessages() {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        _start: String((page - 1) * pageSize),
        _end: String(page * pageSize),
        _sort: "createdAt",
        _order: "desc",
      });

      if (filter === "unread") params.append("read", "false");
      if (filter === "replied") params.append("replied", "true");

      const res = await fetch(`/api/admin/contact-messages?${params}`);
      const data = await res.json();
      setMessages(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  }

  async function markAsRead(id: string) {
    try {
      await fetch(`/api/admin/contact-messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      fetchMessages();
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  }

  async function markAsReplied(id: string) {
    try {
      await fetch(`/api/admin/contact-messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replied: true, read: true }),
      });
      fetchMessages();
    } catch (error) {
      console.error("Failed to mark as replied:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await fetch(`/api/admin/contact-messages/${id}`, { method: "DELETE" });
      fetchMessages();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  }

  const pageCount = Math.ceil(total / pageSize);
  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
          <p className="text-slate-600">
            {unreadCount > 0 ? `${unreadCount} unread messages` : "All messages read"}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {[
          { key: "all", label: "All" },
          { key: "unread", label: "Unread" },
          { key: "replied", label: "Replied" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => { setFilter(f.key as any); setPage(1); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="p-4">
                  <div className="h-16 bg-slate-100 rounded animate-pulse" />
                </div>
              ))
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                No messages found
              </div>
            ) : (
              messages.map((message) => (
                <button
                  key={message.id}
                  onClick={() => {
                    setSelectedMessage(message);
                    if (!message.read) markAsRead(message.id);
                  }}
                  className={`w-full p-4 text-left hover:bg-slate-50 transition-colors ${
                    selectedMessage?.id === message.id ? "bg-blue-50" : ""
                  } ${!message.read ? "bg-blue-50/50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      message.read ? "bg-slate-100" : "bg-blue-100"
                    }`}>
                      {message.read ? (
                        <MailOpen className="w-5 h-5 text-slate-400" />
                      ) : (
                        <Mail className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`font-medium truncate ${!message.read ? "text-slate-900" : "text-slate-700"}`}>
                          {message.name}
                        </p>
                        <span className="text-xs text-slate-400 shrink-0">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{message.email}</p>
                      <p className="text-sm text-slate-500 truncate mt-1">
                        {message.subject || message.message.substring(0, 50)}...
                      </p>
                      {message.replied && (
                        <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3" />
                          Replied
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Pagination */}
          {total > pageSize && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
              <p className="text-xs text-slate-600">
                {page} / {pageCount}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="p-1.5 border border-slate-200 rounded disabled:opacity-50 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pageCount}
                  className="p-1.5 border border-slate-200 rounded disabled:opacity-50 hover:bg-slate-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {selectedMessage.name}
                  </h2>
                  <p className="text-sm text-slate-500">{selectedMessage.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Your message to Kalcufy"}`}
                    onClick={() => markAsReplied(selectedMessage.id)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Reply"
                  >
                    <Reply className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
                {selectedMessage.replied && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    Replied
                  </span>
                )}
              </div>

              {selectedMessage.subject && (
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase mb-1">Subject</p>
                  <p className="text-slate-900">{selectedMessage.subject}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-slate-400 uppercase mb-1">Message</p>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <p className="text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {!selectedMessage.replied && (
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Your message to Kalcufy"}`}
                  onClick={() => markAsReplied(selectedMessage.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  <Reply className="w-4 h-4" />
                  Reply via Email
                </a>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              <div className="text-center">
                <Mail className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Select a message to view</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
