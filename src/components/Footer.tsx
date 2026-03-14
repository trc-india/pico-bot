"use client";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { KITS } from "@/data/kits";
import { WA_LINK, SITE_URL, DOCS_URL, INSTAGRAM, FACEBOOK } from "@/data/constants";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", paddingTop: 56, paddingBottom: 28 }}>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Image src="/logo.png" alt="PICO BOT" width={32} height={32} style={{ borderRadius: 8 }} />
              <span style={{ fontSize: 15, fontWeight: 900, color: "var(--text)" }}>PICO BOT</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
              India&apos;s favourite robotics &amp; electronics kits for young builders. Powered by Thinking Robot.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { href: INSTAGRAM, emoji: "📸", label: "Instagram" },
                { href: FACEBOOK, emoji: "👤", label: "Facebook" },
                { href: WA_LINK, emoji: "💬", label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    transition: "transform .15s, border-color .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                >
                  {s.emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Kits */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 14 }}>Kits</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {KITS.map((k) => (
                <li key={k.id}>
                  <a href={`https://thinkingrobot.in/products/${k.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--text-secondary)", transition: "color .15s" }}>
                    {k.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 14 }}>Learn</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Getting Started", DOCS_URL],
                ["Arduino Tutorials", DOCS_URL],
                ["Python Guides", DOCS_URL],
                ["Project Ideas", DOCS_URL],
                ["Community", WA_LINK],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--text-secondary)", transition: "color .15s" }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 14 }}>Company</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Our Store", SITE_URL],
                ["WhatsApp Us", WA_LINK],
                ["Instagram", INSTAGRAM],
                ["Facebook", FACEBOOK],
                ["Tutorials", DOCS_URL],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--text-secondary)", transition: "color .15s" }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginTop: 40 }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
            © 2026 Thinking Robot ·{" "}
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
              thinkingrobot.in
            </a>{" "}
            🇮🇳
          </span>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-wa" style={{ fontSize: 12, padding: "7px 14px" }}>
            <MessageCircle size={12} /> Need help? WhatsApp us
          </a>
        </div>
      </div>

      <style>{`
        .footer-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:36px}
        @media(max-width:768px){.footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:480px){.footer-grid{grid-template-columns:1fr!important}}
      `}</style>
    </footer>
  );
}
