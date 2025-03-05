import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-[#4C585B] p-2 shadow-lg">
      <div className="flex items-center space-x-6">
        <Image
          src="/logo/header-logo.png"
          alt="Local Skills Hub"
          width={80}
          height={10}
          className="rounded-lg"
        />
        <h1 className="text-2xl font-bold text-[#D1E2EB] hover:text-[#508c9b] hover:scale-105 transition duration-300">
          <Link href="/">Local Skills Hub</Link>
        </h1>
        <nav className="flex space-x-6">
          <h1 className="text-lg text-[#D1E2EB] hover:text-[#508c9b] transition duration-300">
            <Link href="/profile">Profile</Link>
          </h1>
          <h1 className="text-lg text-[#D1E2EB] hover:text-[#508c9b] transition duration-300">
            <Link href="/event">Events</Link>
          </h1>
          <h1 className="text-lg text-[#D1E2EB] hover:text-[#508c9b] transition duration-300">
            <Link href="/about">About us</Link>
          </h1>
        </nav>
      </div>

      {/* Sign in/ Sign out */}
      <aside className="flex items-center space-x-4">
        <SignedOut>
          <div className="flex space-x-4">
            <SignInButton className="bg-[#134b70] text-white px-4 py-2 rounded-lg hover:bg-[#508c9b] hover:scale-105 transition duration-300 cursor-pointer">
              Sign In
            </SignInButton>
            <SignUpButton className="bg-[#134b70] text-white px-4 py-2 rounded-lg hover:bg-[#508c9b] hover:scale-105 transition duration-300 cursor-pointer">
              Sign Up
            </SignUpButton>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton className="cursor-pointer" />
        </SignedIn>
      </aside>
    </header>
  );
}
