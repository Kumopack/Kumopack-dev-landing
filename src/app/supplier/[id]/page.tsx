import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Star, MapPin, ShieldCheck, Factory, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
    return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

export default async function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-6xl">
                    <Link href="/supplier" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Suppliers
                    </Link>

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
                        <div className="w-full lg:w-1/3 aspect-square rounded-[2.5rem] overflow-hidden shadow-float border border-border/50">
                            <img
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
                                alt="Factory"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-8">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Print Co.</h1>
                                    <div className="flex items-center gap-4 text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            Bangkok, Thailand
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-primary fill-primary" />
                                            <span className="font-bold text-foreground">4.9</span> (120 reviews)
                                        </div>
                                    </div>
                                </div>
                                <Button size="lg" className="rounded-2xl shadow-glow">Request Custom Quote</Button>
                            </div>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                With over 20 years of experience in high-end offset printing, Premium Print Co. specializes in luxury mailer boxes and specialty finishes for global brands.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                <div className="p-4 rounded-2xl bg-card border border-border/50">
                                    <div className="text-primary font-bold text-2xl mb-1">20y</div>
                                    <div className="text-xs text-muted-foreground uppercase">Experience</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-card border border-border/50">
                                    <div className="text-primary font-bold text-2xl mb-1">50k</div>
                                    <div className="text-xs text-muted-foreground uppercase">Cap / Day</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-card border border-border/50">
                                    <div className="text-primary font-bold text-2xl mb-1">ISO</div>
                                    <div className="text-xs text-muted-foreground uppercase">Certified</div>
                                </div>
                                <div className="p-4 rounded-2xl bg-card border border-border/50">
                                    <div className="text-primary font-bold text-2xl mb-1">7d</div>
                                    <div className="text-xs text-muted-foreground uppercase">Lead Time</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features & Machine */}
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                                Certificates & Compliance
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { title: "ISO 9001:2015", desc: "Quality management systems certification." },
                                    { title: "FSC Certified", desc: "Ensures products come from responsibly managed forests." },
                                    { title: "Sedex audited", desc: "Ethical and responsible supply chain compliance." },
                                ].map((cert, idx) => (
                                    <div key={idx} className="bg-muted/20 p-6 rounded-2xl border border-border/50 flex gap-4">
                                        <Award className="w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <div className="font-bold">{cert.title}</div>
                                            <div className="text-sm text-muted-foreground">{cert.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                <Factory className="w-8 h-8 text-primary" />
                                Production Capability
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    "Offset Printing (8-color)",
                                    "UV Coating",
                                    "Hot Foil Stamping",
                                    "Embossing / Debossing",
                                    "Automatic Die-cutting",
                                    "Glue-less Assembly"
                                ].map((cap, idx) => (
                                    <div key={idx} className="flex gap-3 items-center text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span>{cap}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
