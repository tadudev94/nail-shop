import { Suspense } from "react"
import { OrderSuccessContent } from "@/components/order-success-content"
import { Leaf } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
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

      <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Đang tải...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  )
}
