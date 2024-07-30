import { MenuType } from "@/types/types";
import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    return null;
  }
};

const MenuPage = async () => {
  const menu: MenuType | null = await getData();

  return (
    <section className="px-4 py-10 lg:px-20 xl:px-40 min-h-[calc(100vh-9em)] md:min-h-[calc(100vh-13em)] flex flex-col md:flex-row md:items-center">
      {menu ? (
        menu.data?.map((cat) => (
          <Link
            key={cat.id}
            href={`/menu/${cat.slug}`}
            className="w-full flex justify-center items-start flex-col gap-4 flex-1 min-h-[250px] max-h-[400px] bg-no-repeat bg-cover px-2 md:h-[300px] lg:h-[400px] lg:gap-10"
            style={{
              backgroundImage: `url(${cat.img})`,
              backgroundColor: cat.color,

              color: cat.color !== "white" ? "white" : "black",
            }}
          >
            <h2 className="text-2xl md:text-3xl uppercase font-bold max-w-[15ch]">
              {cat.title}
            </h2>
            <p className="max-w-[20ch] sm:max-w-[35ch]">{cat.desc}</p>
            <button
              style={{
                color: cat.color === "white" ? "white" : "black",
                backgroundColor: cat.color !== "white" ? "white" : "black",
              }}
              className="p-2 font-bold rounded-md hover:opacity-80"
            >
              {" "}
              Explore{" "}
            </button>
          </Link>
        ))
      ) : (
        <div className="w-full">
          <p className="text-center text-xl md:text-2xl font-semibold text-gray-500">
            Something went wrong....
          </p>
        </div>
      )}
    </section>
  );
};
export default MenuPage;
