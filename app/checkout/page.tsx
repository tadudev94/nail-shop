"use client"

import type React from "react"
import { CheckoutCaptcha } from "@/components/checkout-captcha"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Leaf, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    notes: "",
  })

  const [captchaAnswer, setCaptchaAnswer] = useState("")
  const [captchaToken, setCaptchaToken] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: formData.customerName,
          customer_phone: formData.customerPhone,
          customer_email: formData.customerEmail,
          customer_address: formData.customerAddress,
          notes: formData.notes,
          total_amount: totalPrice,
          items: items,
          captcha_token: captchaToken,
          captcha_answer: Number.parseInt(captchaAnswer),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create order")
      }

      const { order } = await response.json()

      clearCart()
      toast.success("Đặt hàng thành công!")
      router.push(`/order-success?orderId=${order.id}`)
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-[#4A7C59]" />
              <span className="text-2xl font-bold text-[#4A7C59]">Bamboo Store</span>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Giỏ hàng trống</h1>
          <p className="text-muted-foreground mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Button asChild className="bg-[#4A7C59] hover:bg-[#3D6849]">
            <Link href="/#products">Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-[#4A7C59]" />
            <span className="text-2xl font-bold text-[#4A7C59]">Bamboo Store</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại trang chủ
        </Link>

        <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Thông tin giao hàng</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="customerName">
                    Họ và tên <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerName"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone">
                    Số điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="0912345678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email (tùy chọn)</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerAddress">
                    Địa chỉ giao hàng <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="customerAddress"
                    required
                    value={formData.customerAddress}
                    onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Ghi chú về đơn hàng của bạn..."
                    rows={3}
                  />
                </div>

                <CheckoutCaptcha
                  value={captchaAnswer}
                  onChange={setCaptchaAnswer}
                  token={captchaToken}
                  onTokenChange={setCaptchaToken}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#4A7C59] hover:bg-[#3D6849] text-white"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b">
                    <img
                      src={item.image_url || "/placeholder.svg?height=60&width=60"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                      <p className="text-sm font-semibold text-[#4A7C59]">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính:</span>
                  <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phí vận chuyển:</span>
                  <span className="text-[#4A7C59]">Miễn phí</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Tổng cộng:</span>
                  <span className="text-[#4A7C59]">{totalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#4A7C59]/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Thanh toán khi nhận hàng (COD)</strong>
                  <br />
                  Bạn sẽ thanh toán bằng tiền mặt khi nhận được hàng
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
