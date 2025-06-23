import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ErrorBoundary from "@/app/shared/ui/error/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montSerrat = Montserrat({
  variable: "--font-monserrat",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Room Listing App",
  description: "Assignment for Unravel from Gagan Bindoria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montSerrat.variable} ${montSerrat.variable} antialiased bg-neutral-100`}
      >
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
