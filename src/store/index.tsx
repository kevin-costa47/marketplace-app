// A simple, persistent cart store
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ICartProduct, IProduct } from "@/interface/types";

const clampQuantity = (quantity: number) =>
  Math.max(1, Math.min(50, Math.floor(quantity)));

const STORAGE_KEY = "shopping-cart";

const clearPersistentCart = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
};

interface CartStore {
  items: ICartProduct[];
  updatedCart: boolean;
  getTotalPrice: () => number;
  getTotalAmount: () => number;
  invalidCart: () => boolean;
  addItem: (product: IProduct) => void;
  removeItem: (product: IProduct) => void;
  updateQuantity: (product: IProduct, quantity: number) => void;
  updateItemPrice: (productId: number, newPrice: number) => void;
  clearCart: () => void;
  completeOrder: () => void;
  removeUpdatedCartNotification: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      updatedCart: false,
      getTotalPrice: (): number => {
        const totalPrice = get().items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0,
        );
        return parseFloat(totalPrice.toFixed(2));
      },
      getTotalAmount: (): number =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      invalidCart: (): boolean =>
        get().items.every((item) => item.quantity > 0),

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
                      quantity: clampQuantity(item.quantity + 1),
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
            item.id === product.id
              ? { ...item, quantity: clampQuantity(quantity) }
              : item,
          ),
        })),

      updateItemPrice: (productId, newPrice) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, price: newPrice } : item,
          ),
          updatedCart: true,
        })),

      clearCart: () => {
        clearPersistentCart();
        set({ items: [], updatedCart: false });
      },

      completeOrder: () => {
        clearPersistentCart();
        set({ items: [], updatedCart: false });
      },

      removeUpdatedCartNotification: () => set({ updatedCart: false }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
