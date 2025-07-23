"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  FolderOpen,
  Calculator,
  FileCheck,
  Package,
  DollarSign,
  BarChart3,
  Settings,
  Menu,
  X,
  Sun,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "CRM", href: "/crm", icon: Users },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Design & Simulation", href: "/design", icon: Calculator },
  { name: "Compliance", href: "/compliance", icon: FileCheck },
  { name: "Procurement", href: "/procurement", icon: Package },
  { name: "Finance", href: "/finance", icon: DollarSign },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">SolarPro</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="p-2">
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <item.icon className={cn("flex-shrink-0", collapsed ? "h-5 w-5" : "h-5 w-5 mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
