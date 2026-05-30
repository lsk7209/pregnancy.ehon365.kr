import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { cpaOffers } from "@/db/schema";

interface RouteContext {
  params: Promise<{ offerId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { offerId } = await params;
  const id = Number.parseInt(offerId, 10);
  if (!Number.isInteger(id)) {
    return NextResponse.redirect(new URL("/fetal-insurance", request.url));
  }

  const [offer] = await db
    .select()
    .from(cpaOffers)
    .where(eq(cpaOffers.id, id))
    .limit(1);

  if (!offer || offer.status !== "active") {
    return NextResponse.redirect(new URL("/fetal-insurance", request.url));
  }

  const target = new URL(offer.landingUrl);
  const incomingSubId = request.nextUrl.searchParams.get("sub_id");
  target.searchParams.set(offer.subIdParam, incomingSubId ?? `offer-${id}`);

  return NextResponse.redirect(target);
}
