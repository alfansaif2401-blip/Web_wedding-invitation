import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Undangan Pernikahan — Intan & Irfan',
  description:
    'Dengan penuh syukur dan kebahagiaan, kami mengundang Anda untuk hadir menyaksikan momen sakral pernikahan Syarifah Intan Maughfiroh & Irfan Efendi — 13 Juni 2026.',
  keywords: ['undangan pernikahan', 'wedding invitation', 'Intan', 'Irfan', 'June 2026'],
  openGraph: {
    title: 'Undangan Pernikahan — Intan & Irfan',
    description: 'Sabtu, 13 Juni 2026 · Surabaya, Jawa Timur',
    type: 'website',
    locale: 'id_ID',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Pinyon+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
