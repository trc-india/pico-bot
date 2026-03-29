"use client";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle, ArrowRight, Leaf, Mail } from "lucide-react";

const WA_PLANT = `https://wa.me/918275478093?text=${encodeURIComponent(
  "Hi Thinking Robot! 🌱 I'm interested in the Smart Plant Monitoring Kit. Can you tell me more?"
)}`;

const BUY_LINK = "https://thinkingrobot.in/products/smart-plant-monitoring-and-watering-kit-esp8266-automated-gardening-system";

export function PlantCTA() {
  return (
    <section className="section" style={{ background: "linear-gradient(180deg, var(--bg) 0%, #dcfce7 100%)", position: "relative", overflow: "clip" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 110%, rgba(34,197,94,.12), transparent 70%)", pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          <motion.div animate={{ rotate: [0, 12, -10, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }} style={{ fontSize: 56, marginBottom: 20, display: "inline-block" }}>
            🌱
          </motion.div>
          <h2 style={{ fontSize: "clamp(26px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.12, color: "var(--text)", marginBottom: 14 }}>
            Ready to Build Your<br />
            <span className="plant-grad">Smart Garden?</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32 }}>
            Join hundreds of young makers across India. Just ₹899.<br />
            Free shipping · 30-day returns · Guaranteed quality.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href={BUY_LINK} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", padding: "14px 28px", fontSize: 15, boxShadow: "0 4px 16px rgba(34,197,94,.3)" }}>
              <ShoppingCart size={17} /> Buy Kit – ₹899
            </a>
            <a href={WA_PLANT} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ padding: "14px 28px", fontSize: 15 }}>
              <MessageCircle size={17} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
      <style>{`.plant-grad{background:linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}`}</style>
    </section>
  );
}

export function PlantContactStrip() {
  return (
    <section id="contact" style={{ background: "var(--bg)", borderTop: "1px solid rgba(34,197,94,.1)", padding: "48px 0", overflow: "clip" }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="card" style={{ display: "flex", alignItems: "center", gap: 28, padding: "32px 36px", border: "1.5px solid rgba(34,197,94,.15)", background: "linear-gradient(135deg,rgba(34,197,94,.03) 0%,rgba(5,150,105,.02) 100%)", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#16a34a", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>📬 Have Questions?</div>
              <h3 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: "var(--text)", lineHeight: 1.2, marginBottom: 8 }}>We&apos;re Here to Help</h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Need help with assembly, code, or choosing the right kit? Reach out anytime — we respond fast.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, flexShrink: 0 }}>
              <a href="/contact" className="btn" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", boxShadow: "0 4px 16px rgba(34,197,94,.3)" }}>
                <Mail size={15} /> Contact Us <ArrowRight size={14} />
              </a>
              <a href={WA_PLANT} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function PlantTrustBadges() {
  const TRUST = [
    { emoji: "🌱", title: "Eco Friendly", sub: "Learn with nature" },
    { emoji: "📱", title: "App Controlled", sub: "Monitor from phone" },
    { emoji: "📦", title: "All Included", sub: "Nothing extra needed" },
    { emoji: "↩️", title: "30-Day Returns", sub: "Risk-free purchase" },
  ];

  return (
    <section style={{ background: "#f0fdf4", borderTop: "1px solid rgba(34,197,94,.1)", borderBottom: "1px solid rgba(34,197,94,.1)", padding: "36px 0", overflow: "clip" }}>
      <div className="container">
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 800, color: "#16a34a", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 20 }}>🌿 Why Makers Love This Kit</p>
        <div className="plant-trust-grid">
          {TRUST.map((t, i) => (
            <motion.div key={t.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid rgba(34,197,94,.12)", borderRadius: "var(--radius-md)", padding: "14px 18px", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: 26, flexShrink: 0 }}>{t.emoji}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text)" }}>{t.title}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{t.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .plant-trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        @media(max-width:700px){.plant-trust-grid{grid-template-columns:repeat(2,1fr)!important;gap:8px!important}}
      `}</style>
    </section>
  );
}

export function PlantMarquee() {
  const ITEMS = ["🌱 ESP8266 Powered", "💧 Auto Watering", "📱 App Controlled", "🌡️ DHT11 Sensor", "🌿 Soil Moisture", "⚡ Easy Assembly", "🇮🇳 Made in India", "🎓 STEM Project"];
  return (
    <div style={{ background: "#f0fdf4", padding: "12px 0", borderBottom: "1px solid rgba(34,197,94,.1)", overflow: "clip" }}>
      <div className="marquee-wrap">
        <div className="marquee-inner anim-marquee">
          {[...Array(2)].flatMap(() => ITEMS).map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", fontSize: 12, fontWeight: 700, color: "#16a34a", padding: "0 24px" }}>
              {t}<span style={{ marginLeft: 24, color: "rgba(34,197,94,.2)", fontSize: 16 }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
