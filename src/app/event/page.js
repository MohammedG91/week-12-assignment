import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Events & Workshops",
  description: "Discover amazing events and workshops.",
};

export default async function EventsPage() {
  const events = await db.query(
    "SELECT * FROM events WHERE ispublic = true ORDER BY eventdate LIMIT 5"
  );

  if (events.error) {
    console.error("Error querying the database:", events.error);
    return notFound();
  }

  const allEvents = await db.query("SELECT * FROM events ORDER BY eventdate");

  if (allEvents.error) {
    console.error("Error querying the database:", allEvents.error);
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#A5BFCC]">
      <main className="flex flex-col items-center justify-center flex-grow p-8 w-full bg-[#D1E2EB] text-[#134b70]">
        {/* Single event carousel */}
        <div className="w-full max-w-3xl mb-8">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Featured Events
          </h2>
          <div className="carousel flex overflow-x-scroll space-x-4">
            {events.rows.map((event) => (
              <div
                key={event.id}
                className="carousel-item bg-[#3b4b57] p-6 rounded-lg flex-none w-[320px] hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={event.imageurl || "/default-event.jpg"}
                  alt={event.eventname}
                  width={300}
                  height={200}
                  className="rounded-md"
                />
                <h3 className="text-xl text-center mt-4 text-white">
                  {event.eventname}
                </h3>
                <Link
                  href={`/event/${event.id}`}
                  className="mt-4 p-2 bg-[#124e66] text-white rounded-lg text-center block hover:bg-[#508c9b] transition duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Events list by date */}
        <div className="w-full max-w-2xl">
          <h2 className="text-3xl font-semibold text-center mb-4">
            All Events
          </h2>
          <ul>
            {allEvents.rows.map((event) => (
              <li
                key={event.id}
                className="bg-[#3b4b57] p-6 rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
              >
                <Link
                  href={`/event/${event.id}`}
                  className="text-white hover:text-[#124e66] text-xl"
                >
                  {event.eventname}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
