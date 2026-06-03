"use client";

import { motion } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "@/components/common/LocalizedLink";
import { useParams } from "next/navigation";

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const language = (params?.lang as string) || "th";
  const isTh = language === "th";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-destructive/5 blur-[120px] rounded-full animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse"
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
          <div className="text-[10rem] font-black leading-none text-foreground/10 select-none tracking-tighter">
            500
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-black text-foreground">
            {isTh ? "เกิดข้อผิดพลาด" : "Something Went Wrong"}
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
            {isTh
              ? "ขออภัย เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองอีกครั้ง"
              : "Sorry, an unexpected error occurred. Please try again."}
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
            onClick={() => reset()}
          >
            <RefreshCw className="w-6 h-6" />
            {isTh ? "ลองอีกครั้ง" : "Try Again"}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-2xl px-10 h-16 text-lg font-bold gap-3 hover:bg-muted/50 transition-all border-border/50"
            asChild
          >
            <Link href="/">
              <Home className="w-6 h-6" />
              {isTh ? "กลับหน้าหลัก" : "Back to Home"}
            </Link>
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
