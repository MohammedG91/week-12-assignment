import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full bg-[#4C585B] p-6 shadow-lg">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold text-[#F4EDD3]">
          {/* Maybe swap for logo*/}
          <Link href="/">Local Skills Hub</Link>
        </h1>
        <nav className="flex space-x-6">
          <h1 className="text-lg text-[#F4EDD3] hover:text-[#508c9b] transition duration-300">
            <Link href="/profile">Profile</Link>
          </h1>
          <h1 className="text-lg text-[#F4EDD3] hover:text-[#508c9b] transition duration-300">
            <Link href="/events">Events</Link>
          </h1>
        </nav>
      </div>

      {/* Sign in/ Sign out */}
      <aside className="flex items-center space-x-4">
        <SignedOut>
          <div className="flex space-x-4">
            <SignInButton className="bg-[#134b70] text-white px-6 py-3 rounded-lg hover:bg-[#508c9b] transition duration-300 cursor-pointer">
              Sign In
            </SignInButton>
            <SignUpButton className="bg-[#134b70] text-white px-6 py-3 rounded-lg hover:bg-[#508c9b] transition duration-300 cursor-pointer">
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
