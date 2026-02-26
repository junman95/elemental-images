import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type DsButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "gold";
type DsButtonSize = "sm" | "md" | "lg";

interface DsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: DsButtonVariant;
  size?: DsButtonSize;
}

const variantStyles: Record<DsButtonVariant, string> = {
  primary:
    "bg-[#13ec5b] text-[#102216] font-bold hover:bg-[#0db849] shadow-[0_4px_16px_rgba(19,236,91,0.2)] hover:shadow-[0_4px_20px_rgba(19,236,91,0.35)]",
  secondary:
    "bg-[rgba(19,236,91,0.1)] text-[#13ec5b] border border-[rgba(19,236,91,0.3)] font-bold hover:bg-[rgba(19,236,91,0.18)]",
  ghost:
    "bg-transparent text-[#4a664a] hover:bg-[rgba(19,236,91,0.07)] hover:text-[#13ec5b]",
  outline:
    "bg-transparent border border-[#1a2e1a]/20 text-[#1a2e1a] hover:border-[#13ec5b] hover:text-[#13ec5b]",
  gold:
    "bg-[rgba(212,175,55,0.12)] text-[#d4af37] border border-[rgba(212,175,55,0.35)] font-bold hover:bg-[rgba(212,175,55,0.2)]",
};

const sizeStyles: Record<DsButtonSize, string> = {
  sm: "px-4 py-1.5 text-xs rounded-full",
  md: "px-6 py-2.5 text-sm rounded-full",
  lg: "px-8 py-3 text-base rounded-full",
};

const DsButton = forwardRef<HTMLButtonElement, DsButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DsButton.displayName = "DsButton";
export default DsButton;
