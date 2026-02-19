"use client";

import Link, { LinkProps } from "next/link";
export type { LinkProps };
import { useLanguage } from "@/context/LanguageContext";
import React from "react";

interface LocalizedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const LocalizedLink = React.forwardRef<HTMLAnchorElement, LocalizedLinkProps>(
  ({ href, children, ...props }, ref) => {
    const { language } = useLanguage();

    const getLocalizedHref = (rawHref: string | object) => {
      if (typeof rawHref !== "string") return rawHref;

      if (
        rawHref.startsWith("http") ||
        rawHref.startsWith("#") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:")
      ) {
        return rawHref;
      }

      if (rawHref.startsWith("/th") || rawHref.startsWith("/en")) {
        return rawHref;
      }

      const path = rawHref.startsWith("/") ? rawHref : `/${rawHref}`;

      if (path === "/") {
        return `/${language}`;
      }

      return `/${language}${path}`;
    };

    return (
      <Link href={getLocalizedHref(href)} {...props} ref={ref}>
        {children}
      </Link>
    );
  },
);

LocalizedLink.displayName = "LocalizedLink";

export default LocalizedLink;
