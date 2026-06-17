"use client";

import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { ProcessScannerSection } from "@/components/marketing/process-scanner-section";

export function Process({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return <ProcessScannerSection locale={locale} dict={dict} />;
}
