import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ShoppingBag, Clock, Truck, CheckCircle } from "lucide-react"
import { OrdersTable } from "@/components/admin/orders-table"
import { getAdminClient } from "@/lib/supabase/admin"

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }
  console.log(user)

  const params = await searchParams
  const status = params.status
  const page = Number.parseInt(params.page || "1")
  const itemsPerPage = 10

  let query = supabase.from("orders").select("*", { count: "exact" }).order("created_at", { ascending: false })

  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  const { data: orders, count } = await query.range((page - 1) * itemsPerPage, page * itemsPerPage - 1)
  console.log(query,'oder')
  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  // Get stats
  const { data: allOrders } = await supabase.from("orders").select("status, total_amount")

  const stats = {
    total: allOrders?.length || 0,
    pending: allOrders?.filter((o) => o.status === "pending").length || 0,
    confirmed: allOrders?.filter((o) => o.status === "confirmed").length || 0,
    shipping: allOrders?.filter((o) => o.status === "shipping").length || 0,
    completed: allOrders?.filter((o) => o.status === "completed").length || 0,
    cancelled: allOrders?.filter((o) => o.status === "cancelled").length || 0,
    totalRevenue: allOrders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <form action="/admin/logout" method="post">
              <Button variant="outline" size="sm" type="submit">
                Đăng xuất
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tổng đơn</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Chờ xác nhận</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Đã xác nhận</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Đang giao</CardTitle>
              <Truck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.shipping}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
              <ShoppingBag className="h-4 w-4 text-[#4A7C59]" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-[#4A7C59]">{stats.totalRevenue.toLocaleString("vi-VN")}đ</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersTable
              orders={orders || []}
              currentStatus={status || "all"}
              currentPage={page}
              totalPages={totalPages}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
