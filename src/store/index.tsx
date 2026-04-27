// A simple, persistent cart store
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ICartProduct, IProduct } from "../interface/types";

interface CartStore {
  items: ICartProduct[];
  getTotalPrice: () => number;
  getTotalAmount: () => number;
  invalidCart: () => boolean;
  addItem: (product: IProduct) => void;
  removeItem: (product: IProduct) => void;
  updateQuantity: (product: IProduct, quantity: number) => void;
  updateItemPrice: (productId: number, newPrice: number) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      getTotalPrice: (): number => {
        const totalPrice = get().items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0,
        );
        return parseFloat(totalPrice.toFixed(2));
      },
      getTotalAmount: (): number => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      invalidCart: (): boolean => {
        return get().items.filter((item) => item.quantity === 0).length === 0;
      },
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),

      removeItem: (product) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== product.id),
        })),

      updateQuantity: (product, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity } : item,
          ),
        })),
      updateItemPrice: (productId: number, newPrice: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, price: newPrice } : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "shopping-cart" },
  ),
);
