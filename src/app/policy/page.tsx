"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, FileText, Lock, RefreshCcw } from "lucide-react";

export default function PolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-24 px-4 md:px-8">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-12">Policies & Terms</h1>

                    <div className="space-y-16">
                        {[
                            {
                                icon: Shield,
                                title: "Security Policy",
                                content: "We prioritize the security of your transactions and data. Our platform uses industry-standard encryption and secure payment gateways to ensure your business information remains protected."
                            },
                            {
                                icon: FileText,
                                title: "Terms of Service",
                                content: "By using Kumopack, you agree to our terms of service regarding sourcing, ordering, and communication with manufacturers. We act as a facilitator and platform provider."
                            },
                            {
                                icon: Lock,
                                title: "Privacy Policy",
                                content: "Your privacy is paramount. We only collect necessary information to facilitate your orders and improve our service. We never sell your data to third parties."
                            },
                            {
                                icon: RefreshCcw,
                                title: "Refund & Return Policy",
                                content: "As custom packaging is manufactured to order, returns are generally only accepted for manufacturing defects. We facilitate quality disputes between buyers and factories."
                            }
                        ].map((policy, idx) => (
                            <div key={idx} className="flex gap-8">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <policy.icon className="w-7 h-7 text-primary" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold">{policy.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                        {policy.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
