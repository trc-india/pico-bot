"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  LogIn, LogOut, RefreshCw, Phone, Mail, Calendar,
  Clock, User, Loader2, ChevronDown, ChevronUp,
  MessageCircle, ShieldCheck, AlertTriangle,
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  child_age: string | null;
  interest: string | null;
  status: string;
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  kit_interest: string | null;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"bookings" | "contacts">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Check for existing session
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      setToken(data.token);
      sessionStorage.setItem("admin_token", data.token);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("admin_token");
    setBookings([]);
    setContacts([]);
  };

  const fetchData = useCallback(async (type: "bookings" | "contacts") => {
    if (!token) return;
    setDataLoading(true);
    setDataError("");
    try {
      const res = await fetch(`/api/admin/data?type=${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      if (type === "bookings") setBookings(data.data || []);
      else setContacts(data.data || []);
    } catch (err) {
      setDataError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setDataLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchData(tab);
  }, [token, tab, fetchData]);

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "pending": case "new": return "#f59e0b";
      case "confirmed": case "read": return "#3b82f6";
      case "completed": case "replied": return "#10b981";
      case "cancelled": case "closed": return "#ef4444";
      default: return "#6b7280";
    }
  };

  // ---------- LOGIN SCREEN ----------
  if (!token) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f0f4ff 0%, #e8f4f8 100%)", padding: 16 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 20, padding: 36, boxShadow: "0 12px 40px rgba(0,0,0,.08)" }}
        >
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(8,145,178,.1)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <ShieldCheck size={28} style={{ color: "#0891b2" }} />
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: "#1e293b" }}>Admin Panel</h1>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>PICO BOT · Thinking Robot</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={lbl}>Email</label>
              <input
                type="email"
                required
                placeholder="admin@picobot.in"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                style={inp}
              />
            </div>
            <div>
              <label style={lbl}>Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                style={inp}
              />
            </div>
            {loginError && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(239,68,68,.08)", borderRadius: 10, color: "#ef4444", fontSize: 13 }}>
                <AlertTriangle size={14} /> {loginError}
              </div>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              style={{
                padding: "13px", borderRadius: 12, background: "#0891b2", color: "#fff",
                fontSize: 14, fontWeight: 700, borderWidth: 0, borderStyle: "none", borderColor: "transparent",
                cursor: loginLoading ? "wait" : "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8, marginTop: 4, transition: "opacity .2s",
                opacity: loginLoading ? 0.7 : 1,
              }}
            >
              {loginLoading ? <Loader2 size={16} className="anim-spin-slow" /> : <LogIn size={16} />}
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ---------- DASHBOARD ----------
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Top bar */}
      <header style={{ background: "#fff", borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "#e2e8f0", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ShieldCheck size={20} style={{ color: "#0891b2" }} />
          <span style={{ fontSize: 15, fontWeight: 800, color: "#1e293b" }}>PICO BOT Admin</span>
        </div>
        <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", cursor: "pointer", background: "none", borderWidth: 0, borderStyle: "none", borderColor: "transparent", padding: "8px 14px", borderRadius: 8, transition: "background .15s" }}>
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
          <div style={statCard}>
            <Phone size={20} style={{ color: "#0891b2" }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b" }}>{bookings.length || "—"}</div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Call Bookings</div>
            </div>
          </div>
          <div style={statCard}>
            <Mail size={20} style={{ color: "#f97316" }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b" }}>{contacts.length || "—"}</div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Contact Messages</div>
            </div>
          </div>
          <div style={statCard}>
            <Calendar size={20} style={{ color: "#8b5cf6" }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b" }}>
                {bookings.filter(b => b.status === "pending").length || "—"}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Pending Calls</div>
            </div>
          </div>
          <div style={statCard}>
            <MessageCircle size={20} style={{ color: "#10b981" }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b" }}>
                {contacts.filter(c => c.status === "new").length || "—"}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>New Messages</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "#e2e8f0", borderRadius: 12, padding: 4 }}>
          {([["bookings", "📞 Call Bookings"], ["contacts", "📬 Contact Messages"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1, padding: "10px 16px", borderRadius: 10,
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                background: tab === key ? "#fff" : "transparent",
                color: tab === key ? "#1e293b" : "#64748b",
                borderWidth: 0, borderStyle: "none", borderColor: "transparent",
                boxShadow: tab === key ? "0 1px 4px rgba(0,0,0,.06)" : "none",
                transition: "all .2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <button
            onClick={() => fetchData(tab)}
            disabled={dataLoading}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#0891b2", cursor: "pointer", background: "rgba(8,145,178,.06)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(8,145,178,.15)", borderRadius: 8, padding: "7px 14px", transition: "background .15s" }}
          >
            <RefreshCw size={13} className={dataLoading ? "anim-spin-slow" : ""} /> Refresh
          </button>
        </div>

        {/* Error */}
        {dataError && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(239,68,68,.06)", borderRadius: 12, color: "#ef4444", fontSize: 13, marginBottom: 16 }}>
            <AlertTriangle size={14} /> {dataError}
          </div>
        )}

        {/* Loading */}
        {dataLoading && (
          <div style={{ textAlign: "center", padding: 48, color: "#64748b" }}>
            <Loader2 size={24} className="anim-spin-slow" style={{ margin: "0 auto 12px" }} />
            <p style={{ fontSize: 13 }}>Loading data...</p>
          </div>
        )}

        {/* Bookings Table */}
        {!dataLoading && tab === "bookings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {bookings.length === 0 ? (
              <div style={emptyState}>
                <Phone size={32} style={{ color: "#cbd5e1" }} />
                <p>No call bookings yet</p>
              </div>
            ) : (
              bookings.map((b) => (
                <div key={b.id} style={entryCard}>
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 12 }}
                    onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(8,145,178,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <User size={16} style={{ color: "#0891b2" }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.name}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>
                          {b.preferred_date} · {b.preferred_time}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ ...badge, background: `${statusColor(b.status)}14`, color: statusColor(b.status) }}>{b.status}</span>
                      {expandedId === b.id ? <ChevronUp size={14} style={{ color: "#94a3b8" }} /> : <ChevronDown size={14} style={{ color: "#94a3b8" }} />}
                    </div>
                  </div>
                  {expandedId === b.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      style={{ paddingTop: 14, marginTop: 14, borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "#f1f5f9", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
                    >
                      <InfoRow icon={<User size={13} />} label="Name" value={b.name} />
                      <InfoRow icon={<Mail size={13} />} label="Email" value={b.email} />
                      <InfoRow icon={<Phone size={13} />} label="Phone" value={b.phone} />
                      <InfoRow icon={<Calendar size={13} />} label="Date" value={b.preferred_date} />
                      <InfoRow icon={<Clock size={13} />} label="Time" value={b.preferred_time} />
                      <InfoRow icon={<User size={13} />} label="Child Age" value={b.child_age || "—"} />
                      <div style={{ gridColumn: "1 / -1" }}>
                        <InfoRow icon={<MessageCircle size={13} />} label="Interests" value={b.interest || "—"} />
                      </div>
                      <div style={{ gridColumn: "1 / -1", fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                        Submitted: {formatDateTime(b.created_at)}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Contacts Table */}
        {!dataLoading && tab === "contacts" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {contacts.length === 0 ? (
              <div style={emptyState}>
                <Mail size={32} style={{ color: "#cbd5e1" }} />
                <p>No contact messages yet</p>
              </div>
            ) : (
              contacts.map((c) => (
                <div key={c.id} style={entryCard}>
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 12 }}
                    onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(249,115,22,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Mail size={16} style={{ color: "#f97316" }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>{c.subject}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ ...badge, background: `${statusColor(c.status)}14`, color: statusColor(c.status) }}>{c.status}</span>
                      {expandedId === c.id ? <ChevronUp size={14} style={{ color: "#94a3b8" }} /> : <ChevronDown size={14} style={{ color: "#94a3b8" }} />}
                    </div>
                  </div>
                  {expandedId === c.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      style={{ paddingTop: 14, marginTop: 14, borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "#f1f5f9", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
                    >
                      <InfoRow icon={<User size={13} />} label="Name" value={c.name} />
                      <InfoRow icon={<Mail size={13} />} label="Email" value={c.email} />
                      <InfoRow icon={<Phone size={13} />} label="Phone" value={c.phone || "—"} />
                      <InfoRow icon={<MessageCircle size={13} />} label="Subject" value={c.subject} />
                      <InfoRow icon={<User size={13} />} label="Kit Interest" value={c.kit_interest || "—"} />
                      <div style={{ gridColumn: "1 / -1" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>Message</div>
                        <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.7, background: "#f8fafc", borderRadius: 10, padding: "12px 14px" }}>{c.message}</div>
                      </div>
                      <div style={{ gridColumn: "1 / -1", fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
                        Submitted: {formatDateTime(c.created_at)}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
      <span style={{ color: "#94a3b8", marginTop: 2 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".05em" }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{value}</div>
      </div>
    </div>
  );
}

const lbl: React.CSSProperties = {
  display: "block", fontSize: 12, fontWeight: 700, color: "#64748b",
  marginBottom: 6, textTransform: "uppercase", letterSpacing: ".04em",
};

const inp: React.CSSProperties = {
  width: "100%", padding: "12px 14px", borderRadius: 10,
  borderWidth: "1.5px", borderStyle: "solid", borderColor: "#e2e8f0",
  fontSize: 14, color: "#1e293b", background: "#f8fafc",
  outline: "none", transition: "border-color .2s", fontFamily: "inherit",
};

const statCard: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 14, padding: "18px 20px",
  background: "#fff", borderRadius: 14,
  borderWidth: "1px", borderStyle: "solid", borderColor: "#e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,.04)",
};

const entryCard: React.CSSProperties = {
  padding: "14px 18px", background: "#fff", borderRadius: 14,
  borderWidth: "1px", borderStyle: "solid", borderColor: "#e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,.04)",
};

const badge: React.CSSProperties = {
  padding: "4px 10px", borderRadius: 99,
  fontSize: 11, fontWeight: 700, textTransform: "capitalize",
};

const emptyState: React.CSSProperties = {
  textAlign: "center", padding: "64px 24px",
  color: "#94a3b8", fontSize: 14,
};
