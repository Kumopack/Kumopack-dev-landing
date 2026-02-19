"use client";

import Link from "@/components/common/LocalizedLink";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function LocalNotFound() {
  const { t, language } = useLanguage();
  const isTh = language === "th";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden relative">
      {/* Abstract Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-mint/5 blur-[120px] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="max-w-xl w-full text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="text-[12rem] font-black leading-none text-foreground/10 select-none tracking-tighter">
            404
          </div>
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Ghost className="w-24 h-24 text-primary stroke-[1.5]" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-black text-foreground">
            {isTh ? "ไม่พบหน้านี้" : "Page Not Found"}
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
            {isTh
              ? "ขออภัย เราไม่พบหน้าที่คุณกำลังมองหา อาจเป็นเพราะหน้านี้ถูกย้ายหรือไม่มีอยู่จริง"
              : "Oops! We couldn't find the page you're looking for. It might have been moved or doesn't exist."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="default"
            size="lg"
            className="rounded-2xl px-10 h-16 text-lg font-bold gap-3 shadow-glow hover:shadow-glow-lg transition-all"
            asChild
          >
            <Link href="/">
              <Home className="w-6 h-6" />
              {t("common.backToHome")}
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl px-10 h-16 text-lg font-bold gap-3 hover:bg-muted/50 transition-all border-border/50"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-6 h-6" />
            {isTh ? "ย้อนกลับ" : "Go Back"}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-12"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="h-px w-12 bg-border/30" />
            <div className="text-sm font-black text-muted-foreground/50 uppercase tracking-[0.3em]">
              KUMOPACK
            </div>
            <div className="h-px w-12 bg-border/30" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
