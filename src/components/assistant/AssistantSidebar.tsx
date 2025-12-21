import { FC } from 'react'
import { useAssistant } from '../../contexts/AssistantContext'

export const AssistantSidebar: FC = () => {
  const { sessions, currentSession, setCurrentSession, createNewSession, isLoading, selectedModel, setSelectedModel } =
    useAssistant()

  const handleNewChat = async () => {
    await createNewSession()
  }

  const handleSessionSelect = (session: any) => {
    setCurrentSession(session)
  }

  // Group sessions by date
  const groupSessionsByDate = (sessions: any[]) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const grouped: { [key: string]: any[] } = {
      'Today': [],
      'Yesterday': [],
      'Earlier': [],
    }

    sessions.forEach((session) => {
      const createdDate = new Date(session.created_on)
      if (
        createdDate.toDateString() === today.toDateString()
      ) {
        grouped['Today'].push(session)
      } else if (
        createdDate.toDateString() === yesterday.toDateString()
      ) {
        grouped['Yesterday'].push(session)
      } else {
        grouped['Earlier'].push(session)
      }
    })

    return grouped
  }

  const groupedSessions = groupSessionsByDate(sessions)

  return (
    <aside className="w-[280px] flex-shrink-0 flex flex-col border-r border-gray-200 dark:border-border-dark bg-sidebar-light dark:bg-sidebar-dark transition-colors duration-200">
      {/* Header */}
      <div className="p-4 flex flex-col gap-4">
        <button
          onClick={handleNewChat}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all shadow-sm shadow-primary/20"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>New Chat</span>
        </button>
      </div>

      {/* Model Selector */}
      <div className="px-4 pb-2">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-500 text-[20px]">psychology</span>
          </div>
          <select
            name="model"
            value={selectedModel ?? ''}
            onChange={(e) => setSelectedModel(e.target.value || "gemini-2.5-flash")}
            className="appearance-none w-full bg-gray-100 dark:bg-input-dark border border-gray-200 dark:border-border-dark text-sm rounded-lg py-2.5 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-700 dark:text-gray-200 cursor-pointer"
          >
            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
            <option value="gpt-4">GPT-4 Turbo</option>
            <option value="claude-3">Claude 3 Opus</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-500 text-[18px]">expand_more</span>
          </div>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-6">
        {Object.entries(groupedSessions).map(([dateGroup, groupSessions]) => {
          if (groupSessions.length === 0) return null

          return (
            <div key={dateGroup} className="flex flex-col gap-1">
              <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">
                {dateGroup}
              </h3>
              {groupSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => handleSessionSelect(session)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left group transition-colors ${
                    currentSession?.id === session.id
                      ? 'bg-gray-100 dark:bg-[#283039]/50'
                      : 'hover:bg-gray-100 dark:hover:bg-[#283039]/50'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      currentSession?.id === session.id
                        ? 'text-primary'
                        : 'text-gray-400 group-hover:text-primary'
                    }`}
                  >
                    {currentSession?.id === session.id ? 'chat_bubble' : 'chat_bubble_outline'}
                  </span>
                  <span
                    className={`text-sm font-medium truncate flex-1 ${
                      currentSession?.id === session.id
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {session.title}
                  </span>
                </button>
              ))}
            </div>
          )
        })}

        {sessions.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
            No sessions yet
          </div>
        )}
      </div>
    </aside>
  )
}
