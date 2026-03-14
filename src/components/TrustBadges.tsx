"use client";
import { motion } from "framer-motion";

const TRUST = [
  { emoji: "🛡️", title: "RoHS Certified", sub: "Child-safe components" },
  { emoji: "🎓", title: "STEM Aligned", sub: "CBSE/ICSE ready" },
  { emoji: "📦", title: "All Included", sub: "Nothing extra needed" },
  { emoji: "↩️", title: "30-Day Returns", sub: "Risk-free purchase" },
];

export default function TrustBadges() {
  return (
    <section style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)", padding: "36px 0", overflow: "clip" }}>
      <div className="container">
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 20 }}>
          ⭐ Why Parents Trust Us
        </p>
        <div className="trust-grid">
          {TRUST.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "14px 18px",
                boxShadow: "var(--shadow-sm)",
                minWidth: 0,
              }}
            >
              <div style={{ fontSize: 26, flexShrink: 0 }}>{t.emoji}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text)" }}>{t.title}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{t.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        @media(max-width:700px){
          .trust-grid{grid-template-columns:repeat(2,1fr)!important;gap:8px!important}
          .trust-grid>div{padding:10px 12px!important;gap:8px!important}
        }
      `}</style>
    </section>
  );
}
