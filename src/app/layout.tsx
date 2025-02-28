import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import Footer from '@/components/Footer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'smllns-games',
  description:
    'Play fun and addictive browser games like 2048, Snake, and more! Enjoy classic puzzle and arcade challenges with customizable settings and smooth animations on smllns-games.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
