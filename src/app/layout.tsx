import Notification from '@/components/Notification';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import QueryProvider from '@/components/QueryProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Food Delivery App',
  description: 'Food Delivery App created by Deyo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
            <Notification />
            <Navbar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer />
            <ToastContainer
              position="bottom-right"
              theme="dark"
              autoClose={3500}
            />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
