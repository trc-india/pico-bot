"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  LogIn, LogOut, RefreshCw, Phone, Mail, Calendar,
  Clock, User, Loader2, ChevronDown, ChevronUp,
  MessageCircle, ShieldCheck, AlertTriangle, Trash2,
  Check, Edit3, X, Save, BarChart3,
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

const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"];
const CONTACT_STATUSES = ["new", "read", "replied", "closed"];
const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM",
];

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  const showToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

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

  // ---- UPDATE a record ----
  const handleUpdate = async (type: "bookings" | "contacts", id: string, updates: Record<string, string>) => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type, id, updates }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      // Update local state
      if (type === "bookings") {
        setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
      } else {
        setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
      }
      setEditingId(null);
      setEditForm({});
      showToast("Updated successfully ✓");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Update failed", "err");
    } finally {
      setActionLoading(null);
    }
  };

  // ---- DELETE a record ----
  const handleDelete = async (type: "bookings" | "contacts", id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/data", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type, id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      if (type === "bookings") {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        setContacts((prev) => prev.filter((c) => c.id !== id));
      }
      setExpandedId(null);
      showToast("Deleted successfully ✓");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Delete failed", "err");
    } finally {
      setActionLoading(null);
    }
  };

  // ---- Quick status change ----
  const handleStatusChange = (type: "bookings" | "contacts", id: string, newStatus: string) => {
    handleUpdate(type, id, { status: newStatus });
  };

  // ---- Start editing ----
  const startEditing = (booking: Booking) => {
    setEditingId(booking.id);
    setEditForm({
      preferred_date: booking.preferred_date,
      preferred_time: booking.preferred_time,
      status: booking.status,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEditing = (id: string) => {
    handleUpdate("bookings", id, editForm);
  };

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
              <input type="email" required placeholder="admin@picobot.in" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={lbl}>Password</label>
              <input type="password" required placeholder="••••••••" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} style={inp} />
            </div>
            {loginError && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(239,68,68,.08)", borderRadius: 10, color: "#ef4444", fontSize: 13 }}>
                <AlertTriangle size={14} /> {loginError}
              </div>
            )}
            <button type="submit" disabled={loginLoading} style={{ padding: "13px", borderRadius: 12, background: "#0891b2", color: "#fff", fontSize: 14, fontWeight: 700, borderWidth: 0, borderStyle: "none", borderColor: "transparent", cursor: loginLoading ? "wait" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4, transition: "opacity .2s", opacity: loginLoading ? 0.7 : 1 }}>
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
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 999,
          padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700,
          background: toast.type === "ok" ? "#10b981" : "#ef4444", color: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,.15)",
          animation: "fadeIn .2s ease-out",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Top bar */}
      <header style={{ background: "#fff", borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "#e2e8f0", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ShieldCheck size={20} style={{ color: "#0891b2" }} />
          <span style={{ fontSize: 15, fontWeight: 800, color: "#1e293b" }}>PICO BOT Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={() => window.location.href = "/admin/analytics"} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#0891b2", cursor: "pointer", background: "rgba(8,145,178,.06)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(8,145,178,.15)", borderRadius: 8, padding: "8px 14px" }}>
            <BarChart3 size={14} /> Analytics
          </button>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#64748b", cursor: "pointer", background: "none", borderWidth: 0, borderStyle: "none", borderColor: "transparent", padding: "8px 14px", borderRadius: 8 }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
          <div style={statCard}><Phone size={20} style={{ color: "#0891b2" }} /><div><div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b" }}>{bookings.length || "—"}</div><div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Call Bookings</div></div></div>
          <div style={statCard}><Mail size={20} style={{ color: "#f97316" }} /><div><div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b" }}>{contacts.length || "—"}</div><div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Contact Messages</div></div></div>
          <div style={statCard}><Calendar size={20} style={{ color: "#8b5cf6" }} /><div><div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b" }}>{bookings.filter(b => b.status === "pending").length || "—"}</div><div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Pending Calls</div></div></div>
          <div style={statCard}><MessageCircle size={20} style={{ color: "#10b981" }} /><div><div style={{ fontSize: 28, fontWeight: 900, color: "#1e293b" }}>{contacts.filter(c => c.status === "new").length || "—"}</div><div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>New Messages</div></div></div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "#e2e8f0", borderRadius: 12, padding: 4 }}>
          {([["bookings", "📞 Call Bookings"], ["contacts", "📬 Contact Messages"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: "10px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", background: tab === key ? "#fff" : "transparent", color: tab === key ? "#1e293b" : "#64748b", borderWidth: 0, borderStyle: "none", borderColor: "transparent", boxShadow: tab === key ? "0 1px 4px rgba(0,0,0,.06)" : "none", transition: "all .2s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <button onClick={() => fetchData(tab)} disabled={dataLoading} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#0891b2", cursor: "pointer", background: "rgba(8,145,178,.06)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(8,145,178,.15)", borderRadius: 8, padding: "7px 14px" }}>
            <RefreshCw size={13} className={dataLoading ? "anim-spin-slow" : ""} /> Refresh
          </button>
        </div>

        {dataError && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(239,68,68,.06)", borderRadius: 12, color: "#ef4444", fontSize: 13, marginBottom: 16 }}>
            <AlertTriangle size={14} /> {dataError}
          </div>
        )}

        {dataLoading && (
          <div style={{ textAlign: "center", padding: 48, color: "#64748b" }}>
            <Loader2 size={24} className="anim-spin-slow" style={{ margin: "0 auto 12px" }} />
            <p style={{ fontSize: 13 }}>Loading data...</p>
          </div>
        )}

        {/* ======== BOOKINGS ======== */}
        {!dataLoading && tab === "bookings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {bookings.length === 0 ? (
              <div style={emptyState}><Phone size={32} style={{ color: "#cbd5e1" }} /><p>No call bookings yet</p></div>
            ) : (
              bookings.map((b) => {
                const isEditing = editingId === b.id;
                const isLoading = actionLoading === b.id;

                return (
                  <div key={b.id} style={{ ...entryCard, opacity: isLoading ? 0.6 : 1, transition: "opacity .2s" }}>
                    {/* Header row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 12 }} onClick={() => { if (!isEditing) setExpandedId(expandedId === b.id ? null : b.id); }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(8,145,178,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <User size={16} style={{ color: "#0891b2" }} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.name}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8" }}>{b.preferred_date} · {b.preferred_time}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ ...badgeStyle, background: `${statusColor(b.status)}14`, color: statusColor(b.status) }}>{b.status}</span>
                        {expandedId === b.id ? <ChevronUp size={14} style={{ color: "#94a3b8" }} /> : <ChevronDown size={14} style={{ color: "#94a3b8" }} />}
                      </div>
                    </div>

                    {/* Expanded details */}
                    {expandedId === b.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ paddingTop: 14, marginTop: 14, borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "#f1f5f9" }}>

                        {/* ===== BOOKED SLOT — BIG HIGHLIGHTED CARD ===== */}
                        <div style={{ background: "linear-gradient(135deg, rgba(8,145,178,.06) 0%, rgba(139,92,246,.04) 100%)", borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(8,145,178,.2)", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}>
                          <div style={{ fontSize: 10, fontWeight: 800, color: "#0891b2", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>📅 Booked Slot</div>
                          {isEditing ? (
                            <div>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                                <div>
                                  <label style={{ ...lbl, fontSize: 10, marginBottom: 4 }}>Date</label>
                                  <input type="date" value={editForm.preferred_date || ""} onChange={(e) => setEditForm({ ...editForm, preferred_date: e.target.value })} style={{ ...inp, fontSize: 14, fontWeight: 700, padding: "10px 12px" }} />
                                </div>
                                <div>
                                  <label style={{ ...lbl, fontSize: 10, marginBottom: 4 }}>Time</label>
                                  <select value={editForm.preferred_time || ""} onChange={(e) => setEditForm({ ...editForm, preferred_time: e.target.value })} style={{ ...inp, fontSize: 14, fontWeight: 700, padding: "10px 12px", cursor: "pointer" }}>
                                    {TIME_SLOTS.map((t) => (<option key={t} value={t}>{t}</option>))}
                                  </select>
                                </div>
                              </div>
                              <div>
                                <label style={{ ...lbl, fontSize: 10, marginBottom: 6 }}>Status</label>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                  {BOOKING_STATUSES.map((s) => (
                                    <button key={s} type="button" onClick={() => setEditForm({ ...editForm, status: s })} style={{ padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: "pointer", borderWidth: "1.5px", borderStyle: "solid", borderColor: editForm.status === s ? statusColor(s) : "#e2e8f0", background: editForm.status === s ? `${statusColor(s)}14` : "#fff", color: editForm.status === s ? statusColor(s) : "#64748b", textTransform: "capitalize", transition: "all .15s" }}>
                                      {editForm.status === s && <Check size={12} style={{ marginRight: 4 }} />}{s}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                                <button onClick={cancelEditing} style={actionBtn}><X size={13} /> Cancel</button>
                                <button onClick={() => saveEditing(b.id)} disabled={isLoading} style={{ ...actionBtn, background: "#0891b2", color: "#fff" }}>
                                  {isLoading ? <Loader2 size={13} className="anim-spin-slow" /> : <Save size={13} />} Save Changes
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(8,145,178,.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <Calendar size={22} style={{ color: "#0891b2" }} />
                                </div>
                                <div>
                                  <div style={{ fontSize: 18, fontWeight: 900, color: "#1e293b" }}>
                                    {new Date(b.preferred_date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                                    <Clock size={13} style={{ color: "#0891b2" }} />
                                    <span style={{ fontSize: 15, fontWeight: 800, color: "#0891b2" }}>{b.preferred_time}</span>
                                  </div>
                                </div>
                              </div>
                              <button onClick={() => startEditing(b)} style={{ ...actionBtn, color: "#3b82f6", flexShrink: 0 }}>
                                <Edit3 size={12} /> Edit
                              </button>
                            </div>
                          )}
                        </div>

                        {/* ===== CONTACT DETAILS ===== */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                          <InfoRow icon={<User size={13} />} label="Name" value={b.name} />
                          <InfoRow icon={<Mail size={13} />} label="Email" value={b.email} />
                          <InfoRow icon={<Phone size={13} />} label="Phone" value={b.phone} />
                          <InfoRow icon={<User size={13} />} label="Child Age" value={b.child_age || "—"} />
                          <div style={{ gridColumn: "1 / -1" }}>
                            <InfoRow icon={<MessageCircle size={13} />} label="Interests" value={b.interest || "—"} />
                          </div>
                          <div style={{ gridColumn: "1 / -1", fontSize: 11, color: "#b0b8c4", fontStyle: "italic" }}>
                            Submitted: {formatDateTime(b.created_at)}
                          </div>
                        </div>

                        {/* ===== ACTION BUTTONS ===== */}
                        {!isEditing && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {BOOKING_STATUSES.filter(s => s !== b.status).map((s) => (
                              <button key={s} onClick={() => handleStatusChange("bookings", b.id, s)} disabled={isLoading} style={{ ...actionBtn, color: statusColor(s) }}>
                                <Check size={12} /> Mark {s}
                              </button>
                            ))}
                            <button onClick={() => handleDelete("bookings", b.id, b.name)} disabled={isLoading} style={{ ...actionBtn, color: "#ef4444" }}>
                              <Trash2 size={12} /> Delete
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ======== CONTACTS ======== */}
        {!dataLoading && tab === "contacts" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {contacts.length === 0 ? (
              <div style={emptyState}><Mail size={32} style={{ color: "#cbd5e1" }} /><p>No contact messages yet</p></div>
            ) : (
              contacts.map((c) => {
                const isLoading = actionLoading === c.id;

                return (
                  <div key={c.id} style={{ ...entryCard, opacity: isLoading ? 0.6 : 1, transition: "opacity .2s" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: 12 }} onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
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
                        <span style={{ ...badgeStyle, background: `${statusColor(c.status)}14`, color: statusColor(c.status) }}>{c.status}</span>
                        {expandedId === c.id ? <ChevronUp size={14} style={{ color: "#94a3b8" }} /> : <ChevronDown size={14} style={{ color: "#94a3b8" }} />}
                      </div>
                    </div>

                    {expandedId === c.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ paddingTop: 14, marginTop: 14, borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "#f1f5f9" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                          <InfoRow icon={<User size={13} />} label="Name" value={c.name} />
                          <InfoRow icon={<Mail size={13} />} label="Email" value={c.email} />
                          <InfoRow icon={<Phone size={13} />} label="Phone" value={c.phone || "—"} />
                          <InfoRow icon={<MessageCircle size={13} />} label="Subject" value={c.subject} />
                          <InfoRow icon={<User size={13} />} label="Kit Interest" value={c.kit_interest || "—"} />
                          <div style={{ gridColumn: "1 / -1" }}>
                            <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>Message</div>
                            <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.7, background: "#f8fafc", borderRadius: 10, padding: "12px 14px" }}>{c.message}</div>
                          </div>
                          <div style={{ gridColumn: "1 / -1", fontSize: 11, color: "#94a3b8" }}>
                            Submitted: {formatDateTime(c.created_at)}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {CONTACT_STATUSES.filter(s => s !== c.status).map((s) => (
                            <button key={s} onClick={() => handleStatusChange("contacts", c.id, s)} disabled={isLoading} style={{ ...actionBtn, color: statusColor(s) }}>
                              <Check size={12} /> Mark {s}
                            </button>
                          ))}
                          <button onClick={() => handleDelete("contacts", c.id, c.name)} disabled={isLoading} style={{ ...actionBtn, color: "#ef4444" }}>
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
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

const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".04em" };
const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 10, borderWidth: "1.5px", borderStyle: "solid", borderColor: "#e2e8f0", fontSize: 13, color: "#1e293b", background: "#fff", outline: "none", fontFamily: "inherit" };
const statCard: React.CSSProperties = { display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", background: "#fff", borderRadius: 14, borderWidth: "1px", borderStyle: "solid", borderColor: "#e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,.04)" };
const entryCard: React.CSSProperties = { padding: "14px 18px", background: "#fff", borderRadius: 14, borderWidth: "1px", borderStyle: "solid", borderColor: "#e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,.04)" };
const badgeStyle: React.CSSProperties = { padding: "4px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, textTransform: "capitalize" };
const emptyState: React.CSSProperties = { textAlign: "center", padding: "64px 24px", color: "#94a3b8", fontSize: 14 };
const actionBtn: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", background: "#f8fafc", borderWidth: "1px", borderStyle: "solid", borderColor: "#e2e8f0", color: "#64748b", transition: "all .15s", textTransform: "capitalize" };
