import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle2, Ruler, Paintbrush, Cog } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
    return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-6">
                            <div className="aspect-square rounded-3xl overflow-hidden border border-border/50 shadow-float bg-muted/20">
                                <img
                                    src="https://images.unsplash.com/photo-1549463327-f0c39f1c4801?auto=format&fit=crop&q=80&w=2070"
                                    alt="Product detail"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-border/50">
                                        <img src={`https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&q=80&w=2070&v=${i}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-6">Mailer Box</h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    The gold standard for e-commerce packaging. Stylish, strong, and customizable on every surface. Perfect for creating that unforgettable unboxing experience.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-3 gap-6">
                                <div className="p-6 rounded-2xl bg-card border border-border/50 text-center">
                                    <Ruler className="w-8 h-8 text-primary mx-auto mb-4" />
                                    <h4 className="font-bold">Scalable</h4>
                                    <p className="text-xs text-muted-foreground">Any size</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-card border border-border/50 text-center">
                                    <Paintbrush className="w-8 h-8 text-primary mx-auto mb-4" />
                                    <h4 className="font-bold">Art Ready</h4>
                                    <p className="text-xs text-muted-foreground">Full color CMYK</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-card border border-border/50 text-center">
                                    <Cog className="w-8 h-8 text-primary mx-auto mb-4" />
                                    <h4 className="font-bold">Durable</h4>
                                    <p className="text-xs text-muted-foreground">Flute structure</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold">Standard Features</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        "No adhesive needed",
                                        "Self-locking lid",
                                        "Dust flaps",
                                        "Recyclable materials",
                                        "Inside printing options",
                                        "Matte or Gloss finish"
                                    ].map((feat, idx) => (
                                        <div key={idx} className="flex gap-3 items-center text-muted-foreground">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button size="lg" className="w-full py-8 text-xl shadow-glow">Start Designing</Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
