"use client"

import type React from "react"
import { useRoles } from "@/hooks/useRoles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface AdminRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children, requiredRole = "admin" }) => {
  const { hasRole, loading } = useRoles()
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <Card className="max-w-md mx-auto glass-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <CardTitle className="text-white font-['Sora']">Access Denied</CardTitle>
            <CardDescription className="text-red-400 font-['Inter']">
              You don't have permission to access this area
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-white/80 text-sm mb-4">
              This section requires {requiredRole} privileges. Contact your administrator if you believe this is an
              error.
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              className="w-full text-white border-white/30 hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
