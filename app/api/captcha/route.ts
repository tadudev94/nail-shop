import { NextResponse } from "next/server"
import { generateCaptcha } from "@/lib/captcha"

export async function GET() {
  const captcha = generateCaptcha()

  // Don't send answer to client in production
  return NextResponse.json({
    question: captcha.question,
    token: captcha.token,
  })
}
