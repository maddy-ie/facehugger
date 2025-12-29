import * as Select from "@radix-ui/react-select";
import { FC, ReactNode } from "react";
import { ChevronDownIcon } from "../common/Icons";

interface SelectItemProps {
  value: string;
  children: ReactNode;
  icon?: ReactNode;
}

const SelectItem: FC<SelectItemProps> = ({ value, children, icon }) => {
  return (
    <Select.Item
      value={value}
      className="
        flex items-center gap-2 px-3 py-1.5 text-xs
        text-text-secondary hover:text-text
        hover:bg-hover-1 outline-none cursor-pointer
        transition-colors rounded-md mx-1
        data-[highlighted]:bg-hover-1 data-[highlighted]:text-text
      "
    >
      <Select.ItemText>
        <span className="flex items-center gap-2">
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </span>
      </Select.ItemText>
    </Select.Item>
  );
};

interface SelectRootProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  placeholder?: string;
  icon?: ReactNode;
}

export const SelectRoot: FC<SelectRootProps> = ({
  value,
  onValueChange,
  children,
  placeholder,
  icon,
}) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className="
          inline-flex items-center gap-2
          bg-transparent border-none
          text-xs rounded-lg py-1.5 px-3
          text-text-secondary hover:text-text hover:bg-bg-2
          cursor-pointer
          focus:outline-none
          transition-colors
        "
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="text-text-muted">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="
            bg-bg-0 rounded-lg border border-border
            py-1 z-50 min-w-[var(--radix-select-trigger-width)]
            max-h-[300px] overflow-y-auto
            animate-in fade-in-0 zoom-in-95
          "
        >
          <Select.Viewport>{children}</Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

// Full-width variant for sidebars and traditional forms
export const SelectRootFull: FC<SelectRootProps> = ({
  value,
  onValueChange,
  children,
  placeholder,
  icon,
}) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className="
          flex items-center gap-3
          w-full bg-bg-1 border border-border
          text-sm rounded-lg py-2.5 px-3
          text-text hover:bg-hover-1
          cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-primary/50
          transition-colors
        "
      >
        {icon && <span className="shrink-0 text-text-muted">{icon}</span>}
        <Select.Value placeholder={placeholder} className="flex-1" />
        <Select.Icon className="text-text-muted ml-auto">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="
            bg-bg-0 rounded-lg border border-border
            py-1 z-50 min-w-[var(--radix-select-trigger-width)]
            max-h-[300px] overflow-y-auto
            animate-in fade-in-0 zoom-in-95
          "
        >
          <Select.Viewport>{children}</Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export { SelectItem };
