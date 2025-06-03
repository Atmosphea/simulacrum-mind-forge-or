"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./useAuth"

interface SubscriptionPlan {
  subscription_id: string
  plan_name: string
  plan_display_name: string
  status: string
  features: Record<string, any>
  limits: Record<string, number>
  current_period_end: string
}

interface UsageQuota {
  can_use: boolean
  used_count: number
  limit_count: number
  remaining: number
}

export const useSubscription = () => {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<SubscriptionPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchSubscription()
    } else {
      setSubscription(null)
      setLoading(false)
    }
  }, [user])

  const fetchSubscription = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase.rpc("get_user_subscription", {
        user_uuid: user.id,
      })

      if (error) throw error

      if (data && data.length > 0) {
        setSubscription(data[0])
      }
    } catch (error) {
      console.error("Error fetching subscription:", error)
    } finally {
      setLoading(false)
    }
  }

  const hasFeature = async (featureName: string): Promise<boolean> => {
    if (!user) return false

    try {
      const { data, error } = await supabase.rpc("user_has_feature", {
        user_uuid: user.id,
        feature_name: featureName,
      })

      if (error) throw error
      return data || false
    } catch (error) {
      console.error("Error checking feature:", error)
      return false
    }
  }

  const checkQuota = async (quotaType: string): Promise<UsageQuota | null> => {
    if (!user) return null

    try {
      const { data, error } = await supabase.rpc("check_usage_quota", {
        user_uuid: user.id,
        quota_type_param: quotaType,
      })

      if (error) throw error
      return data && data.length > 0 ? data[0] : null
    } catch (error) {
      console.error("Error checking quota:", error)
      return null
    }
  }

  const trackUsage = async (eventType: string, resourceId?: string, metadata?: Record<string, any>) => {
    if (!user) return

    try {
      await supabase.rpc("track_usage_event", {
        user_uuid: user.id,
        event_type_param: eventType,
        resource_id_param: resourceId || null,
        metadata_param: metadata || {},
      })
    } catch (error) {
      console.error("Error tracking usage:", error)
    }
  }

  const canUseFeature = (featureName: string): boolean => {
    if (!subscription) return false
    return subscription.features[featureName] !== undefined
  }

  const getPlanLimits = () => {
    return subscription?.limits || {}
  }

  const isOnPlan = (planName: string): boolean => {
    return subscription?.plan_name === planName
  }

  return {
    subscription,
    loading,
    hasFeature,
    checkQuota,
    trackUsage,
    canUseFeature,
    getPlanLimits,
    isOnPlan,
    refetch: fetchSubscription,
  }
}
