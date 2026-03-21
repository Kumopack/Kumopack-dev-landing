"use client";

import Link from "@/components/common/LocalizedLink";
import { Sparkles, Gift, PartyPopper, Star, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const EventsNavCard = () => {
  const { t } = useLanguage();

  return (
    <Link
      href="/events"
      className="group relative flex flex-col items-center justify-center text-center h-full rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
    >
      {/* Shimmer sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

      {/* Floating icons */}
      <div className="absolute top-3 left-3 text-white/30 animate-[float_3s_ease-in-out_infinite]">
        <Gift className="w-4 h-4" />
      </div>
      <div className="absolute top-4 right-3 text-white/25 animate-[float_3s_ease-in-out_infinite_0.5s]">
        <Star className="w-3.5 h-3.5" />
      </div>
      <div className="absolute bottom-10 left-3 text-white/20 animate-[float_3s_ease-in-out_infinite_1s]">
        <Zap className="w-3.5 h-3.5" />
      </div>
      <div className="absolute bottom-3 right-3 text-white/25 animate-[float_3s_ease-in-out_infinite_1.5s]">
        <PartyPopper className="w-4 h-4" />
      </div>

      {/* Center content */}
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 group-hover:rotate-12 transition-transform duration-300">
          <Sparkles className="w-5 h-5 text-white drop-shadow" />
        </div>
        <div className="font-bold text-white text-sm mb-1 drop-shadow">
          {t("nav.events")}
        </div>
        <div className="text-white/80 text-[11px] leading-snug">
          {t("nav.desc.events")}
        </div>
      </div>
    </Link>
  );
};

export default EventsNavCard;
