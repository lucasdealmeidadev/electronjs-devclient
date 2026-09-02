import * as Collapsible from '@radix-ui/react-collapsible'
import { Outlet } from 'react-router-dom'
import { Header } from '../header'
import { Sidebar } from '../sidebar'
import { useState } from 'react'

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

  return (
    <Collapsible.Root
      defaultOpen={true}
      className="h-screen w-screen bg-app text-app-text flex"
      onOpenChange={setIsSidebarOpen}
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}
