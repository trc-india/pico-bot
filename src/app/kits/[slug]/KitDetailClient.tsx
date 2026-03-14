"use client";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, ArrowLeft, ShoppingCart, MessageCircle } from "lucide-react";
import type { Kit } from "@/data/kits";
import { KITS } from "@/data/kits";
import { WA_LINK } from "@/data/constants";
import KitCard from "@/components/KitCard";

export default function KitDetailClient({ kit }: { kit: Kit }) {
  const otherKits = KITS.filter((k) => k.id !== kit.id).slice(0, 3);

  return (
    <main style={{ paddingTop: "calc(var(--nav-height) + 24px)" }}>
      {/* Breadcrumb */}
      <div className="container" style={{ marginBottom: 24 }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--primary)", transition: "opacity .15s" }}>
          <ArrowLeft size={14} /> Back to All Kits
        </a>
      </div>

      {/* Hero */}
      <section className="container" style={{ marginBottom: 64 }}>
        <div className="kit-detail-grid">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ background: "var(--bg-alt)", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border)", position: "relative" }}>
              <img src={kit.image} alt={kit.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} />
              <span style={{ position: "absolute", top: 16, left: 16, background: kit.accent, color: "#fff", padding: "6px 16px", borderRadius: "var(--radius-pill)", fontSize: 12, fontWeight: 800 }}>
                {kit.badge}
              </span>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            <span className="tag" style={{ background: `${kit.accent}12`, color: kit.accent, border: `1px solid ${kit.accent}30`, marginBottom: 12, alignSelf: "flex-start" }}>
              {kit.age}
            </span>
            <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-.02em", color: "var(--text)", marginBottom: 8 }}>
              {kit.name}
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20 }}>
              {kit.description}
            </p>

            {/* Bullets */}
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {kit.bullets.map((b) => (
                <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--text)" }}>
                  <CheckCircle size={18} style={{ color: kit.accent, flexShrink: 0 }} />
                  {b}
                </li>
              ))}
            </ul>

            {/* Price & CTA */}
            <div style={{ padding: "20px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 700, marginBottom: 4 }}>Starting at</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "var(--text)", lineHeight: 1 }}>₹{kit.price.toLocaleString("en-IN")}</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <a
                href={`https://thinkingrobot.in/products/${kit.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: "14px 28px", fontSize: 15 }}
              >
                <ShoppingCart size={17} /> Buy Now <ChevronRight size={15} />
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
                style={{ padding: "14px 28px", fontSize: 15 }}
              >
                <MessageCircle size={17} /> Ask on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* More Kits */}
      <section className="section" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border-light)" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">🔍 You Might Also Like</span>
            <h2 className="section-title">Explore More Kits</h2>
          </div>
          <div className="more-kits-grid">
            {otherKits.map((k, i) => (
              <KitCard key={k.id} kit={k} index={i} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .kit-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
        .more-kits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        @media(max-width:768px){
          .kit-detail-grid{grid-template-columns:1fr!important;gap:24px!important}
          .more-kits-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}
        }
        @media(max-width:500px){
          .more-kits-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </main>
  );
}
