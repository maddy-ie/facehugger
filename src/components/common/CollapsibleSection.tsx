import { FC, ReactNode } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "./Icons";

interface CollapsibleSectionProps {
  /** Header title text or element */
  title: ReactNode;
  /** Icon to show in header (optional) */
  icon?: ReactNode;
  /** Content to show when expanded */
  children: ReactNode;
  /** Preview text shown when collapsed (optional) */
  collapsedPreview?: string;
  /** Control expanded state externally (optional - uncontrolled by default) */
  isExpanded?: boolean;
  /** Callback when toggled (optional) */
  onToggle?: (expanded: boolean) => void;
  /** Default expanded state for uncontrolled mode */
  defaultExpanded?: boolean;
  /** Additional className for container */
  className?: string;
}

/**
 * Reusable collapsible/accordion section component using Radix Collapsible.
 * Can be controlled (pass isExpanded + onToggle) or uncontrolled (uses defaultExpanded).
 */
export const CollapsibleSection: FC<CollapsibleSectionProps> = ({
  title,
  icon,
  children,
  collapsedPreview,
  isExpanded,
  onToggle,
  defaultExpanded = true,
  className = "",
}) => {
  return (
    <Collapsible.Root
      open={isExpanded}
      onOpenChange={onToggle}
      defaultOpen={defaultExpanded}
      className={`rounded-lg border border-border-light bg-bg-2 overflow-hidden ${className}`}
    >
      {/* Header */}
      <Collapsible.Trigger asChild>
        <button
          type="button"
          className="w-full text-left flex items-center gap-3 px-4 h-12 bg-bg-3 hover:bg-hover-3 transition-colors cursor-pointer data-[state=open]:border-b data-[state=open]:border-border-light"
        >
          {/* Icon */}
          {icon && (
            <span className="text-text-secondary flex-shrink-0 w-5 h-5 flex items-center justify-center">
              {icon}
            </span>
          )}

          {/* Title + preview - wrap in a span to check state */}
          <div className="flex-1 min-w-0 flex items-center gap-2 text-sm">
            <span className="text-text font-medium">{title}</span>
            {collapsedPreview && (
              <span className="group-data-[state=open]:hidden flex items-center gap-2">
                <span className="text-border">·</span>
                <span className="truncate text-text-secondary">
                  {collapsedPreview}
                </span>
              </span>
            )}
          </div>

          {/* Chevron */}
          <span className="text-text-muted flex-shrink-0 transition-transform duration-200 data-[state=open]:rotate-180">
            <ChevronDownIcon />
          </span>
        </button>
      </Collapsible.Trigger>

      {/* Content */}
      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="p-4 bg-bg-1">{children}</div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
