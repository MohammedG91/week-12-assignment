import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateEvent({ params }) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const categories = (await db.query(`SELECT * FROM event_categories`)).rows;

  async function handleSubmit(formData) {
    "use server";

    const userid = userId;
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

    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <div className="flex justify-center flex-col items-center w-full min-h-screen bg-[#A5BFCC] p-6">
      <h1 className="text-3xl font-bold text-[#134b70] mb-4">Create Event</h1>

      <form
        action={handleSubmit}
        className="flex flex-col justify-center items-center border-2 border-[#7E99A3] w-[70vh] p-6 rounded-lg bg-[#D1E2EB] shadow-lg"
      >
        <label htmlFor="eventname" className="text-[#134b70] font-semibold">
          Event Name:
        </label>
        <input
          type="text"
          name="eventname"
          id="eventname"
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
          required
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-28 p-4 w-full focus:outline-none focus:border-[#508c9b]"
        />

        <label htmlFor="category" className="text-[#134b70] font-semibold mt-3">
          Select Category:
        </label>
        <select
          id="category"
          name="selectedCategoryId"
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
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label htmlFor="imageurl" className="text-[#134b70] font-semibold mt-3">
          Image URL:
        </label>
        <textarea
          name="imageurl"
          id="imageurl"
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-28 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label htmlFor="ispublic" className="text-[#134b70] font-semibold mt-3">
          Event Visibility:
        </label>
        <div className="flex items-center space-x-4">
          <label className="text-[#134b70]">
            <input type="radio" name="ispublic" value="true" defaultChecked />
            Public
          </label>
          <label className="text-[#134b70]">
            <input type="radio" name="ispublic" value="false" />
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
