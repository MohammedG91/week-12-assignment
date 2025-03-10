import Link from "next/link";
import Image from "next/image";
import { db } from "@/utils/dbConnection";

export const metadata = {
  title: "Local Skills Hub - Homepage",
  description:
    "Welcome to Local Skills Hub! Connect with your community, explore events, share your skills, and engage in workshops to grow together.",
};

export default async function Homepage() {
  const events = await db.query(
    "SELECT * FROM events WHERE ispublic = true ORDER BY eventdate LIMIT 4"
  );

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#A5BFCC]">
      <main className="flex flex-col items-center justify-center flex-grow p-8 w-full bg-[#D1E2EB] text-[#134b70]">
        <Image
          src="/logo/logo.png"
          alt="Local Skills Hub"
          width={320}
          height={150}
          className="rounded-lg"
        />

        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
          Welcome to Local Skills Hub
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl text-center mb-8">
          Connect, learn, and share skills within your local community. Explore
          events, workshops, and skill listings to grow together!
        </p>
        <div className="mb-6 w-full max-w-lg">
          <input
            type="text"
            placeholder="     Search for skills or events..."
            className="w-full p-3 border-2 border-[#7E99A3] rounded-lg text-[#134b70] focus:outline-none focus:border-[#508c9b] "
          />
        </div>

        {/* Events Section */}
        <div className="w-full max-w-5xl mt-8">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-6">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.rows?.map((event) => (
              <div
                key={event.id}
                className="bg-[#3b4b57] p-4 shadow-lg rounded-xl overflow-hidden flex flex-col h-full hover:scale-105 transition-transform duration-100"
              >
                <div className="relative w-full h-[150px] mb-4">
                  <Image
                    src={event.imageurl || "/default-event.jpg"}
                    alt={event.eventname}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {event.eventname}
                  </h3>
                  <Link
                    href={`/event/${event.id}`}
                    className="mt-auto px-4 py-2 bg-[#124e66] text-white rounded-lg text-center hover:bg-[#508c9b] hover:scale-105 transition duration-300 inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex justify-center">
            <Link
              href="/event"
              className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300"
            >
              View All Events
            </Link>
          </div>
        </div>

        {/* Community Section */}
        <div className="w-full max-w-2xl mt-12">
          <h2 className="text-3xl sm:text-4xl text-center font-semibold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg sm:text-xl text-center mb-6">
            Meet like-minded people, share your skills, and grow together in our
            vibrant community.
          </p>
          <p className="text-lg sm:text-xl text-center mb-6">
            Comments section for community
          </p>
          <div className="flex justify-center">
            <Link
              href="/community"
              className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300 inline-block"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
