import { FC, useState, useRef, useEffect } from "react";
import { useAssistant } from "../../contexts/AssistantContext";
import { api } from "../../services/api";
import {
  PlusIcon,
  SendIcon,
  FileIcon,
  FolderIcon,
  FileTextIcon,
  BarChart3Icon,
  ImageIconComponent,
  BotIcon,
} from "../common/Icons";
import {
  Button,
  DropdownMenuRoot,
  DropdownMenuItem,
  SelectRoot,
  SelectItem,
} from "../ui";

type OutputType = "Response" | "Report" | "Graph" | "Visual";

export const ChatInput: FC = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [outputType, setOutputType] = useState<OutputType>("Response");
  const { addMessage } = useAssistant();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [message]);

  const handleSend = async () => {
    if (!message.trim() || isSending) {
      return;
    }

    // Add user message to UI
    const userMessage = {
      role: "user" as const,
      content: message,
      timestamp: new Date().toISOString(),
      status: "pending" as const,
    };
    addMessage(userMessage);
    const sentMessage = message;
    setMessage("");

    // Send to backend via REST API
    setIsSending(true);
    try {
      const response = await api.sendMessage("0", sentMessage);
      addMessage({
        role: "model",
        content: response.reply,
        timestamp: new Date().toISOString(),
        status: "delivered",
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      addMessage({
        role: "model",
        content: `Error: ${
          error instanceof Error ? error.message : "Failed to send message"
        }`,
        timestamp: new Date().toISOString(),
        status: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSending) {
        handleSend();
      }
    }
  };

  return (
    <div className="bg-bg-1 p-4">
      <div className="bg-bg-0 rounded-2xl p-4 flex flex-col border border-border-light max-w-5xl mx-auto w-full">
        {/* Main input area */}
        <div className="flex-1 rounded-xl px-0 py-3 overflow-auto mb-2 max-h-[320px]">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your prompt here..."
            disabled={isSending}
            rows={1}
            className="w-full bg-transparent resize-none outline-none text-text placeholder:text-text-muted text-base min-h-[24px]"
          />
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between">
          {/* Left side - Context menu */}
          <div className="flex items-center gap-2">
            <DropdownMenuRoot
              open={showContextMenu}
              onOpenChange={setShowContextMenu}
              trigger={
                <button
                  className="w-10 h-10 rounded-lg border border-border bg-transparent hover:bg-bg-1 text-text flex items-center justify-center transition-colors"
                  title="Add context"
                >
                  <PlusIcon />
                </button>
              }
            >
              <DropdownMenuItem
                icon={<FileIcon />}
                onClick={() => setShowContextMenu(false)}
              >
                Add file
              </DropdownMenuItem>
              <DropdownMenuItem
                icon={<FolderIcon />}
                onClick={() => setShowContextMenu(false)}
              >
                Add folder
              </DropdownMenuItem>
            </DropdownMenuRoot>
          </div>

          {/* Right side - Send controls */}
          <div className="flex items-center gap-2">
            {/* Output type selector */}
            <SelectRoot
              value={outputType}
              onValueChange={(value) => setOutputType(value as OutputType)}
              placeholder="Output type"
            >
              <SelectItem value="Response" icon={<BotIcon />}>
                Response
              </SelectItem>
              <SelectItem value="Report" icon={<FileTextIcon />}>
                Report
              </SelectItem>
              <SelectItem value="Graph" icon={<BarChart3Icon />}>
                Graph
              </SelectItem>
              <SelectItem value="Visual" icon={<ImageIconComponent />}>
                Visual
              </SelectItem>
            </SelectRoot>

            {/* Send button */}
            <Button
              onClick={handleSend}
              disabled={!message.trim() || isSending}
              variant="primary"
              size="md"
              icon={
                isSending ? (
                  <div className="w-5 h-5 border-2 border-text-on-accent/30 border-t-text-on-accent rounded-full animate-spin" />
                ) : (
                  <SendIcon />
                )
              }
            >
              {isSending ? "Sending" : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
