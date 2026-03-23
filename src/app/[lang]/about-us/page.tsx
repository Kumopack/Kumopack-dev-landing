"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  Users,
  Target,
  Shield,
  Zap,
  Quote,
  Building2,
  Factory,
  Handshake,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetPath } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/LocalizedLink";

const teamMembers = [
  {
    key: "phontakorn" as const,
    image: "/img/team/phontakorn.jpg",
  },
  {
    key: "thanin" as const,
    image: "/img/team/thanin.jpg",
  },
  {
    key: "sasisom" as const,
    image: "/img/team/sasisom.jpg",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function AboutUsPage() {
  const { dict } = useLanguage();

  const coreValues = [
    {
      icon: Shield,
      title: dict.aboutUs.values.transparency,
      desc: dict.aboutUs.values.transparencyDesc,
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-600",
    },
    {
      icon: Zap,
      title: dict.aboutUs.values.speed,
      desc: dict.aboutUs.values.speedDesc,
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-600",
    },
    {
      icon: Target,
      title: dict.aboutUs.values.quality,
      desc: dict.aboutUs.values.qualityDesc,
      color: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-600",
    },
    {
      icon: Users,
      title: dict.aboutUs.values.community,
      desc: dict.aboutUs.values.communityDesc,
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-600",
    },
  ];

  const stats = [
    { value: "4,000+", label: dict.aboutUs.companiesHelped, icon: Building2 },
    { value: "500+", label: dict.aboutUs.brandsTrusted, icon: Handshake },
    { value: "200+", label: dict.aboutUs.factoryPartners, icon: Factory },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {}
      <section className="relative pt-32 pb-24 px-4 md:px-8 overflow-hidden">
        {}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-mint/5" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-mint/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-lavender/20 to-transparent rounded-full blur-[80px] opacity-40" />

        <div className="relative container mx-auto max-w-6xl text-center">
          <motion.div {...fadeInUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              KUMOPACK
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              {dict.aboutUs.title}{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-mint bg-clip-text text-transparent">
                Kumopack
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {dict.aboutUs.subtitle}
            </p>
          </motion.div>

          {}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {}
      <section className="py-24 px-4 md:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-coral/20 text-coral-foreground text-xs font-bold uppercase tracking-widest mb-6">
              {dict.aboutUs.ourStoryBadge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {dict.aboutUs.ourStoryTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {dict.aboutUs.ourStorySubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {dict.aboutUs.ourStoryParagraph1}
              </p>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {dict.aboutUs.ourStoryParagraph2}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {dict.aboutUs.ourStoryParagraph3}
              </p>

              {}
              <div className="relative bg-gradient-to-br from-primary/5 to-mint/5 rounded-3xl p-8 border border-primary/10">
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <p className="text-foreground font-medium italic leading-relaxed">
                  &ldquo;KUMOPACK{" "}
                  {dict.aboutUs.ourStoryParagraph3.includes(
                    "พร้อมเป็นหนึ่งในฟันเฟือง",
                  )
                    ? "พร้อมเป็นหนึ่งในฟันเฟืองตัวสำคัญ"
                    : "is ready to be one of the crucial gears"}
                  &rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-br from-muted/30 via-transparent to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                {dict.aboutUs.missionTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {dict.aboutUs.missionDesc}
              </p>
              <Link href="/pricing">
                <Button
                  variant="hero"
                  size="lg"
                  className="rounded-2xl shadow-glow mt-4"
                >
                  {dict.common.getStarted}
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-float border border-border/50"
            >
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2074"
                alt="Our Team Working"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {}
      <section className="py-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {dict.aboutUs.coreValuesTitle}
            </h2>
            <p className="text-muted-foreground text-lg">
              {dict.aboutUs.coreValuesSubtitle}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                {...stagger}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-card p-8 rounded-3xl border border-border/50 hover:shadow-float hover:border-primary/20 transition-all duration-500 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}
                  >
                    <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-lavender/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="relative container mx-auto max-w-6xl">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              {dict.aboutUs.teamBadge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {dict.aboutUs.teamTitle}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              {dict.aboutUs.teamSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {teamMembers.map((member, idx) => {
              const data = dict.aboutUs.team[member.key];
              return (
                <motion.div
                  key={member.key}
                  {...stagger}
                  transition={{ delay: idx * 0.15 }}
                  className="group text-center"
                >
                  <div className="relative mx-auto mb-8">
                    {}
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-mint/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-card shadow-float group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={getAssetPath(member.image)}
                        alt={data.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{data.name}</h3>
                  <p className="text-sm font-semibold text-primary mb-5">
                    {data.role}
                  </p>

                  {}
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-5 border border-border/50 group-hover:border-primary/20 group-hover:shadow-soft transition-all duration-300">
                    <Quote className="w-5 h-5 text-primary/40 mb-2 mx-auto" />
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      &ldquo;{data.quote}&rdquo;
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {}
          <motion.div {...fadeInUp} className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-br from-primary/5 to-mint/5 rounded-3xl px-12 py-10 border border-primary/10">
              <h3 className="text-2xl font-bold">{dict.aboutUs.teamBadge}</h3>
              <p className="text-muted-foreground max-w-md">
                {dict.aboutUs.teamSubtitle.split("—")[0]}
              </p>
              <Link href="/contact">
                <Button
                  variant="hero"
                  size="lg"
                  className="rounded-2xl shadow-glow mt-2"
                >
                  {dict.nav.contact}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
