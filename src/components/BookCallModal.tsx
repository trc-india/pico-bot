"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM",
];

const AGE_GROUPS = ["6-8 years", "8-10 years", "10-12 years", "12-14 years", "14+ years"];

const INTERESTS = [
  "Arduino / Electronics",
  "Robotics (PICO Bot)",
  "IoT / Wi-Fi Projects",
  "Python Coding",
  "Science Fair Project",
  "Not sure — need guidance",
];

function getNextNDays(n: number): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 1; i <= n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue;
    days.push(d.toISOString().split("T")[0]);
  }
  return days.slice(0, n);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function chipStyles(isActive: boolean): React.CSSProperties {
  return {
    padding: "7px 14px",
    borderRadius: "var(--radius-pill)",
    fontSize: 13,
    fontWeight: 600,
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: isActive ? "var(--primary)" : "var(--border)",
    background: isActive ? "rgba(8,145,178,.1)" : "var(--bg)",
    color: isActive ? "var(--primary)" : "var(--text-secondary)",
    cursor: "pointer",
    transition: "all .2s",
  };
}

function chipStylesSmall(isActive: boolean): React.CSSProperties {
  return {
    ...chipStyles(isActive),
    padding: "10px 8px",
    fontSize: 12,
    textAlign: "center" as const,
  };
}

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferred_date: "",
    preferred_time: "",
    child_age: "",
    interests: [] as string[],
  });

  const availableDates = getNextNDays(14);

  const toggleInterest = (interest: string) => {
    setForm((prev) => {
      const has = prev.interests.includes(interest);
      return {
        ...prev,
        interests: has
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.preferred_date || !form.preferred_time) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("call_bookings").insert([{
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferred_date: form.preferred_date,
        preferred_time: form.preferred_time,
        child_age: form.child_age || null,
        interest: form.interests.length > 0 ? form.interests.join(", ") : null,
      }]);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong. Please try again or WhatsApp us directly!");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", preferred_date: "", preferred_time: "", child_age: "", interests: [] });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,.45)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) resetAndClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-lg)",
              width: "100%",
              maxWidth: 480,
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,.2)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={resetAndClose}
              style={{
                position: "absolute", top: 14, right: 14, zIndex: 10,
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(0,0,0,.05)", borderWidth: 0, borderStyle: "none", borderColor: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--text-secondary)",
              }}
            >
              <X size={16} />
            </button>

            {submitted ? (
              <div style={{ padding: "48px 32px", textAlign: "center" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(16,185,129,.1)", borderWidth: "2px", borderStyle: "solid", borderColor: "rgba(16,185,129,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <CheckCircle size={32} style={{ color: "#10b981" }} />
                  </div>
                </motion.div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "var(--text)", marginBottom: 8 }}>Call Booked! 🎉</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
                  We&apos;ll call you on <strong>{formatDate(form.preferred_date)}</strong> at <strong>{form.preferred_time}</strong>.
                  <br />Check your email for confirmation.
                </p>
                <button onClick={resetAndClose} className="btn btn-primary" style={{ padding: "12px 28px" }}>
                  Got it!
                </button>
              </div>
            ) : (
              <div style={{ padding: "28px 28px 24px" }}>
                {/* Header */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(8,145,178,.1)", borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(8,145,178,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Phone size={18} style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 18, fontWeight: 900, color: "var(--text)" }}>Book a Free Call</h3>
                      <p style={{ fontSize: 12, color: "var(--text-muted)" }}>We&apos;ll help pick the perfect kit for your child</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
                    {[1, 2].map((s) => (
                      <div key={s} style={{ flex: 1, height: 4, borderRadius: 99, background: step >= s ? "var(--primary)" : "var(--border)", transition: "background .3s" }} />
                    ))}
                  </div>
                </div>

                {step === 1 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Your Name *</label>
                      <input type="text" placeholder="e.g. Priya Sharma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Mobile Number *</label>
                      <input type="tel" placeholder="e.g. 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input type="email" placeholder="e.g. priya@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Child&apos;s Age Group</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {AGE_GROUPS.map((age) => (
                          <button
                            key={age}
                            type="button"
                            onClick={() => setForm({ ...form, child_age: age })}
                            style={chipStyles(form.child_age === age)}
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>What&apos;s your child interested in? <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0, color: "var(--text-muted)" }}>(select multiple)</span></label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {INTERESTS.map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            style={chipStyles(form.interests.includes(interest))}
                          >
                            {form.interests.includes(interest) && <CheckCircle size={13} style={{ marginRight: 4 }} />}
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%", marginTop: 8, padding: "14px", fontSize: 15 }}
                      disabled={!form.name || !form.phone || !form.email}
                      onClick={() => setStep(2)}
                    >
                      Next — Pick a Time <Calendar size={16} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Choose a Date *</label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                        {availableDates.map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setForm({ ...form, preferred_date: d })}
                            style={chipStylesSmall(form.preferred_date === d)}
                          >
                            {formatDate(d)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Choose a Time *</label>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm({ ...form, preferred_time: t })}
                            style={chipStylesSmall(form.preferred_time === t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                      <button className="btn btn-outline" style={{ flex: 1, padding: "14px" }} onClick={() => setStep(1)}>
                        Back
                      </button>
                      <button
                        className="btn btn-primary"
                        style={{ flex: 2, padding: "14px", fontSize: 15 }}
                        disabled={!form.preferred_date || !form.preferred_time || loading}
                        onClick={handleSubmit}
                      >
                        {loading ? <Loader2 size={18} className="anim-spin-slow" /> : <>Confirm Booking <CheckCircle size={16} /></>}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  color: "var(--text-secondary)",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: ".04em",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "var(--radius-sm)",
  borderWidth: "1.5px",
  borderStyle: "solid",
  borderColor: "var(--border)",
  fontSize: 14,
  color: "var(--text)",
  background: "var(--bg)",
  outline: "none",
  transition: "border-color .2s",
  fontFamily: "inherit",
};
