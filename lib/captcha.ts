// Simple math-based captcha for demo
// In production, use reCAPTCHA or hCaptcha

export type CaptchaChallenge = {
  question: string
  answer: number
  token: string
}

const captchaStore = new Map<string, { answer: number; expiresAt: number }>()

// Cleanup expired captchas every minute
setInterval(() => {
  const now = Date.now()
  captchaStore.forEach((value, key) => {
    if (value.expiresAt < now) {
      captchaStore.delete(key)
    }
  })
}, 60 * 1000)

export function generateCaptcha(): CaptchaChallenge {
  const num1 = Math.floor(Math.random() * 10) + 1
  const num2 = Math.floor(Math.random() * 10) + 1
  const answer = num1 + num2
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36)

  captchaStore.set(token, {
    answer,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  })

  return {
    question: `${num1} + ${num2} = ?`,
    answer, // Don't send this to client in production
    token,
  }
}

export function verifyCaptcha(token: string, userAnswer: number): boolean {
  const stored = captchaStore.get(token)

  if (!stored) {
    return false
  }

  if (stored.expiresAt < Date.now()) {
    captchaStore.delete(token)
    return false
  }

  captchaStore.delete(token)
  return stored.answer === userAnswer
}
