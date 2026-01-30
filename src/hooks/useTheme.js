import { useContext } from 'react';
import ThemeContext from '../context/ThemeContextInstance';

/**
 * Custom hook for accessing theme context.
 * Provides theme state and toggle functionality.
 * 
 * @returns {{ theme: 'light' | 'dark', toggleTheme: Function }}
 * @throws {Error} If used outside of ThemeProvider
 * 
 * @example
 * const { theme, toggleTheme } = useTheme();
 * // theme: 'light' | 'dark'
 * // toggleTheme: () => void
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
