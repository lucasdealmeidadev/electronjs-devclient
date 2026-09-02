import * as Tooltip from '@radix-ui/react-tooltip'
import React from 'react'
import clsx from 'clsx'

interface TooltipMenuProps extends React.ComponentPropsWithoutRef<'button'> {
  icon: React.ReactNode
  side: 'left' | 'right' | 'top' | 'bottom'
  text: string
}

export const TooltipMenu = React.forwardRef<HTMLButtonElement, TooltipMenuProps>(
  ({ icon, side, text, className, ...props }, ref) => {
    return (
      <Tooltip.Provider delayDuration={150}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              ref={ref}
              type="button"
              className={clsx('cursor-pointer', className)}
              {...props}
            >
              {icon}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side={side}
              sideOffset={6}
              className="z-50 rounded-md bg-gray-900 px-2 py-1 text-xs text-slate-100 shadow-md border border-slate-700"
            >
              {text}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    )
  }
)

TooltipMenu.displayName = 'TooltipMenu'
