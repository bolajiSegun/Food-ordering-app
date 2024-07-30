'use client';
import { useCartStore } from '@/utils/store';
import Image from 'next/image';
import { useEffect } from 'react';

const CartIcon = () => {
  const { totalItems } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return (
    <div className="flex items-center md:gap-2">
      <div className="w-8 h-8 relative md:w-4 md:h-4 ">
        <Image src={'/cart.png'} alt="cart" fill sizes="100%" />
      </div>
      <span>Cart ({totalItems})</span>
    </div>
  );
};
export default CartIcon;
