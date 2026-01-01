"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Cảm ơn bạn đã đặt hàng tại Bamboo Store. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
          </p>

          {orderId && (
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-1">Mã đơn hàng</p>
              <p className="font-mono font-semibold text-lg">{orderId}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="text-left space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Bước tiếp theo:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Chúng tôi sẽ gọi điện xác nhận đơn hàng trong vòng 24h</li>
                <li>Đơn hàng sẽ được giao trong 2-3 ngày làm việc</li>
                <li>Thanh toán khi nhận hàng (COD)</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1 bg-[#4A7C59] hover:bg-[#3D6849]">
                <Link href="/#products">Tiếp tục mua sắm</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 bg-transparent">
                <Link href="/">Về trang chủ</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
