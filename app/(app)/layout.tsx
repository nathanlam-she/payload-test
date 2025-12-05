import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import config from '@/payload.config'
import { getPayload } from 'payload'
import { getSettings } from "@/app/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investment Platform",
  description: "A demo of Next.js + Payload CMS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getPayload({ config })
  const enSettings = await getSettings(payload, 'en')
  const zhSettings = await getSettings(payload, 'zh')
  const dicts = {
    en: enSettings.nav,
    zh: zhSettings.nav
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        <Header dicts={dicts} />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
