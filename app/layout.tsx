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
  title: "Business Platform Onboarding",
  description: "Intelligent conversational onboarding for modern businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{
        fontFamily: `${geistSans.variable}, ${geistMono.variable}, ui-sans-serif, system-ui, -apple-system, sans-serif`
      }}>
        {children}
      </body>
    </html>
  );
}
