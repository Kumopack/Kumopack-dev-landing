"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Mail,
  MessageCircle,
  Search,
  ShoppingBag,
  Factory,
  Sparkles,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { faqSections } from "./faqData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

import { Dictionary } from "@/lib/dictionary";

export default function FAQClient({ lang, dict }: { lang: string; dict: Dictionary }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"buyer" | "supplier">("buyer");

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredSections = faqSections.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }));

  const buyerSection = filteredSections[0];
  const supplierSection = filteredSections[1];
  const currentSection = activeTab === "buyer" ? buyerSection : supplierSection;

  return (
    <>
      <Navbar lang={lang} dict={dict} />

      <main className="min-h-screen bg-[#fafafa] selection:bg-primary/20">
        <PageHeader
          badgeTh="Knowledge Base"
          badgeEn="Knowledge Base"
          titleTh="เราพร้อมตอบทุกข้อสงสัยของคุณ"
          titleEn="We're Here to Help"
          descriptionTh="ศูนย์รวมข้อมูลและคำแนะนำที่ครอบคลุมที่สุด เพื่อยกระดับธุรกิจบรรจุภัณฑ์ของคุณให้ก้าวไกลกว่าใคร"
          descriptionEn="The most comprehensive information and guidance center to elevate your packaging business."
          className="pb-0"
          lang={lang}
        />

        <section className="relative z-10 px-6 pb-12">
          <div className="max-w-2xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-lavender/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-1.5 shadow-xl flex items-center h-[64px]">
              <Search className="absolute left-6 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="search"
                placeholder="พิมพ์คำถามที่คุณต้องการค้นหา..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-14 pr-8 h-full rounded-xl focus:outline-none text-base placeholder:text-muted-foreground/50 transition-all font-medium"
              />
            </div>
          </div>
        </section>

        <section className="sticky top-24 z-30 max-w-7xl mx-auto px-6 mb-20">
          <div className="flex justify-center">
            <div className="relative bg-white/40 backdrop-blur-md border border-white/50 p-1.5 rounded-3xl shadow-lg flex gap-1">
              <motion.div
                className="absolute bg-white rounded-[1.25rem] shadow-sm z-0 h-[calc(100%-12px)] top-[6px]"
                animate={{
                  x: activeTab === "buyer" ? 0 : "100%",
                  width: "50%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={() => setActiveTab("buyer")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-sm relative z-10 transition-colors duration-300 ${
                  activeTab === "buyer"
                    ? "text-primary"
                    : "text-muted-foreground/60 hover:text-muted-foreground"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                BUYER FAQ
              </button>
              <button
                onClick={() => setActiveTab("supplier")}
                className={`flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-sm relative z-10 transition-colors duration-300 ${
                  activeTab === "supplier"
                    ? "text-primary"
                    : "text-muted-foreground/60 hover:text-muted-foreground"
                }`}
              >
                <Factory className="w-4 h-4" />
                SUPPLIER FAQ
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-32 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              <div className="mb-16">
                <h2 className="text-3xl font-black text-foreground tracking-tight mb-4">
                  {currentSection.title}
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-lavender rounded-full opacity-60" />
              </div>

              <div className="space-y-6">
                {currentSection.items.length === 0 ? (
                  <div className="text-center py-20 bg-white/50 rounded-[2.5rem] border border-dashed border-muted-foreground/20">
                    <p className="text-muted-foreground font-medium">
                      ไม่พบข้อมูลที่คุณค้นหา กรุณาลองใหม่อีกครั้ง
                    </p>
                  </div>
                ) : (
                  currentSection.items.map((item, index) => {
                    const key = `${activeTab}-${index}`;
                    const isOpen = openItems[key];

                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group relative bg-white rounded-[2rem] transition-all duration-500 overflow-hidden ${
                          isOpen
                            ? "shadow-[0_20px_50px_rgba(181,164,212,0.15)] ring-1 ring-primary/20"
                            : "shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-neutral-100 hover:border-primary/10"
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(key)}
                          className="w-full px-8 py-8 flex items-start gap-6 text-left"
                        >
                          <span
                            className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 ${
                              isOpen
                                ? "bg-primary text-white scale-110 shadow-lg shadow-primary/25"
                                : "bg-neutral-50 text-neutral-300 group-hover:bg-primary/5 group-hover:text-primary"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="flex-1 pt-1.5">
                            <h3
                              className={`text-xl font-bold leading-snug transition-colors duration-300 ${
                                isOpen
                                  ? "text-primary"
                                  : "text-foreground group-hover:text-primary"
                              }`}
                            >
                              {item.question}
                            </h3>
                          </div>

                          <div
                            className={`flex-shrink-0 mt-1 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                              isOpen
                                ? "bg-primary/10 rotate-180"
                                : "bg-neutral-50"
                            }`}
                          >
                            <ChevronDown
                              className={`w-5 h-5 ${isOpen ? "text-primary" : "text-neutral-400 group-hover:text-primary"}`}
                            />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                              <div className="px-8 pb-10 pl-[6.5rem] pr-12">
                                <div className="h-px w-12 bg-primary/20 mb-6" />
                                <div className="text-[1.125rem] leading-relaxed text-muted-foreground/80 font-medium space-y-4">
                                  {item.answer.split("\n").map((line, i) => (
                                    <p key={i}>{line}</p>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-40">
          <div className="relative rounded-[3rem] bg-[#1a1a1a] p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-lavender/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  ต้องการความช่วยเหลือ
                  <br />
                  <span className="text-primary">เป็นพิเศษหรือไม่?</span>
                </h3>
                <p className="text-white/50 text-xl font-medium mb-10 max-w-md leading-relaxed">
                  ทีมผู้เชี่ยวชาญด้านบรรจุภัณฑ์ของเราพร้อมให้คำปรึกษาเชิงลึกสำหรับทุกความท้าทายของธุรกิจคุณ
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:support@kumopack.com"
                    className="inline-flex items-center gap-3 bg-white text-black font-black px-8 py-5 rounded-2xl hover:scale-105 transition-all shadow-xl"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    EMAIL SUPPORT
                  </a>
                  <a
                    href="https://line.me/ti/p/@kumopack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md text-white border border-white/10 font-bold px-8 py-5 rounded-2xl hover:bg-white/10 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    LINE: @KUMOPACK
                  </a>
                </div>
              </div>

              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] transform translate-y-8">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-black text-white mb-2">
                    FREE DESIGN
                  </div>
                  <div className="text-white/40 font-bold text-sm tracking-widest">
                    Idea to Structure
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-black text-white mb-2">SMART MATCHING</div>
                  <div className="text-white/40 font-bold text-sm tracking-widest">
                    Idea to Structure
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} />
    </>
  );
}
