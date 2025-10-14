import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { HeaderWrapper } from "@/components/header-wrapper";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Explore Gallery",
  description: "A gallery to explore various artworks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderWrapper />

            <Providers>
              <main className="min-h-screen bg-background font-sans antialiased max-w-screen-2xl mx-auto px-4 mt-14">
                {children}
              </main>
            </Providers>
            <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
