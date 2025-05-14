import './globals.css';
import type { Metadata } from 'next';
import { Inter, Vazirmatn } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { LanguageProvider } from '@/lib/i18n/context';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { WelcomePopup } from '@/components/ui/welcome-popup';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn'
});

export const metadata: Metadata = {
  title: 'Dr. Mohammad Ahmadi - IWRM',
  description: 'Personal website of Dr. Mohammad Ahmadi, Executive Director at Iran Water Resources Management Company',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${vazirmatn.variable} min-h-screen font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">
                {children}
              </main>
              <SiteFooter />
              <WelcomePopup />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}