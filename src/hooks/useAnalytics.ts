"use client"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

export function useAnalytics() {
  const location = useLocation()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [pageViews, setPageViews] = useState<Array<{ path: string; timestamp: string }>>([])

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        // Check if user is authenticated
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        // Generate session ID if not exists
        const newSessionId = sessionStorage.getItem("analytics_session_id") || uuidv4()
        sessionStorage.setItem("analytics_session_id", newSessionId)
        setSessionId(newSessionId)

        // Set start time
        const now = new Date()
        setStartTime(now)

        // Create session record
        const { error } = await supabase.from("analytics_logs").insert({
          user_id: user.id,
          session_id: newSessionId,
          start_time: now.toISOString(),
          page_views: [{ path: location.pathname, timestamp: now.toISOString() }],
        })

        if (error) throw error

        // Add event listener for page unload
        const handleUnload = async () => {
          const endTime = new Date()

          // Update session with end time
          await supabase
            .from("analytics_logs")
            .update({
              end_time: endTime.toISOString(),
              page_views: [...pageViews, { path: location.pathname, timestamp: endTime.toISOString() }],
            })
            .eq("session_id", newSessionId)
        }

        window.addEventListener("beforeunload", handleUnload)

        return () => {
          window.removeEventListener("beforeunload", handleUnload)
        }
      } catch (error) {
        console.error("Error initializing analytics session:", error)
      }
    }

    initSession()
  }, [])

  // Track page views
  useEffect(() => {
    const trackPageView = async () => {
      if (!sessionId) return

      try {
        const now = new Date()
        const newPageView = { path: location.pathname, timestamp: now.toISOString() }
        const updatedPageViews = [...pageViews, newPageView]
        setPageViews(updatedPageViews)

        // Update session with new page view
        const { error } = await supabase
          .from("analytics_logs")
          .update({
            page_views: updatedPageViews,
          })
          .eq("session_id", sessionId)

        if (error) throw error
      } catch (error) {
        console.error("Error tracking page view:", error)
      }
    }

    trackPageView()
  }, [location.pathname, sessionId])

  return { sessionId, startTime }
}

export default useAnalytics
