import { useState } from 'react'
import type { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

const Tabs = ({ tabs, defaultTab, className = '' }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  
  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content
  
  return (
    <div className={className}>
      <div className="flex space-x-1 border-b border-orange-100 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-3 font-semibold text-sm whitespace-nowrap transition-colors
              ${activeTab === tab.id
                ? 'text-orange-600 border-b-2 border-orange-500'
                : 'text-slate-600 hover:text-orange-500'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {activeTabContent}
      </div>
    </div>
  )
}

export default Tabs
