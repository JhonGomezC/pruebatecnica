"use client"

import { useState } from "react"
import { useProductStore } from "@/lib/store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowUpDown, Search, MoreVertical, Trash2, Edit, ArrowUp, ArrowDown,Eye, Package2, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "../lib/utils"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ProductForm } from "@/components/product-form"
import { toast } from "sonner"
import { ProductPreview } from "../components/product-preview"
import Image from "next/image"
import { Badge } from "./ui/badge"

interface ProductListProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortField: "codigo" | "nombre" | "cantidad" | "creacion"
  sortDirection: "asc" | "desc"
  onSort: (field: "codigo" | "nombre" | "cantidad" | "creacion") => void
}

export function ProductList({ searchTerm, setSearchTerm, sortField, sortDirection, onSort }: ProductListProps) {
  const { products, removeProduct } = useProductStore()
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [previewProduct, setPreviewProduct] = useState<number | null>(null)

  const filteredProducts = products
    .filter(
      (product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.codigo.toString().includes(searchTerm),
    )
    .sort((a, b) => {
      if (sortField === "codigo") {
        return sortDirection === "asc" ? a.codigo - b.codigo : b.codigo - a.codigo
      } else if (sortField === "nombre") {
        return sortDirection === "asc" ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)
      } else if (sortField === "cantidad") {
        return sortDirection === "asc" ? a.cantidad - b.cantidad : b.cantidad - a.cantidad
      } else {
        // creacion
        return sortDirection === "asc"
          ? new Date(a.creacion).getTime() - new Date(b.creacion).getTime()
          : new Date(b.creacion).getTime() - new Date(a.creacion).getTime()
      }
    })

  const handleDelete = (id: number) => {
    setDeleteId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deleteId !== null) {
      removeProduct(deleteId)
      toast.success("Producto eliminado",{duration: 2000,description: "El producto ha sido eliminado correctamente",
      })
      setIsDeleteDialogOpen(false)
    }
  }

  const getSortIcon = (field: "codigo" | "nombre" | "cantidad" | "creacion") => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortDirection === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
  }

  const getProductById = (id: number) => {
    return products.find((p) => p.codigo === id)
  }


  return (
    <div className="space-y-4">
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 border-slate-200 dark:border-slate-700 focus-visible:ring-primary"
        />
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <span>
          Total:{" "}
          <Badge variant="outline" className="ml-1">
            {filteredProducts.length} productos
          </Badge>
        </span>
      </div>
    </div>

    {filteredProducts.length === 0 ? (
      <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center h-40 py-10">
          <Package2 className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground text-center">
            {searchTerm
              ? "No se encontraron productos que coincidan con tu búsqueda"
              : "No hay productos disponibles. ¡Agrega tu primer producto!"}
          </p>
        </CardContent>
      </Card>
    ) : (
      <div className="rounded-md border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50">
              <TableHead className="w-[80px]"></TableHead>
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={() => onSort("codigo")} className="flex items-center font-medium">
                  Código {getSortIcon("codigo")}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => onSort("nombre")} className="flex items-center font-medium">
                  Nombre {getSortIcon("nombre")}
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Descripción</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => onSort("cantidad")} className="flex items-center font-medium">
                  Cantidad {getSortIcon("cantidad")}
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button variant="ghost" onClick={() => onSort("creacion")} className="flex items-center font-medium">
                  Creación {getSortIcon("creacion")}
                </Button>
              </TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.codigo}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <TableCell>
                  <div className="relative h-10 w-10 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700">
                    {product.imagen ? (
                      <Image
                        src={product.imagen || "/placeholder.svg"}
                        alt={product.nombre}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <Package2 className="h-5 w-5 text-slate-400" />
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.codigo}</TableCell>
                <TableCell className="font-medium">{product.nombre}</TableCell>
                <TableCell className="hidden md:table-cell max-w-[300px] truncate text-muted-foreground">
                  {product.descripcion}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={product.cantidad > 10 ? "default" : product.cantidad > 0 ? "outline" : "destructive"}
                    className={product.cantidad > 10 ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {product.cantidad}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {formatDate(product.creacion)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setPreviewProduct(product.codigo)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver producto</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-slate-200 dark:border-slate-700">
                        <Sheet>
                          <SheetTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault()
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                          </SheetTrigger>
                          <SheetContent className="sm:max-w-md">
                              <SheetTitle className="text-lg font-semibold"></SheetTitle>
                            <ProductForm editingProduct={product} />
                          </SheetContent>
                        </Sheet>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onSelect={() => handleDelete(product.codigo)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )}

    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </div>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {previewProduct !== null && (
      <ProductPreview
        product={getProductById(previewProduct)!}
        isOpen={previewProduct !== null}
        onClose={() => setPreviewProduct(null)}
      />
    )}
  </div>
  )
}
