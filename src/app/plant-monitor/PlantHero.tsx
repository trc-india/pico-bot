"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, PhoneCall, Leaf, Droplets, Thermometer, Power } from "lucide-react";
import BookCallModal from "@/components/BookCallModal";

const WA_PLANT = `https://wa.me/918275478093?text=${encodeURIComponent(
  "Hi Thinking Robot! 🌱 I'm interested in the Smart Plant Monitoring Kit. Can you tell me more?"
)}`;

/* ── Mini Live Dashboard ────────────────────── */
function LiveDashboard() {
  const [temp, setTemp] = useState(24.3);
  const [humidity, setHumidity] = useState(62);
  const [moisture, setMoisture] = useState(71);
  const [pumpOn, setPumpOn] = useState(false);
  const [waterGlow, setWaterGlow] = useState(false);

  // Simulated live sensor readings
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp((p) => +(p + (Math.random() - 0.48) * 0.6).toFixed(1));
      setHumidity((p) => Math.max(40, Math.min(90, p + Math.round((Math.random() - 0.5) * 3))));
      setMoisture((p) => {
        const next = p + Math.round((Math.random() - 0.52) * 2);
        return Math.max(30, Math.min(95, next));
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handlePump = useCallback(() => {
    setPumpOn((p) => !p);
    setWaterGlow(true);
    setTimeout(() => setWaterGlow(false), 1200);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="live-dash"
    >
      <div className="live-dash-header">
        <div className="live-dot" />
        <span>LIVE SENSOR DATA</span>
      </div>
      <div className="live-dash-grid">
        <div className="live-item">
          <Thermometer size={13} style={{ color: "#f59e0b" }} />
          <div className="live-item-data">
            <span className="live-val" style={{ color: "#f59e0b" }}>{temp}°C</span>
            <span className="live-label">Temp</span>
          </div>
        </div>
        <div className="live-item">
          <Droplets size={13} style={{ color: "#0ea5e9" }} />
          <div className="live-item-data">
            <span className="live-val" style={{ color: "#0ea5e9" }}>{humidity}%</span>
            <span className="live-label">Humidity</span>
          </div>
        </div>
        <div className="live-item">
          <Leaf size={13} style={{ color: "#22c55e" }} />
          <div className="live-item-data">
            <span className="live-val" style={{ color: "#22c55e" }}>{moisture}%</span>
            <span className="live-label">Soil</span>
          </div>
        </div>
        <button
          onClick={handlePump}
          className={`live-pump-btn ${pumpOn ? "pump-on" : ""}`}
          title={pumpOn ? "Turn pump OFF" : "Turn pump ON"}
        >
          <Power size={12} />
          <span>{pumpOn ? "ON" : "OFF"}</span>
        </button>
      </div>
      {/* Water glow effect */}
      {waterGlow && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.3, 1.5] }}
          transition={{ duration: 1.2 }}
          style={{
            position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
            width: 40, height: 40, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,.4), transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}
    </motion.div>
  );
}

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

        {/* Right: Kit Image + Live Dashboard */}
        <div className="plant-hero-right">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="plant-hero-image-wrap">
            <motion.img
              className="anim-float"
              src="/Plant Monitoring images/Plant monitor system Kit top.png"
              alt="Smart Plant Monitoring System with Monstera plant"
              style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 2, filter: "drop-shadow(0 20px 50px rgba(22,163,74,.22))" }}
            />
            {/* Floating badges — responsive sizes */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="hero-float-badge hero-float-top">
              <Droplets size={14} style={{ color: "#0ea5e9" }} />
              <span>Auto Water</span>
            </motion.div>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }} className="hero-float-badge hero-float-bottom">
              <Leaf size={14} style={{ color: "#22c55e" }} />
              <span>Soil: 72%</span>
            </motion.div>
          </motion.div>

          {/* Live Dashboard below image */}
          <LiveDashboard />
        </div>
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
        .plant-hero-right{display:flex;flex-direction:column;align-items:center;gap:16px}
        .plant-hero-title{font-size:clamp(32px,5vw,56px);font-weight:900;line-height:1.08;letter-spacing:-.03em;margin-bottom:18px}
        .plant-hero-subtitle{font-size:17px;line-height:1.7;color:var(--text-secondary);max-width:480px;margin-bottom:28px}
        .plant-hero-buttons{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px}
        .plant-hero-stats{display:flex;gap:28px;padding-top:24px;border-top:1px solid rgba(34,197,94,.15)}
        .plant-hero-image-wrap{position:relative;display:flex;align-items:center;justify-content:center;max-width:100%}

        /* Floating badges */
        .hero-float-badge{position:absolute;background:#fff;border-radius:12px;padding:6px 12px;box-shadow:0 4px 20px rgba(0,0,0,.08);border:1px solid rgba(34,197,94,.2);zIndex:3;display:flex;align-items:center;gap:5px;z-index:3}
        .hero-float-badge span{font-size:11px;font-weight:800;color:var(--text)}
        .hero-float-top{top:8%;right:0%}
        .hero-float-bottom{bottom:18%;left:0%}

        /* Live Dashboard */
        .live-dash{position:relative;background:#fff;border:1.5px solid rgba(34,197,94,.18);border-radius:16px;padding:10px 14px;box-shadow:0 4px 24px rgba(34,197,94,.08);width:100%;max-width:360px}
        .live-dash-header{display:flex;align-items:center;gap:6px;margin-bottom:8px}
        .live-dot{width:6px;height:6px;border-radius:50%;background:#22c55e;animation:pulse-glow 1.5s ease-in-out infinite}
        .live-dash-header span{font-size:9px;font-weight:800;letter-spacing:.1em;color:#16a34a;text-transform:uppercase}
        .live-dash-grid{display:flex;align-items:center;gap:10px}
        .live-item{display:flex;align-items:center;gap:5px;flex:1;min-width:0}
        .live-item-data{display:flex;flex-direction:column;gap:0;min-width:0}
        .live-val{font-size:14px;font-weight:900;line-height:1.1;font-variant-numeric:tabular-nums}
        .live-label{font-size:8px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em}
        .live-pump-btn{display:flex;align-items:center;gap:4px;padding:5px 10px;border-radius:20px;border:1.5px solid rgba(34,197,94,.25);background:rgba(34,197,94,.06);color:#16a34a;font-size:10px;font-weight:800;cursor:pointer;transition:all .2s;flex-shrink:0}
        .live-pump-btn:hover{background:rgba(34,197,94,.12);transform:scale(1.05)}
        .live-pump-btn.pump-on{background:#22c55e!important;color:#fff!important;border-color:#16a34a!important;box-shadow:0 0 12px rgba(34,197,94,.4)}

        @media(max-width:768px){
          .plant-hero-wrapper{grid-template-columns:1fr!important;gap:20px!important;padding-bottom:40px!important}
          .plant-hero-text{order:2;text-align:center;align-items:center}
          .plant-hero-right{order:1}
          .plant-hero-image-wrap{max-width:320px;margin:0 auto;width:100%}
          .plant-hero-title{font-size:clamp(24px,7vw,36px)!important}
          .plant-hero-subtitle{font-size:14px!important;text-align:center}
          .plant-hero-buttons{justify-content:center;gap:8px}
          .plant-hero-buttons .btn{padding:10px 18px!important;font-size:12px!important}
          .plant-hero-stats{justify-content:center;gap:16px;flex-wrap:wrap}
          /* Smaller floating badges on mobile */
          .hero-float-badge{padding:4px 8px!important;border-radius:8px!important;gap:3px!important}
          .hero-float-badge span{font-size:9px!important}
          .hero-float-badge svg{width:10px!important;height:10px!important}
          .hero-float-top{top:5%!important;right:-2%!important}
          .hero-float-bottom{bottom:15%!important;left:-2%!important}
          /* Dashboard mobile */
          .live-dash{max-width:300px;padding:8px 10px}
          .live-val{font-size:12px!important}
          .live-label{font-size:7px!important}
          .live-pump-btn{padding:4px 8px!important;font-size:9px!important}
        }
        @media(max-width:380px){
          .plant-hero-image-wrap{max-width:280px!important}
          .hero-float-badge{padding:3px 6px!important}
          .hero-float-badge span{font-size:8px!important}
        }
      `}</style>
    </section>
  );
}
