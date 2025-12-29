import { FC } from "react";
import { useAssistant } from "../../contexts/AssistantContext";
import { SelectRootFull, SelectItem } from "../ui";

export const AssistantSidebar: FC = () => {
  const {
    sessions,
    currentSession,
    setCurrentSession,
    // createNewSession,
    // isLoading,
    selectedModel,
    setSelectedModel,
  } = useAssistant();

  // const handleNewChat = async () => {
  //   await createNewSession();
  // };

  const handleSessionSelect = (session: any) => {
    setCurrentSession(session);
  };

  // Group sessions by date
  const groupSessionsByDate = (sessions: any[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const grouped: { [key: string]: any[] } = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    sessions.forEach((session) => {
      const createdDate = new Date(session.created_on);
      if (createdDate.toDateString() === today.toDateString()) {
        grouped["Today"].push(session);
      } else if (createdDate.toDateString() === yesterday.toDateString()) {
        grouped["Yesterday"].push(session);
      } else {
        grouped["Earlier"].push(session);
      }
    });

    return grouped;
  };

  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <aside className="w-[280px] flex-shrink-0 flex flex-col border-r border-border bg-bg-0 transition-colors duration-200">
      {/* Header */}
      {/* <div className="p-4 flex flex-col gap-4">
        <Button
          onClick={handleNewChat}
          disabled={isLoading}
          variant="primary"
          size="lg"
          icon={<PlusIcon />}
          className="w-full"
        >
          New Chat
        </Button>
      </div> */}

      {/* Model Selector */}
      <div className="px-4 pb-4 pt-4">
        <SelectRootFull
          value={selectedModel ?? "gemini-2.5-flash"}
          onValueChange={(value) => setSelectedModel(value)}
          placeholder="Select model"
          icon={
            <span className="material-symbols-outlined text-[20px]">
              psychology
            </span>
          }
        >
          <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
          <SelectItem value="gpt-4">GPT-4 Turbo</SelectItem>
          <SelectItem value="claude-3">Claude 3 Opus</SelectItem>
        </SelectRootFull>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-6">
        {Object.entries(groupedSessions).map(([dateGroup, groupSessions]) => {
          if (groupSessions.length === 0) return null;

          return (
            <div key={dateGroup} className="flex flex-col gap-1">
              <h3 className="px-4 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                {dateGroup}
              </h3>
              {groupSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => handleSessionSelect(session)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left group transition-colors ${
                    currentSession?.id === session.id
                      ? "bg-bg-2"
                      : "hover:bg-bg-2"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] transition-colors ${
                      currentSession?.id === session.id
                        ? "text-primary"
                        : "text-text-secondary group-hover:text-primary"
                    }`}
                  >
                    {currentSession?.id === session.id
                      ? "chat_bubble"
                      : "chat_bubble_outline"}
                  </span>
                  <span
                    className={`text-sm font-medium truncate flex-1 ${
                      currentSession?.id === session.id
                        ? "text-text"
                        : "text-text-secondary"
                    }`}
                  >
                    {session.title}
                  </span>
                </button>
              ))}
            </div>
          );
        })}

        {sessions.length === 0 && (
          <div className="flex items-center justify-center h-full text-text-muted text-sm">
            No sessions yet
          </div>
        )}
      </div>
    </aside>
  );
};
