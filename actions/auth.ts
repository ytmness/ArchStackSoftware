"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  resetPasswordSchema,
  signInSchema,
  updatePasswordSchema,
} from "@/lib/validators/auth";

export async function signInAction(formData: FormData) {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { ok: false as const, error: "Credenciales inválidas" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { ok: false as const, error: "Email o contraseña incorrectos" };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, error: "No se pudo iniciar sesión" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    return { ok: false as const, error: "Acceso restringido a administradores" };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function requestPasswordResetAction(formData: FormData) {
  const parsed = resetPasswordSchema.safeParse({
    email: formData.get("email"),
  });
  if (!parsed.success) {
    return { ok: false as const, error: "Email inválido" };
  }

  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${siteUrl}/auth/callback?next=/auth/update-password`,
  });

  if (error) {
    return { ok: false as const, error: "No se pudo enviar el correo" };
  }

  return { ok: true as const };
}

export async function updatePasswordAction(formData: FormData) {
  const parsed = updatePasswordSchema.safeParse({
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { ok: false as const, error: "Contraseña inválida" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return { ok: false as const, error: "No se pudo actualizar la contraseña" };
  }

  redirect("/dashboard");
}
