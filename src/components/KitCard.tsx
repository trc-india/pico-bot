"use client";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import type { Kit } from "@/data/kits";

export default function KitCard({ kit, index = 0 }: { kit: Kit; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ height: "100%" }}
    >
      <div className="card kit-card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Image */}
        <div className="kit-img-area">
          <img src={kit.image} alt={kit.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease" }} />
          <span
            className="kit-badge-top"
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: kit.accent,
              color: "#fff",
              padding: "4px 12px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontWeight: 800,
            }}
          >
            {kit.badge}
          </span>
          <span
            className="kit-badge-age"
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(255,255,255,.9)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(0,0,0,.06)",
              padding: "4px 10px",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontWeight: 700,
              color: "var(--text-secondary)",
            }}
          >
            {kit.age}
          </span>
        </div>

        {/* Body */}
        <div className="kit-body">
          <div>
            <h3 className="kit-name">{kit.name}</h3>
            <p className="kit-tagline">{kit.tagline}</p>
          </div>

          <ul className="kit-bullets">
            {kit.bullets.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-secondary)" }}>
                <CheckCircle size={13} style={{ color: kit.accent, flexShrink: 0 }} />
                {b}
              </li>
            ))}
          </ul>

          <div className="kit-footer">
            <div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 700 }}>Starting at</div>
              <div className="kit-price">₹{kit.price.toLocaleString("en-IN")}</div>
            </div>
            <a
              href={`https://thinkingrobot.in/products/${kit.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="kit-buy-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: `${kit.accent}12`,
                color: kit.accent,
                border: `1.5px solid ${kit.accent}40`,
                padding: "8px 14px",
                borderRadius: "var(--radius-pill)",
                fontSize: 12,
                fontWeight: 800,
                transition: "all .2s ease",
                flexShrink: 0,
              }}
            >
              Buy Now <ChevronRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .kit-img-area{width:100%;aspect-ratio:1/1;overflow:hidden;position:relative;background:var(--bg-alt);flex-shrink:0}
        .kit-card:hover .kit-img-area img{transform:scale(1.06)}
        .kit-body{padding:18px;display:flex;flex-direction:column;flex:1;gap:12px;min-width:0}
        .kit-name{font-size:15px;font-weight:800;color:var(--text);line-height:1.3;margin-bottom:3px}
        .kit-tagline{font-size:13px;color:var(--text-secondary);line-height:1.5}
        .kit-bullets{display:flex;flex-direction:column;gap:6px;min-width:0}
        .kit-footer{display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border);margin-top:auto;gap:8px;flex-wrap:nowrap}
        .kit-price{font-size:22px;font-weight:900;color:var(--text);line-height:1.1}
        .kit-buy-btn:hover{transform:scale(1.05)!important}

        @media(max-width:600px){
          .kit-img-area{aspect-ratio:unset!important;height:120px}
          .kit-body{padding:10px!important;gap:6px!important}
          .kit-name{font-size:12px!important}
          .kit-tagline{font-size:10px!important}
          .kit-bullets li{font-size:10px!important;gap:4px!important;overflow:hidden}
          .kit-bullets li:nth-child(n+3){display:none}
          .kit-footer{padding-top:8px!important}
          .kit-footer>div:first-child>div:first-child{display:none}
          .kit-price{font-size:16px!important}
          .kit-buy-btn{padding:6px 10px!important;font-size:10px!important;border-radius:8px!important;gap:2px!important}
          .kit-badge-top{font-size:9px!important;padding:3px 8px!important;top:6px!important;left:6px!important}
          .kit-badge-age{font-size:9px!important;padding:3px 8px!important;top:6px!important;right:6px!important}
        }
      `}</style>
    </motion.div>
  );
}
