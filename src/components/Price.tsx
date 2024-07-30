'use client';
import { SingleProductType } from '@/types/types';
import { useCartStore } from '@/utils/store';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Price = ({ product }: { product: SingleProductType }) => {
  const { price, options } = product.data!;
  const [totalPrice, setTotalPrice] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const calc =
      quantity *
      (options?.length && options
        ? Number(price) + Number(options[selected].additionalPrice)
        : Number(price));
    setTotalPrice(Number(calc.toFixed(2)));
  }, [quantity, selected, price, options]);

  const { addTocart } = useCartStore();
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCart = () => {
    addTocart({
      id: product.data?.id!,
      title: product.data?.title!,
      desc: product.data?.desc,
      img: product.data?.img,
      price: totalPrice,
      ...(product.data?.options?.length && {
        optionTitle: product.data?.options[selected].title,
      }),
      quantity: quantity,
    });
    toast.success('Added to Cart successfully');
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-2xl font-bold"> ${totalPrice} </p>
      <div className="flex gap-4">
        {options &&
          options?.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`p-2 border rounded-md ${
                index === selected
                  ? 'bg-green-500 text-white border-green-500'
                  : 'border-green-700 hover:bg-lime-100'
              }`}
            >
              {item.title}
            </button>
          ))}
      </div>
      <div className="flex items-center   border border-green-500">
        <span className="pl-2 truncate"> Quantity </span>
        <div className="ml-auto flex-none">
          <button
            className="p-1  sm:p-2 font-bold text-2xl"
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            {'<'}
          </button>
          <span> {quantity} </span>
          <button
            className="p-1 sm:p-2 font-bold text-2xl"
            onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
          >
            {'>'}
          </button>
        </div>
        <button
          onClick={handleCart}
          className="bg-green-500 flex-none px-2 sm:px-3 py-3 text-white"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default Price;
