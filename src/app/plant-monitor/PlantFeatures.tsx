"use client";
import { motion } from "framer-motion";

const FEATURES = [
  { emoji: "🌱", title: "Real-Time Monitoring", desc: "Track soil moisture, temperature & humidity live on your phone via the Blynk app.", accent: "#22c55e" },
  { emoji: "💧", title: "Auto Watering", desc: "Set thresholds — the DC pump waters your plant automatically when soil gets dry.", accent: "#0ea5e9" },
  { emoji: "📱", title: "App Controlled", desc: "Manual or automatic mode. Control the pump from anywhere via Wi-Fi using the Blynk IoT app.", accent: "#8b5cf6" },
  { emoji: "🔬", title: "Science Fair Ready", desc: "Perfect for school science fairs, STEM exhibitions, and real-world IoT learning.", accent: "#f59e0b" },
  { emoji: "⚡", title: "Easy Assembly", desc: "No soldering required. Breadboard-based wiring with clear step-by-step guides included.", accent: "#ec4899" },
  { emoji: "🌍", title: "Learn Real IoT", desc: "Understand sensors, actuators, transistors, and cloud connectivity — skills that matter.", accent: "#f97316" },
];

export default function PlantFeatures() {
  return (
    <section id="features" className="section" style={{ background: "var(--bg)", borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-eyebrow" style={{ color: "#16a34a" }}>✨ Why This Kit</span>
            <h2 className="section-title">
              Smart Features for{" "}
              <span className="plant-grad">Smart Gardeners</span>
            </h2>
            <p className="section-subtitle">
              Not just a kit — it&apos;s a complete learning experience that combines nature, code & IoT.
            </p>
          </motion.div>
        </div>

        <div className="plant-feat-grid">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div className="card" style={{ padding: "28px 24px", height: "100%", position: "relative", overflow: "hidden", cursor: "default" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${f.accent}, transparent)`, opacity: 0.5 }} />
                <div style={{
                  width: 52, height: 52, borderRadius: 16,
                  background: `${f.accent}14`, border: `1.5px solid ${f.accent}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, marginBottom: 16,
                }}>
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
        .plant-feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .plant-grad{background:linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        @media(max-width:900px){.plant-feat-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:540px){.plant-feat-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
