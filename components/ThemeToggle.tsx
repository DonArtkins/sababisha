"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 p-1 rounded-full border border-border bg-toggle-bg">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full cursor-none interactive transition-colors ${
          theme === "light"
            ? "bg-toggle-btn shadow-sm text-foreground"
            : "text-foreground/60 hover:text-foreground"
        }`}
        aria-label="Light theme"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full cursor-none interactive transition-colors ${
          theme === "system"
            ? "bg-toggle-btn shadow-sm text-foreground"
            : "text-foreground/60 hover:text-foreground"
        }`}
        aria-label="System theme"
      >
        <Monitor className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full cursor-none interactive transition-colors ${
          theme === "dark"
            ? "bg-toggle-btn shadow-sm text-foreground"
            : "text-foreground/60 hover:text-foreground"
        }`}
        aria-label="Dark theme"
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
}
