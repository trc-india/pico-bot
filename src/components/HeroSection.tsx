"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Play, PhoneCall } from "lucide-react";
import { WA_LINK } from "@/data/constants";
import BookCallModal from "./BookCallModal";

export default function HeroSection() {
  const [showBookCall, setShowBookCall] = useState(false);

  return (
    <section
      style={{
        paddingTop: "calc(var(--nav-height) + 40px)",
        paddingBottom: 0,
        position: "relative",
        overflow: "clip",
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-alt) 100%)",
      }}
    >
      {/* Background decorations */}
      <div style={{ position: "absolute", top: "10%", left: "-5%", width: "40%", maxWidth: 350, aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(8,145,178,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: "35%", maxWidth: 300, aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container hero-wrapper">
        {/* Left: Text */}
        <div className="hero-text">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="tag" style={{ background: "var(--primary-light)", color: "var(--primary)", border: "1px solid rgba(8,145,178,.2)", marginBottom: 16, display: "inline-flex" }}>
              <span className="anim-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
              Now Available Across India 🇮🇳
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="hero-title">
            Build Robots.<br />
            <span className="grad-primary">Learn to Code.</span><br />
            <span style={{ color: "var(--text-secondary)" }}>Shape the Future.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="hero-subtitle">
            India&apos;s favourite robotics &amp; electronics kits for kids and beginners. From your first LED to a 4-wheel Wi-Fi robot. 🤖✨
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="hero-buttons">
            <a href="#kits" className="btn btn-primary">Explore Kits <ArrowRight size={16} /></a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><MessageCircle size={15} /> WhatsApp</a>
            <a href="#how" className="btn btn-outline"><Play size={14} /> How It Works</a>
            <button onClick={() => setShowBookCall(true)} className="btn btn-accent"><PhoneCall size={14} /> Book a Call</button>
          </motion.div>

          {/* Book a Call promo card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="hero-book-card"
            onClick={() => setShowBookCall(true)}
          >
            <div style={{ fontSize: 28 }}>👋</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text)" }}>Not sure which kit to pick?</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>Book a free call — we&apos;ll help you find the perfect match for your child&apos;s age &amp; interests.</div>
            </div>
            <ArrowRight size={16} style={{ color: "var(--primary)", flexShrink: 0 }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="hero-stats">
            {[["500+", "Kits Sold"], ["4.9★", "Avg Rating"], ["₹899", "Starting Price"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1, color: "var(--primary)" }}>{n}</div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-muted)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Robot Image */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="hero-image-wrap">
          <div className="hero-image-bg">
            <div className="anim-spin-slow" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(8,145,178,.1)" }} />
            <div className="anim-spin-slow" style={{ position: "absolute", inset: "12%", borderRadius: "50%", border: "2px dashed rgba(6,182,212,.08)", animationDirection: "reverse" }} />
          </div>
          <motion.img
            className="anim-float"
            src="https://res.cloudinary.com/drwys1ksu/image/upload/v1772909280/pico_bot_transp_uipkeg.png"
            alt="PICO Bot 4-Wheel Robot"
            style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 2, filter: "drop-shadow(0 20px 40px rgba(8,145,178,.18))" }}
          />
        </motion.div>
      </div>

      <BookCallModal isOpen={showBookCall} onClose={() => setShowBookCall(false)} />

      <style>{`
        .hero-wrapper{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding-bottom:80px}
        .hero-text{display:flex;flex-direction:column;gap:0}
        .hero-title{font-size:clamp(32px,5vw,60px);font-weight:900;line-height:1.08;letter-spacing:-.03em;margin-bottom:18px}
        .hero-subtitle{font-size:17px;line-height:1.7;color:var(--text-secondary);max-width:480px;margin-bottom:28px}
        .hero-buttons{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}
        .hero-book-card{display:flex;align-items:center;gap:14px;padding:14px 18px;background:var(--bg-card);border:1.5px solid var(--border);border-radius:var(--radius-md);cursor:pointer;transition:all .2s;margin-bottom:24px;box-shadow:var(--shadow-sm)}
        .hero-book-card:hover{border-color:var(--primary);box-shadow:var(--shadow-md);transform:translateY(-2px)}
        .hero-stats{display:flex;gap:28px;padding-top:24px;border-top:1px solid var(--border)}
        .hero-image-wrap{position:relative;display:flex;align-items:center;justify-content:center;max-width:100%}
        .hero-image-bg{position:absolute;inset:-8%;display:flex;align-items:center;justify-content:center;pointer-events:none}

        @media(max-width:768px){
          .hero-wrapper{grid-template-columns:1fr!important;gap:24px!important;padding-bottom:48px!important}
          .hero-text{order:2;text-align:center;align-items:center}
          .hero-image-wrap{order:1;max-width:220px;margin:0 auto;width:100%}
          .hero-title{font-size:clamp(24px,7vw,36px)!important}
          .hero-subtitle{font-size:14px!important;text-align:center;margin-left:auto;margin-right:auto}
          .hero-buttons{justify-content:center;flex-wrap:wrap;gap:8px}
          .hero-buttons .btn{padding:10px 18px!important;font-size:12px!important}
          .hero-book-card{padding:10px 14px!important;text-align:left}
          .hero-stats{justify-content:center;gap:20px;flex-wrap:wrap}
        }
        @media(max-width:380px){
          .hero-image-wrap{max-width:180px!important}
          .hero-buttons .btn{padding:8px 14px!important;font-size:11px!important}
        }
      `}</style>
    </section>
  );
}
