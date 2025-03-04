import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#4C585B] text-[#D1E2EB] py-6 ">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-6 text-lg">
          <Link
            href="/terms"
            className="hover:text-[#508c9b] transition duration-300"
          >
            Terms
          </Link>
          <span>|</span>
          <Link
            href="/contact"
            className="hover:text-[#508c9b] transition duration-300"
          >
            Contact Us
          </Link>
        </div>
        <p className="text-sm text-[#A5BFCC]">
          Copyright © 2025, Local Skills Hub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
