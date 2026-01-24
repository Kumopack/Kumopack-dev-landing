import { learningArticles, LearningArticle } from "@/data/learning";
import LearningContent from "./LearningContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export async function generateStaticParams() {
    return learningArticles.map((article) => ({
        id: article.id,
    }));
}

export default async function LearningDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = learningArticles.find(a => a.id === id);

    if (!article) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-32 pb-24 text-center">
                    <h1 className="text-2xl font-bold">Article not found</h1>
                    <Link href="/learning" className="text-primary mt-4 inline-block">Back to Learning Center</Link>
                </div>
                <Footer />
            </main>
        );
    }

    return <LearningContent article={article} />;
}
