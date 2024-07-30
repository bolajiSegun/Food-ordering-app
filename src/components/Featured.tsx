import { ProductsType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

const getData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
};
const Featured = async () => {
  const featuredProducts: ProductsType | null = await getData();
  return (
    <div className="border-t-4 border-t-green-500 w-screen overflow-x-auto text-green-500 flex snap-x snap-mandatory">
      {/* WRAPPER */}

      {/* SINGLE ITEM */}

      {featuredProducts && featuredProducts.data?.length ? (
        featuredProducts.data?.map((product) => (
          <div
            key={product.id}
            className="snap-start w-screen h-[400px] flex-none flex flex-col items-center text-center hover:bg-lime-100 transition-all duration-300 group md:border-r border-green-500 sm:w-[50vw] lg:w-1/3 lg:h-[500px]"
          >
            {/* IMAGE CONTAINER */}
            <div className="relative h-1/2 flex-none w-full transition-all duration-500 overflow-hidden">
              <Image
                src={product.img}
                alt="product"
                fill
                sizes="100%"
                className="object-cover group-hover:scale-125  transition-all duration-500"
              />
            </div>
            {/* TEXT CONTAINER */}
            <div className="flex h-1/2 justify-between flex-none flex-col items-center py-2 px-4 w-full">
              <Link
                href={`/product/${product.id}`}
                className="text-xl font-bold uppercase hover:underline underline-offset-4 lg:text-2xl"
              >
                {product.title}
              </Link>
              <p className="text-sm lg:my-4 line-clamp-3">{product.desc}</p>
              <span className="text-xl font-bold lg:text-2xl">
                ${product.price}
              </span>
              <div className="rounded-md overflow-hidden flex items-center justify-center h-10 w-36 bg-green-500 text-white hover:bg-green-400">
                <AddToCart product={product} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {" "}
          <div className="py-5 text-lg text-center w-full">
            <p>No Featured Products</p>
          </div>
        </>
      )}
    </div>
  );
};
export default Featured;
