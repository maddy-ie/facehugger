import { FC, useState, useEffect } from 'react'
import { AssistantPage } from './pages/AssistantPage'
import { IDEPage } from './pages/IDEPage'

type Page = 'assistant' | 'ide'

export const App: FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('assistant')

  useEffect(() => {
    // Handle hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Page
      if (hash === 'assistant' || hash === 'ide') {
        setCurrentPage(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (page: Page) => {
    setCurrentPage(page)
    window.location.hash = page
  }

  return (
    <div className="h-screen w-full overflow-hidden">
      {currentPage === 'assistant' && <AssistantPage onNavigate={navigate} />}
      {currentPage === 'ide' && <IDEPage onNavigate={navigate} />}
    </div>
  )
}
