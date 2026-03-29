import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PICO DRIVE – Robotics & Electronics Kits for Kids | Thinking Robot",
  description:
    "India's favourite robotics kits for kids aged 8–16. Build your first robot, learn coding with Arduino & ESP32, and explore real STEM — starting from ₹899. Fast shipping across India.",
  keywords: [
    "robotics kit india", "arduino starter kit", "esp32 kit", "iot kit for beginners",
    "stem toys india", "coding for kids", "pico drive", "thinking robot", "electronics kit"
  ],
  openGraph: {
    title: "PICO DRIVE – Build. Code. Play.",
    description: "India's favourite robotics & electronics kits for young builders.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "w3fdnhoox8");
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1913880105901298');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`${jakarta.variable} antialiased`}
        style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        {/* Meta Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1913880105901298&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}

        {/* Custom Analytics Tracker */}
        <AnalyticsTracker />

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
