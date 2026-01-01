import { createClient } from "@/lib/supabase/server"
import { getAdminClient } from "@/lib/supabase/admin"
import { redirect } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ShoppingBag, Clock, Truck, CheckCircle } from "lucide-react"
import { OrdersTable } from "@/components/admin/orders-table"

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>
}) {
  /* =====================
     1️⃣ AUTH (USER CLIENT)
     ===================== */
  const userClient = await createClient()
  const {
    data: { user },
  } = await userClient.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  /* =====================
     2️⃣ ADMIN CLIENT (BYPASS RLS)
     ===================== */
  const adminClient = getAdminClient()

  /* =====================
     3️⃣ PARAMS
     ===================== */
  const params = await searchParams
  const status = params.status
  const page = Number.parseInt(params.page || "1")
  const itemsPerPage = 10

  /* =====================
     4️⃣ ORDERS QUERY (ADMIN)
     ===================== */
  let query = adminClient
    .from("orders")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  const { data: orders, count } = await query.range(
    (page - 1) * itemsPerPage,
    page * itemsPerPage - 1
  )

  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  /* =====================
     5️⃣ STATS (ADMIN)
     ===================== */
  const { data: allOrders } = await adminClient
    .from("orders")
    .select("status, total_amount")

  const stats = {
    total: allOrders?.length || 0,
    pending: allOrders?.filter((o) => o.status === "pending").length || 0,
    confirmed: allOrders?.filter((o) => o.status === "confirmed").length || 0,
    shipping: allOrders?.filter((o) => o.status === "shipping").length || 0,
    delivered: allOrders?.filter((o) => o.status === "delivered").length || 0,
    cancelled: allOrders?.filter((o) => o.status === "cancelled").length || 0,
    totalRevenue:
      allOrders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0,
  }

  /* =====================
     6️⃣ RENDER
     ===================== */
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
          <StatCard title="Tổng đơn" value={stats.total} icon={ShoppingBag} />
          <StatCard
            title="Chờ xác nhận"
            value={stats.pending}
            icon={Clock}
            iconClassName="text-yellow-600"
          />

          <StatCard
            title="Đã xác nhận"
            value={stats.confirmed}
            icon={CheckCircle}
            iconClassName="text-blue-600"
          />

          <StatCard
            title="Đang giao"
            value={stats.shipping}
            icon={Truck}
            iconClassName="text-purple-600"
          />

          <StatCard
            title="Hoàn thành"
            value={stats.delivered}
            icon={CheckCircle}
            iconClassName="text-green-600"
          />

          <StatCard
            title="Doanh thu"
            value={`${stats.totalRevenue.toLocaleString("vi-VN")}đ`}
            icon={ShoppingBag}
            iconClassName="text-[#4A7C59]"
          />

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

/* =====================
   HELPER COMPONENT
   ===================== */
function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
}: {
  title: string
  value: React.ReactNode
  icon: React.ElementType
  iconClassName?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconClassName}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}