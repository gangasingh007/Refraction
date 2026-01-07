import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/TanstackProvider";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Refraction",
  description: "Refraction is a platform for getting the UI components for any websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <ClerkProvider>
        <html lang="en">
          <body
            id="dark"
            className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
          >
            {children}
          </body>
        </html>
      </ClerkProvider>
    </Providers>
  )
}
