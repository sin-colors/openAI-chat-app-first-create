import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import ErrorHandler from "@/components/ErrorHandler";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat App",
  description: "An application that interacts with AI to generate five things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} antialiased`}>
        <ErrorHandler />
        <ToastContainer position="top-center" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
