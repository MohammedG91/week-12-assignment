import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";

// Server Component: Fetching event data and categories
export default async function UpdateEvent({ params }) {
  const { id } = params; // Destructuring directly to access the id

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

  // Handle update on form submission
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
    <section className="flex justify-center flex-col items-center w-full m-6 bg-slate-300 p-6 rounded-3xl">
      <h2 className="text-black">Update Event</h2>
      <form
        action={handleUpdate}
        className="flex flex-col justify-center items-center border-2 border-solid border-gray-700 w-[70vh] p-3 rounded-lg"
      >
        <label htmlFor="eventname">Event Name: </label>
        <input
          type="text"
          name="eventname"
          id="eventname"
          defaultValue={event.eventname}
          className="text-green-500 rounded-2xl h-10 p-4"
          required
        />

        <label htmlFor="description">Description: </label>
        <textarea
          name="description"
          id="description"
          defaultValue={event.description}
          required
          className="text-green-500 rounded-2xl h-28 p-4"
        />

        <label htmlFor="category">Select Category</label>
        <select
          id="category"
          name="selectedCategoryId"
          className="text-green-500 rounded-2xl h-15 p-4"
          defaultValue={event.category_id}
          required
        >
          <option value="">--Select a Category--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="eventdate">Event Date: </label>
        <input
          type="date"
          name="eventdate"
          id="eventdate"
          defaultValue={new Date(event.eventdate).toISOString().split("T")[0]}
          className="text-green-500 rounded-2xl h-10 p-4"
          required
        />

        <label htmlFor="eventtime">Event Time: </label>
        <input
          type="time"
          name="eventtime"
          id="eventtime"
          defaultValue={event.eventtime}
          className="text-green-500 rounded-2xl h-10 p-4"
          required
        />

        <label htmlFor="location">Location: </label>
        <input
          type="text"
          name="location"
          id="location"
          defaultValue={event.location}
          className="text-green-500 rounded-2xl h-10 p-4"
          required
        />

        <label htmlFor="price">Price: </label>
        <input
          type="number"
          name="price"
          id="price"
          defaultValue={event.price}
          className="text-green-500 rounded-2xl h-10 p-4"
          required
        />

        <label htmlFor="maxattendees">Max Attendees: </label>
        <input
          type="number"
          name="maxattendees"
          id="maxattendees"
          defaultValue={event.maxattendees}
          className="text-green-500 rounded-2xl h-10 p-4"
          required
        />

        <label htmlFor="imageurl">Image URL: </label>
        <textarea
          name="imageurl"
          id="imageurl"
          defaultValue={event.imageurl}
          className="text-green-500 rounded-2xl h-28 p-4"
          required
        />

        <label htmlFor="ispublic">Event Visibility: </label>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="ispublic"
              value="true"
              className="text-green-500 rounded-2xl"
              defaultChecked={event.ispublic}
            />
            Public
          </label>
          <label>
            <input
              type="radio"
              name="ispublic"
              value="false"
              className="text-green-500 rounded-2xl"
              defaultChecked={!event.ispublic}
            />
            Private
          </label>
        </div>

        <button
          type="submit"
          className="bg-emerald-500 border-2 p-1 m-4 hover:bg-emerald-400 rounded-lg"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
