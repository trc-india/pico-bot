import type { Metadata } from "next";
import PlantMonitorPage from "./PlantMonitorPage";

export const metadata: Metadata = {
  title: "Smart Plant Monitoring Kit – Grow Smarter with IoT | Thinking Robot",
  description:
    "Build your own automated plant monitoring and watering system with ESP8266, DHT11, and soil moisture sensor. India's coolest IoT gardening kit for makers & students. Starting at ₹899.",
  keywords: [
    "plant monitoring kit india",
    "smart garden kit",
    "ESP8266 IoT kit",
    "soil moisture sensor kit",
    "automated watering system",
    "stem gardening project",
    "thinking robot",
    "plant monitor esp8266",
  ],
  openGraph: {
    title: "Smart Plant Monitoring Kit – Grow Smarter with IoT",
    description:
      "Automated plant monitoring & watering with ESP8266 + DHT11 + Soil Moisture sensor. Control from your phone.",
    images: ["/logo.png"],
  },
};

export default function Page() {
  return <PlantMonitorPage />;
}
