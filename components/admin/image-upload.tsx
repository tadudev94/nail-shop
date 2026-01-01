"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

type ImageUploadProps = {
  value: string
  onChange: (url: string) => void
  onRemove: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file hình ảnh")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước file không được vượt quá 5MB")
      return
    }

    setIsUploading(true)

    try {
      const supabase = createClient()

      // Create unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      // Upload file
      const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("product-images").getPublicUrl(filePath)

      onChange(publicUrl)
      toast.success("Đã tải lên hình ảnh")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Không thể tải lên hình ảnh")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Label>Hình ảnh sản phẩm</Label>

      {value ? (
        <div className="space-y-3">
          <div className="relative h-64 w-full rounded-lg overflow-hidden bg-muted border">
            <img src={value || "/placeholder.svg"} alt="Product" className="w-full h-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-sm text-muted-foreground">
                Kéo thả hoặc <span className="text-primary font-medium hover:underline">chọn file</span>
              </span>
            </Label>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">PNG, JPG, GIF (tối đa 5MB)</p>
          </div>
          {isUploading && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">Đang tải lên...</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
