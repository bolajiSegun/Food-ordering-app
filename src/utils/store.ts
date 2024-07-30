import { ActionTypes, CartType } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addTocart(item) {
        const allCartProducts = get().products;
        const productInState = allCartProducts.find(
          (product) => product.id === item.id
        );
        if (productInState) {
          const updatedProducts = allCartProducts.map((product) =>
            product.id === productInState.id
              ? {
                  ...product,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          }));
        }
      },

      removeFromcart(item) {
        set((state) => ({
          products: state.products.filter((product) => product.id !== item.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - item.price,
        }));
      },
      removeAllFromcart() {
        set((state) => ({
          products: INITIAL_STATE.products,
          totalItems: INITIAL_STATE.totalItems,
          totalPrice: INITIAL_STATE.totalPrice,
        }));
      },
    }),
    { name: 'cart', skipHydration: true }
  )
);
