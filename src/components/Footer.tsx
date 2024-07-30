import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-4 text-green-500 h-12 border-t border-green-500 md:h-16 border-b lg:px-20 xl:px-40 uppercase">
      <Link href={'/'} className="text-xl font-bold">
        Wisepies
      </Link>
      <p className="text-xs sm:text-sm"> &copy; All right reserved</p>
    </footer>
  );
};
export default Footer;
