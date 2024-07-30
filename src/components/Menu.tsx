'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './CartIcon';
import UserLinks from './UserLinks';

const links = [
  { id: 1, title: 'Homepage', url: '/' },
  { id: 2, title: 'Menu', url: '/menu' },
  { id: 3, title: 'Working Hours', url: '/' },
  { id: 4, title: 'Contact', url: '/' },
];

const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div>
        {open ? (
          <Image
            alt="menu"
            src={'/close.png'}
            width={20}
            height={20}
            onClick={() => setOpen(false)}
          />
        ) : (
          <Image
            alt="menu"
            src={'/menu.png'}
            width={20}
            height={20}
            onClick={() => setOpen(true)}
          />
        )}
      </div>
      {open ? (
        <div className="absolute left-0 top-24 bg-green-500 text-white w-full h-[calc(100vh-96px)] z-50 flex flex-col items-center justify-center gap-8 text-3xl">
          {links.map((link) => (
            <Link key={link.id} href={link.url} onClick={() => setOpen(false)}>
              {link.title}
            </Link>
          ))}
          {<UserLinks setOpen={setOpen} />}
          <Link href={'/cart'} onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      ) : null}
    </div>
  );
};
export default Menu;
