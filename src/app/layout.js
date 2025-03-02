import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[minmax(1rem, auto)_1fr_minmax(1rem, auto)] items-center justify-items-center w-full m-0 pt-0 pb-0 px-20 font-[family-name:var(--font-geist-sans)]`}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
