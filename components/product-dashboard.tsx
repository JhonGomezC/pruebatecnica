"use client"

import { useState } from "react"
import { ProductForm } from "../components/product-form"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../components/ui/sheet"
import { Button } from "../components/ui/button"
import { Toaster } from "../components/ui/sonner"
import { ScrollArea } from "./ui/scroll-area"
import { PlusCircle, Package, LayoutDashboard } from "lucide-react"
import { ModeToggle } from "../components/mode-toggle"
import { ProductList } from "./product-list"

export function ProductDashboard() {
    const [searchTerm, setSearchTerm] = useState("")
    const [sortField, setSortField] = useState<"codigo" | "nombre" | "cantidad" | "creacion">("creacion")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

    const handleSort = (field: "codigo" | "nombre" | "cantidad" | "creacion") => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="container mx-auto py-8 px-4">
                    <header className="mb-8 animate-fadeIn">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                                    <Package className="h-6 w-6" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">Gestión de Productos</h1>
                                    <p className="text-muted-foreground mt-1">
                                        Administra tu inventario de productos de manera eficiente
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <ModeToggle />
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                                            <PlusCircle className="h-4 w-4" />
                                            Nuevo Producto
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="sm:max-w-md">
                                        <SheetTitle className="text-lg font-semibold"></SheetTitle>
                                        <ScrollArea className="h-[90vh] w-full">
                                            <ProductForm />
                                        </ScrollArea>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </header>
                    <div className="grid grid-cols-1 gap-6 animate-slideInUp">
                        <div className="rounded-xl border bg-card text-card-foreground shadow-soft overflow-hidden">
                            <div className="p-6 flex items-center border-b gap-2">
                                <LayoutDashboard className="h-5 w-5 text-primary" />
                                <h2 className="text-xl font-semibold">Inventario de Productos</h2>
                            </div>
                            <div className="p-6">
                                <ProductList
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    sortField={sortField}
                                    sortDirection={sortDirection}
                                    onSort={handleSort}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>
        
    )
}