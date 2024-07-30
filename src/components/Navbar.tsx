import Link from "next/link";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-green-500 h-12 border-b-2 border-green-500 uppercase px-4 md:h-24 lg:px-20 xl:px-40">
      <div className="hidden md:flex items-center flex-1 gap-4">
        <Link href={"/"}> Hompage </Link>
        <Link href={"/menu"}> Menu </Link>
        <Link href={"/"}> Contact </Link>
      </div>

      {/* LOGO */}
      <div className="text-xl md:font-bold md:flex-1 text-center">
        <Link href={"/"}> Wisepies </Link>
      </div>

      <div className="hidden md:flex items-center flex-1 gap-4 justify-end">
        <a
          href="tel:+2348131457479"
          className="bg-[#e1ad01] text-white flex items-center absolute top-3 text-sm p-1 rounded-md right-2 2xl:static flex-none"
        >
          <Image src="/phone.png" alt="phone" width={14} height={14} />
          <span>+2348131457479</span>
        </a>
        {<UserLinks />}
        <Link href={"/cart"} className="flex-none">
          <CartIcon />
        </Link>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
    </div>
  );
};
export default Navbar;
