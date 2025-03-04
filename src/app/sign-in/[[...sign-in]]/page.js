"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full bg-[#A5BFCC] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#D1E2EB] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#134b70] mb-4">
          Welcome to The Local Skills Hub!
        </h1>
        <h2>Sign in to continue</h2>
        <SignIn />
      </div>
    </div>
  );
}
