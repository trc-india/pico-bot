import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Prefer service_role key (bypasses RLS) — this is a server-only route so it's safe
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !url.startsWith("http")) return null;
  return createClient(url, key);
}

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return false;
  try {
    const decoded = Buffer.from(auth.replace("Bearer ", ""), "base64").toString("utf-8");
    const [email] = decoded.split(":");
    return email === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "bookings" or "contacts"

    if (type === "bookings") {
      const { data, error } = await supabase
        .from("call_bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ data });
    }

    if (type === "contacts") {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return NextResponse.json({ data });
    }

    return NextResponse.json({ error: "Invalid type parameter. Use ?type=bookings or ?type=contacts" }, { status: 400 });
  } catch (err) {
    console.error("Admin data error:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// UPDATE a record (status, date, time, etc.)
export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const { type, id, updates } = await request.json();
    if (!type || !id || !updates) {
      return NextResponse.json({ error: "Missing type, id, or updates" }, { status: 400 });
    }

    const table = type === "bookings" ? "call_bookings" : type === "contacts" ? "contact_submissions" : null;
    if (!table) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from(table)
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    console.error("Admin update error:", err);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}

// DELETE a record
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const { type, id } = await request.json();
    if (!type || !id) {
      return NextResponse.json({ error: "Missing type or id" }, { status: 400 });
    }

    const table = type === "bookings" ? "call_bookings" : type === "contacts" ? "contact_submissions" : null;
    if (!table) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin delete error:", err);
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}
