import type { Metadata } from "next";
import localFont from "next/font/local";

import Header from "./components/Header";
import "./globals.css";

//localfontの指定
const ZenKakuGothicNew = localFont({
  src: "./fonts/ZenKakuGothicNew-Regular.ttf",
  variable: "--font-Zen-Go",
  weight: "100 200 300 400 500 600",
});

export const metadata: Metadata = {
  title: "ThanksLink",
  description: ".日常の「ありがとう」を記録するアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body
        className={`${ZenKakuGothicNew.className} antialiased bg-outbackground sm:file:bg-beige text-base-black flex justify-center`}
      >
        <Header />
        <div className="w-screen pt-16 min-h-svh sm:w-[420px] sm:min-h-screen bg-mainbackground">
          {children}
        </div>
      </body>
    </html>
  );
}
