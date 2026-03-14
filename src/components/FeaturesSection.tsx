"use client";
import { motion } from "framer-motion";

const FEATURES = [
  { emoji: "⚡", title: "Hands-On Learning", desc: "Build real circuits, not simulations. Every kit comes with working components and guided projects.", accent: "#f59e0b" },
  { emoji: "📱", title: "App & Bluetooth Ready", desc: "Control your builds wirelessly from any Android or iOS device via Bluetooth or Wi-Fi.", accent: "#0891b2" },
  { emoji: "🎓", title: "Curriculum Aligned", desc: "Projects aligned with CBSE, ICSE, and international STEM curricula. School project ready.", accent: "#10b981" },
  { emoji: "📦", title: "Everything Included", desc: "Every wire, sensor, and component you need — open the box and start building.", accent: "#f97316" },
  { emoji: "🛡️", title: "Safe & Tested", desc: "All components are child-safe, RoHS compliant, and tested for classroom and home use.", accent: "#8b5cf6" },
  { emoji: "🔧", title: "Real Support", desc: "Got stuck? WhatsApp us, email us, or join our community — free help 7 days a week.", accent: "#ec4899" },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-eyebrow">✨ Why Choose Us</span>
            <h2 className="section-title">
              Everything You Need to <span className="grad-warm">Start Building</span>
            </h2>
            <p className="section-subtitle">
              We&apos;ve thought of everything so you and your kids can just focus on creating.
            </p>
          </motion.div>
        </div>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div
                className="card feature-card"
                style={{
                  padding: "28px 24px",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                }}
              >
                {/* Accent bottom line */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${f.accent}, transparent)`, opacity: 0.5, borderRadius: "0 0 24px 24px" }} />

                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: `${f.accent}14`,
                    border: `1.5px solid ${f.accent}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 16,
                  }}
                >
                  {f.emoji}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .feature-card{transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
        .feature-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
        @media(max-width:900px){.features-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:540px){.features-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
