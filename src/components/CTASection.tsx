"use client";
import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { WA_LINK } from "@/data/constants";

export default function CTASection() {
  return (
    <section className="section" style={{ background: "linear-gradient(180deg, var(--bg) 0%, var(--primary-light) 100%)", position: "relative", overflow: "clip" }}>
      {/* Radial glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 110%, rgba(8,145,178,.1), transparent 70%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}
        >
          <motion.div
            animate={{ rotate: [0, 12, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            style={{ fontSize: 56, marginBottom: 20, display: "inline-block" }}
          >
            🚀
          </motion.div>
          <h2 style={{ fontSize: "clamp(26px, 4.5vw, 48px)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.12, color: "var(--text)", marginBottom: 14 }}>
            Ready to Build Your<br />
            <span className="grad-primary">First Robot?</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 32 }}>
            Join 500+ builders across India. Kits starting at just ₹899.<br />
            Free shipping · 30-day returns · Guaranteed quality.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            <a href="#kits" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: 15 }}>
              <ShoppingCart size={17} /> Shop All Kits
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ padding: "14px 28px", fontSize: 15 }}>
              <MessageCircle size={17} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
