import { FC } from 'react'
import { Nav } from '../components/common/Nav'
import { AssistantSidebar } from '../components/assistant/AssistantSidebar'
import { AssistantHeader } from '../components/assistant/AssistantHeader'
import { ChatArea } from '../components/assistant/ChatArea'
import { ChatInput } from '../components/assistant/ChatInput'
import { AssistantProvider } from '../contexts/AssistantContext'

interface AssistantPageProps {
  onNavigate: (page: 'assistant' | 'ide') => void
}

export const AssistantPage: FC<AssistantPageProps> = ({ onNavigate }) => {
  return (
    <AssistantProvider>
      <div className="h-screen w-full flex flex-col overflow-hidden">
        <Nav currentPage="assistant" onNavigate={onNavigate} />

        <div className="flex flex-1 overflow-hidden relative w-full">
          <AssistantSidebar />

          <main className="flex-1 flex flex-col h-full relative min-w-0">
            <AssistantHeader />
            <ChatArea />
            <ChatInput />
          </main>
        </div>
      </div>
    </AssistantProvider>
  )
}
