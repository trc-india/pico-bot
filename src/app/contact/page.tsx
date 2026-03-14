import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — PICO BOT by Thinking Robot",
  description: "Have questions about our STEM kits? Need help choosing the right kit for your child? Get in touch with the Thinking Robot team.",
};

export default function ContactPage() {
  return (
    <div style={{ overflow: "clip", width: "100%", maxWidth: "100%", position: "relative" }}>
      <Navbar />
      <ContactForm />
      <Footer />
    </div>
  );
}
