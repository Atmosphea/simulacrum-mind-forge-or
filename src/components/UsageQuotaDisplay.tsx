"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSubscription } from "@/hooks/useSubscription"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UsageQuotaDisplayProps {
  quotaType: string
  title: string
  description?: string
  showUpgrade?: boolean
}

export const UsageQuotaDisplay: React.FC<UsageQuotaDisplayProps> = ({
  quotaType,
  title,
  description,
  showUpgrade = true,
}) => {
  const { checkQuota } = useSubscription()
  const [quota, setQuota] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuota = async () => {
      const quotaData = await checkQuota(quotaType)
      setQuota(quotaData)
      setLoading(false)
    }

    fetchQuota()
  }, [quotaType, checkQuota])

  if (loading) {
    return (
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-2 bg-white/20 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!quota) return null

  const isUnlimited = quota.limit_count === -1
  const percentage = isUnlimited ? 0 : (quota.used_count / quota.limit_count) * 100
  const isNearLimit = percentage > 80
  const isAtLimit = percentage >= 100

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
          {isUnlimited ? (
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
              Unlimited
            </Badge>
          ) : (
            <Badge
              variant={isAtLimit ? "destructive" : isNearLimit ? "secondary" : "default"}
              className={
                isAtLimit
                  ? "bg-red-500/20 text-red-400"
                  : isNearLimit
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
              }
            >
              {quota.used_count} / {quota.limit_count}
            </Badge>
          )}
        </div>
        {description && <CardDescription className="text-teal-600 text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        {!isUnlimited && (
          <div className="space-y-2">
            <Progress
              value={percentage}
              className="h-2"
              // @ts-ignore
              style={{
                "--progress-background": isAtLimit
                  ? "rgb(239 68 68)"
                  : isNearLimit
                    ? "rgb(245 158 11)"
                    : "rgb(34 197 94)",
              }}
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>{quota.remaining} remaining</span>
              {isAtLimit && showUpgrade && <span className="text-red-400">Upgrade to continue</span>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
