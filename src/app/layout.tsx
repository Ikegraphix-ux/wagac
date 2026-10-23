import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { FirebaseAnalytics } from '@/components/firebase-analytics';
import { ScrollReveal } from '@/components/scroll-reveal';

export const metadata: Metadata = {
  title: 'WAG Angels Academy | Leaving No Child Behind',
  description:
    'Quality education from early childhood through Basic 9 at WAG Angels Academy in Ghana.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <FirebaseAnalytics />
        <ScrollReveal />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
