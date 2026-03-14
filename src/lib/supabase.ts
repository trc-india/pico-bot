import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Only create a real client if valid config is present
const isConfigured =
  supabaseUrl.startsWith("http") && supabaseAnonKey.length > 10;

// Create a real client or a dummy that always errors gracefully
export const supabase: SupabaseClient = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (new Proxy({} as SupabaseClient, {
      get(_, prop) {
        if (prop === "from") {
          return () => ({
            insert: async () => ({
              data: null,
              error: { message: "Supabase not configured. Add your keys to .env.local" },
            }),
            select: async () => ({
              data: [],
              error: { message: "Supabase not configured" },
            }),
          });
        }
        return () => {};
      },
    }));

export const isSupabaseConfigured = isConfigured;
