"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, BarChart3, Eye, MousePointerClick, Globe, Monitor, Smartphone,
  Tablet, Clock, TrendingUp, Users, RefreshCw, Loader2, ExternalLink,
  ShieldCheck, AlertTriangle, LogOut, MapPin, Crosshair, Flame,
} from "lucide-react";

interface AnalyticsEvent {
  id: string;
  event_type: "pageview" | "click";
  page_url: string;
  page_title: string;
  referrer: string;
  user_agent: string;
  screen_width: number;
  screen_height: number;
  language: string;
  ip_address: string;
  click_target: string | null;
  click_x: number | null;
  click_y: number | null;
  created_at: string;
}

type DateRange = "7d" | "30d" | "90d";

export default function AnalyticsDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [range, setRange] = useState<DateRange>("7d");
  const [activeTab, setActiveTab] = useState<"overview" | "pages" | "clicks" | "heatmap" | "devices" | "external">("overview");

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  const fetchAnalytics = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/analytics?range=${range}&type=all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch analytics");
      setEvents(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  }, [token, range]);

  useEffect(() => {
    if (token) fetchAnalytics();
  }, [token, range, fetchAnalytics]);

  // ===== COMPUTED STATS =====
  const stats = useMemo(() => {
    const pageviews = events.filter((e) => e.event_type === "pageview");
    const clicks = events.filter((e) => e.event_type === "click");

    // Unique visitors (by IP)
    const uniqueIPs = new Set(pageviews.map((e) => e.ip_address));

    // Page views by page
    const pageMap = new Map<string, number>();
    pageviews.forEach((e) => {
      const path = new URL(e.page_url, "https://x.com").pathname;
      pageMap.set(path, (pageMap.get(path) || 0) + 1);
    });
    const topPages = Array.from(pageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // Clicks by target
    const clickMap = new Map<string, number>();
    clicks.forEach((e) => {
      if (e.click_target) {
        const label = e.click_target.slice(0, 60);
        clickMap.set(label, (clickMap.get(label) || 0) + 1);
      }
    });
    const topClicks = Array.from(clickMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);

    // Device breakdown
    const devices = { desktop: 0, mobile: 0, tablet: 0 };
    pageviews.forEach((e) => {
      if (e.screen_width >= 1024) devices.desktop++;
      else if (e.screen_width >= 768) devices.tablet++;
      else devices.mobile++;
    });

    // Browser breakdown
    const browserMap = new Map<string, number>();
    pageviews.forEach((e) => {
      const ua = e.user_agent.toLowerCase();
      let browser = "Other";
      if (ua.includes("edg/")) browser = "Edge";
      else if (ua.includes("chrome")) browser = "Chrome";
      else if (ua.includes("firefox")) browser = "Firefox";
      else if (ua.includes("safari")) browser = "Safari";
      else if (ua.includes("opera") || ua.includes("opr/")) browser = "Opera";
      browserMap.set(browser, (browserMap.get(browser) || 0) + 1);
    });
    const browsers = Array.from(browserMap.entries()).sort((a, b) => b[1] - a[1]);

    // Referrer breakdown
    const refMap = new Map<string, number>();
    pageviews.forEach((e) => {
      let ref = "Direct";
      if (e.referrer) {
        try {
          ref = new URL(e.referrer).hostname;
        } catch {
          ref = e.referrer.slice(0, 40);
        }
      }
      refMap.set(ref, (refMap.get(ref) || 0) + 1);
    });
    const referrers = Array.from(refMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // Language breakdown
    const langMap = new Map<string, number>();
    pageviews.forEach((e) => {
      const lang = e.language?.split("-")[0] || "unknown";
      langMap.set(lang, (langMap.get(lang) || 0) + 1);
    });
    const languages = Array.from(langMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // Views per day (for chart)
    const dayMap = new Map<string, { views: number; clicks: number }>();
    const daysBack = range === "7d" ? 7 : range === "30d" ? 30 : 90;
    for (let i = daysBack - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      dayMap.set(key, { views: 0, clicks: 0 });
    }
    events.forEach((e) => {
      const key = e.created_at.split("T")[0];
      const entry = dayMap.get(key);
      if (entry) {
        if (e.event_type === "pageview") entry.views++;
        else entry.clicks++;
      }
    });
    const dailyData = Array.from(dayMap.entries()).map(([date, counts]) => ({
      date,
      label: new Date(date + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      ...counts,
    }));

    // Click heatmap data (normalized x,y positions)
    const heatmapData = clicks
      .filter((e) => e.click_x !== null && e.click_y !== null)
      .map((e) => ({ x: e.click_x!, y: e.click_y!, target: e.click_target || "" }));

    // Screen resolutions
    const resMap = new Map<string, number>();
    pageviews.forEach((e) => {
      const res = `${e.screen_width}×${e.screen_height}`;
      resMap.set(res, (resMap.get(res) || 0) + 1);
    });
    const resolutions = Array.from(resMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8);

    // Hourly distribution
    const hourMap = new Array(24).fill(0);
    pageviews.forEach((e) => {
      const hour = new Date(e.created_at).getHours();
      hourMap[hour]++;
    });

    return {
      totalPageviews: pageviews.length,
      totalClicks: clicks.length,
      uniqueVisitors: uniqueIPs.size,
      avgPagesPerVisitor: uniqueIPs.size > 0 ? (pageviews.length / uniqueIPs.size).toFixed(1) : "0",
      topPages,
      topClicks,
      devices,
      browsers,
      referrers,
      languages,
      dailyData,
      heatmapData,
      resolutions,
      hourMap,
    };
  }, [events, range]);

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("admin_token");
  };

  // ===== LOGIN SCREEN =====
  if (!token) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", padding: 16 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>
          <ShieldCheck size={48} style={{ color: "#06b6d4", marginBottom: 16 }} />
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 8 }}>Admin Analytics</h1>
          <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 24 }}>Please log in from the admin panel first</p>
          <button
            onClick={() => window.location.href = "/admin"}
            style={{ padding: "12px 28px", borderRadius: 12, background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer" }}
          >
            Go to Admin Panel
          </button>
        </motion.div>
      </div>
    );
  }

  const maxDailyViews = Math.max(...stats.dailyData.map((d) => d.views), 1);
  const maxDailyClicks = Math.max(...stats.dailyData.map((d) => d.clicks), 1);
  const maxHourly = Math.max(...stats.hourMap, 1);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0" }}>
      {/* Header */}
      <header style={{ background: "rgba(15,23,42,.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(148,163,184,.1)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => window.location.href = "/admin"} style={{ display: "flex", alignItems: "center", gap: 4, color: "#94a3b8", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back
          </button>
          <div style={{ width: 1, height: 20, background: "rgba(148,163,184,.2)" }} />
          <BarChart3 size={20} style={{ color: "#06b6d4" }} />
          <span style={{ fontSize: 15, fontWeight: 800, color: "#f1f5f9" }}>Analytics Dashboard</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Date range selector */}
          <div style={{ display: "flex", gap: 2, background: "rgba(148,163,184,.08)", borderRadius: 10, padding: 3 }}>
            {(["7d", "30d", "90d"] as DateRange[]).map((r) => (
              <button key={r} onClick={() => setRange(r)} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer",
                background: range === r ? "rgba(6,182,212,.15)" : "transparent",
                color: range === r ? "#06b6d4" : "#94a3b8",
                transition: "all .2s",
              }}>
                {r === "7d" ? "7 Days" : r === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>
          <button onClick={fetchAnalytics} disabled={loading} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, background: "rgba(6,182,212,.1)", border: "1px solid rgba(6,182,212,.2)", color: "#06b6d4", cursor: "pointer" }}>
            <RefreshCw size={13} className={loading ? "anim-spin-slow" : ""} /> Refresh
          </button>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 5, color: "#64748b", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            <LogOut size={14} />
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "24px 16px" }}>
        {error && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 12, color: "#f87171", fontSize: 13, marginBottom: 16 }}>
            <AlertTriangle size={14} /> {error}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: 64 }}>
            <Loader2 size={32} className="anim-spin-slow" style={{ color: "#06b6d4", margin: "0 auto 12px" }} />
            <p style={{ fontSize: 14, color: "#94a3b8" }}>Loading analytics data...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* ===== STAT CARDS ===== */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 24 }}>
              <StatCard icon={<Eye size={22} />} iconColor="#06b6d4" label="Page Views" value={stats.totalPageviews} />
              <StatCard icon={<Users size={22} />} iconColor="#8b5cf6" label="Unique Visitors" value={stats.uniqueVisitors} />
              <StatCard icon={<MousePointerClick size={22} />} iconColor="#f97316" label="Total Clicks" value={stats.totalClicks} />
              <StatCard icon={<TrendingUp size={22} />} iconColor="#10b981" label="Pages / Visitor" value={stats.avgPagesPerVisitor} />
            </div>

            {/* ===== TAB NAV ===== */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(148,163,184,.06)", borderRadius: 14, padding: 4, overflowX: "auto" }}>
              {([
                ["overview", "📊 Overview"],
                ["pages", "📄 Top Pages"],
                ["clicks", "🖱️ Clicks"],
                ["heatmap", "🔥 Heatmap"],
                ["devices", "💻 Devices"],
                ["external", "🔗 External"],
              ] as [typeof activeTab, string][]).map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)}
                  style={{
                    flex: "0 0 auto", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", whiteSpace: "nowrap",
                    background: activeTab === key ? "rgba(6,182,212,.12)" : "transparent",
                    color: activeTab === key ? "#06b6d4" : "#94a3b8",
                    transition: "all .2s",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ===== OVERVIEW TAB ===== */}
            {activeTab === "overview" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Daily Views Chart */}
                <div style={{ ...glassCard, gridColumn: "1 / -1" }}>
                  <h3 style={cardTitle}><TrendingUp size={16} style={{ color: "#06b6d4" }} /> Page Views Over Time</h3>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: range === "90d" ? 1 : range === "30d" ? 3 : 6, height: 200, paddingTop: 12 }}>
                    {stats.dailyData.map((d, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700 }}>{d.views || ""}</span>
                        <div style={{ width: "100%", maxWidth: 40, borderRadius: 6, background: `linear-gradient(180deg, #06b6d4 0%, #0891b2 100%)`, height: `${(d.views / maxDailyViews) * 160}px`, minHeight: d.views > 0 ? 4 : 0, transition: "height .3s ease", opacity: 0.9 }} />
                        {range === "7d" && <span style={{ fontSize: 9, color: "#64748b", fontWeight: 600, whiteSpace: "nowrap" }}>{d.label}</span>}
                      </div>
                    ))}
                  </div>
                  {range !== "7d" && (
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                      <span style={{ fontSize: 10, color: "#64748b" }}>{stats.dailyData[0]?.label}</span>
                      <span style={{ fontSize: 10, color: "#64748b" }}>{stats.dailyData[stats.dailyData.length - 1]?.label}</span>
                    </div>
                  )}
                </div>

                {/* Clicks Chart */}
                <div style={glassCard}>
                  <h3 style={cardTitle}><MousePointerClick size={16} style={{ color: "#f97316" }} /> Clicks Over Time</h3>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: range === "90d" ? 1 : range === "30d" ? 2 : 4, height: 140, paddingTop: 8 }}>
                    {stats.dailyData.map((d, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <span style={{ fontSize: 8, color: "#94a3b8", fontWeight: 700 }}>{d.clicks || ""}</span>
                        <div style={{ width: "100%", maxWidth: 28, borderRadius: 4, background: `linear-gradient(180deg, #f97316, #ea580c)`, height: `${(d.clicks / maxDailyClicks) * 110}px`, minHeight: d.clicks > 0 ? 3 : 0, transition: "height .3s ease", opacity: 0.85 }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hourly Distribution */}
                <div style={glassCard}>
                  <h3 style={cardTitle}><Clock size={16} style={{ color: "#8b5cf6" }} /> Peak Hours</h3>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 140, paddingTop: 8 }}>
                    {stats.hourMap.map((count: number, h: number) => (
                      <div key={h} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <div style={{ width: "100%", borderRadius: 3, background: `linear-gradient(180deg, #8b5cf6, #7c3aed)`, height: `${(count / maxHourly) * 110}px`, minHeight: count > 0 ? 3 : 0, transition: "height .3s ease", opacity: 0.85 }} />
                        {h % 4 === 0 && <span style={{ fontSize: 8, color: "#64748b" }}>{h}h</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Referrers */}
                <div style={glassCard}>
                  <h3 style={cardTitle}><Globe size={16} style={{ color: "#10b981" }} /> Top Referrers</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {stats.referrers.length === 0 && <p style={{ fontSize: 13, color: "#64748b" }}>No referrer data yet</p>}
                    {stats.referrers.map(([ref, count], i) => (
                      <BarRow key={i} label={ref} count={count} max={stats.referrers[0]?.[1] || 1} color="#10b981" />
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div style={glassCard}>
                  <h3 style={cardTitle}><MapPin size={16} style={{ color: "#06b6d4" }} /> Languages</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {stats.languages.length === 0 && <p style={{ fontSize: 13, color: "#64748b" }}>No language data yet</p>}
                    {stats.languages.map(([lang, count], i) => (
                      <BarRow key={i} label={lang.toUpperCase()} count={count} max={stats.languages[0]?.[1] || 1} color="#06b6d4" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===== TOP PAGES TAB ===== */}
            {activeTab === "pages" && (
              <div style={glassCard}>
                <h3 style={cardTitle}><Eye size={16} style={{ color: "#06b6d4" }} /> Most Visited Pages</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {stats.topPages.length === 0 && <p style={{ fontSize: 13, color: "#64748b" }}>No page view data yet</p>}
                  {stats.topPages.map(([path, count], i) => (
                    <BarRow key={i} label={path} count={count} max={stats.topPages[0]?.[1] || 1} color="#06b6d4" rank={i + 1} />
                  ))}
                </div>
              </div>
            )}

            {/* ===== CLICKS TAB ===== */}
            {activeTab === "clicks" && (
              <div style={glassCard}>
                <h3 style={cardTitle}><MousePointerClick size={16} style={{ color: "#f97316" }} /> Most Clicked Elements</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {stats.topClicks.length === 0 && <p style={{ fontSize: 13, color: "#64748b" }}>No click data yet. Clicks on buttons and links are tracked automatically.</p>}
                  {stats.topClicks.map(([target, count], i) => (
                    <BarRow key={i} label={target} count={count} max={stats.topClicks[0]?.[1] || 1} color="#f97316" rank={i + 1} />
                  ))}
                </div>
              </div>
            )}

            {/* ===== HEATMAP TAB ===== */}
            {activeTab === "heatmap" && (
              <div style={glassCard}>
                <h3 style={cardTitle}><Flame size={16} style={{ color: "#ef4444" }} /> Click Heatmap (Viewport Distribution)</h3>
                <p style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
                  Each dot represents a click, positioned relative to the viewport. Brighter = more clicks in that area.
                </p>
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "rgba(15,23,42,.6)", borderRadius: 14, border: "1px solid rgba(148,163,184,.1)", overflow: "hidden" }}>
                  {/* Grid lines */}
                  {[25, 50, 75].map((p) => (
                    <div key={`h${p}`} style={{ position: "absolute", left: 0, right: 0, top: `${p}%`, height: 1, background: "rgba(148,163,184,.06)" }} />
                  ))}
                  {[25, 50, 75].map((p) => (
                    <div key={`v${p}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${p}%`, width: 1, background: "rgba(148,163,184,.06)" }} />
                  ))}
                  {/* Axis labels */}
                  <span style={{ position: "absolute", top: 6, left: 8, fontSize: 9, color: "#475569" }}>Top-Left</span>
                  <span style={{ position: "absolute", top: 6, right: 8, fontSize: 9, color: "#475569" }}>Top-Right</span>
                  <span style={{ position: "absolute", bottom: 6, left: 8, fontSize: 9, color: "#475569" }}>Bottom-Left</span>
                  <span style={{ position: "absolute", bottom: 6, right: 8, fontSize: 9, color: "#475569" }}>Bottom-Right</span>
                  <span style={{ position: "absolute", top: "48%", left: "48%", fontSize: 10, color: "#475569", fontWeight: 700 }}>CENTER</span>

                  {stats.heatmapData.length === 0 && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: 14 }}>
                      <Crosshair size={20} style={{ marginRight: 8 }} /> No click data yet
                    </div>
                  )}

                  {/* Render heat dots */}
                  {stats.heatmapData.map((dot, i) => (
                    <div
                      key={i}
                      title={dot.target}
                      style={{
                        position: "absolute",
                        left: `${dot.x}%`,
                        top: `${dot.y}%`,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(239,68,68,.8) 0%, rgba(249,115,22,.4) 50%, rgba(234,179,8,.1) 100%)",
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 8px rgba(239,68,68,.4)",
                        pointerEvents: "none",
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                  <span style={{ fontSize: 11, color: "#64748b" }}>Total click points: <strong style={{ color: "#f1f5f9" }}>{stats.heatmapData.length}</strong></span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>•</span>
                  <span style={{ fontSize: 11, color: "#64748b" }}>For detailed heatmaps, use <a href="https://clarity.microsoft.com/projects/view/w3fdnhoox8/heatmaps" target="_blank" rel="noopener noreferrer" style={{ color: "#06b6d4", textDecoration: "underline" }}>Microsoft Clarity Heatmaps</a></span>
                </div>
              </div>
            )}

            {/* ===== DEVICES TAB ===== */}
            {activeTab === "devices" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Device Type */}
                <div style={glassCard}>
                  <h3 style={cardTitle}><Monitor size={16} style={{ color: "#06b6d4" }} /> Device Type</h3>
                  <div style={{ display: "flex", gap: 14, marginTop: 12 }}>
                    <DeviceCard icon={<Monitor size={28} />} label="Desktop" count={stats.devices.desktop} total={stats.totalPageviews} color="#06b6d4" />
                    <DeviceCard icon={<Smartphone size={28} />} label="Mobile" count={stats.devices.mobile} total={stats.totalPageviews} color="#f97316" />
                    <DeviceCard icon={<Tablet size={28} />} label="Tablet" count={stats.devices.tablet} total={stats.totalPageviews} color="#8b5cf6" />
                  </div>
                </div>

                {/* Browser */}
                <div style={glassCard}>
                  <h3 style={cardTitle}><Globe size={16} style={{ color: "#10b981" }} /> Browsers</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                    {stats.browsers.length === 0 && <p style={{ fontSize: 13, color: "#64748b" }}>No browser data yet</p>}
                    {stats.browsers.map(([browser, count], i) => (
                      <BarRow key={i} label={browser} count={count} max={stats.browsers[0]?.[1] || 1} color="#10b981" />
                    ))}
                  </div>
                </div>

                {/* Resolutions */}
                <div style={{ ...glassCard, gridColumn: "1 / -1" }}>
                  <h3 style={cardTitle}><Monitor size={16} style={{ color: "#8b5cf6" }} /> Screen Resolutions</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                    {stats.resolutions.length === 0 && <p style={{ fontSize: 13, color: "#64748b" }}>No resolution data yet</p>}
                    {stats.resolutions.map(([res, count], i) => (
                      <BarRow key={i} label={res} count={count} max={stats.resolutions[0]?.[1] || 1} color="#8b5cf6" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===== EXTERNAL DASHBOARDS TAB ===== */}
            {activeTab === "external" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
                <ExternalCard
                  title="Microsoft Clarity"
                  description="Session recordings, heatmaps, click maps, scroll maps, and user insights. View dead clicks, rage clicks, and JavaScript errors."
                  url="https://clarity.microsoft.com/projects/view/w3fdnhoox8/dashboard"
                  color="#5b2d90"
                  gradient="linear-gradient(135deg, #5b2d90, #7c3aed)"
                  features={["Session Recordings", "Heatmaps", "Click Maps", "Scroll Maps", "Dead Clicks", "Rage Clicks", "JS Errors"]}
                />
                <ExternalCard
                  title="Meta Pixel (Facebook)"
                  description="Track Facebook/Instagram ad conversions, build audiences, and optimize ad delivery with pixel event data."
                  url="https://business.facebook.com/events_manager2/list/pixel/1913880105901298/overview"
                  color="#1877f2"
                  gradient="linear-gradient(135deg, #1877f2, #3b82f6)"
                  features={["Page Views", "Ad Conversions", "Audience Building", "Event Tracking"]}
                />
                <ExternalCard
                  title="Vercel Analytics"
                  description="Built-in web vitals, real user performance monitoring, and visitor insights from Vercel's edge network."
                  url="https://vercel.com/dashboard"
                  color="#000"
                  gradient="linear-gradient(135deg, #1e293b, #334155)"
                  features={["Web Vitals", "Core Performance", "Visitor Analytics", "Edge Insights"]}
                />
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
        @media (max-width: 768px) {
          header { flex-wrap: wrap; gap: 8px !important; }
        }
      `}</style>
    </div>
  );
}

/* ===== SUB-COMPONENTS ===== */

function StatCard({ icon, iconColor, label, value }: { icon: React.ReactNode; iconColor: string; label: string; value: number | string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: "flex", alignItems: "center", gap: 16, padding: "20px 22px",
        background: "rgba(148,163,184,.04)", borderRadius: 16,
        border: "1px solid rgba(148,163,184,.08)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${iconColor}14`, display: "flex", alignItems: "center", justifyContent: "center", color: iconColor }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 32, fontWeight: 900, color: "#f1f5f9", lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>{label}</div>
      </div>
    </motion.div>
  );
}

function BarRow({ label, count, max, color, rank }: { label: string; count: number; max: number; color: string; rank?: number }) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {rank !== undefined && (
        <span style={{ width: 22, fontSize: 11, fontWeight: 800, color: rank <= 3 ? color : "#64748b", textAlign: "center" }}>#{rank}</span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#cbd5e1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>{label}</span>
          <span style={{ fontSize: 12, fontWeight: 800, color: color }}>{count}</span>
        </div>
        <div style={{ width: "100%", height: 5, borderRadius: 99, background: "rgba(148,163,184,.08)" }}>
          <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${color}, ${color}88)`, transition: "width .5s ease" }} />
        </div>
      </div>
    </div>
  );
}

function DeviceCard({ icon, label, count, total, color }: { icon: React.ReactNode; label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{ flex: 1, textAlign: "center", padding: "18px 12px", borderRadius: 14, background: `${color}08`, border: `1px solid ${color}15` }}>
      <div style={{ color, marginBottom: 8, display: "flex", justifyContent: "center" }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#f1f5f9" }}>{pct}%</div>
      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{count} visits</div>
    </div>
  );
}

function ExternalCard({ title, description, url, color, gradient, features }: { title: string; description: string; url: string; color: string; gradient: string; features: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ borderRadius: 18, overflow: "hidden", border: "1px solid rgba(148,163,184,.08)" }}
    >
      <div style={{ background: gradient, padding: "24px 22px 18px" }}>
        <h3 style={{ fontSize: 18, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{title}</h3>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.75)", lineHeight: 1.5 }}>{description}</p>
      </div>
      <div style={{ padding: "16px 22px 20px", background: "rgba(148,163,184,.04)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {features.map((f) => (
            <span key={f} style={{ padding: "4px 10px", borderRadius: 99, fontSize: 10, fontWeight: 700, background: `${color}14`, color: color === "#000" ? "#94a3b8" : color, border: `1px solid ${color}22` }}>
              {f}
            </span>
          ))}
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px",
            borderRadius: 10, background: gradient, color: "#fff", fontSize: 13, fontWeight: 700,
            textDecoration: "none", transition: "opacity .2s",
          }}
        >
          Open Dashboard <ExternalLink size={13} />
        </a>
      </div>
    </motion.div>
  );
}

/* ===== STYLE CONSTANTS ===== */
const glassCard: React.CSSProperties = {
  padding: "22px 24px",
  background: "rgba(148,163,184,.04)",
  borderRadius: 18,
  border: "1px solid rgba(148,163,184,.08)",
  backdropFilter: "blur(8px)",
};

const cardTitle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  fontWeight: 800,
  color: "#f1f5f9",
  marginBottom: 14,
};
