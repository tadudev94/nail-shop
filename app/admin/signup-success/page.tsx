import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Leaf } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5F3EF] to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-[#4A7C59]" />
            <span className="text-2xl font-bold text-[#4A7C59]">Bamboo Store</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-[#4A7C59]/10 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-[#4A7C59]" />
            </div>
            <CardTitle>Kiểm tra email của bạn</CardTitle>
            <CardDescription>Chúng tôi đã gửi một liên kết xác nhận đến email của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Vui lòng kiểm tra hộp thư đến và nhấp vào liên kết xác nhận để kích hoạt tài khoản của bạn.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/admin/login" className="w-full">
                <Button className="w-full bg-[#4A7C59] hover:bg-[#3D6849]">Quay lại đăng nhập</Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full bg-transparent">
                  Về trang chủ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
