import { Slot } from "@radix-ui/react-slot";
import { FC, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary/90 text-text-on-accent border border-border disabled:bg-bg-3 disabled:text-text-muted disabled:cursor-not-allowed",
  secondary:
    "bg-bg-2 hover:bg-bg-3 text-text border border-border disabled:bg-bg-3 disabled:text-text-muted disabled:cursor-not-allowed",
  ghost:
    "text-text-secondary hover:text-text hover:bg-bg-2 border border-transparent disabled:text-text-muted disabled:cursor-not-allowed",
  outline:
    "border border-border bg-transparent hover:bg-bg-1 text-text disabled:text-text-muted disabled:cursor-not-allowed",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  asChild = false,
  icon,
  className = "",
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary/50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </Comp>
  );
};
