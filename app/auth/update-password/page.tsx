"use client";

import { useActionState } from "react";
import { requestPasswordResetAction, updatePasswordAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UpdatePasswordPage() {
  const [resetState, resetAction, resetPending] = useActionState(
    async (_prev: { ok?: boolean; error?: string } | null, formData: FormData) =>
      requestPasswordResetAction(formData),
    null
  );

  const [updateState, updateAction, updatePending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) =>
      updatePasswordAction(formData),
    null
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-5">
      <div className="grid w-full max-w-md gap-6">
        <Card className="bg-surface">
          <CardHeader>
            <CardTitle>Restablecer contraseña</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={resetAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input id="reset-email" name="email" type="email" required />
              </div>
              {resetState?.error && (
                <p className="text-sm text-destructive">{resetState.error}</p>
              )}
              {resetState?.ok && (
                <p className="text-sm text-primary">Revisa tu correo para continuar.</p>
              )}
              <Button type="submit" disabled={resetPending} className="w-full">
                Enviar enlace
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-surface">
          <CardHeader>
            <CardTitle>Actualizar contraseña</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nueva contraseña</Label>
                <Input id="password" name="password" type="password" required minLength={8} />
              </div>
              {updateState?.error && (
                <p className="text-sm text-destructive">{updateState.error}</p>
              )}
              <Button type="submit" disabled={updatePending} className="w-full">
                Guardar contraseña
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
