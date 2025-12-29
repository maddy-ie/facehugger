import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FC, ReactNode } from "react";

interface DropdownMenuItemProps {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
  icon,
  children,
  onClick,
  className = "",
}) => {
  return (
    <DropdownMenu.Item
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-1.5 text-xs
        text-text-secondary hover:text-text
        hover:bg-hover-1 outline-none cursor-pointer
        transition-colors rounded-md mx-1
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </DropdownMenu.Item>
  );
};

interface DropdownMenuRootProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export const DropdownMenuRoot: FC<DropdownMenuRootProps> = ({
  trigger,
  children,
  open,
  onOpenChange,
  align = "start",
  side = "top",
}) => {
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          side={side}
          sideOffset={4}
          className="
            bg-bg-0 rounded-lg border border-border
            py-1 z-50 min-w-[140px]
            animate-in fade-in-0 zoom-in-95
            data-[side=bottom]:slide-in-from-top-2
            data-[side=top]:slide-in-from-bottom-2
          "
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export { DropdownMenu };
