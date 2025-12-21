import { FC } from 'react'
import { Nav } from '../components/common/Nav'
import { MonacoIDE } from '../components/ide/MonacoIDE'

interface IDEPageProps {
  onNavigate: (page: 'assistant' | 'ide') => void
}

export const IDEPage: FC<IDEPageProps> = ({ onNavigate }) => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <Nav currentPage="ide" onNavigate={onNavigate} />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 flex flex-col min-w-0 bg-background-darker relative">
          <MonacoIDE />
        </main>
      </div>
    </div>
  )
}
