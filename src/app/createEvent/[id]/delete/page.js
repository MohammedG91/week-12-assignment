export const metadata = {
  title: "Delete Event - Local Skills Hub",
  description:
    "Remove an event from Local Skills Hub. Confirm deletion of your event and ensure that your community is updated accordingly.",
};

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DeleteEvent({ params }) {
  const { id } = params;

  async function handleDelete() {
    "use server";

    console.log("Deleting event with ID:", id);

    await db.query(`DELETE FROM events WHERE id = $1`, [id]);

    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <div className="flex justify-center flex-col items-center w-full min-h-screen bg-[#D1E2EB] p-6">
      <h1 className="text-3xl font-bold text-[#134b70] mb-4">Delete Event</h1>

      <section className="flex flex-col justify-center items-center border-2 border-[#7E99A3] w-[95%] sm:w-[60%] mx-auto p-6 rounded-lg bg-[#D1E2EB] shadow-lg">
        <h2 className="text-lg text-center mb-4">
          Are you sure you want to delete this event?
        </h2>
        <p className="text-center mb-6 text-[#134b70]">
          This action is irreversible.
        </p>

        <form
          action={handleDelete}
          className="flex flex-col items-center gap-4 w-full"
        >
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 hover:scale-105 transition duration-300"
          >
            Delete
          </button>
        </form>

        <p className="text-center mt-6">
          Changed your mind? Go back to your profile.
        </p>
        <Link
          href="/profile"
          className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300 inline-block mt-3"
        >
          Back to Profile
        </Link>
      </section>
    </div>
  );
}
