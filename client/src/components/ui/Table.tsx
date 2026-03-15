import type { ReactNode } from 'react'

interface TableProps {
  children: ReactNode
  className?: string
}

interface TableHeaderProps {
  children: ReactNode
  sticky?: boolean
}

interface TableRowProps {
  children: ReactNode
  hover?: boolean
  onClick?: () => void
}

export const Table = ({ children, className = '' }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-yellow-200">
      <table className={`w-full ${className}`}>
        {children}
      </table>
    </div>
  )
}

export const TableHeader = ({ children, sticky = false }: TableHeaderProps) => {
  return (
    <thead className={`bg-gradient-to-r from-yellow-50 to-yellow-100/50 ${sticky ? 'sticky top-0 z-10' : ''}`}>
      {children}
    </thead>
  )
}

export const TableRow = ({ children, hover = true, onClick }: TableRowProps) => {
  return (
    <tr
      className={`
        border-b border-yellow-100 transition-colors
        ${hover ? 'hover:bg-yellow-50/50' : ''}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export const TableHead = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <th className={`text-left py-4 px-6 font-semibold text-slate-900 ${className}`}>
      {children}
    </th>
  )
}

export const TableCell = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <td className={`py-4 px-6 text-slate-700 ${className}`}>
      {children}
    </td>
  )
}

export const TableBody = ({ children }: { children: ReactNode }) => {
  return (
    <tbody>
      {children}
    </tbody>
  )
}
