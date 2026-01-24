"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Move3D } from "lucide-react";

const DesignerSection = () => {
  return (
    <section id="designer" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-lavender opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-up">
            <span className="inline-block px-4 py-2 rounded-full bg-lavender text-purple-soft text-sm font-medium">
              3D Design Studio
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Your vision,
              <span className="text-primary"> in 3D.</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-lg">
              Bring your packaging ideas to life with our effortless online designer.
              Visualize your custom boxes before production.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                  <Move3D className="w-6 h-6 text-purple-soft" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Real-time 3D Preview</h4>
                  <p className="text-sm text-muted-foreground">Rotate, zoom, and explore your design</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-purple-soft" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Instant Revisions</h4>
                  <p className="text-sm text-muted-foreground">Make changes and see updates immediately</p>
                </div>
              </div>
            </div>

            <Link href="/printsystem">
              <Button variant="hero" size="xl">
                <Play className="w-5 h-5" />
                Try 3D Designer
              </Button>
            </Link>
          </div>

          {/* Right Content - 3D Box Visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-75" />

              {/* Box container */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <img
                  src="/asset/3d-box.png"
                  alt="3D Box Preview"
                  className="w-full h-auto max-w-md animate-float drop-shadow-2xl"
                />
              </div>

              {/* Control panel */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 floating-card px-6 py-3 flex items-center gap-4">
                <button className="w-10 h-10 rounded-xl bg-accent hover:bg-lavender transition-colors flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="w-px h-6 bg-border" />
                <button className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary-foreground" />
                </button>
                <div className="w-px h-6 bg-border" />
                <button className="w-10 h-10 rounded-xl bg-accent hover:bg-lavender transition-colors flex items-center justify-center">
                  <Move3D className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignerSection;
