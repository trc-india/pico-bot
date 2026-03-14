"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ShoppingCart, MessageCircle } from "lucide-react";
import { WA_LINK, NAV_LINKS } from "@/data/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--nav-height)",
        zIndex: 100,
        background: "rgba(250,251,255,.88)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Image src="/logo.png" alt="Thinking Robot" width={36} height={36} style={{ borderRadius: 10 }} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 900, color: "var(--text)", letterSpacing: "-.02em", lineHeight: 1 }}>PICO BOT</div>
            <div style={{ fontSize: 9, color: "var(--text-muted)", letterSpacing: ".08em", textTransform: "uppercase" }}>BY THINKING ROBOT</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", transition: "color .15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ padding: "8px 16px", fontSize: 12 }}>
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a href="#kits" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 12 }}>
            <ShoppingCart size={14} /> Shop
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-nav-btn"
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            padding: 8,
            borderRadius: 10,
            background: "rgba(0,0,0,.04)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            cursor: "pointer",
          }}
          aria-label="menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}
          >
            <div style={{ padding: "16px 20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}
                >
                  {link.label}
                </a>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ flex: 1, fontSize: 13 }}>
                  <MessageCircle size={14} /> WhatsApp
                </a>
                <a href="#kits" className="btn btn-primary" onClick={() => setOpen(false)} style={{ flex: 1, fontSize: 13 }}>
                  <ShoppingCart size={14} /> Shop
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
