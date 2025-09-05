import { Button as HeadlessButton } from '@headlessui/react';

export default function Button({ children, className = '', ...props }) {
  return (
    <HeadlessButton
      className={`btn btn-accent btn-glass shadow-lg rounded-lg px-5 py-2 text-base font-semibold tracking-wide data-active:bg-accent-focus data-hover:bg-accent/80 transition-all duration-150
        hover:scale-[1.03] active:scale-95 focus:ring-2 focus:ring-accent/40 focus:outline-none
        hover:shadow-xl focus:shadow-xl
        ${className}`}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
}
