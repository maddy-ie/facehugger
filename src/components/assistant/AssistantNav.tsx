import { FC } from 'react'

interface NavProps {
  onNavigateToIDE: () => void
}

export const AssistantNav: FC<NavProps> = ({ onNavigateToIDE }) => {
  return (
    <nav className="h-14 flex-shrink-0 border-b border-gray-200 dark:border-border-dark bg-sidebar-light dark:bg-sidebar-dark flex items-center justify-center relative z-20">
      <div className="flex items-center p-1 bg-gray-100 dark:bg-input-dark rounded-lg border border-transparent dark:border-gray-800">
        <button className="flex items-center gap-2 px-8 py-1.5 text-sm font-semibold rounded-md bg-white dark:bg-sidebar-dark text-primary shadow-sm ring-1 ring-gray-200 dark:ring-border-dark transition-all">
          <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
          Chat
        </button>
        <button
          onClick={onNavigateToIDE}
          className="flex items-center gap-2 px-8 py-1.5 text-sm font-medium rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">code</span>
          IDE
        </button>
      </div>
    </nav>
  )
}
