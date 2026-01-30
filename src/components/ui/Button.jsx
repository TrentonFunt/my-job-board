import { Button as HeadlessButton } from '@headlessui/react';

/**
 * Button variants for consistent styling across the app
 * @typedef {'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'} ButtonVariant
 */

/**
 * Reusable Button component with consistent styling and accessibility
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {ButtonVariant} [props.variant='primary'] - Button style variant
 * @param {boolean} [props.loading] - Show loading state
 */
export default function Button({ 
  children, 
  className = '', 
  variant = 'primary',
  loading = false,
  disabled,
  ...props 
}) {
  // Base styles applied to all buttons
  const baseStyles = `
    btn rounded-lg px-5 py-2 text-base font-semibold tracking-wide
    transition-all duration-200 ease-out
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  // Variant-specific styles
  const variants = {
    primary: `
      btn-primary
      hover:brightness-110 hover:shadow-lg hover:shadow-primary/25
      active:scale-[0.98]
    `,
    secondary: `
      btn-secondary
      hover:brightness-110 hover:shadow-lg hover:shadow-secondary/25
      active:scale-[0.98]
    `,
    ghost: `
      btn-ghost
      hover:bg-base-200
      active:scale-[0.98]
    `,
    outline: `
      btn-outline btn-primary
      hover:bg-primary hover:text-primary-content
      active:scale-[0.98]
    `,
    danger: `
      btn-error
      hover:brightness-110 hover:shadow-lg hover:shadow-error/25
      active:scale-[0.98]
    `,
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <HeadlessButton
      className={`${baseStyles} ${variantStyles} ${className}`.trim().replace(/\s+/g, ' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="loading loading-spinner loading-sm"></span>
          {children}
        </span>
      ) : (
        children
      )}
    </HeadlessButton>
  );
}
