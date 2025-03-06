export const metadata = {
  title: "Update Event - Local Skills Hub",
  description:
    "Edit and update your event details on Local Skills Hub. Modify event information, dates, or any other details to keep your community informed and engaged.",
};

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";

// Server Component: Fetching event data and categories
export default async function UpdateEvent({ params }) {
  const { id } = params;

  // Fetching event data
  const eventResult = await db.query(`SELECT * FROM events WHERE id = $1`, [
    id,
  ]);

  if (!eventResult.rows.length) {
    return notFound(); // Handle case where event is not found
  }

  const event = eventResult.rows[0];

  // Fetching event categories
  const categories = (await db.query(`SELECT * FROM event_categories`)).rows;

  async function handleUpdate(formData) {
    "use server";

    const eventname = formData.get("eventname");
    const description = formData.get("description");
    const category_id = formData.get("selectedCategoryId");
    const eventdate = formData.get("eventdate");
    const eventtime = formData.get("eventtime");
    const location = formData.get("location");
    const price = formData.get("price");
    const maxattendees = formData.get("maxattendees");
    const imageurl = formData.get("imageurl");
    const ispublic = formData.get("ispublic") === "true";

    // Update event in the database
    await db.query(
      `UPDATE events SET eventname = $1, description = $2, category_id = $3, eventdate = $4, eventtime = $5, location = $6, price = $7, maxattendees = $8, imageurl = $9, ispublic = $10 WHERE id = $11`,
      [
        eventname,
        description,
        category_id,
        eventdate,
        eventtime,
        location,
        price,
        maxattendees,
        imageurl,
        ispublic,
        id,
      ]
    );

    // Revalidate and redirect after the update
    revalidatePath(`/event/${id}`);
    redirect(`/event/${id}`);
  }

  return (
    <div className="flex justify-center flex-col items-center w-full min-h-screen bg-[#D1E2EB] p-6">
      <h1 className="text-3xl font-bold text-[#134b70] mb-4">Update Event</h1>

      <form
        action={handleUpdate}
        className="flex flex-col justify-center items-center border-2 border-[#7E99A3] w-[95%] sm:w-[60%] mx-auto p-6 rounded-lg bg-[#D1E2EB] shadow-lg"
      >
        <label htmlFor="eventname" className="text-[#134b70] font-semibold">
          Event Name:
        </label>
        <input
          type="text"
          name="eventname"
          id="eventname"
          defaultValue={event.eventname}
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label
          htmlFor="description"
          className="text-[#134b70] font-semibold mt-3"
        >
          Description:
        </label>
        <textarea
          name="description"
          id="description"
          defaultValue={event.description}
          required
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-28 p-4 w-full focus:outline-none focus:border-[#508c9b]"
        />

        <label htmlFor="category" className="text-[#134b70] font-semibold mt-3">
          Select Category:
        </label>
        <select
          id="category"
          name="selectedCategoryId"
          defaultValue={event.category_id}
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 w-full text-center focus:outline-none focus:border-[#508c9b]"
          required
        >
          <option value="">--Select a Category--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label
          htmlFor="eventdate"
          className="text-[#134b70] font-semibold mt-3"
        >
          Event Date:
        </label>
        <input
          type="date"
          name="eventdate"
          id="eventdate"
          defaultValue={new Date(event.eventdate).toISOString().split("T")[0]}
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label
          htmlFor="eventtime"
          className="text-[#134b70] font-semibold mt-3"
        >
          Event Time:
        </label>
        <input
          type="time"
          name="eventtime"
          id="eventtime"
          defaultValue={event.eventtime}
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label htmlFor="location" className="text-[#134b70] font-semibold mt-3">
          Location:
        </label>
        <input
          type="text"
          name="location"
          id="location"
          defaultValue={event.location}
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label htmlFor="price" className="text-[#134b70] font-semibold mt-3">
          Price:
        </label>
        <input
          type="number"
          name="price"
          id="price"
          defaultValue={event.price}
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label
          htmlFor="maxattendees"
          className="text-[#134b70] font-semibold mt-3"
        >
          Max Attendees:
        </label>
        <input
          type="number"
          name="maxattendees"
          id="maxattendees"
          defaultValue={event.maxattendees}
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label htmlFor="imageurl" className="text-[#134b70] font-semibold mt-3">
          Image URL:
        </label>
        <textarea
          name="imageurl"
          id="imageurl"
          defaultValue={event.imageurl}
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-28 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label htmlFor="ispublic" className="text-[#134b70] font-semibold mt-3">
          Event Visibility:
        </label>
        <div className="flex items-center space-x-4">
          <label className="text-[#134b70]">
            <input
              type="radio"
              name="ispublic"
              value="true"
              defaultChecked={event.ispublic}
            />
            Public
          </label>
          <label className="text-[#134b70]">
            <input
              type="radio"
              name="ispublic"
              value="false"
              defaultChecked={!event.ispublic}
            />
            Private
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#134b70] text-white px-6 py-3 rounded-lg border-2 border-[#134b70] text-center mt-6 hover:bg-[#508c9b] hover:scale-105 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
