import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/types"

interface ProductState {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  removeProduct: (codigo: number) => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) => (p.codigo === product.codigo ? product : p)),
        })),
      removeProduct: (codigo) =>
        set((state) => ({
          products: state.products.filter((p) => p.codigo !== codigo),
        })),
    }),
    {
      name: "product-storage",
    },
  ),
)
