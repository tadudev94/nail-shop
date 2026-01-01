import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Phone, Mail, MapPin, Package } from "lucide-react"
import { OrderStatusUpdate } from "@/components/admin/order-status-update"

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { id } = await params

  // Get order
  const { data: order, error } = await supabase.from("orders").select("*").eq("id", id).single()

  if (error || !order) {
    notFound()
  }

  // Get order items
  const { data: orderItems } = await supabase.from("order_items").select("*").eq("order_id", id)

  const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> =
    {
      pending: { label: "Chờ xác nhận", variant: "secondary" },
      confirmed: { label: "Đã xác nhận", variant: "default" },
      shipping: { label: "Đang giao", variant: "outline" },
      completed: { label: "Hoàn thành", variant: "default" },
      cancelled: { label: "Đã hủy", variant: "destructive" },
    }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Thông tin đơn hàng</CardTitle>
                  <Badge variant={statusLabels[order.status]?.variant || "default"}>
                    {statusLabels[order.status]?.label || order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Mã đơn hàng</p>
                    <p className="font-mono font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Ngày đặt</p>
                    <p className="font-semibold">{new Date(order.created_at).toLocaleString("vi-VN")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin khách hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tên khách hàng</p>
                    <p className="font-semibold">{order.customer_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Số điện thoại</p>
                    <p className="font-semibold">{order.customer_phone}</p>
                  </div>
                </div>
                {order.customer_email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{order.customer_email}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Địa chỉ giao hàng</p>
                    <p className="font-semibold">{order.customer_address}</p>
                  </div>
                </div>
                {order.notes && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Ghi chú</p>
                    <p className="text-sm">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Sản phẩm đã đặt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderItems?.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b last:border-0">
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Số lượng: {item.quantity} × {Number(item.product_price).toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#4A7C59]">{Number(item.subtotal).toLocaleString("vi-VN")}đ</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 border-t-2">
                    <span className="text-lg font-bold">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-[#4A7C59]">
                      {Number(order.total_amount).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Cập nhật trạng thái</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderStatusUpdate orderId={order.id} currentStatus={order.status} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
