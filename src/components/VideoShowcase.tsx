"use client";
import { motion } from "framer-motion";

export default function VideoShowcase() {
  return (
    <section className="section" style={{ background: "var(--bg)", position: "relative", overflow: "clip" }}>
      {/* Background accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(180deg, var(--bg-alt) 0%, var(--bg) 100%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-eyebrow">🎬 See It In Action</span>
            <h2 className="section-title">
              Watch Our <span className="grad-fun">Robots Move</span>
            </h2>
            <p className="section-subtitle">
              Real videos from our workshop — see what you&apos;ll build with PICO DRIVE kits.
            </p>
          </motion.div>
        </div>

        <div className="video-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card"
            style={{ overflow: "hidden" }}
          >
            <div className="video-container">
              <video
                controls
                playsInline
                preload="metadata"
                poster="https://res.cloudinary.com/drwys1ksu/image/upload/v1770959243/1_eqn481.png"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src="/videos/pico-bot-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>PICO Drive in Action 🤖</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Watch the 4-wheel robot navigate obstacles autonomously</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card"
            style={{ overflow: "hidden" }}
          >
            <div className="video-container">
              <video
                controls
                playsInline
                preload="metadata"
                poster="https://res.cloudinary.com/drwys1ksu/image/upload/v1770959235/3_bjhlkz.png"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src="/videos/pico-bot-build.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>Build & Code 🔧</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>See the complete assembly and first code upload process</p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .video-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
        .video-container{width:100%;aspect-ratio:16/9;overflow:hidden;background:#000}
        @media(max-width:640px){.video-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
