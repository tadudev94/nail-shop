import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldX, Home } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5F3EF] to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <ShieldX className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Không có quyền truy cập</CardTitle>
          <CardDescription>Bạn không có quyền truy cập vào trang quản trị</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Chỉ người dùng có quyền quản trị viên mới có thể truy cập trang này. Vui lòng liên hệ với quản trị viên nếu
            bạn cần quyền truy cập.
          </p>
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
