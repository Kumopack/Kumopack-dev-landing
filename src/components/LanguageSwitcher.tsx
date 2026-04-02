"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import Cookies from "js-cookie";

export function useLanguageSwitcher(currentLang: string) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = useCallback((newLang: string) => {
    if (currentLang === newLang) return;

    localStorage.setItem("kumopack_lang", newLang);
    Cookies.set("NEXT_LOCALE", newLang, { expires: 365, path: "/" });

    const segments = pathname.split("/");
    if (segments[1] === "en" || segments[1] === "th") {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }
    
    const newPath = segments.join("/") || "/";
    router.push(newPath);
    router.refresh();
  }, [currentLang, pathname, router]);

  return { switchLanguage };
}

