import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { SingleProductType } from "@/types/types";
import Image from "next/image";

const getData = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
    );

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    return null;
  }
};

type Props = {
  params: { id: string };
};

const SingleProductPage = async ({ params }: Props) => {
  const product: SingleProductType = await getData(params.id);

  return (
    <div className="relative px-4 py-10 lg:px-20 xl:px-40 min-h-[calc(100vh-9em)] md:min-h-[calc(100vh-13em)] gap-10 flex flex-col md:flex-row md:items-center">
      {product && product.data ? (
        <>
          {/* IMAGE CONTAINER */}
          <div className="relative w-full aspect-square min-h-[250] max-h-[350px] md:max-h-[400px] lg:max-h-[500px]">
            <Image
              src={product.data?.img || ""}
              alt="product"
              fill
              className="object-contain"
            />
          </div>
          {/* TEXT CONTAINER */}
          <div className="flex flex-col text-green-500">
            <h2 className="font-bold text-3xl uppercase">
              {product.data?.title}
            </h2>
            <p className="my-4"> {product.data?.desc} </p>
            <Price product={product} />
          </div>
          <DeleteButton id={product.data?.id!} />{" "}
        </>
      ) : (
        <>
          <div className="w-full">
            <p className="text-center text-xl md:text-2xl font-semibold text-gray-500">
              Something went wrong....
            </p>
          </div>
        </>
      )}
    </div>
  );
};
export default SingleProductPage;
