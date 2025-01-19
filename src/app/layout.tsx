import type { Metadata } from "next";
import localFont from "next/font/local";

import Header from "./components/Header";
import Group from "./components/groups/group";
import "./globals.css";

import { UserProvider } from "./contexts/UserContext";

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
        <UserProvider>
          <Header />
          <div className="w-screen pt-16 min-h-svh sm:w-[375px] sm:min-h-screen bg-mainbackground">
            <Group />
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
