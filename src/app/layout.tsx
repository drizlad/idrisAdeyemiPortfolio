import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Idris Adeyemi - Portfolio",
  description: "Product Designer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="font-sans bg-white min-h-screen flex flex-col m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
