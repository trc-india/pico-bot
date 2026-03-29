"use client";
import { motion } from "framer-motion";

export default function PlantInfoBanner() {
  return (
    <section style={{ background: "linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)", paddingTop: 0, paddingBottom: 48, overflow: "clip" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            width: "100%",
            borderRadius: 20,
            overflow: "hidden",
            border: "2px solid rgba(34,197,94,.18)",
            boxShadow: "0 12px 48px rgba(34,197,94,.12), 0 4px 16px rgba(0,0,0,.04)",
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
    </section>
  );
}
