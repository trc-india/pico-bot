import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PICO BOT – Robotics & Electronics Kits for Kids | Thinking Robot",
  description:
    "India's favourite robotics kits for kids aged 8–16. Build your first robot, learn coding with Arduino & ESP32, and explore real STEM — starting from ₹899. Fast shipping across India.",
  keywords: [
    "robotics kit india", "arduino starter kit", "esp32 kit", "iot kit for beginners",
    "stem toys india", "coding for kids", "pico bot", "thinking robot", "electronics kit"
  ],
  openGraph: {
    title: "PICO BOT – Build. Code. Play.",
    description: "India's favourite robotics & electronics kits for young builders.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} antialiased`}
        style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
