"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, AlertCircle, TrendingUp } from "lucide-react"

export default function ProcurementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Procurement & Inventory</h1>
        <p className="text-gray-600">Manage suppliers, purchase orders, and inventory levels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Purchase orders in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Shipments on the way</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Items need reordering</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45K</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Solar Panels - 320W</p>
                  <p className="text-sm text-gray-500">Supplier: SolarTech Tunisia</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Inverters - 5kW</p>
                  <p className="text-sm text-gray-500">Supplier: PowerMax</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Delivered</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Mounting Systems</p>
                  <p className="text-sm text-gray-500">Supplier: MountPro</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">Shipped</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg border-red-200">
                <div>
                  <p className="font-medium">DC Cables - 4mm²</p>
                  <p className="text-sm text-red-600">Only 50m remaining</p>
                </div>
                <Button size="sm" variant="outline">
                  Reorder
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg border-yellow-200">
                <div>
                  <p className="font-medium">MC4 Connectors</p>
                  <p className="text-sm text-yellow-600">25 pairs left</p>
                </div>
                <Button size="sm" variant="outline">
                  Reorder
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg border-red-200">
                <div>
                  <p className="font-medium">Fuses - 15A</p>
                  <p className="text-sm text-red-600">8 units remaining</p>
                </div>
                <Button size="sm" variant="outline">
                  Reorder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
