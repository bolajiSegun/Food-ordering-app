'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

interface Props {
  setOpen?: (open: boolean) => void;
}
const UserLinks = ({ setOpen }: Props) => {
  const { status } = useSession();
  return (
    <>
      {status === 'authenticated' ? (
        <>
          <Link href={'/orders'} onClick={() => setOpen && setOpen(false)}>
            Orders
          </Link>
          <button
            onClick={() => {
              signOut();
              setOpen && setOpen(false);
            }}
          >
            LOGOUT
          </button>
        </>
      ) : (
        <Link onClick={() => setOpen && setOpen(false)} href={'/login'}>
          Login
        </Link>
      )}
    </>
  );
};
export default UserLinks;
