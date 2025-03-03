import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Local Skills Hub",
  description: "Connect, learn, and share skills within your local community.",
};

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#A5BFCC]">
      <main className="flex flex-col items-center justify-center flex-grow p-8 w-full bg-[#D1E2EB] text-[#134b70]">
        <Image
          src="/logo/logo.png"
          alt="Local Skills Hub"
          width={120}
          height={50}
          className="rounded-lg"
        />

        <h1 className="text-5xl font-bold mb-6">Welcome to Local Skills Hub</h1>
        <p className="text-lg max-w-2xl text-center mb-8">
          Connect, learn, and share skills within your local community. Explore
          events, workshops, and skill listings to grow together!
        </p>
        <div className="mb-6 w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for skills or events..."
            className="w-full p-3 border-2 border-[#7E99A3] rounded-lg text-[#134b70] focus:outline-none focus:border-[#508c9b] bg-[#A5BFCC]"
          />
        </div>
        {/* Events Section */}
        <div className="w-full max-w-2xl mt-8">
          <h2 className="text-3xl font-semibold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/events/photography-workshop"
              className="bg-[#134b70] text-white p-6 rounded-lg hover:bg-[#508c9b] transition duration-300"
            >
              Photography Workshop
            </Link>

            <Link
              href="/events/coding-bootcamp"
              className="bg-[#134b70] text-white p-6 rounded-lg hover:bg-[#508c9b] transition duration-300"
            >
              Coding Bootcamp
            </Link>
            {/* More events here */}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/events"
              className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] transition duration-300"
            >
              View All Events
            </Link>
          </div>
        </div>
        {/* Community Section */}
        <div className="w-full max-w-2xl mt-12">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-lg text-center mb-6">
            Meet like-minded people, share your skills, and grow together in our
            vibrant community.
          </p>
          <p className="text-lg text-center mb-6">
            {" "}
            Comments section for community
          </p>
          <div className="text-center">
            <Link
              href="/community"
              className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] transition duration-300"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
