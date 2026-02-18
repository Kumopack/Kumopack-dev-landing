import { useLanguage } from "@/context/LanguageContext";
import {
  Leaf,
  Recycle,
  Droplets,
  Trees,
  Sun,
  Wind,
  BatteryCharging,
  Sprout,
  PackageCheck,
  Zap,
  Box,
  Globe,
  Trash2,
  RefreshCw,
} from "lucide-react";

interface SustainabilityIconProps {
  item: any;
  className?: string;
  showText?: boolean;
}

export function SustainabilityIcon({
  item,
  className = "",
  showText = true,
}: SustainabilityIconProps) {
  const { language } = useLanguage();
  const isTh = language === "th";

  const s = item.sustainability || item;
  if (!s) return null;

  const color = s.colorLabel || "#22c55e";
  const name = isTh ? s.nameTh : s.nameEn;
  const shortName = s.shortName || (name ? name[0] : "S");

  const getIcon = () => {
    const code = (s.shortName || "").toLowerCase();
    if (code === "mr" || code === "cr")
      return <PackageCheck className="w-4 h-4" />;
    if (code === "wr" || code === "vr") return <Box className="w-4 h-4" />;
    if (code === "lp") return <Globe className="w-4 h-4" />;
    if (code === "rm") return <Sprout className="w-4 h-4" />;
    if (code === "rc") return <Recycle className="w-4 h-4" />;
    if (code === "pf") return <Leaf className="w-4 h-4" />;
    if (code === "rf") return <Trees className="w-4 h-4" />;
    if (code === "ref" || code === "rt" || code === "ru")
      return <RefreshCw className="w-4 h-4" />;
    if (code === "b") return <Trash2 className="w-4 h-4" />;

    const lowerName = (s.nameEn || "").toLowerCase();
    if (lowerName.includes("water")) return <Droplets className="w-4 h-4" />;
    if (lowerName.includes("energy") || lowerName.includes("power"))
      return <Zap className="w-4 h-4" />;
    if (lowerName.includes("solar")) return <Sun className="w-4 h-4" />;
    if (lowerName.includes("wind")) return <Wind className="w-4 h-4" />;
    if (lowerName.includes("carbon")) return <Leaf className="w-4 h-4" />;

    return <Leaf className="w-4 h-4" />;
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background/50 hover:bg-background hover:shadow-sm transition-all cursor-default ${className}`}
      style={{ borderColor: color }}
    >
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {getIcon()}
      </div>
      {showText && (
        <span className="font-medium text-sm text-foreground/80 whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
}
