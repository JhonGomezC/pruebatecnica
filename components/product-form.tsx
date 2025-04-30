"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useProductStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { toast } from "sonner"
import { Product } from "@/lib/types"
import { ImageIcon } from "lucide-react"
import { ImageUpload } from "../components/image-upload"

const formSchema = z.object({
    codigo: z.coerce.number().int().positive("El código debe ser un número positivo"),
    nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    descripcion: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
    cantidad: z.coerce.number().int().nonnegative("La cantidad no puede ser negativa"),
    imagen: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface ProductFormProps {
    editingProduct?: Product
}

export function ProductForm({ editingProduct }: ProductFormProps) {
    const { addProduct, updateProduct } = useProductStore()
    const isEditing = !!editingProduct

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            codigo: 0,
            nombre: "",
            descripcion: "",
            cantidad: 0,
            imagen: "",
        },
    })

    // Obtener todos los productos para validar duplicados
    const products = useProductStore((state) => state.products);

    useEffect(() => {
        if (editingProduct) {
            form.reset({
                codigo: editingProduct.codigo,
                nombre: editingProduct.nombre,
                descripcion: editingProduct.descripcion,
                cantidad: editingProduct.cantidad,
                imagen: editingProduct.imagen || "",
            })
        }
    }, [editingProduct, form])

    const onSubmit = (data: FormValues) => {
        // Si estamos creando, validar que el código no exista
        if (!isEditing && products.some(p => p.codigo === data.codigo)) {
            toast.error("El código ya existe", {
                duration: 2000,
                description: "Por favor ingresa un código único"
            })
            return
        }

        if (isEditing) {
            updateProduct({
                ...data,
                creacion: editingProduct!.creacion,
            })
            toast.success("Producto actualizado", {
                duration: 2000,
                description: "El producto ha sido actualizado correctamente"
            })
        } else {
            addProduct({
                ...data,
                creacion: new Date().toISOString(),
            })
            form.reset({
                codigo: 0,
                nombre: "",
                descripcion: "",
                cantidad: 0,
                imagen: "",
            })
            toast.info("Producto creado", {
                duration: 2000,
                description: "El producto ha sido creado correctamente"
            })
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6 px-4">
                <h2 className="text-xl font-semibold tracking-tight">
                    {isEditing ? "Editar Producto" : "Nuevo Producto"}
                </h2>
                <FormField
                    control={form.control}
                    name="imagen"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-1">
                                <ImageIcon className="h-3.5 w-3.5" />
                                Imagen del producto
                            </FormLabel>
                            <FormControl>
                                <ImageUpload value={field.value || ""} onChange={field.onChange} />
                            </FormControl>
                            <FormDescription>Sube una imagen representativa del producto</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="codigo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Código</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ej. 1001" {...field} disabled={isEditing} />
                            </FormControl>
                            <FormDescription>Código único del producto</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej. Laptop HP Pavilion" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="descripcion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe el producto..." className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="cantidad"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Ej. 10" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full sticky bottom-0 text-secondary font-semibold py-2 rounded">

                    {isEditing ? "Actualizar Producto" : "Crear Producto"}
                </Button>
            </form>
        </Form>
    )
}
