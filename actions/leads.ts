"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { leadSchema } from "@/lib/validators/lead";

export async function createLeadAction(input: unknown) {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "Datos inválidos" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    ...parsed.data,
    company: parsed.data.company || null,
    phone: parsed.data.phone || null,
    service_interest: parsed.data.service_interest || null,
    budget_range: parsed.data.budget_range || null,
    timeline: parsed.data.timeline || null,
    source: parsed.data.source ?? "website",
  });

  if (error) {
    console.error("[createLeadAction]", error.message);
    return { ok: false as const, error: "No se pudo guardar el lead" };
  }

  revalidatePath("/dashboard/leads");
  return { ok: true as const };
}
