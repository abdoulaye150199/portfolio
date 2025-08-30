import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-gray-300/30 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/20 transition-all duration-300 group"
      aria-label={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      ) : (
        <Moon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
      )}
    </button>
  );
};

export default ThemeToggle;
