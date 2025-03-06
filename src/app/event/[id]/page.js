export const metadata = {
  title: "Event Details - Local Skills Hub",
  description:
    "Discover the details of this event, including description, schedule, and location. Join the conversation through comments and RSVP to attend the event within your community.",
};

import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function EventPage({ params }) {
  const { id } = await params;
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

  // comment part
  // getting userid
  const { userId } = await auth();
  const user = await db.query(`SELECT * FROM users WHERE clerkid = $1`, [
    userId,
  ]);
  const personalid = user.rows.length > 0 ? user.rows[0].id : null;

  async function handleSubmit(formValues) {
    "use server";

    const eventid = id;
    const comment = formValues.get("comment");
    const userid = personalid;

    await db.query(
      `INSERT INTO comments (eventid, comment, userid) VALUES ($1, $2, $3)`,
      [eventid, comment, userid]
    );

    revalidatePath(`/event/${id}`);
    redirect(`/event/${id}`);
  }

  async function handleDelete(commentId) {
    "use server";

    await db.query(`DELETE FROM comments WHERE id = $1 AND userid = $2`, [
      commentId,
      personalid,
    ]);

    revalidatePath(`/event/${id}`);
    redirect(`/event/${id}`);
  }

  // Fetch comments with username
  const comments = await db.query(
    `SELECT comments.*, users.username FROM comments
     JOIN users ON comments.userid = users.id
     WHERE comments.eventid = $1`,
    [id]
  );

  const wrangledComments = comments.rows;

  return (
    <div
      className="min-h-screen p-8 bg-[#D1E2EB] text-[#134b70] 
     sm:p-1 md:p-2 lg:p-12 xl:p-16 
      flex flex-col items-center justify-center w-full m-0 sm:max-w-none md:max-w-none lg:max-w-none xl:max-w-none"
    >
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
            ? new Date(event.eventdate).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Time:</strong>{" "}
          {event.eventtime
            ? new Date(`1970-01-01T${event.eventtime}`).toLocaleTimeString()
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
      <form action={handleSubmit}>
        <fieldset className="flex flex-col items-center border-spacing-1 border-2 border-gray-300 rounded-md w-full p-6">
          <legend className="text-xl font-bold mb-4;">Comment:</legend>

          <label
            htmlFor="comment"
            className="text-[#134b70] font-semibold mt-3"
          >
            Comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            required
            className="text-[#134b70] border border-[#7E99A3] bg-[#d0d5d7] rounded-2xl h-28 p-4 w-full focus:outline-none focus:border-[#508c9b] m-2"
            aria-labelledby="comment-label"
          ></textarea>

          <button
            type="submit"
            className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300"
          >
            Submit Comment
          </button>
        </fieldset>
      </form>

      <div className="mt-8 p-6 bg-[#aabac3] rounded-lg shadow-lg w-full">
        {wrangledComments.length > 0 ? (
          wrangledComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-[#A5BFCC] p-4 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow duration-200"
            >
              <h2 className="font-semibold text-[#124e66]">
                {comment.username}
              </h2>
              <p className="text-[#134b70] text-base">{comment.comment}</p>
              {comment.userid === personalid && (
                <form
                  action={async (formData) => {
                    "use server";
                    await handleDelete(comment.id);
                  }}
                >
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </form>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
