import { type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

// Stub function to prevent crash
export async function createClient() {
  const cookieStore = await cookies()

  // Return a dummy object or null since we removed Supabase
  // If any code tries to use this, it might fail, but it won't crash on startup.
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => ({ data: null, error: null }),
          order: () => ({ data: [], error: null }),
        }),
        order: () => ({ data: [], error: null }),
      })
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    }
  }
}
