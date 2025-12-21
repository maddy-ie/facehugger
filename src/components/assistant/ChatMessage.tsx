import { FC } from 'react'
import { Message } from '../../services/api'

interface ChatMessageProps {
  message: Message
}

const TypingIndicator: FC = () => {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: '0ms' }}
      />
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: '150ms' }}
      />
      <div
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: '300ms' }}
      />
    </div>
  )
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const isTypingIndicator = message.id?.startsWith('typing-')

  const getStatusIcon = (status?: Message['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span
            className="material-symbols-outlined text-[14px] text-gray-400"
            title="Pending"
          >
            schedule
          </span>
        )
      case 'sent':
        return (
          <span
            className="material-symbols-outlined text-[14px] text-gray-400"
            title="Sent"
          >
            done
          </span>
        )
      case 'delivered':
        return (
          <span
            className="material-symbols-outlined text-[14px] text-gray-400"
            title="Delivered"
          >
            done_all
          </span>
        )
      case 'read':
        return (
          <span
            className="material-symbols-outlined text-[14px] text-primary"
            title="Read"
          >
            done_all
          </span>
        )
      case 'error':
        return (
          <span
            className="material-symbols-outlined text-[14px] text-red-500"
            title="Error"
          >
            error
          </span>
        )
      default:
        return null
    }
  }

  if (message.role === 'user') {
    return (
      <div className="flex items-end justify-end gap-3 w-full">
        <div className="flex flex-col gap-1 items-end max-w-[85%]">
          <span className="text-xs font-medium text-gray-400 mr-1">You</span>
          <div className="bg-primary text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-sm">
            <p className="text-[15px] leading-relaxed">{message.content}</p>
          </div>
          {message.status && (
            <div className="flex items-center gap-1 mt-1">
              {getStatusIcon(message.status)}
              <span className="text-xs text-gray-400 ml-1">
                {message.timestamp &&
                  new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
              </span>
            </div>
          )}
        </div>
        <div
          className="w-8 h-8 rounded-full bg-cover bg-center flex-shrink-0 border border-gray-200 dark:border-gray-700"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/a/default-user')` }}
        />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 w-full">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary border border-primary/20">
        <span className="material-symbols-outlined text-[18px]">smart_toy</span>
      </div>
      <div className="flex flex-col gap-2 max-w-[85%] w-full">
        <span className="text-xs font-medium text-gray-400 ml-1">
          {message.user_name || 'LiMSight Assistant'}
        </span>
        <div className="bg-white dark:bg-sidebar-dark border border-gray-200 dark:border-border-dark px-6 py-5 rounded-2xl rounded-tl-sm shadow-sm w-fit">
          <div className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-200">
            {isTypingIndicator ? (
              <TypingIndicator />
            ) : (
              <div className="prose dark:prose-invert max-w-none">{message.content}</div>
            )}
          </div>
        </div>
        {message.timestamp && (
          <span className="text-xs text-gray-400 ml-1">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
      </div>
    </div>
  )
}
