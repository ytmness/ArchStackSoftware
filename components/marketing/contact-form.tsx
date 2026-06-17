"use client";

import { useState, useTransition } from "react";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { createLeadAction } from "@/actions/leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactForm({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    setError("");
    startTransition(async () => {
      const result = await createLeadAction({
        locale,
        name: String(formData.get("name") ?? ""),
        company: String(formData.get("company") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        service_interest: String(formData.get("service_interest") ?? ""),
        budget_range: String(formData.get("budget_range") ?? ""),
        timeline: String(formData.get("timeline") ?? ""),
        message: String(formData.get("message") ?? ""),
        source: "website",
      });

      if (!result.ok) {
        setError(dict.contact.error);
        return;
      }
      setSuccess(true);
    });
  }

  if (success) {
    return (
      <Card className="bg-surface">
        <CardContent className="py-12 text-center">
          <p className="text-2xl font-semibold">{dict.contact.success}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="bg-surface">
        <CardContent className="p-6 md:p-8">
          <form action={onSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{dict.contact.name}</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">{dict.contact.company}</Label>
                <Input id="company" name="company" />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">{dict.contact.email}</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{dict.contact.phone}</Label>
                <Input id="phone" name="phone" />
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="service_interest">{dict.contact.service}</Label>
                <Input id="service_interest" name="service_interest" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget_range">{dict.contact.budget}</Label>
                <Input id="budget_range" name="budget_range" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">{dict.contact.timeline}</Label>
              <Input id="timeline" name="timeline" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{dict.contact.message}</Label>
              <Textarea id="message" name="message" required />
            </div>
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" disabled={pending} className="w-full md:w-auto">
              {pending ? dict.common.loading : dict.contact.submit}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="h-fit bg-surface-2">
        <CardHeader>
          <CardTitle>{dict.contact.whatNext}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {dict.contact.whatNextBody}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
