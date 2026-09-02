import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

export function SidebarLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx('flex items-center text-sm gap-2 py-2 px-3 rounded-full group transition-colors', {
          'bg-emerald-500 text-white font-semibold': isActive,
          'text-app-text hover:bg-app-muted': !isActive
        })
      }
    >
      <span className="truncate flex gap-2 items-center justify-center">{children}</span>
    </NavLink>
  )
}
