"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ShoppingCart, MessageCircle, Leaf } from "lucide-react";

const WA_PLANT = `https://wa.me/918275478093?text=${encodeURIComponent(
  "Hi Thinking Robot! 🌱 I'm interested in the Smart Plant Monitoring Kit."
)}`;

const BUY_LINK = "https://thinkingrobot.in/products/smart-plant-monitoring-and-watering-kit-esp8266-automated-gardening-system";

const NAV_LINKS = [
  { label: "Components", href: "#components" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Contact", href: "#contact" },
  { label: "All Kits", href: "/" },
];

export default function PlantNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "var(--nav-height)", zIndex: 100,
      background: "rgba(240,253,244,.92)",
      backdropFilter: "blur(20px) saturate(1.5)",
      WebkitBackdropFilter: "blur(20px) saturate(1.5)",
      borderBottom: "1px solid rgba(34,197,94,.12)",
    }}>
      <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/plant-monitor" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Image src="/logo.png" alt="Thinking Robot" width={36} height={36} style={{ borderRadius: 10 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: "var(--text)", letterSpacing: "-.02em", lineHeight: 1, display: "flex", alignItems: "center", gap: 4 }}>
              <Leaf size={14} style={{ color: "#22c55e" }} /> PLANT MONITOR
            </div>
            <div style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: ".08em", textTransform: "uppercase" }}>BY THINKING ROBOT</div>
          </div>
        </a>

        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}
              style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", transition: "color .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#16a34a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href={WA_PLANT} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ padding: "8px 16px", fontSize: 12 }}>
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a href={BUY_LINK} target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: "8px 16px", fontSize: 12, background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", boxShadow: "0 4px 12px rgba(34,197,94,.25)" }}>
            <ShoppingCart size={14} /> Buy Kit
          </a>
        </div>

        <button className="mobile-nav-btn" onClick={() => setOpen(!open)}
          style={{ display: "none", padding: 8, borderRadius: 10, background: "rgba(34,197,94,.06)", border: "1px solid rgba(34,197,94,.12)", color: "var(--text)", cursor: "pointer" }}
          aria-label="menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ overflow: "hidden", background: "#f0fdf4", borderTop: "1px solid rgba(34,197,94,.1)" }}>
            <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{link.label}</a>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <a href={WA_PLANT} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ flex: 1, fontSize: 13 }}>
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href={BUY_LINK} target="_blank" rel="noopener noreferrer" className="btn" onClick={() => setOpen(false)}
                  style={{ flex: 1, fontSize: 13, background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff" }}>
                  <ShoppingCart size={14} /> Buy Kit
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){.desktop-nav{display:none!important}.mobile-nav-btn{display:flex!important}}
        @media(min-width:769px){.mobile-nav-btn{display:none!important}}
      `}</style>
    </header>
  );
}
