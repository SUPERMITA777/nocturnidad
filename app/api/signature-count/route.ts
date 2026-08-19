import { NextResponse } from "next/server";
import { getSignatureCount } from "@/lib/actions";

export async function GET() {
  try {
    const count = await getSignatureCount();
    return NextResponse.json({ count }, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
