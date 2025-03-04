"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full bg-[#A5BFCC] flex items-center justify-center">
      <div className="w-full max-w-md bg-[#D1E2EB] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#134b70] mb-4">
          Welcome to The Local Skills Hub!
        </h1>
        <h2 className="text-xl text-center text-[#508c9b] mb-6">
          Sign up, please, new user!
        </h2>
        <SignUp />
      </div>
    </div>
  );
}
