import { type NextRequest, NextResponse } from "next/server"
import { getAdminClient } from "@/lib/supabase/admin"
import { rateLimit } from "@/lib/rate-limiter"
import { verifyCaptcha } from "@/lib/captcha"

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "anonymous"

  if (!rateLimit(`orders-post-${ip}`, { maxRequests: 5, windowMs: 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  try {
    const body = await request.json()

    if (!body.captcha_token || !body.captcha_answer) {
      return NextResponse.json({ error: "Captcha verification required" }, { status: 400 })
    }

    if (!verifyCaptcha(body.captcha_token, body.captcha_answer)) {
      return NextResponse.json({ error: "Invalid captcha. Please try again." }, { status: 400 })
    }

    // Validate required fields
    if (!body.customer_name || !body.customer_phone || !body.customer_address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Order must have at least one item" }, { status: 400 })
    }

    // Validate email if provided
    const emailValue = body.customer_email?.trim() || null
    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    const supabase = getAdminClient()

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        customer_email: emailValue,
        customer_address: body.customer_address,
        notes: body.notes || null,
        total_amount: body.total_amount,
        status: "pending",
        payment_method: "cod",
      })
      .select()
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Create order items
    const orderItems = body.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      product_price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("Error creating order items:", itemsError)
      // Rollback: delete the order
      await supabase.from("orders").delete().eq("id", order.id)
      return NextResponse.json({ error: "Failed to create order items" }, { status: 500 })
    }

    return NextResponse.json({ order }, { status: 201 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
