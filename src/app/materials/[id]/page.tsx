import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
    return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

export default async function MaterialDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-5xl">
                    <Link href="/materials" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Materials
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="aspect-square rounded-3xl overflow-hidden border border-border/50 shadow-float">
                            <img
                                src="https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=2070"
                                alt="Material detail"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl font-bold mb-4">Kraft Paper</h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Our premium Kraft paper is sourced from sustainable forests, offering a natural feel and excellent durability for all your packaging needs.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">Key Specifications</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Available in 150 - 350 GSM",
                                        "100% Recyclable & Biodegradable",
                                        "Excellent printability for minimal designs",
                                        "High tensile strength for heavy items",
                                        "Neutral pH, acid-free options"
                                    ].map((spec, idx) => (
                                        <li key={idx} className="flex gap-3 items-center text-muted-foreground">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
                                <div className="font-bold text-lg mb-2 text-primary">Sustainability Score: 9.5/10</div>
                                <p className="text-sm text-muted-foreground">
                                    This material is one of our most sustainable options, requiring 40% less energy to produce than traditional bleached paper.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
