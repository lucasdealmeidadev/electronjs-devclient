import * as Tooltip from '@radix-ui/react-tooltip'
import type { ReactElement } from 'react'

type TooltipWrapperProps = {
  content: string
  children: ReactElement
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export function TooltipWrapper({ content, children, side = 'top' }: TooltipWrapperProps) {
  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            sideOffset={6}
            className="z-50 rounded-md bg-app-heading px-2 py-1 text-xs text-app shadow-md border border-app-border"
          >
            {content}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
