// Backend API client for REST endpoints
const API_BASE_URL = 'http://localhost:5000'

export interface Session {
  id: string
  title: string
  model: string
  created_on: string
}

export interface Message {
  id?: string
  role: 'user' | 'model'
  content: string
  timestamp?: string
  status?: 'pending' | 'sent' | 'delivered' | 'read' | 'error'
  user_name?: string
}

export const api = {
  // Fetch all sessions
  async getSessions(): Promise<Session[]> {
    const response = await fetch(`${API_BASE_URL}/sessions`)
    if (!response.ok) {
      throw new Error(`Failed to fetch sessions: ${response.statusText}`)
    }
    return response.json()
  },

  // Create a new session
  async createSession(model?: string): Promise<Session> {
    const body: Record<string, unknown> = {}
    if (model) body.model = model
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.statusText}`)
    }
    return response.json()
  },

  // Fetch messages for a session
  async getSessionMessages(
    sessionId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Message[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    })
    const response = await fetch(
      `${API_BASE_URL}/sessions/${sessionId}/messages?${params}`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`)
    }
    return response.json()
  },
}
