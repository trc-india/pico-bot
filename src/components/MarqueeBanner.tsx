"use client";

const MARQUEE_ITEMS = [
  "⚡ Arduino Powered",
  "🌐 Wi-Fi & Bluetooth",
  "🤖 Real Robotics",
  "🐍 Python Ready",
  "📦 All Parts Included",
  "🛡️ Child Safe",
  "🇮🇳 Made in India",
  "🎓 STEM Aligned",
];

export default function MarqueeBanner() {
  return (
    <div style={{ background: "var(--bg-alt)", padding: "12px 0", borderBottom: "1px solid var(--border-light)", overflow: "clip" }}>
      <div className="marquee-wrap">
        <div className="marquee-inner anim-marquee">
          {[...Array(2)]
            .flatMap(() => MARQUEE_ITEMS)
            .map((t, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", padding: "0 24px" }}>
                {t}
                <span style={{ marginLeft: 24, color: "var(--border)", fontSize: 16 }}>·</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
