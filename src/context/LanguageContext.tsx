"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { th } from "@/locales/th";
import { en } from "@/locales/en";
import { useParams, usePathname } from "next/navigation";

type Language = "th" | "en";
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dict: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations: Record<Language, Translations> = { th, en };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const pathname = usePathname();

  const urlLang = params?.lang as Language;

  const [language, setLanguageState] = useState<Language>(
    urlLang && ["th", "en"].includes(urlLang) ? urlLang : "th",
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (urlLang && ["th", "en"].includes(urlLang) && urlLang !== language) {
      setLanguageState(urlLang);
    }
    setIsHydrated(true);
  }, [urlLang, language]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    setLanguageState(lang);
    localStorage.setItem("kumopack_lang", lang);

    if (pathname) {
      const segments = pathname.split("/");

      let newPath: string;
      if (segments[1] === "en" || segments[1] === "th") {
        segments[1] = lang;
        newPath = segments.join("/") || "/";
      } else {
        newPath = `/${lang}${pathname}`;
      }

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("lang", lang);
      window.location.href = `${newPath}?${searchParams.toString()}`;
    }
  };

  const t = (key: string): string => {
    if (!isHydrated) return "";
    const keys = key.split(".");
    let result: any = translations[language];

    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key;
      }
    }

    return typeof result === "string" ? result : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        dict: translations[language],
      }}
    >
      <div style={{ visibility: isHydrated ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
