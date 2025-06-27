import './globals.css';
import { NextAuthProvider } from '@/providers/NextAuthProvider';
import AppThemeProvider from '@/providers/appThemeProvider';
import { getServerSession } from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options';
import LayoutWrapper from '@/components/templates/wrapper/LayoutWrapper';

export const metadata = {
  title: 'Hostel Management',
  description: 'Hostel Management Home Page',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);
  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body style={{ height: '100vh', width: '100vw', margin: 0 }} suppressHydrationWarning={true}>
        <AppThemeProvider>
          <NextAuthProvider session={session}>
            <LayoutWrapper>{children}</LayoutWrapper>
          </NextAuthProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
