import { Suspense } from "react";
import type { Metadata } from "next";
import { learningApi, LearningArticle } from "@/lib/learning-api";
import LearningContent from "./LearningContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

import { getSafeSlug, slugMatches } from "@/lib/slug-utils";

export const dynamicParams = false;

// ---------------------------------------------------------------------------
// Dynamic Metadata (SEO + Accessibility)
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawId } = await params;
  const language = "th";

  let decodedSlug = String(rawId);
  try {
    let prev = "";
    while (decodedSlug !== prev) {
      prev = decodedSlug;
      decodedSlug = decodeURIComponent(decodedSlug);
    }
  } catch (e) {}
  decodedSlug = decodedSlug.normalize("NFC");

  try {
    const article = await learningApi.getArticleBySlug(decodedSlug, language);
    if (article) {
      return {
        title: article.meta?.title || article.title,
        description:
          article.meta?.description ||
          article.description ||
          article.excerpt ||
          `${article.title} - Kumopack Learning Center`,
      };
    }
  } catch (e) {}

  return {
    title: "Learning Center | Kumopack",
    description: "In-depth guides and insights for packaging professionals.",
  };
}

export async function generateStaticParams() {
  try {
    const [sitemapTh, sitemapEn] = await Promise.all([
      learningApi.getSitemap("th"),
      learningApi.getSitemap("en"),
    ]);

    const apiArticles = [
      ...(sitemapTh.articles || []),
      ...(sitemapEn.articles || []),
    ];

    const allSlugs = new Set([
      ...apiArticles.map((a) => a.slug).filter(Boolean),
      "แหล่งเรียนรู้",
      "แหล่งการเรียงรู้",
      "โรงงานกล่องบรรจุภัณฑ์กระดาษ-และทิศทางอุตสาหกรรมกระดาษในประเทศไทย",
      "การวิเคราะห์ข้อมูลสำหรับการตัดสินใจทางธุรกิจ",
      "การเริ่มต้น",
    ]);

    const params = Array.from(allSlugs).map((rawSlug) => {
      let decoded = String(rawSlug);
      try {
        decoded = decodeURIComponent(decoded);
      } catch (e) {}
      const safeSlug = getSafeSlug(decoded);
      return { slug: safeSlug };
    });

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
  const audience = "buyer";
  const language = "th";
  const slug = String(rawId);

  let decodedSlug = slug;
  try {
    let prev = "";
    while (decodedSlug !== prev) {
      prev = decodedSlug;
      decodedSlug = decodeURIComponent(decodedSlug);
    }
  } catch (e) {}
  decodedSlug = decodedSlug.normalize("NFC");

  let article: LearningArticle | null = null;
  let relatedArticles: LearningArticle[] = [];
  let isFallback = false;

  try {
    article = await learningApi.getArticleBySlug(
      decodedSlug,
      language,
      undefined,
    );

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
        article = await learningApi.getArticleBySlug(match.slug, language);
        if (!article) {
          const otherLang = language === "th" ? "en" : "th";
          article = await learningApi.getArticleBySlug(match.slug, otherLang);
        }
      }
    }

    if (article) {
      isFallback = !article.url.startsWith(`/${language}/`);
      // Fetch related articles concurrently on the server side
      relatedArticles = await learningApi.getRelatedArticles(article.slug, language);
    } else {
      article = {
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
    }
  } catch (error) {
    article = {
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
  }

  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center bg-kumopack-base-white"
          role="status"
          aria-label="Loading article"
        >
          <Loader2 className="w-12 h-12 text-primary animate-spin opacity-20" aria-hidden="true" />
          <span className="sr-only">Loading article content...</span>
        </div>
      }
    >
      <LearningContent
        article={article}
        relatedArticles={relatedArticles}
        audience={audience}
        isFallback={isFallback}
      />
    </Suspense>
  );
}
