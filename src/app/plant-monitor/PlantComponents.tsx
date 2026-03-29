"use client";
import { motion } from "framer-motion";
import { Cpu, Thermometer, Droplets, Zap, Pipette, Box } from "lucide-react";

const COMPONENTS = [
  { icon: <Cpu size={28} />, name: "ESP8266", desc: "Wi-Fi microcontroller — connect your garden to the internet", color: "#0ea5e9" },
  { icon: <Thermometer size={28} />, name: "DHT11 Sensor", desc: "Measures temperature & humidity around your plant in real-time", color: "#f59e0b" },
  { icon: <Droplets size={28} />, name: "Soil Moisture Sensor", desc: "Detects when your soil is dry and needs watering", color: "#22c55e" },
  { icon: <Zap size={28} />, name: "2N2222 Transistor", desc: "Controls the DC motor pump safely from the ESP8266", color: "#8b5cf6" },
  { icon: <Pipette size={28} />, name: "DC Motor Pump", desc: "Pumps water automatically when soil gets too dry", color: "#ec4899" },
  { icon: <Box size={28} />, name: "Pipes, Case & Wiring", desc: "Transparent pipe, protective case, jumper wires & breadboard included", color: "#f97316" },
];

export default function PlantComponents() {
  return (
    <section id="components" className="section" style={{ background: "#f0fdf4", borderTop: "1px solid rgba(34,197,94,.1)" }}>
      <div className="container">
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-eyebrow" style={{ color: "#16a34a" }}>📦 What&apos;s Inside the Kit</span>
            <h2 className="section-title">
              Everything You Need to{" "}
              <span className="plant-grad">Get Growing</span>
            </h2>
            <p className="section-subtitle">
              Every sensor, wire, and component — neatly packed and ready to assemble. No extra purchases needed.
            </p>
          </motion.div>
        </div>

        <div className="plant-comp-grid">
          {COMPONENTS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div className="card plant-comp-card" style={{ padding: "28px 24px", height: "100%", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.color}, transparent)`, opacity: 0.5 }} />
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: `${c.color}12`, border: `1.5px solid ${c.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: c.color, marginBottom: 16,
                }}>
                  {c.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>{c.name}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full-width Kit Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: 56 }}
        >
          <div style={{
            width: "100%",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            border: "2px solid rgba(34,197,94,.18)",
            boxShadow: "0 12px 48px rgba(34,197,94,.12), 0 4px 16px rgba(0,0,0,.04)",
            position: "relative",
          }}>
            <img
              src="/Plant Monitoring images/Plant monitor system Kit Info 2.png"
              alt="Plant Monitoring System Kit — ESP8266, DHT11, Soil Moisture Sensor, 2N2222, DC Pump, Clear Tubing"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
          <p style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "var(--text-muted)", fontWeight: 600 }}>
            Everything included — from sensors to tubing. Just add a plant! 🌿
          </p>
        </motion.div>
      </div>

      <style>{`
        .plant-comp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .plant-comp-card{transition:transform .3s ease,box-shadow .3s ease;cursor:default}
        .plant-comp-card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
        .plant-grad{background:linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        @media(max-width:900px){.plant-comp-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:540px){.plant-comp-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
