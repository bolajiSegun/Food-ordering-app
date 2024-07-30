"use client";
// import { SingleProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

type SingleProductType = {
  id: string;
  title: string;
  desc?: string | undefined;
  img: string;
  price: number;
  options?:
    | {
        title: string;
        additionalPrice: number;
      }[]
    | undefined;
};

const AddToCart = ({ product }: { product: SingleProductType }) => {
  const { addTocart } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    addTocart({
      id: product?.id!,
      title: product?.title!,
      desc: product?.desc,
      img: product?.img,
      price: Number(product?.price),
      ...(product?.options?.length && {
        optionTitle: product?.options[0].title,
      }),
      quantity: 1,
    });
    toast.success("Added to Cart successfully");
  };

  return (
    <button onClick={handleCart} className="w-full h-full bg-red-300">
      Add to cart
    </button>
  );
};
export default AddToCart;
