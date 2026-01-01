"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

type CheckoutCaptchaProps = {
  value: string
  onChange: (value: string) => void
  token: string
  onTokenChange: (token: string) => void
}

export function CheckoutCaptcha({ value, onChange, token, onTokenChange }: CheckoutCaptchaProps) {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(true)

  const loadCaptcha = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/captcha")
      const data = await res.json()
      setQuestion(data.question)
      onTokenChange(data.token)
    } catch (error) {
      console.error("Failed to load captcha:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCaptcha()
  }, [])

  return (
    <div className="space-y-2">
      <Label htmlFor="captcha">Xác thực (nhập kết quả phép tính) *</Label>
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2">
          <div className="bg-muted px-4 py-2 rounded-md font-mono font-semibold text-lg min-w-[120px] text-center">
            {loading ? "..." : question}
          </div>
          <Input
            id="captcha"
            type="number"
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="?"
            className="w-20"
          />
        </div>
        <Button type="button" variant="outline" size="icon" onClick={loadCaptcha} disabled={loading}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
