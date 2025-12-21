// WebSocket client for real-time messaging

export type WebSocketEventType =
  | 'connect'
  | 'send_message'
  | 'receive_message'
  | 'typing_indicator'
  | 'message_status'
  | 'error'
  | 'disconnect'

export interface WebSocketEvent {
  type: WebSocketEventType
  data: any
}

export class WebSocketClient {
  private ws: WebSocket | null = null
  private baseUrl: string = 'ws://localhost:5000'
  private sessionId: string | null = null
  private listeners: Map<WebSocketEventType, Set<(data: any) => void>> = new Map()

  private getWebSocketUrl(): string {
    if (!this.sessionId) {
      throw new Error('Session ID is required to connect')
    }
    return `${this.baseUrl}/ws/${this.sessionId}`
  }

  connect(sessionId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Avoid reconnecting to the same session if already connected
        if (this.isConnected() && this.sessionId === sessionId) {
          resolve()
          return
        }

        this.sessionId = sessionId

        // Disconnect previous connection if exists
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.close()
        }

        this.ws = new WebSocket(this.getWebSocketUrl())

        this.ws.onopen = () => {
          console.log('WebSocket connected')

          this.send('connect', {})

          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const wsEvent: WebSocketEvent = JSON.parse(event.data)
            this.emit(wsEvent.type, wsEvent.data)
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error)
          }
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          this.emit('error', { message: 'WebSocket connection error' })
          reject(error)
        }

        this.ws.onclose = () => {
          console.log('WebSocket disconnected')
          this.emit('disconnect', {})
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  send(type: WebSocketEventType, data: any): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected')
      return
    }

    const event: WebSocketEvent = { type, data }
    this.ws.send(JSON.stringify(event))
  }

  sendMessage(
    content: string
  ): void {
    this.send('send_message', {
      content
    })
  }

  on(type: WebSocketEventType, callback: (data: any) => void): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }
    this.listeners.get(type)!.add(callback)

    return () => {
      this.listeners.get(type)?.delete(callback)
    }
  }

  private emit(type: WebSocketEventType, data: any): void {
    const callbacks = this.listeners.get(type)
    if (callbacks) {
      callbacks.forEach((callback) => callback(data))
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }

  getCurrentSessionId(): string | null {
    return this.sessionId
  }
}

export const wsClient = new WebSocketClient()
