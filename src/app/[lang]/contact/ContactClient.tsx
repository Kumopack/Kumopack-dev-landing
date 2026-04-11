"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dictionary, createTranslator } from "@/lib/translation";
import { SafeImage } from "@/components/ui/safe-image";

export default function ContactClient({
  lang,
  dict,
}: {
  lang: string;
  dict: Dictionary;
}) {
  const t = createTranslator(dict);

  return (
    <main className="min-h-screen bg-[#faf8fc] text-foreground">
      <Navbar lang={lang} dict={dict} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Mail className="w-4 h-4" />
                {t("contact.infoTitle")}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 leading-tight">
                {lang === "th" ? (
                  <>
                    มา <span className="text-primary">{t("contact.talk")}</span>{" "}
                    เรื่องบรรจุภัณฑ์กัน
                  </>
                ) : (
                  <>
                    Let&apos;s <span className="text-primary">Talk</span>{" "}
                    Packaging
                  </>
                )}
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-medium">
                {t("contact.subtitle")}
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] max-w-[500px] ml-auto shadow-2xl shadow-primary/10">
                <SafeImage
                  src="/img/contact-hero.svg"
                  alt="Contact Us"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content (Forms and Cards) */}
      <section className="py-8 px-6 mb-24 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Form Section (Takes up 7 or 8 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8 h-full bg-white p-8 md:p-12 rounded-[2.5rem] border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-md shadow-primary/30">
                  <Send className="w-6 h-6 text-white ml-1" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {t("contact.formTitle")}
                </h2>
              </div>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      {t("contact.name")}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-neutral-400 placeholder:font-normal"
                      placeholder={t("contact.namePlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      {t("contact.email")}
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-neutral-400 placeholder:font-normal"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      {t("contact.phoneLabel")}
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-neutral-400 placeholder:font-normal"
                      placeholder={t("contact.phonePlaceholder")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      {t("contact.subject")}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-neutral-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-neutral-400 placeholder:font-normal"
                      placeholder={t("contact.subjectPlaceholder")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    {t("contact.message")}
                  </label>
                  <textarea
                    className="w-full bg-white border border-neutral-200 rounded-2xl px-5 py-4 h-40 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none font-medium placeholder:text-neutral-400 placeholder:font-normal"
                    placeholder={t("contact.messagePlaceholder")}
                  ></textarea>
                </div>

                <div className="pt-2 mt-auto">
                  <Button className="w-full sm:w-auto rounded-2xl px-8 py-7 text-base font-bold shadow-glow bg-primary hover:bg-primary/90">
                    {t("contact.send")}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Post/Info Section (Takes up 4 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-4 flex flex-col gap-4 h-full"
            >
              {/* Email Card */}
              <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center gap-5 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base mb-0.5">
                    {t("contact.email")}
                  </h3>
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@kumopack.com"}`}
                    className="text-slate-500 font-medium hover:text-primary transition-colors"
                  >
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
                      "support@kumopack.com"}
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex items-center gap-5 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base mb-0.5">
                    {t("contact.phone")}
                  </h3>
                  <a
                    href="tel:+66927474044"
                    className="text-slate-500 font-medium hover:text-blue-500 transition-colors"
                  >
                    +6692-747-4044
                  </a>
                </div>
              </div>

              {/* LINE Card */}
              <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] text-center flex-1 flex flex-col">
                <div className="flex items-center gap-5 mb-6 text-left">
                  <div className="w-14 h-14 rounded-2xl bg-[#00B900]/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-[#00B900]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base mb-0.5">
                      LINE
                    </h3>
                    <p className="text-slate-500 font-medium">ID: @kumopack</p>
                  </div>
                </div>

                <div className="border border-neutral-100 rounded-2xl p-6 bg-slate-50/50 flex flex-col items-center justify-center flex-1">
                  <p className="font-bold text-slate-800 mb-4">LINE</p>
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-neutral-100 inline-block">
                    <img
                      src="/img/line-qr.png"
                      alt="LINE QR Code"
                      className="w-28 h-28 mix-blend-multiply"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sUrjw9GV5zxyBxg2tLGGzDsw=";
                      }}
                    />
                  </div>
                  <p className="text-sm text-slate-500 font-medium mt-3">
                    @kumopack
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer dict={dict} />
    </main>
  );
}
