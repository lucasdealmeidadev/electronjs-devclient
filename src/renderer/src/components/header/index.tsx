import * as Collapsible from '@radix-ui/react-collapsible'
import { TooltipMenu } from '../tooltip'
import clsx from 'clsx'
import { List } from 'phosphor-react'
import { ThemeToggle } from '../theme-toggle'

export function Header({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const isMacOS = window.api?.isMacOS?.() ?? false

  return (
    <div
      id="header"
      className={clsx(
        'flex items-center gap-4 leading-tight relative border-b border-app-border bg-app transition-all duration-200 py-4 px-6',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-220px)]': isSidebarOpen
        }
      )}
    >
      <Collapsible.Trigger
        asChild
        className={clsx(
          'h-7 w-7 text-gray-800 bg-gray-100 p-1 rounded-full relative z-99 hover:scale-105 duration-200',
          {
            hidden: isSidebarOpen,
            block: !isSidebarOpen
          }
        )}
      >
        <TooltipMenu icon={<List size={20} />} side="right" text="Abrir menu" />
      </Collapsible.Trigger>

      <h1 className="text-app-heading font-bold flex-1">Dev Clientes</h1>

      <ThemeToggle />
    </div>
  )
}
