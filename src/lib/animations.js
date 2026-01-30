/**
 * Standardized animation constants for consistent UX across the app
 * All durations follow the design system for predictable interactions
 */

// ============================================================================
// DURATION CONSTANTS
// ============================================================================

/**
 * Animation durations in seconds (for Framer Motion)
 */
export const DURATION = {
  /** Instant feedback - button clicks, toggles (0.15s) */
  instant: 0.15,
  /** Fast transitions - hover states, small UI changes (0.2s) */
  fast: 0.2,
  /** Normal transitions - most UI animations (0.3s) */
  normal: 0.3,
  /** Slow transitions - page transitions, modals (0.5s) */
  slow: 0.5,
  /** Very slow - hero animations, initial loads (0.6s) */
  slower: 0.6,
};

/**
 * Stagger delays for sequential animations
 */
export const STAGGER = {
  /** Fast stagger for lists (0.05s) */
  fast: 0.05,
  /** Normal stagger for nav items (0.1s) */
  normal: 0.1,
  /** Slow stagger for hero elements (0.15s) */
  slow: 0.15,
};

// ============================================================================
// EASING PRESETS
// ============================================================================

export const EASE = {
  /** Standard easing for most animations */
  default: "easeOut",
  /** Smooth easing for entrances */
  smooth: [0.25, 0.1, 0.25, 1],
  /** Bouncy easing for playful interactions */
  bounce: [0.68, -0.55, 0.265, 1.55],
  /** Spring config for physical animations */
  spring: { type: "spring", damping: 25, stiffness: 200 },
};

// ============================================================================
// COMMON ANIMATION VARIANTS
// ============================================================================

/**
 * Fade in from bottom - for cards, list items
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: DURATION.normal, ease: EASE.default },
};

/**
 * Fade in from left - for sidebars, nav items
 */
export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: DURATION.normal, ease: EASE.default },
};

/**
 * Fade in from right - for panels, modals
 */
export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: DURATION.normal, ease: EASE.default },
};

/**
 * Scale in - for modals, popups
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: DURATION.normal, ease: EASE.default },
};

/**
 * Navbar entrance animation
 */
export const navbarEntrance = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: DURATION.slow, ease: EASE.default },
};

/**
 * Card hover effect
 */
export const cardHover = {
  whileHover: { y: -8, transition: { duration: DURATION.fast, ease: EASE.default } },
  whileTap: { scale: 0.98 },
};

/**
 * Button hover effect
 */
export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

/**
 * Icon rotation animation (for toggles)
 */
export const iconRotate = {
  initial: { rotate: -90, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: 90, opacity: 0 },
  transition: { duration: DURATION.fast },
};

/**
 * Floating animation for decorative elements
 */
export const floating = (delay = 0) => ({
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

/**
 * Staggered children animation
 */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: STAGGER.normal,
    },
  },
};

/**
 * Child item for stagger animation
 */
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
