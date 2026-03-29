"use client";
import { motion } from "framer-motion";

const STEPS = [
  { n: "01", emoji: "📦", label: "Order & Unbox", desc: "Choose your kit, order online, and receive at your door. Everything neatly packed — no missing parts, ever.", color: "#0891b2" },
  { n: "02", emoji: "🔧", label: "Build & Connect", desc: "Follow the visual step-by-step guide. Snap, wire, assemble — no soldering for beginner kits.", color: "#f97316" },
  { n: "03", emoji: "💻", label: "Code & Play", desc: "Upload your first program, watch your robot move, then start customising. Block code → Python as you level up.", color: "#f59e0b" },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-eyebrow">🎯 Simple as 1-2-3</span>
            <h2 className="section-title">
              From Box to <span className="grad-primary">Robot</span> in One Afternoon
            </h2>
          </motion.div>
        </div>

        {/* Steps */}
        <div style={{ position: "relative", marginBottom: 56 }}>
          {/* Track line (desktop) */}
          <div className="track-line" />

          <div className="steps-grid">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                style={{ textAlign: "center", position: "relative" }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 24,
                    margin: "0 auto 20px",
                    background: `${step.color}12`,
                    border: `2px solid ${step.color}50`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 34,
                    position: "relative",
                    boxShadow: `0 0 0 8px var(--bg), 0 0 0 9px ${step.color}20`,
                  }}
                >
                  {step.emoji}
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: step.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 900,
                      color: "#fff",
                    }}
                  >
                    {step.n}
                  </div>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>{step.label}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 260, margin: "0 auto" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spotlight — PICO Bot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card spotlight-card">
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "var(--primary)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>🤖 Featured — PICO DRIVE 4-Wheel Robot</p>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "var(--text)", lineHeight: 1.25, marginBottom: 12 }}>The Complete Wireless Robot Experience</h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 18 }}>
                Ships with acrylic chassis, 4 high-torque BO motors, ESP32 driver board, servo-mounted ultrasonic sensor & assembly guide.
                Control from your phone the same day.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["4-Wheel Drive", "App Controlled", "Obstacle Detection", "Expandable"].map((t) => (
                  <span key={t} style={{ background: "rgba(8,145,178,.08)", border: "1px solid rgba(8,145,178,.2)", color: "var(--primary)", padding: "5px 13px", borderRadius: "var(--radius-pill)", fontSize: 12, fontWeight: 700 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid rgba(8,145,178,.12)", flexShrink: 0 }}>
              <img src="https://res.cloudinary.com/drwys1ksu/image/upload/v1770959235/3_bjhlkz.png" alt="PICO Bot side view" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .track-line{display:block;position:absolute;top:40px;left:calc(16.67% + 8px);right:calc(16.67% + 8px);height:2px;background:linear-gradient(90deg,#0891b2,#f97316,#f59e0b);opacity:.2;border-radius:99px}
        .steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;position:relative;z-index:2}
        .spotlight-card{display:grid;grid-template-columns:1fr 200px;gap:32px;align-items:center;padding:36px 40px;border:1px solid rgba(8,145,178,.15)}
        @media(max-width:640px){
          .track-line{display:none!important}
          .steps-grid{grid-template-columns:1fr!important;gap:32px!important}
          .spotlight-card{grid-template-columns:1fr!important;padding:20px!important}
        }
      `}</style>
    </section>
  );
}
