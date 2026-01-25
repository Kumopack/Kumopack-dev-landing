"use client";

import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Move3D } from "lucide-react";
import { SafeImage } from "@/components/ui/safe-image";

const DesignerSection = () => {
  return (
    <section id="designer" className="py-24 relative overflow-hidden bg-white/50">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-lavender opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-premium text-purple-soft text-sm font-bold tracking-wide uppercase">
              3D Design Studio
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Your vision,
              <span className="text-primary italic"> in immersive 3D.</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Bring your packaging ideas to life with our effortless online designer.
              Visualize every detail of your custom boxes with photorealistic accuracy.
            </p>

            <div className="space-y-6">
              {[
                { icon: Move3D, title: "Real-time 3D Preview", desc: "Rotate, zoom, and explore your design from every angle" },
                { icon: RotateCcw, title: "Instant Revisions", desc: "Make changes and see premium updates immediately" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{item.title}</h4>
                    <p className="text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/printsystem">
              <Button variant="hero" size="xl" className="shadow-glow group">
                <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                Launch 3D Designer
              </Button>
            </Link>
          </motion.div>

          {/* Right Content - 3D Box Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto flex items-center justify-center">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-[100px] scale-90 animate-pulse-soft" />

              {/* Box container */}
              <motion.div
                whileHover={{ y: -20, rotateY: 15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 w-full"
              >
                <SafeImage
                  src="/asset/3d-box-premium.png"
                  alt="3D Box Preview"
                  width={600}
                  height={600}
                  className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
                />
              </motion.div>

              {/* Control panel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 floating-card px-8 py-4 flex items-center gap-6 border-white/30"
              >
                <button className="p-2 rounded-xl hover:bg-primary/10 transition-colors group">
                  <RotateCcw className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                </button>
                <div className="w-px h-8 bg-border/50" />
                <button className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-current" />
                </button>
                <div className="w-px h-8 bg-border/50" />
                <button className="p-2 rounded-xl hover:bg-primary/10 transition-colors group">
                  <Move3D className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
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
