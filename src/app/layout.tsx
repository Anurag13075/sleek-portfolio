import UmamiAnalytics from '@/components/analytics/UmamiAnalytics';
import CustomCursor from '@/components/animations/CustomCursor';
import ChatBubble from '@/components/common/ChatBubble';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import OnekoCat from '@/components/common/OnekoCat';
import { Quote } from '@/components/common/Quote';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Analytics } from '@vercel/analytics/next';
import ReactLenis from 'lenis/react';
import { ViewTransitions } from 'next-view-transitions';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} bg-background text-foreground font-sans antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactLenis root>
              <CustomCursor />
              <Navbar />
              {children}
              <OnekoCat />
              <Quote />
              <Footer />
              <ChatBubble />
              <UmamiAnalytics />
              <Analytics />
            </ReactLenis>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
