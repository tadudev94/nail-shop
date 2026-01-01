"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type OrderStatusUpdateProps = {
  orderId: string
  currentStatus: string
}

const statusOptions = [
  { value: "pending", label: "Chờ xác nhận" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "delivered", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
]

export function OrderStatusUpdate({ orderId, currentStatus }: OrderStatusUpdateProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const handleUpdate = async () => {
    if (status === currentStatus) {
      toast.info("Trạng thái không thay đổi")
      return
    }

    setIsUpdating(true)

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update order status")
      }

      toast.success("Cập nhật trạng thái thành công")
      router.refresh()
    } catch (error) {
      console.error("Error updating order status:", error)
      toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra khi cập nhật trạng thái")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Trạng thái đơn hàng</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full bg-[#4A7C59] hover:bg-[#3D6849]"
        onClick={handleUpdate}
        disabled={isUpdating || status === currentStatus}
      >
        {isUpdating ? "Đang cập nhật..." : "Cập nhật trạng thái"}
      </Button>

      <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Quy trình xử lý:</p>
        <ol className="list-decimal list-inside space-y-1 ml-2">
          <li>Chờ xác nhận - Đơn mới</li>
          <li>Đã xác nhận - Đã liên hệ khách</li>
          <li>Đang giao - Đã gửi hàng</li>
          <li>Hoàn thành - Khách đã nhận</li>
        </ol>
      </div>
    </div>
  )
}
