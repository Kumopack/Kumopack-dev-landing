import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
}

export const VerifiedBadge = ({ className }: VerifiedBadgeProps) => {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 text-white text-[10px] font-bold pl-1.5 pr-2.5 py-0.5 rounded-full shadow-lg shadow-purple-500/20 flex items-center gap-1 border border-white/20 select-none",
        className,
      )}
    >
      <div className="bg-white rounded-full p-0.5 shadow-sm">
        <Award className="w-3 h-3 text-purple-500 fill-purple-500" />
      </div>
      <span className="text-white drop-shadow-md tracking-wide">
        Kumopack Verified
      </span>
    </div>
  );
};
