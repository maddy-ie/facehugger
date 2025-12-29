import { FC, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { useAssistant } from "../../contexts/AssistantContext";

export const ChatArea: FC = () => {
  const { messages, isLoading } = useAssistant();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto scroll-smooth relative bg-bg-1"
      ref={scrollContainerRef}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-3 px-4 py-8">
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center h-full text-text-muted text-center">
            <div>
              <p className="text-lg font-medium mb-2">No messages yet</p>
              <p className="text-sm">
                Start a conversation by sending a message below
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <ChatMessage
            key={message.id || `${message.role}-${message.timestamp}`}
            message={message}
            defaultExpanded={index >= messages.length - 2} // Last 2 messages expanded
          />
        ))}

        {isLoading && messages.length === 0 && (
          <div className="flex items-center justify-center">
            <div className="text-text-muted">Loading messages...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
