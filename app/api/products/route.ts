import { type NextRequest, NextResponse } from "next/server"
import { getAdminClient } from "@/lib/supabase/admin"
import { rateLimit } from "@/lib/rate-limiter"

// GET /api/products - List products (public, rate limited)
export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous"

  if (!rateLimit(`products-get-${ip}`, { maxRequests: 60, windowMs: 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const offset = (page - 1) * limit

    const supabase = getAdminClient()
    let query = supabase.from("products").select("*", { count: "exact" }).order("created_at", { ascending: false })

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ data, count })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST /api/products - Create product (admin only)
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous"

  if (!rateLimit(`products-post-${ip}`, { maxRequests: 10, windowMs: 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.price || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = getAdminClient()
    const { data, error } = await supabase.from("products").insert([body]).select().single()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
