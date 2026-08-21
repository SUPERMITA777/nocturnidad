import { NextResponse } from "next/server";
import { getSignatureCount } from "@/lib/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const count = await getSignatureCount();
    return NextResponse.json(
      { count },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}

