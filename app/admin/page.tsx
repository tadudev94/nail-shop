import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Package, ArrowLeft, ShoppingBag } from "lucide-react"
import { ProductsTable } from "@/components/admin/products-table"
import { AdminFilters } from "@/components/admin/admin-filters"
import { getAdminDashboardData } from "@/lib/services/admin-dashboard.service"

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>
}) {
  /* ========= AUTH ========= */
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/admin/login")

  /* ========= PARAMS ========= */
  const params = await searchParams
  const category = params.category
  const search = params.search
  const page = Number.parseInt(params.page || "1")

  /* ========= DATA ========= */
  console.log(params, category)
  const {
    products,
    totalProducts,
    totalPages,
    categories,
    stats,
  } = await getAdminDashboardData({
    category,
    search,
    page,
  })

  console.log(categories, 'ui')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Về trang chủ
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Quản trị</h1>
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
        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <Link href="/admin/categories">
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Quản lý danh mục
            </Button>
          </Link>

          <Link href="/admin/orders">
            <Button variant="outline">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quản lý đơn hàng
              {stats.pendingOrders > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {stats.pendingOrders}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Tổng sản phẩm" value={stats.total} />
          <StatCard title="Còn hàng" value={stats.inStock} />
          <StatCard title="Hết hàng" value={stats.outOfStock} />
        </div>

        {/* Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Danh sách sản phẩm</CardTitle>
            <Link href="/admin/products/new">
              <Button className="bg-[#4A7C59] hover:bg-[#3D6849]">
                <Plus className="h-4 w-4 mr-2" />
                Thêm sản phẩm
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="space-y-4">
            <AdminFilters
              categories={categories}
              currentCategory={category || "all"}
              currentSearch={search || ""}
              totalResults={totalProducts}
            />
            <ProductsTable
              categories={categories}
              products={products}
              currentPage={page}
              totalPages={totalPages}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* Small helper */
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
