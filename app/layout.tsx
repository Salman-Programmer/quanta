import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "QuanTa",
  description:
    "Premium multi-format unit and currency converter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
     <Navbar/>   
        <main className="flex min-h-screen flex-col pt-14 lg:pt-0">
          <div className="mx-auto w-full max-w-6xl grow px-4 py-8 md:px-8 md:py-10 lg:py-12">
            {children}
          </div>
        <Footer/>
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
