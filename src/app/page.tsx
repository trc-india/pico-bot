"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ShoppingCart, Play, Menu, X, ArrowRight, Star,
  ChevronRight, CheckCircle, Zap, Shield, Cpu, Leaf,
  Wifi, Code2,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const KITS = [
  {
    id: "mini-arduino",
    name: "Mini Arduino Starter Kit",
    badge: "Beginner",
    price: 1899,
    slug: "mini-arduino-starter-kit-thinking-robot-compact-beginner-pack",
    image: "https://res.cloudinary.com/drwys1ksu/image/upload/v1770877019/Electronics-Mini-Kit_y3xsua.png",
    tagline: "Your first step into electronics & coding",
    bullets: ["20+ components included", "Block coding ready", "Breadboard prototyping", "Beginner tutorials"],
    age: "Ages 8+",
    accent: "#22c55e",
    accentBg: "rgba(34,197,94,0.10)",
  },
  {
    id: "iot-esp32",
    name: "IoT Beginners Kit",
    badge: "Wi-Fi Ready",
    price: 1899,
    slug: "iot-kit-for-beginners-esp32-wireless-development-kit-thinking-robot-complete-starter-pack",
    image: "https://res.cloudinary.com/drwys1ksu/image/upload/v1770876991/IoT-Beginners-Pack-630x630_c2gz3b.png",
    tagline: "Connect to the internet & build smart devices",
    bullets: ["ESP32 Wi-Fi + Bluetooth", "IoT sensors included", "App control ready", "Cloud integration"],
    age: "Ages 10+",
    accent: "#38bdf8",
    accentBg: "rgba(56,189,248,0.10)",
  },
  {
    id: "arduino-ultimate",
    name: "Arduino All-in-One Kit",
    badge: "Complete Pack",
    price: 2299,
    slug: "arduino-all-in-one-ultimate-starter-kit-thinking-robot-complete-beginner-pack",
    image: "https://res.cloudinary.com/drwys1ksu/image/upload/v1770877011/30-IN-ONE-ARDUINO-KIT-630x630_exvsmd.png",
    tagline: "Master robotics with 30+ sensors & actuators",
    bullets: ["30+ components", "Motors, servos & LEDs", "Tutorials & guides", "Python + C++ ready"],
    age: "Ages 10+",
    accent: "#ff6b35",
    accentBg: "rgba(255,107,53,0.10)",
  },
  {
    id: "pico-bot-robot",
    name: "PICO Bot 4-Wheel Robot",
    badge: "⭐ Most Popular",
    price: 2999,
    slug: "pico-bot-4-wheel-robot-with-esp32-edition-thinking-robot-modular-robotics-kit",
    image: "https://res.cloudinary.com/drwys1ksu/image/upload/v1770959243/1_eqn481.png",
    tagline: "Build your own robot — then code it to move!",
    bullets: ["ESP32 powered", "4-wheel drive chassis", "Bluetooth control", "Obstacle avoidance"],
    age: "Ages 10+",
    accent: "#ffd60a",
    accentBg: "rgba(255,214,10,0.10)",
  },
  {
    id: "plant-monitor",
    name: "Smart Plant Monitoring Kit",
    badge: "IoT Project",
    price: 899,
    slug: "smart-plant-monitoring-and-watering-kit-esp8266-automated-gardening-system",
    image: "https://res.cloudinary.com/drwys1ksu/image/upload/v1770876706/Screenshot_1_v71dbi.png",
    tagline: "Build an automated smart garden system",
    bullets: ["ESP8266 Wi-Fi board", "App-controlled watering", "Moisture & humidity sensors", "Manual + auto modes"],
    age: "Ages 12+",
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,0.10)",
  },
];

const FEATURES = [
  { icon: "⚡", title: "Hands-On Learning", desc: "Build real circuits, not simulations. Every kit comes with working components and guided projects.", accent: "#ffd60a" },
  { icon: "📱", title: "App & Bluetooth Ready", desc: "Control your builds wirelessly from any Android or iOS device via Bluetooth or Wi-Fi.", accent: "#38bdf8" },
  { icon: "🎓", title: "Curriculum Aligned", desc: "Projects aligned with CBSE, ICSE, and international STEM curricula. Great for school projects too.", accent: "#22c55e" },
  { icon: "📦", title: "Everything Included", desc: "Every wire, sensor, and component needed for the included projects comes in the box.", accent: "#ff6b35" },
  { icon: "🛡️", title: "Safe & Tested", desc: "All components are child-safe, RoHS compliant, and tested for classroom and home use.", accent: "#a78bfa" },
  { icon: "🔧", title: "Real Support", desc: "Got stuck? WhatsApp us, email us, or join our Discord community. Free help, 7 days a week.", accent: "#00d2c6" },
];

const REVIEWS = [
  { name: "Priya Sharma", role: "Parent of Arjun, age 11", text: "My son assembled the PICO Bot in one afternoon and won't stop talking about it. He's writing actual Python now — I can't believe it!", rating: 5, initial: "P", accent: "#00d2c6" },
  { name: "Rajesh Patel", role: "Science Teacher, DPS Pune", text: "We ordered 3 Arduino kits for our school lab. The quality is fantastic and the docs are so clear — students get up and running in minutes.", rating: 5, initial: "R", accent: "#ff6b35" },
  { name: "Ananya Gupta", role: "Parent of twins, age 9 & 13", text: "Both my kids use different kits and both love them! Great quality for the price — much better than imported alternatives.", rating: 5, initial: "A", accent: "#22c55e" },
  { name: "Dr. Vikram Mehta", role: "EdTech Consultant", text: "Finally an Indian STEM brand doing it right. The IoT kit is perfectly curated — nothing missing, nothing unnecessary. Full marks.", rating: 5, initial: "V", accent: "#a78bfa" },
];

/* ══════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */

// Staggered fade-up with viewport trigger
function FadeUp({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ background: "var(--navy)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ╔═══════════════════════════════════════════╗
          ║  NAVBAR  (fixed, 68px tall)               ║
          ╚═══════════════════════════════════════════╝ */}
      <header
        className="glass"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: "var(--nav-h)",
          zIndex: 100,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <Image src="/logo.png" alt="Thinking Robot" width={38} height={38}
              style={{ borderRadius: 9, display: "block" }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                PICO BOT
              </div>
              <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.09em", textTransform: "uppercase" }}>
                BY THINKING ROBOT
              </div>
            </div>
          </a>

          {/* Desktop nav links */}
          <nav
            className="hide-sm"
            style={{ display: "flex", alignItems: "center", gap: 28 }}
          >
            {["Our Kits|#kits", "Features|#features", "How It Works|#how", "Reviews|#reviews"].map(item => {
              const [label, href] = item.split("|");
              return (
                <a key={href} href={href}
                  style={{ fontSize: 14, fontWeight: 600, color: "var(--muted)", transition: "color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <a href="#kits" className="btn btn-primary hide-sm">
              <ShoppingCart size={15} /> Shop Now
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: "none",
                padding: "8px 10px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border)",
                color: "#fff",
                cursor: "pointer",
              }}
              className="show-mobile-menu"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{
                overflow: "hidden",
                background: "var(--navy-2)",
                borderTop: "1px solid var(--border)",
              }}
            >
              <div style={{ padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                {["Our Kits|#kits", "Features|#features", "How It Works|#how", "Reviews|#reviews"].map(item => {
                  const [label, href] = item.split("|");
                  return (
                    <a key={href} href={href}
                      onClick={() => setMenuOpen(false)}
                      style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}
                    >
                      {label}
                    </a>
                  );
                })}
                <a href="#kits" className="btn btn-primary" style={{ marginTop: 4, justifyContent: "center" }}
                  onClick={() => setMenuOpen(false)}>
                  <ShoppingCart size={15} /> Shop Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Force mobile hamburger to show */}
      <style>{`
        @media (max-width: 768px) {
          .show-mobile-menu { display: flex !important; }
          .hide-sm { display: none !important; }
        }
      `}</style>

      {/* ╔═══════════════════════════════════════════╗
          ║  HERO                                     ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="dot-bg"
        style={{
          paddingTop: "calc(var(--nav-h) + 72px)",
          paddingBottom: 96,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow orbs */}
        <div style={{
          position: "absolute", top: "var(--nav-h)", left: "50%", transform: "translateX(-50%)",
          width: 700, height: 500, pointerEvents: "none",
          background: "radial-gradient(ellipse, rgba(0,210,198,0.10) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: 400, height: 400, pointerEvents: "none",
          background: "radial-gradient(ellipse at bottom right, rgba(255,107,53,0.07) 0%, transparent 70%)",
        }} />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left col */}
          <div>
            <FadeUp>
              <span className="tag-pill" style={{ marginBottom: 24, display: "inline-flex" }}>
                <span className="anim-pulse-dot"
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--teal)", flexShrink: 0 }} />
                Now Available Across India 🇮🇳
              </span>
            </FadeUp>

            <FadeUp delay={0.07}>
              <h1 style={{
                fontSize: "clamp(36px, 5.5vw, 64px)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: 20,
              }}>
                Build Robots.<br />
                <span className="grad-teal">Learn to Code.</span><br />
                <span style={{ color: "#e2e8f0" }}>Have a Blast.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.13}>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--muted)", marginBottom: 36, maxWidth: 480 }}>
                India&apos;s favourite robotics & electronics kits for kids and beginners.
                From your first LED to a 4-wheel Wi-Fi robot — we&apos;ve got the kit for you.
              </p>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
                <a href="#kits" className="btn btn-primary">
                  Explore All Kits <ArrowRight size={17} />
                </a>
                <a href="#how" className="btn btn-ghost">
                  <Play size={15} style={{ color: "var(--teal)" }} /> How It Works
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.23}>
              <div style={{
                display: "flex",
                gap: 32,
                paddingTop: 28,
                borderTop: "1px solid var(--border)",
              }}>
                {[["500+", "Kits Sold"], ["4.9★", "Avg Rating"], ["5", "Kit Options"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="stat-num">{num}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right col — robot */}
          <FadeUp delay={0.15}>
            <div style={{ position: "relative" }}>
              {/* Spinning ring decor */}
              <div style={{
                position: "absolute",
                inset: "-10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}>
                <div className="anim-spin-slow" style={{
                  width: "90%", height: "90%", borderRadius: "50%",
                  border: "1px solid rgba(0,210,198,0.15)",
                }} />
                <div className="anim-spin-slow" style={{
                  position: "absolute",
                  width: "72%", height: "72%", borderRadius: "50%",
                  border: "1px dashed rgba(0,210,198,0.08)",
                  animationDirection: "reverse",
                }} />
              </div>

              {/* Robot image — transparent background */}
              <motion.div
                className="anim-float"
                style={{ position: "relative", zIndex: 2 }}
              >
                <img
                  src="https://res.cloudinary.com/drwys1ksu/image/upload/v1772905378/PICO_Bot_transperent_bg_pgzqkj.png"
                  alt="PICO Bot Robot"
                  style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 24px 48px rgba(0,210,198,0.25))" }}
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.3, ease: "easeInOut" }}
                style={{
                  position: "absolute", top: "14%", left: "-8%", zIndex: 10,
                  background: "rgba(7,13,26,0.88)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,210,198,0.30)",
                  borderRadius: 99, padding: "9px 17px",
                  display: "flex", alignItems: "center", gap: 7,
                  fontSize: 13, fontWeight: 700, color: "var(--teal)",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                <Wifi size={14} /> Wi-Fi Control
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ repeat: Infinity, duration: 4.5, delay: 0.8, ease: "easeInOut" }}
                style={{
                  position: "absolute", bottom: "22%", right: "-8%", zIndex: 10,
                  background: "rgba(7,13,26,0.88)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,107,53,0.30)",
                  borderRadius: 99, padding: "9px 17px",
                  display: "flex", alignItems: "center", gap: 7,
                  fontSize: 13, fontWeight: 700, color: "#ff6b35",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                <Code2 size={14} /> Block & Python
              </motion.div>

              <motion.div
                animate={{ y: [-5, 9, -5] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1.2, ease: "easeInOut" }}
                style={{
                  position: "absolute", bottom: "8%", left: "4%", zIndex: 10,
                  background: "rgba(7,13,26,0.88)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(34,197,94,0.30)",
                  borderRadius: 99, padding: "9px 17px",
                  display: "flex", alignItems: "center", gap: 7,
                  fontSize: 13, fontWeight: 700, color: "#22c55e",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                <Shield size={14} /> Child Safe
              </motion.div>
            </div>
          </FadeUp>
        </div>

        {/* Make grid single col on mobile */}
        <style>{`
          .hero-grid {
            grid-template-columns: 1fr 1fr;
          }
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
              text-align: center;
            }
            .hero-grid > div:first-child {
              order: 1;
            }
            .hero-grid > div:last-child {
              order: 0;
              max-width: 360px;
              margin: 0 auto;
            }
          }
        `}</style>
      </section>

      {/* ── Marquee belt ── */}
      <div style={{
        background: "var(--navy-2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "13px 0",
      }}>
        <div className="marquee-wrap">
          <div className="marquee-inner anim-marquee">
            {[
              "⚡ Arduino Powered", "🌐 Wi-Fi & Bluetooth", "🤖 Real Robotics",
              "🐍 Python Ready", "📦 All Parts Included", "🛡️ Child Safe",
              "🇮🇳 Made in India", "🎓 STEM Aligned",
              "⚡ Arduino Powered", "🌐 Wi-Fi & Bluetooth", "🤖 Real Robotics",
              "🐍 Python Ready", "📦 All Parts Included", "🛡️ Child Safe",
              "🇮🇳 Made in India", "🎓 STEM Aligned",
            ].map((t, i) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center",
                fontSize: 12, fontWeight: 700, color: "var(--muted)",
                padding: "0 28px",
              }}>
                {t}
                <span style={{ marginLeft: 28, color: "rgba(255,255,255,0.12)", fontSize: 18 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ╔═══════════════════════════════════════════╗
          ║  KITS                                     ║
          ╚═══════════════════════════════════════════╝ */}
      <section id="kits" className="section" style={{ background: "var(--navy)" }}>
        <div className="section-inner">

          {/* Section header */}
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="eyebrow">Our Robotics Kits</span>
              <h2 className="s-title">
                Find the Kit That Sparks{" "}
                <span className="grad-teal">Your Curiosity</span>
              </h2>
              <p className="s-sub" style={{ margin: "0 auto" }}>
                5 thoughtfully curated kits for everyone — from curious 8-year-olds to passionate teen coders.
              </p>
            </div>
          </FadeUp>

          {/* Kit cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 22,
          }} className="kits-grid">
            {KITS.map((kit, i) => (
              <FadeUp key={kit.id} delay={i * 0.07}>
                <div className="kit-card" style={{ height: "100%" }}>
                  {/* Image */}
                  <div className="kit-card-img">
                    <img src={kit.image} alt={kit.name} />
                    {/* Badge top-left */}
                    <div style={{
                      position: "absolute", top: 12, left: 12,
                      background: kit.accent,
                      color: kit.accent === "#ffd60a" ? "#070d1a" : "#070d1a",
                      padding: "4px 12px", borderRadius: 99,
                      fontSize: 11, fontWeight: 800, letterSpacing: "0.04em",
                    }}>
                      {kit.badge}
                    </div>
                    {/* Age top-right */}
                    <div style={{
                      position: "absolute", top: 12, right: 12,
                      background: "rgba(7,13,26,0.82)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      padding: "4px 10px", borderRadius: 99,
                      fontSize: 11, fontWeight: 700, color: "var(--muted)",
                    }}>
                      {kit.age}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="kit-card-body">
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 5 }}>
                        {kit.name}
                      </h3>
                      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                        {kit.tagline}
                      </p>
                    </div>

                    {/* Bullets */}
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                      {kit.bullets.map(b => (
                        <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#cbd5e1" }}>
                          <CheckCircle size={13} style={{ color: kit.accent, flexShrink: 0 }} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Price + Buy */}
                    <div style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "auto",
                      paddingTop: 14,
                      borderTop: "1px solid var(--border)",
                    }}>
                      <div>
                        <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                          Starting at
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", lineHeight: 1.1 }}>
                          ₹{kit.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <a
                        href={`https://www.thinkingrobot.in/products/${kit.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 5,
                          background: kit.accentBg,
                          color: kit.accent,
                          border: `1px solid ${kit.accent}50`,
                          padding: "9px 16px", borderRadius: 99,
                          fontSize: 13, fontWeight: 800,
                          transition: "background 0.2s, transform 0.15s",
                          flexShrink: 0,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                      >
                        Buy Now <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}

            {/* Browse all card */}
            <FadeUp delay={0.38}>
              <a
                href="https://www.thinkingrobot.in"
                target="_blank"
                rel="noopener noreferrer"
                className="kit-card"
                style={{
                  height: "100%",
                  minHeight: 300,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 36,
                  textAlign: "center",
                  borderStyle: "dashed",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 44 }}>🛒</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--teal)" }}>Browse All Products</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
                  Explore sensors, boards, modules & more on our full store.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--teal)", fontWeight: 700, fontSize: 14 }}>
                  Visit Store <ArrowRight size={15} />
                </div>
              </a>
            </FadeUp>
          </div>

          <style>{`
            .kits-grid { grid-template-columns: repeat(3, 1fr); }
            @media (max-width: 900px)  { .kits-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 540px)  { .kits-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  FEATURES                                 ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        id="features"
        className="section"
        style={{ background: "var(--navy-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="section-inner">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="eyebrow">Why Choose Us</span>
              <h2 className="s-title">
                Everything You Need to{" "}
                <span className="grad-orange">Start Building</span>
              </h2>
              <p className="s-sub" style={{ margin: "0 auto" }}>
                We&apos;ve thought of everything so you and your kids can just focus on creating.
              </p>
            </div>
          </FadeUp>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }} className="feat-grid">
            {FEATURES.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.06}>
                <div className="feat-card">
                  <div className="feat-icon" style={{ background: `${f.accent}14` }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
                      {f.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <style>{`
            .feat-grid { grid-template-columns: repeat(3, 1fr); }
            @media (max-width: 900px) { .feat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 540px) { .feat-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  HOW IT WORKS                             ║
          ╚═══════════════════════════════════════════╝ */}
      <section id="how" className="section" style={{ background: "var(--navy)" }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span className="eyebrow">Simple as 1-2-3</span>
              <h2 className="s-title">
                From Box to{" "}
                <span className="grad-teal">Robot</span> in One Afternoon
              </h2>
            </div>
          </FadeUp>

          {/* Steps row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            marginBottom: 64,
          }} className="steps-grid">
            {[
              { n: "01", emoji: "📦", title: "Order & Unbox", desc: "Choose your kit, order online, and receive it at your door. Everything is neatly packed and labelled — no missing parts, ever.", color: "#00d2c6" },
              { n: "02", emoji: "🔧", title: "Build & Connect", desc: "Follow the visual step-by-step guide in the box. Snap, wire, and assemble — no soldering needed for beginner kits.", color: "#ff6b35" },
              { n: "03", emoji: "💻", title: "Code & Play", desc: "Upload your first program, watch your robot move, then start customising. Graduate from blocks to Python as you level up.", color: "#ffd60a" },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.12}>
                <div style={{ textAlign: "center" }}>
                  <div className="step-icon"
                    style={{ background: `${step.color}14`, border: `2px solid ${step.color}30` }}>
                    {step.emoji}
                    <div className="step-num" style={{ background: step.color }}>
                      {step.n}
                    </div>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 10 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, maxWidth: 268, margin: "0 auto" }}>
                    {step.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <style>{`
            .steps-grid { grid-template-columns: repeat(3, 1fr); }
            @media (max-width: 640px) { .steps-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }
          `}</style>

          {/* PICO Bot spotlight card */}
          <FadeUp delay={0.2}>
            <div style={{
              background: "var(--navy-2)",
              border: "1px solid rgba(0,210,198,0.18)",
              borderRadius: "var(--r-xl)",
              padding: "40px 44px",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 40,
              alignItems: "center",
            }} className="spotlight-card">
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--teal)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                  🤖 Featured — PICO Bot 4-Wheel Robot
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: 14 }}>
                  The Complete Wireless Robot Experience
                </h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, marginBottom: 20, maxWidth: 520 }}>
                  Ships with an acrylic chassis, 4 high-torque BO motors, an ESP32 driver board,
                  servo-mounted ultrasonic sensor, and step-by-step assembly guide.
                  Control it from your phone the same day.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["4-Wheel Drive", "App Controlled", "Obstacle Detection", "Expandable"].map(tag => (
                    <span key={tag} style={{
                      background: "rgba(0,210,198,0.08)", border: "1px solid rgba(0,210,198,0.22)",
                      color: "var(--teal)", padding: "5px 14px", borderRadius: 99,
                      fontSize: 12, fontWeight: 700,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ width: 200, flexShrink: 0 }}>
                <div style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(0,210,198,0.14)" }}>
                  <img
                    src="https://res.cloudinary.com/drwys1ksu/image/upload/v1770959235/3_bjhlkz.png"
                    alt="PICO Bot side view"
                    style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            </div>
            <style>{`
              .spotlight-card { grid-template-columns: 1fr auto; }
              @media (max-width: 700px) {
                .spotlight-card {
                  grid-template-columns: 1fr !important;
                  padding: 28px 24px !important;
                }
                .spotlight-card > div:last-child { width: 100% !important; max-width: 220px; }
              }
            `}</style>
          </FadeUp>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  FOR PARENTS                              ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        id="parents"
        className="section"
        style={{ background: "var(--navy-2)", borderTop: "1px solid var(--border)" }}
      >
        <div className="section-inner">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }} className="parents-grid">
            {/* Left — image */}
            <FadeUp>
              <div style={{ position: "relative", borderRadius: "var(--r-xl)", overflow: "hidden" }}>
                <img
                  src="https://res.cloudinary.com/drwys1ksu/image/upload/v1770876991/IoT-Beginners-Pack-630x630_c2gz3b.png"
                  alt="IoT Beginners Kit"
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
                />
                {/* Trust float badges */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  style={{
                    position: "absolute", bottom: 20, left: 20,
                    background: "rgba(7,13,26,0.92)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0,210,198,0.28)", borderRadius: 14,
                    padding: "14px 18px",
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 900, color: "var(--teal)" }}>RoHS ✓</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>Child Safe Certified</div>
                </motion.div>
                <motion.div
                  animate={{ y: [6, -6, 6] }}
                  transition={{ repeat: Infinity, duration: 4.5, delay: 0.6, ease: "easeInOut" }}
                  style={{
                    position: "absolute", top: 20, right: 20,
                    background: "rgba(7,13,26,0.92)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,107,53,0.28)", borderRadius: 14,
                    padding: "14px 18px",
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#ff6b35" }}>STEM ✓</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>Curriculum Aligned</div>
                </motion.div>
              </div>
            </FadeUp>

            {/* Right — content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <FadeUp delay={0.08}>
                <span className="eyebrow">For Parents</span>
                <h2 className="s-title">
                  More Than a Toy.<br />
                  <span className="grad-orange">An Investment.</span>
                </h2>
                <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75, marginTop: 14 }}>
                  Every kit is designed to turn screen time into skill-building time. Your child will learn
                  real programming, physical computing, and problem-solving — without even realising they&apos;re learning.
                </p>
              </FadeUp>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: <Zap size={17} />, title: "Real STEM Skills", desc: "Logic, coding, circuits, and engineering — built into every project.", color: "#ffd60a" },
                  { icon: <Shield size={17} />, title: "Parent-Approved Safety", desc: "All materials are non-toxic, RoHS certified, and fully child-safe.", color: "#22c55e" },
                  { icon: <Cpu size={17} />, title: "Grows With Them", desc: "Start with blocks. Graduate to Python. The same kit, infinite depth.", color: "#38bdf8" },
                  { icon: <Leaf size={17} />, title: "Offline & Hands-On", desc: "No addictive apps. Kids build real things and feel genuinely proud.", color: "#a78bfa" },
                ].map((item, i) => (
                  <FadeUp key={item.title} delay={0.12 + i * 0.07}>
                    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                        background: `${item.color}12`, border: `1px solid ${item.color}28`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: item.color,
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 3 }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            .parents-grid { grid-template-columns: 1fr 1fr; }
            @media (max-width: 768px) {
              .parents-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  REVIEWS                                  ║
          ╚═══════════════════════════════════════════╝ */}
      <section id="reviews" className="section" style={{ background: "var(--navy)" }}>
        <div className="section-inner">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <span className="eyebrow">Reviews</span>
              <h2 className="s-title">
                What Parents & Teachers
                <br />
                <span className="grad-teal">Are Saying</span>
              </h2>
              <p className="s-sub" style={{ margin: "0 auto" }}>
                Real feedback from real families across India.
              </p>
            </div>
          </FadeUp>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
          }} className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <FadeUp key={r.name} delay={i * 0.08}>
                <div className="review-card" style={{ height: "100%" }}>
                  {/* Stars */}
                  <div style={{ display: "flex", gap: 3 }}>
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} size={14} style={{ fill: "#ffd60a", color: "#ffd60a" }} />
                    ))}
                  </div>
                  {/* Text */}
                  <p style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.75, flex: 1 }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                  {/* Author */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                    paddingTop: 16, borderTop: "1px solid var(--border)",
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                      background: `${r.accent}18`, border: `2px solid ${r.accent}35`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 15, fontWeight: 900, color: r.accent,
                    }}>
                      {r.initial}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{r.role}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <style>{`
            .reviews-grid { grid-template-columns: repeat(4, 1fr); }
            @media (max-width: 900px) { .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 480px) { .reviews-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  CTA BANNER                               ║
          ╚═══════════════════════════════════════════╝ */}
      <section
        className="section"
        style={{
          background: "var(--navy-2)",
          borderTop: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 120%, rgba(0,210,198,0.08), transparent 70%)",
        }} />
        <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
          <FadeUp>
            <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
              <motion.div
                animate={{ rotate: [0, 12, -10, 0], scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                style={{ fontSize: 60, marginBottom: 24, display: "inline-block" }}
              >
                🚀
              </motion.div>
              <h2 style={{
                fontSize: "clamp(28px, 4.5vw, 50px)",
                fontWeight: 900, letterSpacing: "-0.03em",
                lineHeight: 1.12, color: "#fff", marginBottom: 16,
              }}>
                Ready to Build Your<br />
                <span className="grad-teal">First Robot?</span>
              </h2>
              <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, marginBottom: 36 }}>
                Join 500+ builders across India. Kits starting at just ₹899.<br />
                Free shipping · 30-day returns · Guaranteed quality.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
                <a href="#kits" className="btn btn-primary" style={{ fontSize: 15, padding: "14px 30px" }}>
                  <ShoppingCart size={18} /> Shop All Kits
                </a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ fontSize: 15, padding: "14px 30px" }}
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════════╗
          ║  FOOTER                                   ║
          ╚═══════════════════════════════════════════╝ */}
      <footer style={{
        background: "var(--navy)",
        borderTop: "1px solid var(--border)",
        paddingTop: 56, paddingBottom: 32,
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Top row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 48,
          }} className="footer-grid">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Image src="/logo.png" alt="PICO BOT" width={36} height={36}
                  style={{ borderRadius: 8, display: "block" }} />
                <span style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>PICO BOT</span>
              </div>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                India&apos;s favourite robotics & electronics kits for young builders. Powered by Thinking Robot.
              </p>
            </div>

            {/* Kits */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 16 }}>
                Kits
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {KITS.map(k => (
                  <li key={k.id}>
                    <a
                      href={`https://www.thinkingrobot.in/products/${k.slug}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 13, color: "var(--muted)", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                    >
                      {k.name.split("|")[0].trim()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 16 }}>
                Learn
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {["Getting Started", "Arduino Tutorials", "Python Guides", "Project Ideas", "Community"].map(l => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: 13, color: "var(--muted)", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 16 }}>
                Company
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {["About Us", "Contact", "Shipping Policy", "Return Policy", "Privacy Policy"].map(l => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: 13, color: "var(--muted)", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                    >{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <style>{`
            .footer-grid { grid-template-columns: 1.5fr 1fr 1fr 1fr; }
            @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
          `}</style>

          {/* Bottom bar */}
          <div style={{
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              © 2026 Thinking Robot. All rights reserved. 🇮🇳 Proudly Made in India
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              {["In", "Yt", "WA", "X"].map(s => (
                <a key={s} href="#" style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800,
                  color: "var(--muted)", transition: "color 0.15s, border-color 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(0,210,198,0.3)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
