
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors hover:bg-secondary"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-foreground transition-all animate-fade-in" />
      ) : (
        <Moon size={20} className="text-foreground transition-all animate-fade-in" />
      )}
    </button>
  );
};
