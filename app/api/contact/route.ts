import { NextResponse } from "next/server";
import { createLeadAction } from "@/actions/leads";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await createLeadAction(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error procesando la solicitud" }, { status: 500 });
  }
}
