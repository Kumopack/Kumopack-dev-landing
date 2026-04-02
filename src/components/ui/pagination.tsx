import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={cn("mt-12 flex justify-center items-center gap-2 md:gap-3", className)}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-border/50 flex items-center justify-center hover:bg-card hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {(() => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
          for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          if (currentPage > 3) pages.push("...");
          const start = Math.max(2, currentPage - 1);
          const end = Math.min(totalPages - 1, currentPage + 1);
          for (let i = start; i <= end; i++) pages.push(i);
          if (currentPage < totalPages - 2) pages.push("...");
          pages.push(totalPages);
        }
        return pages.map((p, idx) =>
          typeof p === "string" ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-muted-foreground/40 font-bold text-sm select-none"
            >
              ···
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-xl text-sm font-black transition-all duration-300",
                currentPage === p
                  ? "bg-primary text-white shadow-glow scale-105"
                  : "border border-border/50 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
              )}
            >
              {p}
            </button>
          ),
        );
      })()}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-border/50 flex items-center justify-center hover:bg-card hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
