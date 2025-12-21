import { FC, useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { useAssistant } from '../../contexts/AssistantContext'

export const ChatArea: FC = () => {
  const { messages, isLoading } = useAssistant()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto scroll-smooth relative" ref={scrollContainerRef}>
      <div className="max-w-4xl mx-auto flex flex-col gap-6 px-4 py-8 pb-32">
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-center">
            <div>
              <p className="text-lg font-medium mb-2">No messages yet</p>
              <p className="text-sm">Start a conversation by sending a message below</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage
            key={message.id || `${message.role}-${message.timestamp}`}
            message={message}
          />
        ))}

        {isLoading && messages.length === 0 && (
          <div className="flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400">Loading messages...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
