import { FC } from 'react';
import Logo from '../../assets/logo_white.svg';

type Page = 'assistant' | 'ide'

interface NavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export const Nav: FC<NavProps> = ({ currentPage, onNavigate }) => {
  const isAssistant = currentPage === 'assistant'
  const isIDE = currentPage === 'ide'

  return (
    <header className="h-14 border-b border-border-dark flex items-center justify-between px-4 bg-background-panel shrink-0 z-20 relative">
      <div className="flex items-center gap-2">
        <div className="size-6 text-primary flex items-center justify-center rounded-lg">
          <img src={Logo} alt="LiMSight" className="" />
        </div>
        <h2 className="text-white text-lg font-bold tracking-tight font-heading">LiMSight</h2>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <nav className="flex items-center bg-background-dark p-1 rounded-lg border border-border-dark">
          <button
            onClick={() => onNavigate('assistant')}
            aria-current={isAssistant ? 'page' : undefined}
            className={
              `flex items-center gap-2 px-6 py-1.5 text-sm rounded-md transition-all ${
                isAssistant
                  ? 'font-bold text-white bg-primary shadow-sm'
                  : 'font-medium text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }>
            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
            Chat
          </button>
          <button
            onClick={() => onNavigate('ide')}
            aria-current={isIDE ? 'page' : undefined}
            className={
              `flex items-center gap-2 px-6 py-1.5 text-sm rounded-md transition-all ${
                isIDE
                  ? 'font-bold text-white bg-primary shadow-sm'
                  : 'font-medium text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }>
            <span className="material-symbols-outlined text-[18px]">code</span>
            IDE
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-center bg-no-repeat bg-cover rounded-full size-8 ring-2 ring-border-dark cursor-pointer" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/a/default-user')` }}></div>
      </div>
    </header>
  )
}
