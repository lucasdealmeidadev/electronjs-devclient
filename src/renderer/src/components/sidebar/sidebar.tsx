import * as Collapsible from '@radix-ui/react-collapsible'
import { TooltipMenu } from '../tooltip'
import { ArrowBendDoubleUpLeft, Users, Info } from 'phosphor-react'
import clsx from 'clsx'
import { SidebarLink } from './sidebar-link'

export function Sidebar() {
  const isMacOS = window.api?.isMacOS?.() ?? false

  return (
    <Collapsible.Content className="sidebar-content bg-app-subtle shrink-0 border-r border-app-border h-screen relative group overflow-hidden0">
      <Collapsible.Trigger
        asChild
        className={clsx(
          'absolute h-7 w-7 right-4 text-gray-800 bg-gray-100 p-1 rounded-full z-99 hover:scale-105 duration-200',
          {
            'top-4.5': isMacOS,
            'top-6': !isMacOS
          }
        )}
      >
        <TooltipMenu icon={<ArrowBendDoubleUpLeft size={20} />} side="left" text="Fechar menu" />
      </Collapsible.Trigger>

      <div
        className={clsx(
          'flex-1 flex flex-col h-full gap-8 w-55 transition-opacity group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 duration-200',
          {
            'pt-6': !isMacOS
          }
        )}
      >
        <nav className="flex mx-2 flex-col gap-8 text-app-text">
          <div className="flex flex-col gap-2">
            <div className="text-app-heading font-semibold uppercase mb-2 ml-2">Menu</div>
          </div>

          <section className="flex flex-col gap-px">
            <SidebarLink to="/">
              <Users size={17} /> Clientes
            </SidebarLink>
            <SidebarLink to="/about">
              <Info size={17} /> Sobre
            </SidebarLink>
          </section>
        </nav>
      </div>
    </Collapsible.Content>
  )
}
