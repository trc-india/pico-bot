"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { WA_LINK } from "@/data/constants";
import { KITS } from "@/data/kits";

const SUBJECTS = [
  "General Inquiry",
  "Help Choosing a Kit",
  "Order Support",
  "Bulk / School Order",
  "Feedback / Suggestion",
  "Partnership / Collaboration",
  "Other",
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    kit_interest: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert([{
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        subject: form.subject,
        kit_interest: form.kit_interest || null,
        message: form.message,
      }]);
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Contact form error:", err);
      alert("Something went wrong. Please try WhatsApp us directly!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ paddingTop: "calc(var(--nav-height) + 40px)", paddingBottom: 80 }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span className="section-eyebrow">📬 Get in Touch</span>
          <h1 className="section-title">
            We&apos;d Love to <span className="grad-primary">Hear From You</span>
          </h1>
          <p className="section-subtitle">
            Have questions, need help, or want to discuss a bulk order? Drop us a message and we&apos;ll get back within 24 hours.
          </p>
        </motion.div>

        <div className="contact-layout">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <div className="card" style={{ padding: "56px 40px", textAlign: "center" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(16,185,129,.1)", border: "2px solid rgba(16,185,129,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <CheckCircle size={32} style={{ color: "#10b981" }} />
                  </div>
                </motion.div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "var(--text)", marginBottom: 8 }}>Message Sent! 🎉</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
                  Thank you, <strong>{form.name}</strong>! We&apos;ll get back to you within 24 hours.
                  <br />Check your email at <strong>{form.email}</strong> for our reply.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", kit_interest: "", message: "" }); }} className="btn btn-outline">
                    Send Another Message
                  </button>
                  <a href="/" className="btn btn-primary">Back to Home</a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card" style={{ padding: 28 }}>
                <h2 style={{ fontSize: 18, fontWeight: 900, color: "var(--text)", marginBottom: 20 }}>Send Us a Message</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Name & Email Row */}
                  <div className="form-row">
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Your Name *</label>
                      <input type="text" required placeholder="e.g. Priya Sharma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Email Address *</label>
                      <input type="email" required placeholder="e.g. priya@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                    </div>
                  </div>

                  {/* Phone & Subject Row */}
                  <div className="form-row">
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Mobile Number</label>
                      <input type="tel" placeholder="e.g. 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Subject *</label>
                      <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                        <option value="">Select a topic</option>
                        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Kit Interest */}
                  <div>
                    <label style={labelStyle}>Interested in a specific kit?</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      <button type="button" onClick={() => setForm({ ...form, kit_interest: "" })} style={{ ...chipStyle, ...(form.kit_interest === "" ? chipActiveStyle : {}) }}>
                        None / General
                      </button>
                      {KITS.map((k) => (
                        <button key={k.id} type="button" onClick={() => setForm({ ...form, kit_interest: k.name })} style={{ ...chipStyle, ...(form.kit_interest === k.name ? chipActiveStyle : {}) }}>
                          {k.name.replace(" Kit", "").replace(" by Thinking Robot", "")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Your Message *</label>
                    <textarea required placeholder="Tell us how we can help..." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "vertical", minHeight: 100 }} />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading || !form.name || !form.email || !form.subject || !form.message}
                    style={{ width: "100%", padding: "14px", fontSize: 15, marginTop: 4 }}
                  >
                    {loading ? <Loader2 size={18} className="anim-spin-slow" /> : <><Send size={16} /> Send Message</>}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* WhatsApp Card */}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="card contact-info-card" style={{ borderColor: "rgba(37,211,102,.3)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(37,211,102,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MessageCircle size={22} style={{ color: "#25d366" }} />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>WhatsApp Us</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Chat instantly — fastest response!</p>
                <p style={{ fontSize: 12, color: "#25d366", fontWeight: 700, marginTop: 4 }}>+91 82754 78093</p>
              </div>
            </a>

            {/* Email Card */}
            <div className="card contact-info-card">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(8,145,178,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Mail size={22} style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>Email</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>We reply within 24 hours</p>
                <p style={{ fontSize: 12, color: "var(--primary)", fontWeight: 700, marginTop: 4 }}>support@thinkingrobot.in</p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="card contact-info-card">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(249,115,22,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Phone size={22} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>Call Us</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Mon–Sat, 10 AM – 6 PM IST</p>
                <p style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700, marginTop: 4 }}>+91 82754 78093</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="card contact-info-card">
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(139,92,246,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={22} style={{ color: "var(--purple)" }} />
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>Based In</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Kolhapur, Maharashtra, India 🇮🇳</p>
                <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, marginTop: 4 }}>Shipping across India</p>
              </div>
            </div>

            {/* FAQ Mini */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: "var(--text)", marginBottom: 14 }}>❓ Quick Answers</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["Do you ship all over India?", "Yes! Free shipping on orders above ₹1,499."],
                  ["What age is this for?", "Our kits are designed for ages 8–16."],
                  ["Can I return a kit?", "Yes — 30-day hassle-free returns."],
                  ["Do I need coding experience?", "Nope! Every kit includes beginner guides."],
                ].map(([q, a]) => (
                  <div key={q} style={{ paddingBottom: 12, borderBottom: "1px solid var(--border-light)" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{q}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{a}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-layout{display:grid;grid-template-columns:1.3fr 1fr;gap:28px;align-items:start}
        .contact-info-card{display:flex;align-items:center;gap:14px;padding:18px 20px;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .contact-info-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-md)}
        .form-row{display:flex;gap:12px}
        @media(max-width:768px){
          .contact-layout{grid-template-columns:1fr!important}
          .form-row{flex-direction:column!important;gap:14px!important}
        }
      `}</style>
    </main>
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
  border: "1.5px solid var(--border)",
  fontSize: 14,
  color: "var(--text)",
  background: "var(--bg)",
  outline: "none",
  transition: "border-color .2s",
  fontFamily: "inherit",
};

const chipStyle: React.CSSProperties = {
  padding: "7px 14px",
  borderRadius: "var(--radius-pill)",
  fontSize: 12,
  fontWeight: 600,
  border: "1.5px solid var(--border)",
  background: "var(--bg)",
  color: "var(--text-secondary)",
  cursor: "pointer",
  transition: "all .2s",
};

const chipActiveStyle: React.CSSProperties = {
  background: "rgba(8,145,178,.1)",
  borderColor: "var(--primary)",
  color: "var(--primary)",
};
