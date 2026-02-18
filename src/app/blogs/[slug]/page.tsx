import { blogApi } from "@/lib/blog-api";
import BlogContent from "./BlogContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { getSafeSlug, slugMatches } from "@/lib/slug-utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamicParams = false;
export const revalidate = 0;

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development") {
    return [];
  }

  try {
    const response = await blogApi.getArticles(1, 20);
    if (!response.data || response.data.length === 0) return [];

    return response.data
      .filter((a) => a.slug)
      .map((a) => ({ slug: getSafeSlug(a.slug) }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = String(rawSlug);

  let decodedSlug = slug;
  try {
    let prev = "";
    while (decodedSlug !== prev) {
      prev = decodedSlug;
      decodedSlug = decodeURIComponent(decodedSlug);
    }
  } catch (e) {}
  decodedSlug = decodedSlug.normalize("NFC");

  let blog = await blogApi.getArticleBySlug(decodedSlug);
  if (!blog) {
    const response = await blogApi.getArticles(1, 100);
    blog =
      response.data.find((a) => a.slug && slugMatches(a.slug, decodedSlug)) ||
      null;
  }

  if (!blog) return { title: "Article Not Found | Kumopack" };

  const name = blog.nameTh;
  const title = `${name} | Kumopack Blog`;
  const ogImage = blogApi.getAssetPath(blog.featurePicturePath);

  return {
    title,
    description: blog.shortDescriptionTh,
    openGraph: {
      title,
      description: blog.shortDescriptionTh,
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
      type: "article",
      publishedTime: blog.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: blog.shortDescriptionTh,
      images: [ogImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = String(rawSlug);

  let decodedSlug = slug;
  try {
    let prev = "";
    while (decodedSlug !== prev) {
      prev = decodedSlug;
      decodedSlug = decodeURIComponent(decodedSlug);
    }
  } catch (e) {}
  decodedSlug = decodedSlug.normalize("NFC");

  let blog = null;
  try {
    blog = await blogApi.getArticleBySlug(decodedSlug);
    if (!blog) {
      const response = await blogApi.getArticles(1, 100);
      blog =
        response.data.find((a) => a.slug && slugMatches(a.slug, decodedSlug)) ||
        null;
      if (blog) blog = await blogApi.getArticleBySlug(String(blog.slug));
    }
  } catch (error) {}

  if (!blog) {
    if (process.env.NODE_ENV === "production") {
      // In static export, if it's not in generateStaticParams, it's a 404 (or fallback if configured)
      // But since we set dynamicParams = false, we shouldn't reach here for unknown slugs unless we return a 404.
      // However, to be safe and allow client-side hydration to try:
    }

    // For static export build, we might need to return null or handle this.
    // But better yet, let's allow it to render a "shell" that client-side logic can populate if needed?
    // Actually, with dynamicParams=false, Next.js will 404 any path not in generateStaticParams.
    // So this fallback logic is mostly for dev mode or if we relax the config.

    // If we want to support dynamic slugs in a static export, we CANNOT.
    // We MUST pre-render all of them.
    // So this server-side fetch attempt in the component body is technically useless for `output: export`
    // because the component runs ONLY at build time.

    blog = {
      id: -1,
      slug: decodedSlug,
      nameTh: "Loading...",
      nameEn: "Loading...",
      shortDescriptionTh: "",
      shortDescriptionEn: "",
      contentTh: "",
      contentEn: "",
      featurePicturePath: null,
      publishedDate: new Date().toISOString(),
    } as any;
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-kumopack-base-white">
          <Loader2 className="w-10 h-10 text-primary animate-spin opacity-20" />
        </div>
      }
    >
      <BlogContent blog={blog} />
    </Suspense>
  );
}
