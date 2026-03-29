import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceKey || supabaseServiceKey.trim().length < 10) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey.trim());
}

// POST — Record a page view or click event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      event_type = "pageview",  // "pageview" | "click"
      page_url,
      page_title,
      referrer,
      user_agent,
      screen_width,
      screen_height,
      language,
      click_target,
      click_x,
      click_y,
    } = body;

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // Get IP and geo info from request headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown";

    const { error } = await supabase.from("analytics_events").insert({
      event_type,
      page_url: page_url || "",
      page_title: page_title || "",
      referrer: referrer || "",
      user_agent: user_agent || "",
      screen_width: screen_width || 0,
      screen_height: screen_height || 0,
      language: language || "",
      ip_address: ip,
      click_target: click_target || null,
      click_x: click_x || null,
      click_y: click_y || null,
    });

    if (error) {
      console.error("Analytics insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET — Fetch analytics data (admin only)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "7d"; // 7d, 30d, 90d
  const type = searchParams.get("type") || "all"; // all, pageviews, clicks

  // Calculate date range
  const now = new Date();
  let daysBack = 7;
  if (range === "30d") daysBack = 30;
  if (range === "90d") daysBack = 90;
  const fromDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000).toISOString();

  try {
    let query = supabase
      .from("analytics_events")
      .select("*")
      .gte("created_at", fromDate)
      .order("created_at", { ascending: false })
      .limit(5000);

    if (type === "pageviews") {
      query = query.eq("event_type", "pageview");
    } else if (type === "clicks") {
      query = query.eq("event_type", "click");
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
