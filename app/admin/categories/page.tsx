import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, ArrowLeft } from "lucide-react"
import { CategoriesTable } from "@/components/admin/categories-table"

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("categories").select("*").order("display_order", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Dashboard
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Quản lý danh mục</h1>
            <p className="text-muted-foreground mt-2">Quản lý các danh mục sản phẩm</p>
          </div>
          <Button asChild className="bg-[#4A7C59] hover:bg-[#3D6849]">
            <Link href="/admin/categories/new">
              <Plus className="h-4 w-4 mr-2" />
              Thêm danh mục
            </Link>
          </Button>
        </div>

        <CategoriesTable categories={categories || []} />
      </div>
    </div>
  )
}
