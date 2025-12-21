import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api, Message, Session } from '../services/api'
import { wsClient } from '../services/websocket'

interface AssistantContextType {
  // Sessions
  sessions: Session[]
  currentSession: Session | null
  setCurrentSession: (session: Session | null) => void
  createNewSession: () => Promise<void>
  loadSessions: () => Promise<void>

  // Messages
  messages: Message[]
  addMessage: (message: Message) => void
  updateMessageStatus: (messageId: string, status: Message['status']) => void
  clearMessages: () => void
  removeTypingIndicator: (userId: string) => void

  // UI State
  isLoading: boolean
  error: string | null
  setError: (error: string | null) => void

  // WebSocket
  isConnected: boolean

  // Selected model
  selectedModel: string | null
  setSelectedModel: (model: string | null) => void
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined)

export const AssistantProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [currentSession, setCurrentSessionState] = useState<Session | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)

  // Wrapper to sync session with model
  const setCurrentSession = (session: Session | null) => {
    setCurrentSessionState(session)
    setSelectedModel(session?.model ?? null)
    if (!session) {
      setMessages([])
    }
  }

  // Load sessions from API
  const loadSessions = async () => {
    try {
      const loadedSessions = await api.getSessions()
      setSessions(loadedSessions)
      if (loadedSessions.length > 0 && !currentSession) {
        setCurrentSession(loadedSessions[0])
      }
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load sessions'
      setError(message)
      console.error('Failed to load sessions:', err)
    }
  }

  // Create new session
  const createNewSession = async () => {
    try {
      setIsLoading(true)
      const newSession = await api.createSession(selectedModel ?? undefined)
      setSessions((prev) => [newSession, ...prev])
      setCurrentSession(newSession)
      setMessages([])
      setError(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create session'
      setError(message)
      console.error('Failed to create session:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Load messages when session changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!currentSession) {
        setMessages([])
        return
      }

      try {
        setIsLoading(true)
        const loadedMessages = await api.getSessionMessages(currentSession.id)
        setMessages(loadedMessages)
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load messages'
        setError(message)
        console.error('Failed to load messages:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [currentSession])

  // Connect/reconnect WebSocket when session changes
  useEffect(() => {
    if (!currentSession) {
      wsClient.disconnect()
      setIsConnected(false)
      return
    }

    // Check if already connected to this specific session
    if (wsClient.isConnected() && wsClient.getCurrentSessionId() === currentSession.id) {
      return
    }

    // Disconnect from previous session before connecting to new one
    if (wsClient.isConnected()) {
      wsClient.disconnect()
    }

    const connectWebSocket = async () => {
      try {
        await wsClient.connect(currentSession.id)
        setIsConnected(true)
      } catch (err) {
        console.warn('WebSocket connect failed:', err)
        setIsConnected(false)
      }
    }

    connectWebSocket()
  }, [currentSession?.id])

  // Setup WebSocket listeners
  useEffect(() => {
    const OnReceiveMessage = wsClient.on('receive_message', (data) => {
      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data
        // Remove typing indicator for this user before adding actual message
        removeTypingIndicator(parsedData.id)
        const message: Message = {
          id: parsedData.id,
          role: parsedData.role || 'model',
          content: parsedData.content,
          timestamp: parsedData.timestamp,
          status: 'delivered',
          user_name: parsedData.user_name,
        }
        addMessage(message)
      } catch (error) {
        console.error('Failed to parse send_message data:', error)
      }
    })

    const OnTypingIndicator = wsClient.on('typing_indicator', (data) => {
      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data

        const message: Message = {
          id: `typing-${parsedData.id}`,
          role: parsedData.role || 'model',
          content: parsedData.content,
          status: 'delivered',
        }
        addTypingIndicator(message)

      } catch (error) {
        console.error('Failed to parse typing_indicator data:', error)
      }
    })

    const OnStatus = wsClient.on('message_status', (data) => {
      if (data.message_id && data.status) {
        updateMessageStatus(data.message_id, data.status)
      }
    })

    const OnError = wsClient.on('error', (data) => {
      setError(data.message || 'WebSocket error occurred')
    })

    const OnDisconnect = wsClient.on('disconnect', () => {
      setIsConnected(false)
    })

    return () => {
      OnReceiveMessage()
      OnTypingIndicator()
      OnStatus()
      OnError()
      OnDisconnect()
    }
  }, [])

  // Load initial sessions on mount
  useEffect(() => {
    loadSessions()
  }, [])

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const updateMessageStatus = (messageId: string, status: Message['status']) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, status } : msg))
    )
  }

  const clearMessages = () => {
    setMessages([])
  }

  const addTypingIndicator = (message: Message) => {
    setMessages((prev) => [...prev, message])
  }

  const removeTypingIndicator = (userId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== `typing-${userId}`))
  }

  const value: AssistantContextType = {
    sessions,
    currentSession,
    setCurrentSession,
    createNewSession,
    loadSessions,
    messages,
    addMessage,
    updateMessageStatus,
    clearMessages,
    removeTypingIndicator,
    isLoading,
    error,
    setError,
    isConnected,
    selectedModel,
    setSelectedModel,
  }

  return (
    <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>
  )
}

export const useAssistant = (): AssistantContextType => {
  const context = useContext(AssistantContext)
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider')
  }
  return context
}
