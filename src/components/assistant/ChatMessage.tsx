import { FC } from "react";
import { Message } from "../../services/api";
import { CollapsibleSection } from "../common/CollapsibleSection";
import { PersonIcon, BotIcon } from "../common/Icons";

interface ChatMessageProps {
  message: Message;
  /** Default expanded state */
  defaultExpanded?: boolean;
}

/**
 * Chat message displayed as a collapsible accordion section.
 * User messages show a person icon, AI messages show a robot icon.
 */
export const ChatMessage: FC<ChatMessageProps> = ({
  message,
  defaultExpanded = true,
}) => {
  const isUser = message.role === "user";
  const isTypingIndicator = message.id?.startsWith("typing-");

  // Truncate content for collapsed preview
  const previewText =
    message.content.length > 60
      ? message.content.slice(0, 60) + "..."
      : message.content;

  const icon = isUser ? <PersonIcon /> : <BotIcon />;

  const title = isUser ? "You" : "Assistant";

  const timestamp = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <CollapsibleSection
      icon={icon}
      title={
        <span className="flex items-center gap-2">
          {title}
          {timestamp && (
            <span className="text-xs font-normal text-text-muted">
              {timestamp}
            </span>
          )}
          {message.status === "error" && (
            <span className="material-symbols-outlined text-[14px] text-red-500">
              error
            </span>
          )}
        </span>
      }
      collapsedPreview={previewText}
      defaultExpanded={defaultExpanded}
    >
      {isTypingIndicator ? (
        <TypingIndicator />
      ) : (
        <div className="text-[15px] leading-relaxed text-text whitespace-pre-wrap">
          {message.content}
        </div>
      )}
    </CollapsibleSection>
  );
};

/** Animated typing dots */
const TypingIndicator: FC = () => (
  <div className="flex items-center gap-1.5">
    {[0, 150, 300].map((delay) => (
      <div
        key={delay}
        className="w-2 h-2 bg-text-muted rounded-full animate-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </div>
);
