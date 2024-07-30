"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || session?.user.isAdmin === false) {
      router.push("/");
    }
  }, [status, router, session?.user.isAdmin]);

  const [isLoading, setIsLoading] = useState(false);

  type Inputs = {
    title: string;
    desc: string;
    price: number;
    catSlug: string;
  };

  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const changeInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  type Option = {
    id: string;
    title: string;
    additionalPrice: number | null;
  };

  const [options, setOptions] = useState<Option[]>([]);
  const [option, setOption] = useState<Option>({
    id: "",
    title: "",
    additionalPrice: null,
  });

  const removeOption = (id: string) => {
    setOptions(options.filter((opt) => opt.id != id));
  };

  const addOption = () => {
    setOptions((prev) => [...prev, option]);
    setOption({ id: "", title: "", additionalPrice: 0 });
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        // generate random value as id
        id:
          e.target.value +
          "-" +
          Math.random() * 1e6 +
          "-" +
          Math.random() * 1e4,
      };
    });
  };

  const [img, setImg] = useState<File | null>(null);

  const changeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const imgFile = (target.files as FileList)[0];
    setImg(imgFile);
  };

  const uploadImg = async () => {
    const form = new FormData();

    form.append("file", img!);
    form.append("upload_preset", "food-delivery-app");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dehzwowgv/image/upload",
      { method: "POST", body: form }
    );

    const data = await res.json();
    return data.url;

    // 'curl https://api.cloudinary.com/v1_1/<CLOUD_NAME>/image/upload -X POST --data 'file=<FILE>&timestamp=<TIMESTAMP>&api_key=<API_KEY>&signature=<SIGNATURE>'
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inputs, options, img: await uploadImg() }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      router.push(`/product/${data.data.id}`);
    } else {
      setIsLoading(false);
      toast.error(data.message);
    }
  };
  return (
    <section className="px-4 py-10 lg:px-20 xl:px-40 min-h-[calc(100vh-9em)] md:min-h-[calc(100vh-13em)]">
      <h2 className="font-bold text-xl">Add New Product</h2>

      <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
        <label className="font-semibold text-lg" htmlFor="title">
          Title
        </label>
        <input
          className="w-full py-2 px-1 rounded-lg outline-none border-gray-400 focus:border-green-500 border mb-5"
          type="text"
          id="title"
          name="title"
          onChange={changeInputs}
        />
        <label className="font-semibold text-lg" htmlFor="description">
          Description
        </label>
        <textarea
          className="w-full py-2 px-1 rounded-lg outline-none border-gray-400 focus:border-green-500 border mb-5 max-h-60 min-h-[5rem]"
          id="description"
          name="desc"
          onChange={changeInputs}
        ></textarea>

        <label className="font-semibold text-lg" htmlFor="img">
          Image
        </label>
        <div className="mb-5">
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            name="img"
            id="img"
            onChange={changeImg}
          />
        </div>

        <label className="font-semibold text-lg" htmlFor="price">
          Price
        </label>
        <input
          className="w-full py-2 px-1 rounded-lg outline-none border-gray-400 focus:border-green-500 border mb-5 "
          type="number"
          step="any"
          id="price"
          name="price"
          onChange={changeInputs}
        />
        <label className="font-semibold text-lg" htmlFor="category">
          Category
        </label>
        <input
          className="w-full py-2 px-1 rounded-lg outline-none border-gray-400 focus:border-green-500 border mb-5"
          type="text"
          id="category"
          name="catSlug"
          onChange={changeInputs}
        />
        <label className="font-semibold text-lg" htmlFor="optionTitle">
          {" "}
          Options{" "}
        </label>
        {options.map((opt) => (
          <div key={opt.id} className="flex items-center mb-2">
            <span className="w-24 md:w-36 py-2 px-1 truncate rounded-lg border-green-500 border capitalize">
              {opt.title}
            </span>
            <span className="w-14 md:w-24 py-2 px-1 truncate rounded-lg border-green-500 border mx-2">
              +{opt.additionalPrice}$
            </span>
            <span
              onClick={() => removeOption(opt.id)}
              className="px-2 text-lg font-bold bg-red-400 text-white rounded-lg hover:bg-red-500 cursor-pointer"
            >
              X
            </span>
          </div>
        ))}
        <div className="flex items-center mb-10">
          <input
            onChange={handleOptionChange}
            value={option.title}
            type="text"
            id="optionTitle"
            name="title"
            className="w-24 md:w-36 h-full py-2 px-1 rounded-lg outline-none border-gray-400 focus:border-green-500 border"
          />
          <input
            onChange={handleOptionChange}
            value={option.additionalPrice || ""}
            type="number"
            name="additionalPrice"
            inputMode="numeric"
            className="w-14 md:w-24 py-2 px-1 h-full rounded-lg outline-none border-gray-400 focus:border-green-500 border mx-2"
          />
          <span
            onClick={addOption}
            className="px-2 text-2xl font-bold bg-gray-400 hover:bg-gray-500 text-white rounded-lg cursor-pointer"
          >
            +
          </span>
        </div>

        <button
          className="bg-green-400 text-white font-semibold rounded-lg py-2 md:w-60 hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-green-300"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </section>
  );
};
export default AddPage;
