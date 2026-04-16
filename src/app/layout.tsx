import { Roboto_Mono, Space_Mono } from 'next/font/google';

import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers/styles';

import 'react-toastify/dist/ReactToastify.css';
import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
  weight: ['400', '700'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Custom Web Development for Individuals | Netspire Dev',
  description: 'Netspire Dev creates custom websites and digital solutions for individuals. Clean design, strong performance, and tailored development built around your idea.',
  openGraph: {
    title: 'Custom Web Development for Individuals | Netspire Dev',
    description: 'Netspire Dev creates custom websites and digital solutions for individuals. Clean design, strong performance, and tailored development built around your idea.',
    images: 'https://netspiredev.com/images/meta.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={cn(spaceMono.variable, robotoMono.variable)}>{children}</body>
    </html>
  );
}
