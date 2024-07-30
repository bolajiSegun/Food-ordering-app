"use client";

import { useCartStore } from "@/utils/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SuccessPage = () => {
  const { removeAllFromcart } = useCartStore();
  const searchParams = useSearchParams();
  const intentId = searchParams.get("payment_intent");

  const router = useRouter();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm/${intentId}`,
          {
            method: "PUT",
          }
        );
        removeAllFromcart();
        router.push("/orders");
      } catch (err) {
        toast.error("something went wrong");
      }
    };
    makeRequest();
  }, [intentId, router, removeAllFromcart]);

  return (
    <section className="px-4 py-10 lg:px-20 xl:px-40 min-h-[calc(100vh-9em)] md:min-h-[calc(100vh-13em)] flex items-center flex-col justify-center text-center text-xl md:text-2xl font-semibold">
      <div className="loading-spinner border-[20px] border-t-green-500 w-24 h-24 md:w-32 md:h-32 "></div>
      <p>
        Payment successful. You are being redirected to the order page. Please
        do not close the page.
      </p>
    </section>
  );
};
export default SuccessPage;
