import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Local Skills Hub",
  description:
    "Connect with your local community to learn and share skills through events and workshops. Create and join events, engage with others, and build your network.",
  openGraph: {
    title: "Local Skills Hub",
    description:
      "Welcome to Local Skills Hub! Join community-driven events, share skills, and connect with others in your area. Learn, share, and grow together!",
    type: "website",
    url: "https://week-12-assignment-weld.vercel.app/",
    images: ["/img/favicon.ico"],
  },
  keywords:
    "local events, skill sharing, workshops, community, learning, profile, skills exchange",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[minmax(1rem, auto)_1fr_minmax(1rem, auto)] items-center justify-items-center w-full m-0 pt-0 pb-0 px-0 font-[family-name:var(--font-geist-sans)]`}
        >
          <Header />
          {children}
          <BackToTopButton />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
