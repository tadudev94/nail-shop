"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { toast } from "sonner"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string | null
  category: string | null
  category_slug: string | null
  stock: number
}

type Category = {
  name: string
  slug: string
}

type ProductsGridProps = {
  products: Product[]
  categories: Category[]
  currentCategory: string
  currentPage: number
  totalPages: number
}

export function ProductsGrid({ products, categories, currentCategory, currentPage, totalPages }: ProductsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addItem } = useCart()

  const handleCategoryChange = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams)
    if (categorySlug === "all") {
      params.delete("category")
    } else {
      params.set("category", categorySlug)
    }
    params.delete("page")
    router.push(`/?${params.toString()}#products`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", page.toString())
    router.push(`/?${params.toString()}#products`)
  }

  const getCategoryName = (slug: string | null) => {
    if (!slug) return "Khác"
    const category = categories.find((cat) => cat.slug === slug)
    return category ? category.name : slug
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={currentCategory === "all" ? "default" : "outline"}
          onClick={() => handleCategoryChange("all")}
          className={currentCategory === "all" ? "bg-[#4A7C59] hover:bg-[#3D6849]" : ""}
        >
          Tất cả
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.slug}
            variant={currentCategory === cat.slug ? "default" : "outline"}
            onClick={() => handleCategoryChange(cat.slug)}
            className={currentCategory === cat.slug ? "bg-[#4A7C59] hover:bg-[#3D6849]" : ""}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-[#E8E3D9] overflow-hidden">
              <img
                src={product.image_url || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 space-y-3">
              <div className="text-sm text-[#4A7C59] font-medium">{getCategoryName(product.category_slug)}</div>
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-2xl font-bold text-[#4A7C59]">{product.price.toLocaleString("vi-VN")}đ</span>
                <Button
                  size="sm"
                  className="bg-[#4A7C59] hover:bg-[#3D6849] text-white"
                  onClick={() => {
                    addItem(product)
                    toast.success(`Đã thêm ${product.name} vào giỏ hàng`)
                  }}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.stock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page: number
              if (totalPages <= 5) {
                page = i + 1
              } else if (currentPage <= 3) {
                page = i + 1
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i
              } else {
                page = currentPage - 2 + i
              }
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? "bg-[#4A7C59] hover:bg-[#3D6849]" : ""}
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {products.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">Không tìm thấy sản phẩm nào trong danh mục này</div>
      )}
    </div>
  )
}
