"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Mail } from "lucide-react";
import { WA_LINK } from "@/data/constants";

export default function ContactStrip() {
  return (
    <section id="contact" style={{ background: "var(--bg)", borderTop: "1px solid var(--border-light)", padding: "48px 0", overflow: "clip" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="card contact-strip-card">
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "var(--primary)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 8 }}>
                📬 Have Questions?
              </div>
              <h3 style={{ fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 900, color: "var(--text)", lineHeight: 1.2, marginBottom: 8 }}>
                We&apos;re Here to Help
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Whether you need help choosing a kit, have a technical question, or want to discuss a school order — reach out anytime.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, flexShrink: 0 }}>
              <a href="/contact" className="btn btn-primary">
                <Mail size={15} /> Contact Us <ArrowRight size={14} />
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .contact-strip-card{display:flex;align-items:center;gap:28px;padding:32px 36px;border:1.5px solid rgba(8,145,178,.15);background:linear-gradient(135deg,rgba(8,145,178,.03) 0%,rgba(249,115,22,.02) 100%)}
        @media(max-width:640px){.contact-strip-card{flex-direction:column!important;text-align:center;padding:24px 20px!important;gap:18px!important}}
      `}</style>
    </section>
  );
}
