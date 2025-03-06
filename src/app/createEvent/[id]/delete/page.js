import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DeleteEvent({ params }) {
  const slug = params;

  async function handleDelete() {
    "use server";

    await db.query(`DELETE FROM events WHERE id = $1`, [slug.id]);

    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#D1E2EB] p-10">
      {/* Deletion Confirmation Section */}
      <section className="flex flex-col w-full max-w-4xl mx-auto bg-[#4C585B] text-[#D1E2EB] shadow-lg rounded-lg p-10 gap-6 text-center">
        <h1 className="text-3xl font-semibold">Delete Event</h1>
        <h2 className="text-lg">Are you sure you want to delete this event?</h2>
        <h3 className="text-md">This action is irreversible.</h3>

        <form
          action={handleDelete}
          className="flex flex-col items-center gap-4"
        >
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 hover:scale-105 transition duration-300"
          >
            Delete
          </button>
        </form>

        <h2 className="text-lg">Changed your mind? Go back to your profile.</h2>
        <Link
          href="/profile"
          className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300 inline-block"
        >
          Back to Profile
        </Link>
      </section>
    </div>
  );
}
