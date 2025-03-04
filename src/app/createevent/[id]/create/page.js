import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";

export default async function createEvent({ params }) {
  const user = await params;

  // Ensuring categories is an array
  const categories = (await db.query(`SELECT * FROM event_categories`)).rows;

  async function handleSubmit(formData) {
    "use server";

    const userid = user.id;
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
    const createdate = new Date().toISOString();

    await db.query(
      `INSERT INTO events(userid, eventname, description, category_id, eventdate, eventtime, location, price, maxattendees, imageurl, ispublic, createdate) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        userid,
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
        createdate,
      ]
    );

    // Redirecting to the profile page after saving
    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <>
      <section
        className={`flex justify-center flex-col items-center w-full m-6 bg-slate-300 p-6 rounded-3xl`}
      >
        <h2 className={` text-black`}>Create Event</h2>
        <form
          action={handleSubmit}
          className="flex flex-col justify-center items-center border-2 border-solid border-gray-700 w-[70vh] p-3 rounded-lg"
        >
          <label htmlFor="eventname">Event Name: </label>
          <input
            type="text"
            name="eventname"
            id="eventname"
            className="text-green-500 rounded-2xl h-10 p-4"
            required
          />

          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            className="text-green-500 rounded-2xl h-28 p-4"
          />

          <label htmlFor="category">Select Category</label>
          <select
            id="category"
            name="selectedCategoryId"
            className="text-green-500 rounded-2xl h-15 p-4"
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
            className="text-green-500 rounded-2xl h-10 p-4"
            required
          />

          <label htmlFor="eventtime">Event Time: </label>
          <input
            type="time"
            name="eventtime"
            id="eventtime"
            className="text-green-500 rounded-2xl h-10 p-4"
            required
          />

          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            id="location"
            className="text-green-500 rounded-2xl h-10 p-4"
            required
          />

          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            className="text-green-500 rounded-2xl h-10 p-4"
            required
          />

          <label htmlFor="maxattendees">Max Attendees: </label>
          <input
            type="number"
            name="maxattendees"
            id="maxattendees"
            className="text-green-500 rounded-2xl h-10 p-4"
            required
          />

          <label htmlFor="imageurl">Image URL: </label>
          <textarea
            type="url"
            name="imageurl"
            id="imageurl"
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
                defaultChecked
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                name="ispublic"
                value="false"
                className="text-green-500 rounded-2xl"
              />
              Private
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  );
}
