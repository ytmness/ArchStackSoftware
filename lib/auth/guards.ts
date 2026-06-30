import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getSession() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    return data.user;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  let supabase;
  let user;

  try {
    supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      redirect("/login");
    }
    user = data.user;
  } catch {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile || profile.role !== "admin") {
    redirect("/login?error=unauthorized");
  }

  return { user, profile };
}
