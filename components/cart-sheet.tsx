"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function CartSheet() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center">
        <p className="text-muted-foreground mb-4">Giỏ hàng trống</p>
        <p className="text-sm text-muted-foreground">Thêm sản phẩm vào giỏ hàng để tiếp tục</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full py-6">
      {/* Cart Items */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 pb-4 border-b">
            <img
              src={item.image_url || "/placeholder.svg?height=80&width=80"}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 space-y-2">
              <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
              <p className="text-[#4A7C59] font-semibold">{item.price.toLocaleString("vi-VN")}đ</p>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7 bg-transparent"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7 bg-transparent"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 ml-auto text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="space-y-4 pt-4 border-t mt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Tổng cộng:</span>
          <span className="text-[#4A7C59]">{totalPrice.toLocaleString("vi-VN")}đ</span>
        </div>
        <Button className="w-full bg-[#4A7C59] hover:bg-[#3D6849]" size="lg" onClick={() => router.push("/checkout")}>
          Thanh toán
        </Button>
      </div>
    </div>
  )
}
