"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "../components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Package2 } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/lib/types"

interface ProductPreviewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductPreview({ product, isOpen, onClose }: ProductPreviewProps) {
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles del Producto</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            {product.imagen ? (
              <Image
                src={product.imagen || "/placeholder.svg"}
                alt={product.nombre}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <Package2 className="h-16 w-16 text-slate-400" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{product.nombre}</h3>
              <Badge
                variant={product.cantidad > 10 ? "default" : product.cantidad > 0 ? "outline" : "destructive"}
                className={product.cantidad > 10 ? "bg-green-500 hover:bg-green-600" : ""}
              >
                Stock: {product.cantidad}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Código:</div>
              <div className="font-medium">{product.codigo}</div>

              <div className="text-muted-foreground">Fecha de creación:</div>
              <div className="font-medium">{formatDate(product.creacion)}</div>
            </div>

            <div className="pt-2">
              <div className="text-muted-foreground text-sm mb-1">Descripción:</div>
              <p className="text-sm">{product.descripcion}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
