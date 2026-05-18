import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./types";

/**
 * Lazily-initialised, cached Supabase admin client.
 *
 * Uses the SERVICE ROLE key, which bypasses RLS — DO NOT call this from
 * any code path that runs in the browser. The `import "server-only"`
 * directive at the top of this file means any accidental client import
 * fails at build time.
 *
 * Caching prevents recreating the underlying fetch wrapper on every
 * request handler invocation.
 */
let cached: SupabaseClient<Database> | null = null;

/**
 * Returns a fully-configured Supabase admin client.
 *
 * Throws if the required environment variables are not set, because the
 * call sites that need this client (webhook handler, download endpoint)
 * cannot meaningfully degrade — a missing key here means the feature
 * is broken and should surface loudly.
 */
export function getSupabaseAdmin(): SupabaseClient<Database> {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error("Supabase admin client misconfigured: NEXT_PUBLIC_SUPABASE_URL is not set.");
  }
  if (!serviceRoleKey) {
    throw new Error("Supabase admin client misconfigured: SUPABASE_SERVICE_ROLE_KEY is not set.");
  }

  cached = createClient<Database>(url, serviceRoleKey, {
    auth: {
      // Server-only client: no sessions, no auto-refresh, no cookies.
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        // Identifies our deployments in Supabase request logs.
        "X-Client-Info": "crackvilt-server",
      },
    },
  });

  return cached;
}
