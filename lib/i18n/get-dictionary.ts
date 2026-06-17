import type { Locale } from "./config";

const dictionaries = {
  es: () => import("@/content/dictionaries/es").then((m) => m.dictionary),
  en: () => import("@/content/dictionaries/en").then((m) => m.dictionary),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["es"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]() as Promise<Dictionary>;
}
