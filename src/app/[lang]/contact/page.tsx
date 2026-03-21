"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Mail, Phone, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetPath } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ContactPage() {
  const { t } = useLanguage();

  const titleParts = t("contact.title").split("{talk}");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-mint/5" />
        <div className="absolute top-20 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary/15 to-mint/15 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-lavender/20 to-coral/10 rounded-full blur-[100px]" />

        <div className="relative container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8">
                <Mail className="w-4 h-4" />
                {t("contact.infoTitle")}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {titleParts[0]}
                <span className="bg-gradient-to-r from-primary to-mint bg-clip-text text-transparent">
                  {t("contact.talk")}
                </span>
                {titleParts[1]}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                {t("contact.subtitle")}
              </p>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-mint/20 rounded-[2.5rem] blur-2xl opacity-60" />
              <div className="relative rounded-3xl overflow-hidden shadow-float border border-white/20 max-w-xs mx-auto">
                <Image
                  src={getAssetPath("/img/contact-hero.jpg")}
                  alt="Kumopack packaging"
                  width={280}
                  height={280}
                  className="w-full max-h-[280px] object-cover"
                  unoptimized
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* ── Left: Form (3 cols) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="relative">
                {/* Glassmorphism glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-transparent to-mint/10 rounded-[2rem] blur-xl opacity-50" />
                <div className="relative bg-card/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-border/50 shadow-float">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <Send className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">
                      {t("contact.formTitle")}
                    </h2>
                  </div>

                  <form className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          {t("contact.name")}
                        </label>
                        <input
                          type="text"
                          className="w-full bg-background/60 border border-border/60 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all outline-none placeholder:text-muted-foreground/40"
                          placeholder={t("contact.namePlaceholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          {t("contact.email")}
                        </label>
                        <input
                          type="email"
                          className="w-full bg-background/60 border border-border/60 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all outline-none placeholder:text-muted-foreground/40"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          {t("contact.phone")}
                        </label>
                        <input
                          type="tel"
                          className="w-full bg-background/60 border border-border/60 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all outline-none placeholder:text-muted-foreground/40"
                          placeholder={t("contact.phonePlaceholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          {t("contact.subject")}
                        </label>
                        <input
                          type="text"
                          className="w-full bg-background/60 border border-border/60 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all outline-none placeholder:text-muted-foreground/40"
                          placeholder={t("contact.subjectPlaceholder")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {t("contact.message")}
                      </label>
                      <textarea
                        className="w-full bg-background/60 border border-border/60 rounded-xl px-4 py-3.5 h-36 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all outline-none resize-none placeholder:text-muted-foreground/40"
                        placeholder={t("contact.messagePlaceholder")}
                      ></textarea>
                    </div>
                    <Button
                      variant="hero"
                      className="w-full rounded-xl py-6 text-lg shadow-glow group"
                    >
                      {t("contact.send")}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Contact Info (2 cols) ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Email Card */}
              <div className="group bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-base mb-1">
                      {t("contact.email")}
                    </div>
                    <a
                      href="mailto:support@kumopack.com"
                      className="text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      support@kumopack.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-base mb-1">
                      {t("contact.phoneLabel")}
                    </div>
                    <a
                      href="tel:+66927474044"
                      className="text-muted-foreground hover:text-primary transition-colors font-medium"
                    >
                      +6692-747-4044
                    </a>
                  </div>
                </div>
              </div>

              {/* LINE Card */}
              <div className="group bg-card/80 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-[#06C755]/30 hover:shadow-soft transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#06C755]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-[#06C755]"
                      fill="currentColor"
                    >
                      <path d="M19.365 9.864c.018-.256.048-.47.048-.736C19.413 5.042 16.067 2 12 2 7.932 2 4.585 5.042 4.585 9.128c0 3.128 2.442 5.766 5.81 6.506.224.049.53.148.607.342.069.178.045.453.022.633l-.098.595c-.03.178-.14.696.61.38.748-.317 4.04-2.378 5.51-4.072C18.255 12.202 19.365 10.796 19.365 9.864zM8.57 11.065H7.003a.395.395 0 01-.395-.395V7.853a.395.395 0 01.79 0v2.422h1.17a.395.395 0 010 .79zm1.458-.395a.395.395 0 01-.79 0V7.853a.395.395 0 01.79 0V10.67zm3.67 0a.395.395 0 01-.677.277l-1.638-2.233v1.956a.395.395 0 01-.79 0V7.853a.395.395 0 01.678-.278l1.637 2.233V7.853a.395.395 0 01.79 0V10.67zm3.12-1.832a.395.395 0 010 .79H15.65v.647h1.17a.395.395 0 010 .79h-1.564a.395.395 0 01-.396-.395V7.853a.395.395 0 01.395-.395h1.565a.395.395 0 010 .79H15.65v.594h1.17z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-base mb-1">LINE</div>
                    <div className="text-muted-foreground font-medium mb-4">
                      ID: @kumopack
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="bg-white p-4 rounded-2xl shadow-soft border border-border/20 group-hover:shadow-float transition-shadow">
                    <Image
                      src={getAssetPath("/img/line-qr.png")}
                      alt="LINE QR Code @kumopack"
                      width={160}
                      height={160}
                      className="rounded-xl"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
