"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, PhoneCall, Leaf, Droplets } from "lucide-react";
import BookCallModal from "@/components/BookCallModal";

const WA_PLANT = `https://wa.me/918275478093?text=${encodeURIComponent(
  "Hi Thinking Robot! 🌱 I'm interested in the Smart Plant Monitoring Kit. Can you tell me more?"
)}`;

export default function PlantHero() {
  const [showBookCall, setShowBookCall] = useState(false);

  return (
    <section
      style={{
        paddingTop: "calc(var(--nav-height) + 40px)",
        paddingBottom: 0,
        position: "relative",
        overflow: "clip",
        background: "linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 40%, #f0fdf4 100%)",
      }}
    >
      {/* Animated leaf particles */}
      <div style={{ position: "absolute", top: "8%", left: "5%", fontSize: 40, opacity: 0.08, pointerEvents: "none" }}>🌿</div>
      <div style={{ position: "absolute", top: "20%", right: "8%", fontSize: 50, opacity: 0.06, pointerEvents: "none" }}>🍃</div>
      <div style={{ position: "absolute", bottom: "15%", left: "10%", fontSize: 35, opacity: 0.07, pointerEvents: "none" }}>🌱</div>

      {/* Radial glows */}
      <div style={{ position: "absolute", top: "10%", left: "-5%", width: "40%", maxWidth: 350, aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: "35%", maxWidth: 300, aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container plant-hero-wrapper">
        {/* Left: Text */}
        <div className="plant-hero-text">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="plant-tag">
              <span className="anim-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
              IoT Smart Gardening Kit 🌱
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="plant-hero-title">
            Grow Smarter.<br />
            <span className="plant-grad">Monitor Your Plants.</span><br />
            <span style={{ color: "var(--text-secondary)" }}>Automate Watering.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="plant-hero-subtitle">
            India&apos;s smartest IoT plant monitoring &amp; auto-watering kit. Track soil moisture, temperature &amp; humidity — control watering from your phone. 🌿💧
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="plant-hero-buttons">
            <a href="https://thinkingrobot.in/products/smart-plant-monitoring-and-watering-kit-esp8266-automated-gardening-system" target="_blank" rel="noopener noreferrer" className="btn plant-btn-primary"><Leaf size={15} /> Buy Kit – ₹899 <ArrowRight size={14} /></a>
            <a href={WA_PLANT} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><MessageCircle size={15} /> WhatsApp</a>
            <button onClick={() => setShowBookCall(true)} className="btn plant-btn-accent"><PhoneCall size={14} /> Book a Call</button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="plant-hero-stats">
            {[["₹899", "Kit Price"], ["6+", "Components"], ["ESP8266", "Wi-Fi Board"], ["Auto", "Watering"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1, color: "#16a34a" }}>{n}</div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-muted)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Kit Image — Real system photo */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="plant-hero-image-wrap">
          <motion.img
            className="anim-float"
            src="/Plant Monitoring images/Plant monitor system Kit top.png"
            alt="Smart Plant Monitoring System with Monstera plant"
            style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 2, filter: "drop-shadow(0 20px 50px rgba(22,163,74,.22))" }}
          />
          {/* Floating badges */}
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            style={{ position: "absolute", top: "8%", right: "0%", background: "#fff", borderRadius: 14, padding: "8px 14px", boxShadow: "0 4px 20px rgba(0,0,0,.08)", border: "1px solid rgba(34,197,94,.2)", zIndex: 3, display: "flex", alignItems: "center", gap: 6 }}>
            <Droplets size={16} style={{ color: "#0ea5e9" }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: "var(--text)" }}>Auto Water</span>
          </motion.div>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            style={{ position: "absolute", bottom: "18%", left: "0%", background: "#fff", borderRadius: 14, padding: "8px 14px", boxShadow: "0 4px 20px rgba(0,0,0,.08)", border: "1px solid rgba(34,197,94,.2)", zIndex: 3, display: "flex", alignItems: "center", gap: 6 }}>
            <Leaf size={16} style={{ color: "#22c55e" }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: "var(--text)" }}>Soil: 72%</span>
          </motion.div>
        </motion.div>
      </div>

      <BookCallModal isOpen={showBookCall} onClose={() => setShowBookCall(false)} />

      <style>{`
        .plant-tag{background:rgba(34,197,94,.1);color:#16a34a;border:1px solid rgba(34,197,94,.25);margin-bottom:16px;display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:var(--radius-pill);font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
        .plant-grad{background:linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .plant-btn-primary{background:linear-gradient(135deg,#22c55e,#16a34a)!important;color:#fff!important;box-shadow:0 4px 16px rgba(34,197,94,.3)!important}
        .plant-btn-primary:hover{transform:translateY(-2px)!important;box-shadow:0 8px 28px rgba(34,197,94,.4)!important}
        .plant-btn-accent{background:linear-gradient(135deg,#f97316,#ea580c)!important;color:#fff!important;box-shadow:0 4px 16px rgba(249,115,22,.3)!important;border:none!important;cursor:pointer!important}
        .plant-btn-accent:hover{transform:translateY(-2px)!important;box-shadow:0 8px 28px rgba(249,115,22,.4)!important}
        .plant-hero-wrapper{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding-bottom:80px}
        .plant-hero-text{display:flex;flex-direction:column;gap:0}
        .plant-hero-title{font-size:clamp(32px,5vw,56px);font-weight:900;line-height:1.08;letter-spacing:-.03em;margin-bottom:18px}
        .plant-hero-subtitle{font-size:17px;line-height:1.7;color:var(--text-secondary);max-width:480px;margin-bottom:28px}
        .plant-hero-buttons{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px}
        .plant-hero-stats{display:flex;gap:28px;padding-top:24px;border-top:1px solid rgba(34,197,94,.15)}
        .plant-hero-image-wrap{position:relative;display:flex;align-items:center;justify-content:center;max-width:100%}
        .plant-hero-image-bg{position:absolute;inset:-8%;display:flex;align-items:center;justify-content:center;pointer-events:none}
        @media(max-width:768px){
          .plant-hero-wrapper{grid-template-columns:1fr!important;gap:24px!important;padding-bottom:48px!important}
          .plant-hero-text{order:2;text-align:center;align-items:center}
          .plant-hero-image-wrap{order:1;max-width:250px;margin:0 auto;width:100%}
          .plant-hero-title{font-size:clamp(24px,7vw,36px)!important}
          .plant-hero-subtitle{font-size:14px!important;text-align:center}
          .plant-hero-buttons{justify-content:center;gap:8px}
          .plant-hero-buttons .btn{padding:10px 18px!important;font-size:12px!important}
          .plant-hero-stats{justify-content:center;gap:16px;flex-wrap:wrap}
        }
      `}</style>
    </section>
  );
}
