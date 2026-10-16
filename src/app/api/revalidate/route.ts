import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { MEDIA_TAG } from "@/sanity/media";

/**
 * Sanity webhook: refreshes every page's media when a document is published.
 * Set it up in sanity.io/manage → API → Webhooks, pointing at
 * https://www.applausereality.com/api/revalidate with SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new NextResponse("Webhook secret not configured", { status: 500 });

  const body = await req.text();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  if (!(await isValidSignature(body, signature, secret))) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  // The CDN takes a moment to serve the new version after the webhook fires.
  await new Promise((resolve) => setTimeout(resolve, 3000));
  revalidateTag(MEDIA_TAG);
  return NextResponse.json({ revalidated: MEDIA_TAG });
}
