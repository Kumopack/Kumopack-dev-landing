import { blogApi } from "@/lib/blog-api";
import BlogContent from "./BlogContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { Metadata } from "next";

// NOTE: In Next.js with 'output: export', searchParams are NOT available to server-side generateMetadata
// or the page component itself at build time. Multilingual SEO for query params must be handled on the client.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Decode slug to ensure we handle Thai characters correctly
  const decodedSlug = decodeURIComponent(slug);
  const blog = await blogApi.getArticleBySlug(decodedSlug);

  if (!blog) {
    return {
      title: "Article Not Found | Kumopack",
    };
  }

  // Static metadata uses Thai as default for SEO in static export without path-based routing
  const name = blog.nameTh;
  const description = blog.shortDescriptionTh;

  const title = `${name} | Kumopack Blog`;
  const ogImage = blogApi.getAssetPath(blog.featurePicturePath);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
      type: "article",
      publishedTime: blog.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await blogApi.getArticles(1, 100);
    console.log(
      `[generateStaticParams] Fetched ${response.data?.length} articles`,
    );

    if (!response.data || response.data.length === 0) {
      console.warn(
        "[generateStaticParams] No articles found via API. Using fallback 'mascot'.",
      );
      return [{ slug: "mascot" }];
    }

    const params = response.data
      .filter((article) => article.slug)
      .map((article) => ({
        slug: String(article.slug),
      }));

    return params;
  } catch (error) {
    console.error(
      "[generateStaticParams] Error fetching articles. Using fallback 'mascot'. Error:",
      error,
    );
    // Return at least one known slug to prevent 'missing param' error if API fails
    return [{ slug: "mascot" }];
  }
}

import { Suspense } from "react";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Decode slug to ensure we handle Thai characters correctly
  const decodedSlug = decodeURIComponent(slug);

  // Server-side fetch (runs at build time for 'export' output)
  const blog = await blogApi.getArticleBySlug(decodedSlug);

  if (!blog) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto max-w-6xl pt-40 px-4 text-center">
          <h1 className="text-4xl font-black mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/blogs">
            <Button variant="hero" className="rounded-2xl shadow-glow">
              Back to Blog
            </Button>
          </Link>
        </div>
        <div className="mt-40">
          <Footer />
        </div>
      </main>
    );
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
