"use client";
import { motion } from "framer-motion";

export default function PlantGallery() {
  const images = [
    { src: "/Plant Monitoring images/Plant monitor icon 1.png", alt: "Plant Monitor Setup", caption: "Smart Monitoring Dashboard" },
    { src: "/Plant Monitoring images/Plant Monitor icon 2.png", alt: "Plant Monitor Icon", caption: "Real-time Sensor Readings" },
    { src: "/Plant Monitoring images/Greenhoouse Clipart.png", alt: "Greenhouse Setup", caption: "Greenhouse Compatible" },
  ];

  const plants = [
    { src: "/Plant Monitoring images/Plant type 1.png", name: "Indoor Plants" },
    { src: "/Plant Monitoring images/Plant type 2.png", name: "Herbs & Spices" },
    { src: "/Plant Monitoring images/Plant type 3.png", name: "Succulents" },
    { src: "/Plant Monitoring images/Plant type 4.png", name: "Flowers" },
    { src: "/Plant Monitoring images/Plant type 5.png", name: "Vegetables" },
  ];

  return (
    <section className="section" style={{ background: "var(--bg)", overflow: "clip" }}>
      <div className="container">
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <span className="section-eyebrow" style={{ color: "#16a34a" }}>🌿 Works With Any Plant</span>
            <h2 className="section-title">
              Monitor <span className="plant-grad">Any Plant</span>, Anywhere
            </h2>
            <p className="section-subtitle">
              From kitchen herbs to balcony flowers — this kit adapts to your garden.
            </p>
          </motion.div>
        </div>

        {/* Gallery grid */}
        <div className="plant-gallery-grid">
          {images.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card"
              style={{ overflow: "hidden" }}
            >
              <div style={{ aspectRatio: "4/3", overflow: "hidden", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                <img src={img.src} alt={img.alt} style={{ maxWidth: "80%", maxHeight: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ padding: "14px 18px" }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: "var(--text)" }}>{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plant types with decorative grass strip */}
        <div style={{ marginTop: 56, position: "relative" }}>
          <div style={{ width: "100%", overflow: "hidden", marginBottom: -4 }}>
            <img src="/Plant Monitoring images/Horizontal grass.png" alt="" style={{ width: "100%", height: 40, objectFit: "cover", opacity: 0.4 }} />
          </div>
          <div style={{ background: "rgba(34,197,94,.04)", border: "1px solid rgba(34,197,94,.1)", borderRadius: "var(--radius-lg)", padding: "36px 20px" }}>
            <p style={{ textAlign: "center", fontSize: 12, fontWeight: 800, color: "#16a34a", textTransform: "uppercase", letterSpacing: ".09em", marginBottom: 24 }}>
              🌱 Works Great With
            </p>
            <div className="plant-types-grid">
              {plants.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{ textAlign: "center" }}
                >
                  <div style={{
                    width: 100, height: 100, borderRadius: "50%", margin: "0 auto 10px",
                    background: "#fff", border: "2px solid rgba(34,197,94,.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden", boxShadow: "0 4px 16px rgba(34,197,94,.08)",
                  }}>
                    <img src={p.src} alt={p.name} style={{ width: "75%", height: "75%", objectFit: "contain" }} />
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)" }}>{p.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Fence decoration */}
        <div style={{ marginTop: 16, opacity: 0.25, overflow: "hidden" }}>
          <img src="/Plant Monitoring images/Fence.png" alt="" style={{ width: "100%", height: 50, objectFit: "cover" }} />
        </div>
      </div>

      <style>{`
        .plant-grad{background:linear-gradient(135deg,#22c55e 0%,#16a34a 50%,#059669 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .plant-gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .plant-types-grid{display:flex;justify-content:center;gap:28px;flex-wrap:wrap}
        @media(max-width:768px){
          .plant-gallery-grid{grid-template-columns:1fr!important}
          .plant-types-grid{gap:16px!important}
          .plant-types-grid>div>div:first-child{width:70px!important;height:70px!important}
        }
      `}</style>
    </section>
  );
}
