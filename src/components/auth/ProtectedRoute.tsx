"use client"

import React from "react"
import { useAuth } from "@/hooks/useAuth"
import { AuthModal } from "./AuthModal"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { user, loading } = useAuth()
  const [showAuth, setShowAuth] = React.useState(false)

  React.useEffect(() => {
    if (!loading && !user) {
      setShowAuth(true)
    }
  }, [user, loading])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        {fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <div className="text-center text-white">
              <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
              <p className="text-gray-300">Please sign in to access this page.</p>
            </div>
          </div>
        )}
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </>
    )
  }

  return <>{children}</>
}
