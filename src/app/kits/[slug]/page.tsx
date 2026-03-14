import { Metadata } from "next";
import { notFound } from "next/navigation";
import { KITS } from "@/data/kits";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KitDetailClient from "./KitDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return KITS.map((kit) => ({ slug: kit.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kit = KITS.find((k) => k.slug === slug);
  if (!kit) return { title: "Kit Not Found" };
  return {
    title: `${kit.name} — PICO BOT by Thinking Robot`,
    description: kit.description,
    openGraph: {
      title: kit.name,
      description: kit.tagline,
      images: [kit.image],
    },
  };
}

export default async function KitPage({ params }: Props) {
  const { slug } = await params;
  const kit = KITS.find((k) => k.slug === slug);
  if (!kit) notFound();

  return (
    <div style={{ overflow: "clip", width: "100%", maxWidth: "100%", position: "relative" }}>
      <Navbar />
      <KitDetailClient kit={kit} />
      <Footer />
    </div>
  );
}
