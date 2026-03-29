import type { Metadata } from "next";
import AnalyticsDashboard from "./AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Analytics — PICO BOT Admin",
  robots: "noindex, nofollow",
};

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
