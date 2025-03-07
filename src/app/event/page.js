export const metadata = {
  title: "All Events - Local Skills Hub",
  description:
    "Explore a variety of events and workshops within your local community. Browse through upcoming events and learn new skills from other members.",
};

import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { FaSearch } from "react-icons/fa";

export default async function EventsPage() {
  const { userId } = await auth();

  // Get user information
  const user = await db.query(`SELECT * FROM users WHERE clerkid = $1`, [
    userId,
  ]);
  const personalid = user.rows.length > 0 ? user.rows[0].id : null;

  // Fetch events sorted by event date
  const allEvents = await db.query(
    "SELECT * FROM events ORDER BY eventdate ASC"
  );

  if (allEvents.error) {
    console.error("Error querying the database:", allEvents.error);
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#D1E2EB] p-8">
      {/* Search Input */}
      <div className="relative w-full">
        <input
          type="text"
          placeholder="     Search for skills or events..."
          className="w-full sm:w-[300px] p-3 border-2 border-[#7E99A3] rounded-lg text-[#134b70] sm:mt-2 focus:outline-none focus:border-[#508c9b] mb-6 sm:top-6 sm:right-4 sm:mb-0"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7E99A3]" />
      </div>

      <div className="relative w-full">
        {/* Page Title */}
        <h1 className="text-4xl font-semibold text-center text-[#134b70] sm:mt-0 mt-8 mb-8">
          Upcoming Events & Workshops
        </h1>
      </div>

      {/* Events List */}
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {allEvents.rows.map((event) => (
          <div
            key={event.id}
            className="flex flex-col sm:flex-row bg-[#3b4b57] text-white rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 items-stretch"
          >
            {/* Event Image */}
            <div className="w-full sm:w-1/3 flex justify-center">
              <Image
                src={event.imageurl || "/default-event.jpg"}
                alt={event.eventname}
                width={200}
                height={150}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="w-full sm:w-2/3 p-6 flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{event.eventname}</h2>
              <p className="text-[#A5BFCC] mt-2">
                {new Date(event.eventdate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <Link
                href={`/event/${event.id}`}
                className="mt-4 px-4 py-2 bg-[#124e66] text-white rounded-lg text-center block hover:bg-[#508c9b] transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Button */}
      {userId && (
        <div className="mt-10 text-center">
          <Link
            href={`/createEvent/${personalid}/create`}
            className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300"
          >
            Create Event
          </Link>
        </div>
      )}
    </div>
  );
}
