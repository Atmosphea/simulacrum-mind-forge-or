"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(({ className, config, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("chart-container", className)}
      style={
        {
          "--color-chart-background": "hsl(var(--muted))",
          ...Object.fromEntries(Object.entries(config).map(([key, value]) => [`--color-${key}`, value.color])),
        } as React.CSSProperties
      }
      {...props}
    />
  )
})
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("absolute rounded-md border bg-background p-2 text-sm shadow-md", className)}
      {...props}
    />
  )
})
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  payload?: Array<{ name: string; value: number; dataKey: string }>
  active?: boolean
  label?: string
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ className, payload, active, label, ...props }, ref) => {
    if (!active || !payload?.length) {
      return null
    }

    return (
      <div ref={ref} className={cn("flex flex-col gap-0.5", className)} {...props}>
        <p className="text-xs font-medium">{label}</p>
        {payload.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div
              className="h-1 w-1 rounded-full"
              style={{
                backgroundColor: `var(--color-${item.dataKey})`,
              }}
            />
            <span className="text-xs font-medium">{item.name}</span>
            <span className="text-xs text-muted-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
