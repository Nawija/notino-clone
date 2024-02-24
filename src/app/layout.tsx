import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/src/components/header/Header";
import HeroTopBanner from "@/src/components/header/HeroTopBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notiono Klon",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <HeroTopBanner />
        <Header />
        {children}
        <div className="h-[140vh]" />
      </body>
    </html>
  );
}
