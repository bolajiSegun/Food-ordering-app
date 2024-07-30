'use client';

import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <section className="flex flex-col min-h-[calc(100vh-9em)] md:min-h-[calc(100vh-13em)] md:px-4 md:justify-center lg:items-center">
      <div className="md:flex md:shadow-2xl min-h-[450px] lg:my-10 flex-none lg:w-4/5">
        {/* IMAGE CONTAINER */}
        <div className="relative h-[200px] sm:h-[250px] w-full md:h-auto">
          <Image
            src={'/loginBg.png'}
            alt="login bg"
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
        {/* TEXT CONTAINER */}
        <div className="w-full flex-none md:w-3/5 lg:w-1/2 flex flex-col py-10 px-4 gap-6 md:px-16">
          <h2 className="text-3xl font-bold">Welcome</h2>

          <p> Log into your account or creat a new on using social buttons. </p>

          <button
            className="flex items-center font-medium border px-2 py-4 rounded-lg text-lg gap-4 hover:bg-gray-50"
            onClick={() => signIn('google')}
          >
            <Image src={'/google.png'} alt="" width={24} height={24} />
            <span>Sign in with Google </span>
          </button>
          <button className="flex items-center font-medium border px-2 py-4 rounded-lg text-lg gap-4 hover:bg-gray-50">
            <Image src={'/facebook.png'} alt="" width={24} height={24} />
            <span>Sign in with Facebook </span>
          </button>
          <p>
            Have a problem?{' '}
            <Link href={'/'} className="underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default LoginPage;
