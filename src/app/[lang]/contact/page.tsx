"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Let&apos;s <span className="text-primary">Talk</span> Packaging
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have questions about custom orders, factory sourcing, or
              sustainable materials? Our team is here to help you find the
              absolute solution.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 mb-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-10 rounded-3xl border border-border/50 shadow-float"
            >
              <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      className="w-full bg-muted/30 border border-border/50 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      className="w-full bg-muted/30 border border-border/50 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-muted/30 border border-border/50 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Inquiry about custom boxes"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="w-full bg-muted/30 border border-border/50 rounded-2xl px-4 py-3 h-40 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <Button className="w-full rounded-2xl py-6 text-lg shadow-glow">
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </motion.div>

            <div className="space-y-12 py-8">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Email</div>
                      <div className="text-muted-foreground text-lg">
                        hello@kumopack.com
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Phone</div>
                      <div className="text-muted-foreground text-lg">
                        +66 2 123 4567
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1">Office</div>
                      <div className="text-muted-foreground text-lg">
                        Sukhumvit, Bangkok, Thailand
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Live Chat</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Need an instant answer? Chat with our support team using the
                  widget in the bottom right corner.
                </p>
                <Button variant="hero" className="rounded-xl">
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
