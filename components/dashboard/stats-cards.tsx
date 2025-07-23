"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabaseClient } from "@/lib/supabase"
import { Users, FolderOpen, DollarSign, TrendingUp } from "lucide-react"

type Stats = {
  totalLeads: number
  activeProjects: number
  monthlyRevenue: number
  conversionRate: number
}

export function StatsCards() {
  const [stats, setStats] = useState<Stats>({
    totalLeads: 0,
    activeProjects: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = getSupabaseClient()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Fetch leads count
      const { count: leadsCount } = await supabase.from("leads").select("*", { count: "exact", head: true })

      // Fetch active projects count
      const { count: projectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("status", "active")

      // Calculate conversion rate
      const { count: convertedLeads } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "converted")

      const conversionRate = leadsCount ? ((convertedLeads || 0) / leadsCount) * 100 : 0

      setStats({
        totalLeads: leadsCount || 0,
        activeProjects: projectsCount || 0,
        monthlyRevenue: 125000, // Mock data - would come from finance module
        conversionRate: Math.round(conversionRate * 10) / 10,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
            <div className={`p-2 rounded-full ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
