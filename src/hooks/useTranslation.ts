"use client";

import { useParams } from "next/navigation";
import { th } from "@/locales/th";
import { en } from "@/locales/en";

export const useTranslation = () => {
  const params = useParams();
  const language = (params?.lang as string) || "th";
  const dict = language === "en" ? en : th;

  const t = (path: string) => {
    return path.split(".").reduce((obj: any, key) => obj?.[key], dict) || path;
  };

  return { t, language };
};
