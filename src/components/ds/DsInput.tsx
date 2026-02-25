import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";
import { Search } from "lucide-react";

interface DsInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const DsInput = forwardRef<HTMLInputElement, DsInputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-medium text-[#4a664a] tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 text-sm rounded-lg",
            "bg-white/65 backdrop-blur-md",
            "border border-[rgba(26,46,26,0.12)]",
            "text-[#1a2e1a] placeholder:text-[#8aaa8a]",
            "focus:outline-none focus:ring-2 focus:ring-[#13ec5b]/30 focus:border-[#13ec5b]/50",
            "transition-all duration-200",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
DsInput.displayName = "DsInput";

/** 검색 인풋 — 좌측 아이콘 포함 */
export function DsSearchInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg",
        "bg-white/65 backdrop-blur-md",
        "border border-[rgba(26,46,26,0.12)]",
        "focus-within:ring-2 focus-within:ring-[#13ec5b]/30 focus-within:border-[#13ec5b]/50",
        "transition-all duration-200",
        className
      )}
    >
      <Search className="w-4 h-4 text-[#8aaa8a] shrink-0" />
      <input
        className="flex-1 min-w-0 bg-transparent text-sm text-[#1a2e1a] placeholder:text-[#8aaa8a] focus:outline-none"
        {...props}
      />
    </div>
  );
}
