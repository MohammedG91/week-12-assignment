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
    <header className="flex justify-between w-full bg-blue-300 h-10 items-center rounded-md p-1">
      <h1 className="bg-slate-300 rounded-md border-2">
        <Link href="/">homepage</Link>
      </h1>
      <h1 className="bg-slate-300 rounded-md border-2">
        <Link href="/profile">profile</Link>
      </h1>
      <h1>logo</h1>
      <aside>
        <SignedOut>
          <div className="flex gap-2">
            <SignInButton className="bg-slate-300 rounded-md border-2" />
            <SignUpButton className="bg-slate-300 rounded-md border-2" />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </aside>
    </header>
  );
}
