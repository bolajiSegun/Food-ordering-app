"use client";

import { useSession } from "next-auth/react";
import { OrderType } from "@/types/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Loading from "../loading";

const OrdersPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`).then((res) =>
        res.json()
      ),
  });
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;
    mutation.mutate({ id, status });
    toast.success("Order status updated");
    input.value = "";
  };

  if (isLoading && session) return <Loading />;

  return (
    <section className="px-4 lg:px-20 min-h-[calc(100vh-9em)] md:min-h-[calc(100vh-13em)]">
      <table className="w-full text-left border-separate border-spacing-3">
        <thead>
          <tr>
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.data?.map((order: OrderType) => (
              <tr
                className={` ${
                  order.status === "Delivered" ? "bg-green-200" : "bg-gray-100"
                } text-sm md:text-base`}
                key={order.id}
              >
                <td className="hidden md:block py-6 px-1">{order.id}</td>
                <td className="py-6 px-1">{order.createdAt.slice(0, 10)}</td>
                <td className="py-6 px-1">{order.price}</td>
                <td className="hidden md:block py-6 px-1">
                  {order.product[0].title}
                </td>
                {session?.user.isAdmin ? (
                  <td className="py-4 px-1">
                    <form
                      className="flex items-center gap-4"
                      onSubmit={(e) => handleSubmit(e, order.id)}
                    >
                      <input
                        type="text"
                        placeholder={order.status}
                        className="placeholder:text-black outline-none py-2 rounded-md"
                      />
                      <button className="bg-blue-300 p-2 rounded-full hover:bg-blue-400">
                        <Image
                          src="/edit.png"
                          width={16}
                          height={16}
                          alt="edit"
                        />
                      </button>
                    </form>
                  </td>
                ) : (
                  <td className="py-6 px-1">{order.status}</td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};
export default OrdersPage;
