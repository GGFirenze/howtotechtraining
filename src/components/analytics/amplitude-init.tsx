"use client";

import { useEffect } from "react";

import { initAmplitudeClient } from "@/lib/analytics/client";

/**
 * Side-effect-only client component that initialises the Amplitude browser
 * SDK on mount.
 *
 * Renders `null` — it exists purely so the layout can include analytics
 * setup without leaking client APIs into a Server Component.
 *
 * Placed once near the root of the app (in `app/layout.tsx`). Multiple
 * mounts are harmless because the underlying init function is idempotent.
 */
export function AmplitudeInit() {
  useEffect(() => {
    initAmplitudeClient();
  }, []);
  return null;
}
