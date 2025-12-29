import { FC } from "react";
import Logo from "../../assets/logo_white.svg";
import { Button } from "../ui";

type Page = "assistant" | "ide";

interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Nav: FC<NavProps> = ({ currentPage, onNavigate }) => {
  const isAssistant = currentPage === "assistant";
  const isIDE = currentPage === "ide";

  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-bg-0 shrink-0 z-20 relative">
      <div className="flex items-center gap-2">
        {/* <div className="size-6 text-primary flex items-center justify-center rounded-lg">
          <img src={Logo} alt="LiMSight" className="" />
        </div>
        <h2 className="text-text text-lg font-bold tracking-tight font-heading">
          LiMSight
        </h2> */}
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <nav className="flex items-center bg-bg-1 p-1 rounded-lg border border-border">
          <Button
            onClick={() => onNavigate("assistant")}
            variant={isAssistant ? "primary" : "ghost"}
            size="sm"
            className={isAssistant ? "font-bold" : "font-medium"}
          >
            <span className="material-symbols-outlined text-[18px]">
              chat_bubble
            </span>
            Chat
          </Button>
          <Button
            onClick={() => onNavigate("ide")}
            variant={isIDE ? "primary" : "ghost"}
            size="sm"
            className={isIDE ? "font-bold" : "font-medium"}
          >
            <span className="material-symbols-outlined text-[18px]">code</span>
            IDE
          </Button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* <div
          className="bg-center bg-no-repeat bg-cover rounded-full size-8 ring-2 ring-border cursor-pointer"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/a/default-user')`,
          }}
        ></div> */}
      </div>
    </header>
  );
};
