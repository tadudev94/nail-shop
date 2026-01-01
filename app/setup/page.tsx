"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Leaf, CheckCircle2, AlertCircle } from "lucide-react"

export default function SetupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkExistingAdmin()
  }, [])

  const checkExistingAdmin = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("id").eq("role", "admin").limit(1)

      if (error) throw error
      setHasAdmin((data?.length ?? 0) > 0)
    } catch (err) {
      console.error("Error checking admin:", err)
      setHasAdmin(false)
    }
  }

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự")
      setIsLoading(false)
      return
    }

    try {
      // Step 1: Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin`,
        },
      })

      if (authError) throw authError
      if (!authData.user) throw new Error("Không thể tạo tài khoản")

      // Step 2: Update profile to admin role
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", authData.user.id)

      if (updateError) throw updateError

      setSuccess(
        "Tài khoản admin đầu tiên đã được tạo thành công! Vui lòng kiểm tra email để xác nhận tài khoản trước khi đăng nhập.",
      )

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/admin/login")
      }, 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Đã xảy ra lỗi")
    } finally {
      setIsLoading(false)
    }
  }

  if (hasAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5F3EF] to-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A7C59] mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang kiểm tra hệ thống...</p>
        </div>
      </div>
    )
  }

  if (hasAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5F3EF] to-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle>Hệ thống đã được thiết lập</CardTitle>
            </div>
            <CardDescription>Tài khoản admin đã tồn tại trong hệ thống</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Trang setup này chỉ dành cho việc tạo tài khoản admin đầu tiên. Hệ thống của bạn đã có admin.
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link href="/">Về trang chủ</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 bg-transparent">
                <Link href="/admin/login">Đăng nhập Admin</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F5F3EF] to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-[#4A7C59]" />
            <span className="text-2xl font-bold text-[#4A7C59]">Bamboo Store</span>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Thiết lập hệ thống</h1>
          <p className="text-muted-foreground mt-2">Tạo tài khoản admin đầu tiên</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tạo Admin đầu tiên</CardTitle>
            <CardDescription>
              Đây là trang thiết lập một lần duy nhất để tạo tài khoản quản trị viên đầu tiên cho hệ thống
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Admin</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Tối thiểu 6 ký tự"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-[#4A7C59] hover:bg-[#3D6849]" disabled={isLoading}>
                {isLoading ? "Đang tạo tài khoản..." : "Tạo Admin đầu tiên"}
              </Button>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Sau khi tạo tài khoản, bạn cần xác nhận email trước khi đăng nhập. Kiểm tra hộp thư đến của bạn.
                </AlertDescription>
              </Alert>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
