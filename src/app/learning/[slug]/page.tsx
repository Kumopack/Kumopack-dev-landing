import { learningApi, LearningArticle } from "@/lib/learning-api";
import LearningContent from "./LearningContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { getSafeSlug, slugMatches } from "@/lib/slug-utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    // Fetch both TH and EN sitemaps to ensure all multilingual routes are covered
    const [sitemapTh, sitemapEn] = await Promise.all([
      learningApi.getSitemap("th"),
      learningApi.getSitemap("en"),
    ]);

    const apiArticles = [
      ...(sitemapTh.articles || []),
      ...(sitemapEn.articles || []),
    ];

    // Collect all unique slugs, including hardcoded fallbacks
    const allSlugs = new Set([
      ...apiArticles.map((a) => a.slug).filter(Boolean),
      "แหล่งเรียนรู้",
      "แหล่งการเรียงรู้",
      "โรงงานกล่องบรรจุภัณฑ์กระดาษ-และทิศทางอุตสาหกรรมกระดาษในประเทศไทย",
      "การวิเคราะห์ข้อมูลสำหรับการตัดสินใจทางธุรกิจ",
      "การเริ่มต้น",
    ]);

    const params = Array.from(allSlugs).map((rawSlug) => {
      // Decode and normalize to ensure we match what browser sends
      let decoded = String(rawSlug);
      try {
        decoded = decodeURIComponent(decoded);
      } catch (e) {}

      const safeSlug = getSafeSlug(decoded);
      return { slug: safeSlug };
    });

    // Remove duplicates that might have been created by normalization/hashing
    const uniqueParams = Array.from(
      new Map(params.map((p) => [p.slug, p])).values(),
    );

    return uniqueParams;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [
      { slug: getSafeSlug("แหล่งเรียนรู้") },
      { slug: getSafeSlug("แหล่งการเรียงรู้") },
      { slug: getSafeSlug("การเริ่มต้น") },
    ];
  }
}

export default async function LearningDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawId } = await params;

  // NOTE: For 'output: export', searchParams are NOT available on the server at build time.
  // We use defaults for the static pre-rendering, and LearningContent (client component)
  // will handle the actual language/audience sync from the URL after hydration.
  const audience = "buyer";
  const language = "th";
  const slug = String(rawId);

  // Normalize slug
  let decodedSlug = slug;
  try {
    let prev = "";
    while (decodedSlug !== prev) {
      prev = decodedSlug;
      decodedSlug = decodeURIComponent(decodedSlug);
    }
  } catch (e) {}
  decodedSlug = decodedSlug.normalize("NFC");

  try {
    // 1. Primary Fetch: Try with Slug (ID is not available at build time for static export)
    let article = await learningApi.getArticleBySlug(
      decodedSlug,
      language,
      undefined,
    );

    // 2. Fallback: Search in sitemaps (handles safe/hashed slugs)
    if (!article) {
      const [sitemapTh, sitemapEn] = await Promise.all([
        learningApi.getSitemap("th"),
        learningApi.getSitemap("en"),
      ]);

      const allArticles = [
        ...(sitemapTh.articles || []),
        ...(sitemapEn.articles || []),
      ];

      const match = allArticles.find((item) =>
        slugMatches(item.slug, decodedSlug),
      );

      if (match) {
        // If we found a match in sitemaps, fetch using the REAL slug from the sitemap
        // and its own implicit language (or the current one)
        article = await learningApi.getArticleBySlug(match.slug, language);

        // Final fallback: if lang mismatch, try the other lang
        if (!article) {
          const otherLang = language === "th" ? "en" : "th";
          article = await learningApi.getArticleBySlug(match.slug, otherLang);
        }
      }
    }

    // RESCUE STRATEGY: If still no article at build time, we DON'T show "Not Found" yet.
    // Instead, we pass a "Shell" article to LearningContent.
    // LearningContent (client-side) will see the articleId in the URL and fetch the REAL content.
    if (!article) {
      const shellArticle: LearningArticle = {
        id: -1,
        slug: decodedSlug,
        title: "Loading Content...",
        description: "",
        excerpt: "",
        content: "",
        category: "General",
        tags: [],
        audience: "buyer",
        image: "",
        featuredImagePath: null,
        thumbnailPath: null,
        videos: [],
        date: new Date().toISOString(),
        publishedAt: null,
        views: 0,
        viewCount: 0,
        url: `/${language}/learning-center/article/${decodedSlug}`,
        difficultyLevel: "beginner",
        difficultyText: "Beginner",
        meta: { title: "Loading...", description: "" },
      };

      return (
        <LearningContent
          article={shellArticle}
          audience={audience}
          isFallback={false}
        />
      );
    }

    const isFallback = Boolean(
      article && !article.url.startsWith(`/${language}/`),
    );

    return (
      <LearningContent
        article={article}
        audience={audience}
        isFallback={isFallback}
      />
    );
  } catch (error) {
    // Return a shell even on error, to allow client-side rescue
    const errorShell: LearningArticle = {
      id: -1,
      slug: String(rawId),
      title: "Loading...",
      description: "",
      excerpt: "",
      content: "",
      category: "General",
      tags: [],
      audience: "buyer",
      image: "",
      featuredImagePath: null,
      thumbnailPath: null,
      videos: [],
      date: new Date().toISOString(),
      publishedAt: null,
      views: 0,
      viewCount: 0,
      url: `/th/learning-center/article/${rawId}`,
      difficultyLevel: "beginner",
      difficultyText: "Beginner",
      meta: { title: "Loading...", description: "" },
    };
    return (
      <LearningContent
        article={errorShell}
        audience={"buyer"}
        isFallback={false}
      />
    );
  }
}
