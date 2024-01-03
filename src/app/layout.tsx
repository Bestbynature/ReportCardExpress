import './globals.css';
import type { Metadata } from 'next';
import {inter} from '../lib/fonts'
import Navbar from './Navbar/navbar';
import Footer from './Footer';
import SessionProvider from './SessionProvider';
import Welcome from '@/components/Welcome';
import CurrentPage from '@/components/CurrentPage';
import {Suspense} from 'react';
import LoadingPage from './loading';

export const metadata: Metadata = {
  title: 'Report Card Express',
  description: 'Online Result Portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        <div className='border-8 rounded-3xl h-screen overflow-auto'>
          <SessionProvider>
            <header className="min-w-[375px]">
              <Navbar />
              <Welcome />
              <CurrentPage />
            </header>
            {/* <Suspense fallback={<LoadingPage />}> */}
            <main className="p-4 m-auto max-w-[95%] sm:max-w-[80%] min-w-[300px]">{children}</main>
            {/* </Suspense> */}
            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
