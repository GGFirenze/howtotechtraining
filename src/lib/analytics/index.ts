/**
 * Public entry point for the analytics module.
 *
 * Client-side helpers re-exported from ./client.
 * Server-only helpers live in ./server and must NOT be imported from
 * client components — they are protected by `import "server-only"` so any
 * accidental client-side import will fail loudly at build time.
 */

export { getAmplitudeDeviceId, initAmplitudeClient } from "./client";
