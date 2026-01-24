import { blogs, Blog } from "@/data/blogs";
import BlogContent from "./BlogContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = blogs.find((b: Blog) => b.slug === slug);

    if (!blog) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Navbar />
                <div className="container mx-auto max-w-6xl pt-40 text-center">
                    <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
                    <p className="text-muted-foreground mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/blogs">
                        <Button variant="hero">Back to Blog</Button>
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    return <BlogContent blog={blog} />;
}
