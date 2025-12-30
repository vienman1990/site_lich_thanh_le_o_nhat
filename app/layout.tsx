import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thánh Lễ Việt Nam tại Nhật Bản - Về Với Chúa",
  description: "Tổng hợp Thánh Lễ Việt Nam tại Nhật bản, Thánh Lễ Tokyo , Thánh Lễ Kyoto, Thánh Lễ Fukuoka, Thánh Lễ Gunma ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
