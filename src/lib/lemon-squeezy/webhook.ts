import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Verify a Lemon Squeezy webhook signature.
 *
 * Lemon Squeezy signs the *raw* webhook body using HMAC-SHA-256 with the
 * webhook signing secret configured in the LS dashboard. The hex-encoded
 * digest is sent in the `X-Signature` header. We re-compute the digest
 * and compare in constant time to defeat any timing-based attacks.
 *
 * Reference: https://docs.lemonsqueezy.com/help/webhooks#signing-requests
 */
export function verifyLemonSqueezySignature({
  rawBody,
  signature,
  secret,
}: {
  rawBody: string;
  signature: string | null | undefined;
  secret: string;
}): boolean {
  if (!signature) return false;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");

  // Buffers must be equal length for timingSafeEqual; fail closed otherwise.
  let received: Buffer;
  let computed: Buffer;
  try {
    received = Buffer.from(signature, "hex");
    computed = Buffer.from(expected, "hex");
  } catch {
    return false;
  }

  if (received.length !== computed.length) return false;
  return timingSafeEqual(received, computed);
}
