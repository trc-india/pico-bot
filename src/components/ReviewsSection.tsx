"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

export default function ReviewsSection() {
  const [idx, setIdx] = useState(0);
  const dragRef = useRef(0);

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(REVIEWS.length - 1, i + 1));

  return (
    <section id="reviews" className="section" style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-eyebrow">💬 Reviews</span>
            <h2 className="section-title">
              What Parents & Teachers{" "}
              <span className="grad-primary">Are Saying</span>
            </h2>
            <p className="section-subtitle">Real feedback from real families across India 🇮🇳</p>
          </motion.div>
        </div>

        {/* Desktop grid */}
        <div className="reviews-desktop">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ReviewCard review={r} />
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="reviews-mobile">
          <div style={{ overflow: "hidden", borderRadius: "var(--radius-lg)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragStart={(_, i) => { dragRef.current = (i as { point: { x: number } }).point.x; }}
                onDragEnd={(_, info) => { if (info.offset.x < -40) next(); else if (info.offset.x > 40) prev(); }}
                style={{ cursor: "grab" }}
              >
                <ReviewCard review={REVIEWS[idx]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 20 }}>
            <button onClick={prev} disabled={idx === 0} className="review-nav-btn" style={{ opacity: idx === 0 ? 0.4 : 1 }} aria-label="Previous review">
              <ChevronLeft size={16} />
            </button>
            <div style={{ display: "flex", gap: 6 }}>
              {REVIEWS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{
                    width: i === idx ? 20 : 6,
                    height: 6,
                    borderRadius: 99,
                    background: i === idx ? "var(--primary)" : "rgba(0,0,0,.1)",
                    transition: "all .3s",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
            <button onClick={next} disabled={idx === REVIEWS.length - 1} className="review-nav-btn" style={{ opacity: idx === REVIEWS.length - 1 ? 0.4 : 1 }} aria-label="Next review">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .reviews-desktop{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .reviews-mobile{display:none}
        .review-nav-btn{width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:var(--bg-card);color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;box-shadow:var(--shadow-sm)}
        .review-nav-btn:hover{border-color:var(--primary);color:var(--primary)}
        @media(max-width:900px){.reviews-desktop{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:640px){.reviews-desktop{display:none!important}.reviews-mobile{display:block!important}}
      `}</style>
    </section>
  );
}

function ReviewCard({ review: r }: { review: typeof REVIEWS[0] }) {
  return (
    <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: r.rating }).map((_, j) => (
          <Star key={j} size={14} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
        ))}
      </div>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, flex: 1 }}>&ldquo;{r.text}&rdquo;</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 14, borderTop: "1px solid var(--border-light)" }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: `${r.accent}15`,
            border: `2px solid ${r.accent}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 900,
            color: r.accent,
            flexShrink: 0,
          }}
        >
          {r.initial}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "var(--text)" }}>{r.name}</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.role}</div>
        </div>
      </div>
    </div>
  );
}
