"use client";
import { motion } from "framer-motion";
import { KITS } from "@/data/kits";
import KitCard from "./KitCard";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/data/constants";

export default function KitsSection() {
  return (
    <section id="kits" className="section" style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-eyebrow">🤖 Our Robotics Kits</span>
            <h2 className="section-title">
              Find the Kit That Sparks{" "}
              <span className="grad-primary">Your Curiosity</span>
            </h2>
            <p className="section-subtitle">
              5 thoughtfully curated kits for everyone — from curious
              8-year-olds to passionate teen coders.
            </p>
          </motion.div>
        </div>

        <div className="kits-grid">
          {KITS.map((kit, i) => (
            <KitCard key={kit.id} kit={kit} index={i} />
          ))}
          {/* Browse All Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{
                height: "100%",
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 32,
                textAlign: "center",
                borderStyle: "dashed",
                gap: 10,
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 40 }}>🛒</div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--primary)" }}>
                Browse All Products
              </h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Explore sensors, boards, modules &amp; more on our full store.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--primary)", fontWeight: 700, fontSize: 13 }}>
                Visit Store <ArrowRight size={13} />
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`
        .kits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        @media(max-width:900px){.kits-grid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:600px){.kits-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}}
      `}</style>
    </section>
  );
}
