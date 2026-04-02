import type { en } from "@/locales/en";

export type Locale = "th" | "en";
export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/locales/en").then((m) => m.en),
  th: () => import("@/locales/th").then((m) => m.th),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  if (!dictionaries[locale]) {
    console.warn(`Dictionary for locale '${locale}' not found, falling back to 'th'`);
    return dictionaries["th"]();
  }
  return dictionaries[locale]();
};
