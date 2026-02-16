"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Move3D } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";

const DesignerSection = () => {
  return (
    <section
      id="designer"
      className="py-32 relative overflow-hidden bg-white/30 backdrop-blur-3xl scroll-mt-24"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse-soft" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-lavender/20 blur-[150px] rounded-full -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-6 py-2.5 rounded-full glass-premium text-primary text-xs font-black tracking-[0.2em] uppercase border border-primary/20 shadow-sm"
              >
                Immersive 3D Studio
              </motion.span>

              <h2 className="text-5xl md:text-6xl font-black text-foreground leading-[1.1] tracking-tighter">
                Your vision,
                <br />
                <span className="bg-gradient-to-r from-primary to-primary text-transparent bg-clip-text italic">
                  perfectly realized.
                </span>
              </h2>

              <p className="text-2xl text-muted-foreground/80 max-w-lg leading-relaxed font-medium">
                Bring your packaging ideas to life with our effortless online
                designer. Visualize every detail with photorealistic accuracy.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              {[
                {
                  icon: Move3D,
                  title: "Real-time 3D",
                  desc: "Rotate, zoom, and explore every angle",
                },
                {
                  icon: RotateCcw,
                  title: "Instant Revisions",
                  desc: "See changes update in photorealistic quality",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bento-card group hover:bg-white/80 transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-soft flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-500 mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-black text-xl text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground/80 leading-snug font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <Link href="/printsystem" className="inline-block">
              <Button
                variant="hero"
                size="xl"
                className="shadow-glow group px-10 py-8 text-xl"
              >
                <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform mr-2" />
                Launch 3D Designer
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-2xl mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-[120px] scale-90 animate-pulse-soft" />
              <div className="absolute inset-0 rounded-full bg-lavender/30 blur-[80px] scale-75 -z-10" />

              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateY: [0, 5, 0],
                  rotateX: [0, 3, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.05 }}
                className="relative z-10 w-full cursor-grab active:cursor-grabbing"
              >
                <SafeImage
                  src="/asset/3d-box-premium.png"
                  alt="3D Box Preview"
                  width={800}
                  height={800}
                  className="w-full h-auto drop-shadow-[0_50px_50px_rgba(0,0,0,0.2)]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-premium px-10 py-6 flex items-center gap-10 border-white/40 shadow-glow rounded-[2.5rem]"
              >
                <button className="p-3 rounded-2xl hover:bg-primary/10 transition-all duration-300 group">
                  <RotateCcw className="w-7 h-7 text-muted-foreground group-hover:text-primary group-hover:rotate-180 transition-all duration-500" />
                </button>
                <div className="w-px h-10 bg-border/50" />
                <button className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow hover:scale-110 active:scale-95 transition-all duration-300">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </button>
                <div className="w-px h-10 bg-border/50" />
                <button className="p-3 rounded-2xl hover:bg-primary/10 transition-all duration-300 group">
                  <Move3D className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-all duration-300" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DesignerSection;
