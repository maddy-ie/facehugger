import { FC } from "react";

interface NavProps {
  onNavigateToIDE: () => void;
}

export const AssistantNav: FC<NavProps> = ({ onNavigateToIDE }) => {
  return (
    <nav className="h-14 flex-shrink-0 border-b border-border bg-bg-0 flex items-center justify-center relative z-20">
      <div className="flex items-center p-1 bg-bg-1 rounded-lg border border-border-light">
        <button className="flex items-center gap-2 px-8 py-1.5 text-sm font-semibold rounded-md bg-bg-0 text-primary ring-1 ring-border transition-all">
          <span className="material-symbols-outlined text-[18px]">
            chat_bubble
          </span>
          Chat
        </button>
        <button
          onClick={onNavigateToIDE}
          className="flex items-center gap-2 px-8 py-1.5 text-sm font-medium rounded-md text-text-secondary hover:text-text hover:bg-bg-2 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">code</span>
          IDE
        </button>
      </div>
    </nav>
  );
};
