import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type IconButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "gold";
export type IconButtonSize = "sm" | "md" | "lg" | "xl";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** 접근성을 위한 필수 레이블 */
  "aria-label": string;
}

const variantStyles: Record<IconButtonVariant, string> = {
  primary:
    "bg-[#13ec5b] text-[#102216] hover:bg-[#0db849] shadow-[0_4px_16px_rgba(19,236,91,0.2)] hover:shadow-[0_4px_20px_rgba(19,236,91,0.35)]",
  secondary:
    "bg-[rgba(19,236,91,0.1)] text-[#13ec5b] border border-[rgba(19,236,91,0.3)] hover:bg-[rgba(19,236,91,0.18)]",
  ghost:
    "bg-transparent text-[#4a664a] hover:bg-[rgba(19,236,91,0.07)] hover:text-[#13ec5b]",
  outline:
    "bg-transparent border border-[#1a2e1a]/20 text-[#1a2e1a] hover:border-[#13ec5b] hover:text-[#13ec5b]",
  gold:
    "bg-[rgba(212,175,55,0.12)] text-[#d4af37] border border-[rgba(212,175,55,0.35)] hover:bg-[rgba(212,175,55,0.2)]",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "w-7  h-7  rounded-lg  [&>svg]:w-3.5 [&>svg]:h-3.5",
  md: "w-10 h-10 rounded-xl  [&>svg]:w-5   [&>svg]:h-5",
  lg: "w-12 h-12 rounded-xl  [&>svg]:w-6   [&>svg]:h-6",
  xl: "w-16 h-16 rounded-2xl [&>svg]:w-7   [&>svg]:h-7",
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "ghost", size = "md", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        "transition-all duration-200 cursor-pointer",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

IconButton.displayName = "IconButton";
export default IconButton;
