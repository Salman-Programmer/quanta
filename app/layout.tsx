import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Convert — Unit & Currency Converter",
  description:
    "Premium multi-format unit and currency converter with real-time bidirectional conversions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <main className="min-h-screen pt-14 pb-20 lg:ml-64 lg:pt-0 lg:pb-0">
          <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10 lg:py-12">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
