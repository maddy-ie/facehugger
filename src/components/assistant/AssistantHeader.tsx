import { FC } from "react";
import { useAssistant } from "../../contexts/AssistantContext";

export const AssistantHeader: FC = () => {
  const { currentSession } = useAssistant();

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-bg-0/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-text-secondary">
          Current Session:
        </span>
        <span className="text-sm font-bold text-text">
          {currentSession?.title || "No session selected"}
        </span>
      </div>
    </header>
  );
};
