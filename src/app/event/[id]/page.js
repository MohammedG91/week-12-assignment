import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function EventPage({ params }) {
  const { id } = params;
  const eventResult = await db.query(
    `
    SELECT events.*, event_categories.name AS category_name, users.username 
    FROM events 
    JOIN event_categories ON events.category_id = event_categories.id 
    JOIN users ON events.userid = users.id 
    WHERE events.id = $1
  `,
    [id]
  );

  if (eventResult.error) {
    console.error("Error querying the database:", eventResult.error);
    return notFound();
  }

  if (!eventResult.rows.length)
    return <div className="text-center text-white mt-10">Event Not Found</div>;

  const event = eventResult.rows[0];

  return (
    <div className="min-h-screen p-8 bg-[#A5BFCC] text-[#134b70]">
      <h1 className="text-4xl text-[#124e66] mb-6">{event.eventname}</h1>
      <div className="flex flex-col items-center">
        <Image
          src={event.imageurl || "/img/default-event.jpg"}
          alt={event.eventname}
          width={600}
          height={400}
          className="rounded-md"
        />
        <p className="mt-4">{event.description}</p>
        <p>
          <strong>Date:</strong>{" "}
          {event.eventdate
            ? new Date(event.eventdate).toLocaleDateString() // Formatting DATE type
            : "N/A"}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {event.eventtime
            ? new Date(`1970-01-01T${event.eventtime}`).toLocaleTimeString() // Formatting TIME type
            : "N/A"}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Price:</strong> {event.price ? `$${event.price}` : "Free"}
        </p>
        <p>
          <strong>Category:</strong>{" "}
          {event.category_name || "No category available"}
        </p>
        <p>
          <strong>Host:</strong> {event.username}
        </p>
      </div>

      {/* RSVP button */}
      <div className="mt-6">
        <button className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300">
          RSVP
        </button>
      </div>
    </div>
  );
}
