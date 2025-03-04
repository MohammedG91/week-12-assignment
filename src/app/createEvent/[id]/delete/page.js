import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function DeleteEvent({ params }) {
  const slug = params;
  async function handleDelete() {
    "use server";

    await db.query(`DELETE FROM events WHERE id = $1`, [slug.id]);

    revalidatePath("/profile");
    redirect("/profile");
  }
  return (
    <>
      <div className="min-h-[30vh] p-8 bg-[#A5BFCC] text-[#134b70] w-full text-center">
        <h1>Would you like to remove this event?</h1>
        <h2>To proceed, please click the button below.</h2>
        <form action={handleDelete}>
          <button
            type="submit"
            className="px-6 py-3 bg-[#733328] text-white rounded-lg hover:bg-[#9b5d50] transition duration-300 "
          >
            Delete
          </button>
        </form>
      </div>
    </>
  );
}
