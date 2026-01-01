import { createClient } from "@/lib/supabase/server"

const ITEMS_PER_PAGE = 5

export async function getAdminDashboardData({
    category,
    search,
    page,
}: {
    category?: string
    search?: string
    page: number
}) {
    const supabase = await createClient()

    /* ======================
       Products list (paging)
    ====================== */
    let query = supabase
        .from("products")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })

    if (category && category !== "all") {
        query = query.eq("category_slug", category)
    }

    if (search) {
        query = query.or(
            `name.ilike.%${search}%,description.ilike.%${search}%`
        )
    }

    const from = (page - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE - 1

    const { data: products, count } = await query.range(from, to)
    console.log(products, 'prodc')

    /* ======================
       Categories
    ====================== */
    const { data: categoriesData, error } = await supabase
        .from("categories")
        .select("slug, name, id")
        .order("name")

    if (error) throw error

    const categories = categoriesData ?? []

    /* ======================
       Stats
    ====================== */
    const { data: allProducts } = await supabase
        .from("products")
        .select("stock")


    const { data: orders } = await supabase
        .from("orders")
        .select("status")

    const pendingOrders =
        orders?.filter((o) => o.status === "pending").length || 0

    return {
        products: products || [],
        totalProducts: count || 0,
        totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
        categories,
        stats: {
            total: allProducts?.length || 0,
            inStock: allProducts?.filter((p) => p.stock > 0).length || 0,
            outOfStock: allProducts?.filter((p) => p.stock === 0).length || 0,
            pendingOrders,
        },
    }
}
