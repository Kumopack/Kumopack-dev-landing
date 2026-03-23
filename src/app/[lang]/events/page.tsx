"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Sparkles, Gift, Trophy, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetPath } from "@/lib/utils";

type ThemeVariant = "christmas" | "cny" | "songkran" | "halloween";

interface SeasonTheme {
  title: string;
  titleTh: string;
  subtitle: string;
  subtitleTh: string;
  description: string;
  descriptionTh: string;
  image: string;
  variant: ThemeVariant;
}

const themes: SeasonTheme[] = [
  {
    title: "Christmas Magic",
    titleTh: "คริสต์มาสมหัศจรรย์",
    subtitle: "Winter Wonderland",
    subtitleTh: "ดินแดนฤดูหนาว",
    description:
      "A dreamy pastel Christmas theme featuring a cute stylized tree with colorful ornaments, soft gift boxes with silk ribbons, and a magical snowy atmosphere.",
    descriptionTh:
      "ธีมคริสต์มาสสีพาสเทลสุดฝัน ต้นคริสต์มาสน่ารักพร้อมของขวัญกล่องนุ่มนวลผูกริบบิ้น ในบรรยากาศหิมะแสนวิเศษ",
    image: "/img/events/christmas.png",
    variant: "christmas",
  },
  {
    title: "Chinese New Year",
    titleTh: "ตรุษจีนมงคล",
    subtitle: "Year of Prosperity",
    subtitleTh: "ปีแห่งความรุ่งเรือง",
    description:
      "Celebrate with a friendly golden dragon, traditional red lanterns, cherry blossoms, and scattered gold coins and red envelopes for luck and fortune.",
    descriptionTh:
      "เฉลิมฉลองกับมังกรทองคำ โคมไฟแดง ดอกซากุระ และเหรียญทองพร้อมซองอั่งเปาเพื่อความโชคดีและความมั่งคั่ง",
    image: "/img/events/cny.png",
    variant: "cny",
  },
  {
    title: "Songkran Splash",
    titleTh: "สงกรานต์สนุกสุดเหวี่ยง",
    subtitle: "Summer Festival",
    subtitleTh: "เทศกาลฤดูร้อน",
    description:
      "Dive into the vibrant energy of Songkran with playful water splashes, colorful water guns, and tropical festive vibes in bright cyan, orange, and lime.",
    descriptionTh:
      "ดำดิ่งสู่พลังของสงกรานต์ด้วยน้ำสาดสดใส ปืนฉีดน้ำหลากสี และบรรยากาศเทศกาลสุดมันส์",
    image: "/img/events/songkran.png",
    variant: "songkran",
  },
  {
    title: "Spooky Halloween",
    titleTh: "ฮาโลวีนสุดหลอน",
    subtitle: "Trick or Treat",
    subtitleTh: "หลอกหรือเลี้ยง",
    description:
      "A friendly ghost with a witch hat joins a glowing Jack-o'-lantern for festive Halloween fun in deep purple and neon orange hues.",
    descriptionTh:
      "ผีน้อยน่ารักสวมหมวกแม่มดมาพร้อมฟักทองเรืองแสง สนุกกับฮาโลวีนในโทนม่วงเข้มและส้มนีออน",
    image: "/img/events/halloween.png",
    variant: "halloween",
  },
];

const variantStyles: Record<
  ThemeVariant,
  { bg: string; badge: string; badgeText: string; textColor: string }
> = {
  christmas: {
    bg: "bg-gradient-to-br from-red-50 via-green-50/30 to-amber-50/40",
    badge: "bg-red-500",
    badgeText: "text-white",
    textColor: "text-foreground",
  },
  cny: {
    bg: "bg-gradient-to-br from-red-50/80 via-amber-50/50 to-rose-50/30",
    badge: "bg-red-600",
    badgeText: "text-white",
    textColor: "text-foreground",
  },
  songkran: {
    bg: "bg-gradient-to-br from-cyan-50/80 via-blue-50/30 to-lime-50/40",
    badge: "bg-cyan-500",
    badgeText: "text-white",
    textColor: "text-foreground",
  },
  halloween: {
    bg: "bg-gradient-to-br from-purple-950 via-purple-900 to-orange-950/80",
    badge: "bg-purple-600",
    badgeText: "text-white",
    textColor: "text-white",
  },
};

function ThemeCard({
  theme,
  index,
  isTh,
}: {
  theme: SeasonTheme;
  index: number;
  isTh: boolean;
}) {
  const styles = variantStyles[theme.variant];
  const lang = isTh ? "th" : "en";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      onClick={() => (window.location.href = `/${lang}/coming-soon`)}
      className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:shadow-float hover:scale-[1.02] ${styles.bg}`}
    >
      <div className="relative p-6 md:p-8">
        {}
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${styles.badge} ${styles.badgeText}`}
        >
          {isTh ? theme.subtitleTh : theme.subtitle}
        </span>

        {}
        <h3
          className={`text-2xl md:text-3xl font-extrabold mb-3 ${styles.textColor}`}
        >
          {isTh ? theme.titleTh : theme.title}
        </h3>

        {}
        <p
          className={`text-sm md:text-base leading-relaxed mb-6 max-w-md ${
            theme.variant === "halloween"
              ? "text-white/70"
              : "text-muted-foreground"
          }`}
        >
          {isTh ? theme.descriptionTh : theme.description}
        </p>

        {}
        <div className="relative flex justify-center items-center">
          <Image
            src={getAssetPath(theme.image)}
            alt={theme.title}
            width={400}
            height={400}
            className="w-full max-w-sm h-auto object-contain transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-2"
            unoptimized
          />
        </div>
      </div>

      {}
      <div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 ${
          theme.variant === "christmas"
            ? "bg-amber-300"
            : theme.variant === "cny"
              ? "bg-amber-400"
              : theme.variant === "songkran"
                ? "bg-orange-300"
                : "bg-orange-500"
        }`}
      />
      <div
        className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-20 ${
          theme.variant === "christmas"
            ? "bg-green-400"
            : theme.variant === "cny"
              ? "bg-red-500"
              : theme.variant === "songkran"
                ? "bg-cyan-400"
                : "bg-purple-500"
        }`}
      />

      {}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft">
          <ExternalLink className="w-4 h-4 text-foreground" />
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsPage() {
  const { t, language } = useLanguage();
  const isTh = language === "th";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {}
      <section className="relative pt-40 pb-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-transparent to-transparent -z-10" />

        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            {isTh ? "ธีมกิจกรรมตามฤดูกาล" : "Seasonal Event Themes"}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight"
          >
            {isTh ? "กิจกรรมตาม" : "Seasonal Event"}
            <span className="block bg-gradient-to-r from-red-500 via-amber-500 to-cyan-500 bg-clip-text text-transparent">
              {isTh ? "ฤดูกาล" : "UI Themes"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {isTh
              ? "ภาพประกอบ 3D สวยงามสำหรับกิจกรรมตามฤดูกาล ตั้งแต่คริสต์มาสจนถึงฮาโลวีน สร้างประสบการณ์น่าจดจำกับคอลเลกชันธีมของเรา"
              : "Beautiful 3D illustrations for your seasonal events. From Christmas magic to spooky Halloween, create memorable experiences with our curated theme collection."}
          </motion.p>
        </div>
      </section>

      {}
      <section className="px-4 md:px-8 pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {themes.map((theme, index) => (
              <ThemeCard
                key={theme.variant}
                theme={theme}
                index={index}
                isTh={isTh}
              />
            ))}
          </div>
        </div>
      </section>

      {}
      {/* <section className="py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-lavender rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                  {isTh ? (
                    <>
                      มีไอเดียสำหรับ{" "}
                      <span className="text-primary">กิจกรรม?</span>
                    </>
                  ) : (
                    <>
                      Have an Idea for an{" "}
                      <span className="text-primary">Engagement?</span>
                    </>
                  )}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {isTh
                    ? "เรารักการร่วมงานกับชุมชนของเรา หากคุณต้องการจัดเวิร์คช็อปหรือเสนอกิจกรรม ติดต่อเราได้เลย!"
                    : "We love collaborating with our community. If you want to host a workshop or propose an event, get in touch!"}
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  className="rounded-2xl px-10 py-8 text-lg"
                >
                  {isTh ? "ติดต่อพาร์ทเนอร์ชิพ" : "Contact Partnership"}
                </Button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center space-y-4">
                  <Gift className="w-10 h-10 text-coral mx-auto" />
                  <div className="text-3xl font-extrabold">2.4k</div>
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    {isTh ? "รางวัลที่แจก" : "Prizes Won"}
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center space-y-4">
                  <Trophy className="w-10 h-10 text-sky mx-auto" />
                  <div className="text-3xl font-extrabold">150+</div>
                  <div className="text-xs font-bold uppercase text-muted-foreground">
                    {isTh ? "กิจกรรมที่จัด" : "Events Hosted"}
                  </div>
                </div>
                <div className="col-span-2 bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-white/20 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-primary fill-current"
                      />
                    ))}
                  </div>
                  <div className="font-bold">
                    {isTh ? "4.9/5 คะแนน" : "4.9/5 Rating"}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  );
}
