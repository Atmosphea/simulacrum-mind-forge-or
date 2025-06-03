"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSubscription } from "@/hooks/useSubscription"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface FeatureGateProps {
  feature: string
  fallback?: React.ReactNode
  children: React.ReactNode
}

export const FeatureGate: React.FC<FeatureGateProps> = ({ feature, fallback, children }) => {
  const { canUseFeature, subscription, loading } = useSubscription()
  const [hasAccess, setHasAccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setHasAccess(canUseFeature(feature))
  }, [feature, canUseFeature])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <Card className="max-w-md mx-auto glass-card">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-white font-['Sora']">Premium Feature</CardTitle>
          <CardDescription className="text-teal-600 font-['Inter']">
            This feature requires a {feature === "custom_persona_builder" ? "Voyager" : "higher"} plan
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-white/80 text-sm">
            Unlock advanced simulation capabilities and deeper insights with an upgraded plan.
          </p>
          <div className="space-y-2">
            <Button onClick={() => navigate("/pricing")} className="w-full gradient-cta text-white font-['Inter']">
              <Zap className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="outline"
              className="w-full text-white border-white/30 hover:bg-white/10"
            >
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
