"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * AnalyticsTracker — drop into layout.tsx to auto-track
 * page views and meaningful click events.
 *
 * Sends data to /api/analytics
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();
  const tracked = useRef<string | null>(null);

  // ---------- PAGE VIEW TRACKING ----------
  useEffect(() => {
    // Prevent duplicate fires for same path
    if (tracked.current === pathname) return;
    tracked.current = pathname;

    // Small delay so document.title has time to update
    const timer = setTimeout(() => {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "pageview",
          page_url: window.location.href,
          page_title: document.title,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
          language: navigator.language,
        }),
        keepalive: true,
      }).catch(() => {});
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  // ---------- CLICK TRACKING ----------
  useEffect(() => {
    let debounce: ReturnType<typeof setTimeout>;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Only track meaningful clicks (buttons, links, inputs, things with data-track)
      const trackable = target.closest("a, button, [data-track], input[type='submit']") as HTMLElement | null;
      if (!trackable) return;

      // Skip admin pages from click tracking
      if (window.location.pathname.startsWith("/admin")) return;

      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const label =
          trackable.getAttribute("data-track") ||
          trackable.getAttribute("aria-label") ||
          trackable.textContent?.trim().slice(0, 80) ||
          trackable.tagName;

        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_type: "click",
            page_url: window.location.href,
            page_title: document.title,
            referrer: document.referrer,
            user_agent: navigator.userAgent,
            screen_width: window.screen.width,
            screen_height: window.screen.height,
            language: navigator.language,
            click_target: label,
            click_x: Math.round((e.clientX / window.innerWidth) * 100),
            click_y: Math.round((e.clientY / window.innerHeight) * 100),
          }),
          keepalive: true,
        }).catch(() => {});
      }, 100);
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null; // invisible component
}
