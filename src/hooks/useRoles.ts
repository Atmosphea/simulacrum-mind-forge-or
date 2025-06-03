"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./useAuth"

interface UserRole {
  id: string
  role: string
  granted_at: string
}

export const useRoles = () => {
  const { user } = useAuth()
  const [roles, setRoles] = useState<UserRole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchRoles()
    } else {
      setRoles([])
      setLoading(false)
    }
  }, [user])

  const fetchRoles = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase.from("user_roles").select("*").eq("user_id", user.id)

      if (error) throw error
      setRoles(data || [])
    } catch (error) {
      console.error("Error fetching roles:", error)
    } finally {
      setLoading(false)
    }
  }

  const hasRole = (roleName: string): boolean => {
    return roles.some((role) => role.role === roleName)
  }

  const isAdmin = (): boolean => {
    return hasRole("admin") || hasRole("enterprise_admin")
  }

  const isBetaTester = (): boolean => {
    return hasRole("beta_tester")
  }

  return {
    roles,
    loading,
    hasRole,
    isAdmin,
    isBetaTester,
    refetch: fetchRoles,
  }
}
