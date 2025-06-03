"use client"

import type React from "react"
import { createContext, useContext } from "react"
import useAnalytics from "@/hooks/useAnalytics"

const AnalyticsContext = createContext<{
  sessionId: string | null
  startTime: Date | null
}>({
  sessionId: null,
  startTime: null,
})

export const useAnalyticsContext = () => useContext(AnalyticsContext)

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sessionId, startTime } = useAnalytics()

  return <AnalyticsContext.Provider value={{ sessionId, startTime }}>{children}</AnalyticsContext.Provider>
}
