import { NextRequest, NextResponse } from "next/server"
import { getAdminClient } from "@/lib/supabase/admin"
import { rateLimit } from "@/lib/rate-limiter"

// PUT /api/orders/[id] - Update order status (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const ip = request.headers.get("x-forwarded-for") || "anonymous"

  if (!rateLimit(`orders-put-${ip}`, { maxRequests: 20, windowMs: 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 })
  }

  try {
    const body = await request.json()

    // Validate status
    const validStatuses = ["pending", "confirmed", "shipping", "delivered", "cancelled"]
    if (!body.status || !validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    if (!id) {
      return NextResponse.json({ error: "Missing order id" }, { status: 400 })
    }

    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from("orders")
      .update({ status: body.status })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
