import { FC, useState } from 'react'
import { useAssistant } from '../../contexts/AssistantContext'
import { wsClient } from '../../services/websocket'

export const ChatInput: FC = () => {
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const { currentSession, addMessage, isConnected } = useAssistant()

  const handleSend = async () => {
    if (!message.trim() || !currentSession || !isConnected) {
      return
    }

    // Add user message to UI
    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date().toISOString(),
      status: 'pending' as const,
    }
    addMessage(userMessage)

    // Send to backend
    setIsSending(true)
    try {
      wsClient.sendMessage(
        message
      )
      setMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!currentSession) {
    return (
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-gray-500 dark:text-gray-400">
            Select a session to start chatting
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-12">
      <div className="max-w-4xl mx-auto relative">
        {!isConnected && (
          <div className="mb-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300 text-xs rounded-lg">
            ⚠️ Connection lost. Attempting to reconnect...
          </div>
        )}
        <div className="relative bg-white dark:bg-sidebar-dark rounded-xl border border-gray-300 dark:border-border-dark shadow-lg focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!isConnected || isSending}
            className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-none rounded-xl py-4 pl-4 pr-12 resize-none focus:ring-0 max-h-[200px] overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Message LiMSight Assistant..."
            rows={1}
            style={{ minHeight: '56px' }}
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <button
              onClick={handleSend}
              disabled={!isConnected || isSending || !message.trim() || !currentSession}
              className="p-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px] leading-none">
                {isSending ? 'hourglass_empty' : 'arrow_upward'}
              </span>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 px-1">
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isConnected}
              title="Attach file"
            >
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>
            <button
              className="p-1.5 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isConnected}
              title="Voice Input"
            >
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
          </div>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 text-center">
            AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  )
}
