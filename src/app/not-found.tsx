"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTranslation } from "@/hooks/useTranslation";

export default function NotFound() {
  return (
    <LanguageProvider>
      <NotFoundContent />
    </LanguageProvider>
  );
}

function NotFoundContent() {
  const { t, language } = useTranslation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden relative">
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
            {t("notFound.title")}
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
            {t("notFound.description")}
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
            <Link href={`/${language}`}>
              <Home className="w-6 h-6" />
              {t("notFound.backHome")}
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl px-10 h-16 text-lg font-bold gap-3 hover:bg-muted/50 transition-all border-border/50"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-6 h-6" />
            {t("notFound.goBack")}
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
