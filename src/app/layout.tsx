import type { Metadata } from 'next';
import QueryProvider from '@/components/QueryProvider';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
