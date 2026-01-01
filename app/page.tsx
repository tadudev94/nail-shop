import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, ShoppingCart, Sparkles, ArrowRight } from "lucide-react"
import { ProductsGrid } from "@/components/products-grid"
import { CartButton } from "@/components/cart-button"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  category_slug: string
  stock: number
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams
  const categorySlug = params.category
  const page = Number.parseInt(params.page || "1")
  const itemsPerPage = 6

  let query = supabase.from("products").select("*", { count: "exact" }).order("created_at", { ascending: false })

  if (categorySlug && categorySlug !== "all") {
    query = query.eq("category_slug", categorySlug)
  }

  const { data: products, count } = await query.range((page - 1) * itemsPerPage, page * itemsPerPage - 1)

  const { data: categoriesData } = await supabase
    .from("categories")
    .select("name, slug")
    .order("display_order", { ascending: true })

  const categories = categoriesData || []

  const totalPages = Math.ceil((count || 0) / itemsPerPage)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-[#4A7C59]" />
            <span className="text-2xl font-bold text-[#4A7C59]">Bamboo Store</span>
          </Link>
          <nav className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-[#4A7C59] transition-colors">
                Trang chủ
              </Link>
              <Link href="#products" className="text-sm font-medium hover:text-[#4A7C59] transition-colors">
                Sản phẩm
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-[#4A7C59] transition-colors">
                Về chúng tôi
              </Link>
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Quản trị
                </Button>
              </Link>
            </div>
            <CartButton />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#F5F3EF] to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A7C59]/10 text-[#4A7C59] text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Sản phẩm thân thiện môi trường
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Sản phẩm tre <span className="text-[#4A7C59]">tự nhiên</span> cho cuộc sống bền vững
              </h1>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Khám phá bộ sưu tập sản phẩm từ tre cao cấp, thủ công và thân thiện với môi trường. Mỗi sản phẩm đều
                được làm từ tre tự nhiên, bền đẹp và an toàn cho sức khỏe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-[#4A7C59] hover:bg-[#3D6849] text-white">
                  <a href="#products" className="flex items-center gap-2">
                    Xem sản phẩm
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline">
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#E8E3D9]">
                <img
                  src="/bamboo-products-collection-display.jpg"
                  alt="Sản phẩm tre"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-[#4A7C59]/10 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-[#4A7C59]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#4A7C59]">100%</div>
                    <div className="text-sm text-muted-foreground">Tre tự nhiên</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-[#4A7C59]/10 flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-[#4A7C59]" />
              </div>
              <h3 className="text-xl font-semibold">Thân thiện môi trường</h3>
              <p className="text-muted-foreground text-pretty">
                Tre là nguồn tài nguyên tái tạo nhanh, giúp giảm thiểu tác động đến môi trường
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-[#4A7C59]/10 flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-[#4A7C59]" />
              </div>
              <h3 className="text-xl font-semibold">Chất lượng cao</h3>
              <p className="text-muted-foreground text-pretty">
                Sản phẩm được làm từ tre già, qua xử lý kỹ càng để đảm bảo độ bền và an toàn
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-[#4A7C59]/10 flex items-center justify-center mx-auto">
                <ShoppingCart className="h-8 w-8 text-[#4A7C59]" />
              </div>
              <h3 className="text-xl font-semibold">Giao hàng nhanh</h3>
              <p className="text-muted-foreground text-pretty">
                Miễn phí giao hàng cho đơn hàng từ 500.000đ trên toàn quốc
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-[#F5F3EF]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl font-bold text-balance">Sản phẩm nổi bật</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Khám phá những sản phẩm từ tre được yêu thích nhất của chúng tôi
            </p>
          </div>

          <ProductsGrid
            products={products || []}
            categories={categories}
            currentCategory={categorySlug || "all"}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-video rounded-2xl overflow-hidden bg-[#E8E3D9]">
                <img
                  src="/bamboo-forest-nature-sustainable.jpg"
                  alt="Rừng tre"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-balance">Về Bamboo Store</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Chúng tôi tin rằng những lựa chọn nhỏ trong cuộc sống hàng ngày có thể tạo nên sự khác biệt lớn cho hành
                tinh. Vì vậy, chúng tôi mang đến những sản phẩm từ tre - một vật liệu tự nhiên, bền vững và thân thiện
                với môi trường.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Mỗi sản phẩm của chúng tôi đều được chọn lọc kỹ càng, từ nguyên liệu đến quy trình sản xuất, nhằm đảm
                bảo chất lượng cao nhất và giảm thiểu tác động đến môi trường.
              </p>
              <Button size="lg" variant="outline">
                Tìm hiểu thêm về chúng tôi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E33] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6" />
                <span className="text-xl font-bold">Bamboo Store</span>
              </div>
              <p className="text-sm text-gray-300">Sản phẩm tre tự nhiên cho cuộc sống bền vững</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#products" className="hover:text-white transition-colors">
                    Đồ dùng bếp
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="hover:text-white transition-colors">
                    Trang trí
                  </Link>
                </li>
                <li>
                  <Link href="#products" className="hover:text-white transition-colors">
                    Chăm sóc cá nhân
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Công ty</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Chính sách vận chuyển
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Chính sách đổi trả
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Điều khoản dịch vụ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
            © 2025 Bamboo Store. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  )
}
