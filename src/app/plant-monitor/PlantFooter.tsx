"use client";
import Image from "next/image";
import { MessageCircle, Leaf } from "lucide-react";
import { SITE_URL, DOCS_URL, INSTAGRAM, FACEBOOK } from "@/data/constants";

const WA_PLANT = `https://wa.me/918275478093?text=${encodeURIComponent(
  "Hi Thinking Robot! 🌱 I'm interested in the Smart Plant Monitoring Kit."
)}`;

export default function PlantFooter() {
  return (
    <footer style={{ background: "#f0fdf4", borderTop: "1px solid rgba(34,197,94,.12)", paddingTop: 56, paddingBottom: 28 }}>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Image src="/logo.png" alt="Thinking Robot" width={32} height={32} style={{ borderRadius: 8 }} />
              <span style={{ fontSize: 14, fontWeight: 900, color: "var(--text)", display: "flex", alignItems: "center", gap: 4 }}>
                <Leaf size={14} style={{ color: "#22c55e" }} /> PLANT MONITOR
              </span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
              India&apos;s smartest IoT plant monitoring kit for students &amp; makers. Powered by Thinking Robot.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { href: INSTAGRAM, emoji: "📸", label: "Instagram" },
                { href: FACEBOOK, emoji: "👤", label: "Facebook" },
                { href: WA_PLANT, emoji: "💬", label: "WhatsApp" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: 10, background: "#fff",
                    border: "1px solid rgba(34,197,94,.12)", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 15, transition: "transform .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}>
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: "contents" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 14 }}>Kit</div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Plant Monitor Kit", "https://thinkingrobot.in/products/smart-plant-monitoring-and-watering-kit-esp8266-automated-gardening-system"],
                  ["All Kits", "/"],
                  ["Our Store", SITE_URL],
                ].map(([l, h]) => (
                  <li key={l}><a href={h} target={h.startsWith("/") ? undefined : "_blank"} rel={h.startsWith("/") ? undefined : "noopener noreferrer"} style={{ fontSize: 13, color: "var(--text-secondary)" }}>{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 14 }}>Learn</div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Getting Started", DOCS_URL],
                  ["ESP8266 Guides", DOCS_URL],
                  ["Project Ideas", DOCS_URL],
                  ["Community", WA_PLANT],
                ].map(([l, h]) => (
                  <li key={l}><a href={h} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--text-secondary)" }}>{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 14 }}>Company</div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["Contact Us", "/contact"],
                  ["WhatsApp Us", WA_PLANT],
                  ["Instagram", INSTAGRAM],
                  ["Tutorials", DOCS_URL],
                ].map(([l, h]) => (
                  <li key={l}><a href={h} target={h.startsWith("/") ? undefined : "_blank"} rel={h.startsWith("/") ? undefined : "noopener noreferrer"} style={{ fontSize: 13, color: "var(--text-secondary)" }}>{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 20, borderTop: "1px solid rgba(34,197,94,.12)", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginTop: 40 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            © 2026 Thinking Robot · <a href={SITE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#16a34a" }}>thinkingrobot.in</a> 🇮🇳
          </span>
          <a href={WA_PLANT} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ fontSize: 12, padding: "7px 14px" }}>
            <MessageCircle size={12} /> Need help? WhatsApp us
          </a>
        </div>
      </div>

      <style>{`
        .footer-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:36px}
        @media(max-width:768px){
          .footer-grid{grid-template-columns:1fr!important;gap:24px!important}
          .footer-grid>div:first-child{border-bottom:1px solid rgba(34,197,94,.1);padding-bottom:20px}
        }
      `}</style>
    </footer>
  );
}
