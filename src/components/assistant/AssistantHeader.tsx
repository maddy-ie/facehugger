import { FC } from 'react'
import { useAssistant } from '../../contexts/AssistantContext'

export const AssistantHeader: FC = () => {
  const { currentSession } = useAssistant()

  return (
    <header className="h-14 border-b border-gray-200 dark:border-border-dark flex items-center justify-between px-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Session:</span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {currentSession?.title || 'No session selected'}
        </span>
      </div>
    </header>
  )
}
