"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading.... </p>;
  }
  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.status === 200) {
      router.push("/menu");
      toast.info("The product has been deleted!");
    } else {
      const data = await res.json();
      toast.error(data.message);
    }
  };
  return (
    <button
      className="absolute top-4 right-10 lg:right-20 xl:right-40 bg-red-300 hover:bg-red-500 p-2 rounded-full"
      onClick={handleDelete}
    >
      <Image src={"/delete.png"} alt="del" width={16} height={16} />
    </button>
  );
};
export default DeleteButton;
