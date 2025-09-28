import { motion as Motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle({ className = "" }) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <Motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background */}
      <div className={`w-full h-full rounded-full transition-colors duration-200 ${
        isDark ? 'bg-emerald-500' : 'bg-slate-300'
      }`} />
      
      {/* Toggle Circle */}
      <Motion.div
        layout
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <Motion.div
          initial={false}
          animate={{ 
            rotate: isDark ? 180 : 0,
            scale: isDark ? 1.2 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <MoonIcon className="w-3 h-3 text-slate-700" />
          ) : (
            <SunIcon className="w-3 h-3 text-yellow-500" />
          )}
        </Motion.div>
      </Motion.div>
    </Motion.button>
  );
}
