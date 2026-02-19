"use client";

import {
  useRouter as useNextRouter,
  usePathname as useNextPathname,
} from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export {
  useSearchParams,
  usePathname,
  useParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

export function useLocalizedRouter() {
  const router = useNextRouter();
  const { language } = useLanguage();

  const localizePath = (path: string) => {
    if (
      !path.startsWith("/") ||
      path.startsWith("/en") ||
      path.startsWith("/th") ||
      path.startsWith("http")
    ) {
      return path;
    }

    return `/${language}${path === "/" ? "" : path}`;
  };

  return {
    ...router,
    push: (href: string, options?: any) =>
      router.push(localizePath(href), options),
    replace: (href: string, options?: any) =>
      router.replace(localizePath(href), options),
    prefetch: (href: string, options?: any) =>
      router.prefetch(localizePath(href), options),
  };
}
