import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Monitor, Moon, Sun } from 'phosphor-react'
import { useTheme, type Theme } from '../../hooks/use-theme'
import { TooltipWrapper } from '../tooltip'

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'system', label: 'Sistema', icon: Monitor },
  { value: 'light', label: 'Claro', icon: Sun },
  { value: 'dark', label: 'Escuro', icon: Moon }
]

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const current = options.find((opt) => opt.value === theme) ?? options[0]
  const CurrentIcon = current.icon

  return (
    <DropdownMenu.Root>
      <TooltipWrapper content="Tema">
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label="Selecionar tema"
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-app-subtle hover:bg-app-muted text-app-text border border-app-border transition-colors cursor-pointer"
          >
            <CurrentIcon className="w-5 h-5" weight="bold" />
          </button>
        </DropdownMenu.Trigger>
      </TooltipWrapper>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-[160px] rounded-lg bg-app-surface border border-app-border shadow-lg p-1"
        >
          {options.map(({ value, label, icon: Icon }) => (
            <DropdownMenu.Item
              key={value}
              onSelect={() => setTheme(value)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-app-text rounded-md cursor-pointer outline-none data-[highlighted]:bg-app-muted"
            >
              <Icon className="w-4 h-4 text-app-muted-text" weight="bold" />
              <span className="flex-1">{label}</span>
              {theme === value && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
