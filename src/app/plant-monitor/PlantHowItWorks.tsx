"use client";
import { motion } from "framer-motion";

const STEPS = [
  { n: "01", emoji: "📦", label: "Unbox & Lay Out", desc: "Open the kit and identify all components — ESP8266, DHT11, soil sensor, pump, transistor, wires & pipe.", color: "#22c55e" },
  { n: "02", emoji: "🔌", label: "Wire & Connect", desc: "Follow the visual guide to connect sensors, pump & transistor on the breadboard. No soldering needed!", color: "#0ea5e9" },
  { n: "03", emoji: "📱", label: "Code & Monitor", desc: "Flash the code, connect to Blynk app, and watch your plant data stream live. Set auto-watering thresholds!", color: "#f59e0b" },
];

export default function PlantHowItWorks() {
  return (
    <section id="how" className="section" style={{ background: "#f0fdf4" }}>
      <div className="container">
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-eyebrow" style={{ color: "#16a34a" }}>🎯 Simple as 1-2-3</span>
            <h2 className="section-title">
              From Box to{" "}
              <span className="plant-grad">Smart Garden</span>
              {" "}in One Afternoon
            </h2>
          </motion.div>
        </div>

        <div style={{ position: "relative", marginBottom: 56 }}>
          <div className="plant-track-line" />
          <div className="plant-steps-grid">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                style={{ textAlign: "center", position: "relative" }}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: 24, margin: "0 auto 20px",
                  background: `${step.color}12`, border: `2px solid ${step.color}50`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 34, position: "relative",
                  boxShadow: `0 0 0 8px #f0fdf4, 0 0 0 9px ${step.color}20`,
                }}>
                  {step.emoji}
                  <div style={{
                    position: "absolute", top: -10, right: -10, width: 28, height: 28,
                    borderRadius: "50%", background: step.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 900, color: "#fff",
                  }}>
                    {step.n}
                  </div>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>{step.label}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 260, margin: "0 auto" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Showcase with girl image */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="card plant-spotlight-card">
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#16a34a", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 10 }}>🌱 Featured — Smart Plant Monitor</p>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: "var(--text)", lineHeight: 1.25, marginBottom: 12 }}>The Complete IoT Gardening Experience</h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 18 }}>
                Ships with ESP8266, DHT11, soil moisture sensor, DC pump, 2N2222 transistor, transparent pipe, breadboard, jumper wires &amp; protective case. Monitor &amp; water from your phone the same day.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Wi-Fi Connected", "Auto Watering", "App Controlled", "Science Fair Ready"].map((t) => (
                  <span key={t} style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", color: "#16a34a", padding: "5px 13px", borderRadius: "var(--radius-pill)", fontSize: 12, fontWeight: 700 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid rgba(34,197,94,.12)", flexShrink: 0 }}>
              <img src="/Plant Monitoring images/Girl looking at tab and her plant monitoring system.png" alt="Girl monitoring plants with IoT" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .plant-grad{background:linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .plant-track-line{display:block;position:absolute;top:40px;left:calc(16.67% + 8px);right:calc(16.67% + 8px);height:2px;background:linear-gradient(90deg,#22c55e,#0ea5e9,#f59e0b);opacity:.2;border-radius:99px}
        .plant-steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;position:relative;z-index:2}
        .plant-spotlight-card{display:grid;grid-template-columns:1fr 240px;gap:32px;align-items:center;padding:36px 40px;border:1px solid rgba(34,197,94,.15)}
        @media(max-width:640px){
          .plant-track-line{display:none!important}
          .plant-steps-grid{grid-template-columns:1fr!important;gap:32px!important}
          .plant-spotlight-card{grid-template-columns:1fr!important;padding:20px!important}
        }
      `}</style>
    </section>
  );
}
