"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface MinimalTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function MinimalTabs({
  tabs,
  activeTab,
  onChange,
  className,
}: MinimalTabsProps) {
  return (
    <div
      className={cn(
        "inline-flex p-1 bg-muted/30 rounded-full relative",
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative z-10 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0 whitespace-nowrap",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-background shadow-sm rounded-full border border-border/50"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
