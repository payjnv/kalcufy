"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  MailOpen,
  Reply,
  Trash2,
  Clock,
  CheckCircle
} from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "unreplied">("all");

  useEffect(() => {
    fetchMessages();
  }, [filter]);

  async function fetchMessages() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter === "unread") params.append("read", "false");
      if (filter === "unreplied") params.append("replied", "false");
      
      const response = await fetch(`/api/admin/contact-messages?${params}`);
      const data = await response.json();
      setMessages(data.data || []);
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
      setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to mark as replied:", error);
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      await fetch(`/api/admin/contact-messages/${id}`, { method: "DELETE" });
      fetchMessages();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  }

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-lg sm:text-xl sm:text-2xl font-bold text-slate-900">Messages</h1>
          <p className="text-slate-600">
            Contact form submissions
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {(["all", "unread", "unreplied"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              filter === f
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="p-4 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-48 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
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
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {message.read ? (
                        <MailOpen className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Mail className="w-4 h-4 text-blue-600" />
                      )}
                      <span className={`font-medium ${!message.read ? "text-slate-900" : "text-slate-700"}`}>
                        {message.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {message.replied && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-xs text-slate-400">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{message.email}</p>
                  {message.subject && (
                    <p className="text-sm font-medium text-slate-700 mt-1">{message.subject}</p>
                  )}
                  <p className="text-sm text-slate-600 mt-1 line-clamp-2">{message.message}</p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {selectedMessage ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{selectedMessage.name}</h3>
                    <a 
                      href={`mailto:${selectedMessage.email}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                {selectedMessage.subject && (
                  <p className="mt-2 font-medium text-slate-700">{selectedMessage.subject}</p>
                )}
              </div>

              {/* Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-slate-700 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              {/* Actions */}
              <div className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || "Your message to Kalcufy"}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    <Reply className="w-4 h-4" />
                    Reply
                  </a>
                  {!selectedMessage.replied && (
                    <button
                      onClick={() => markAsReplied(selectedMessage.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Replied
                    </button>
                  )}
                </div>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 p-8">
              Select a message to view
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
