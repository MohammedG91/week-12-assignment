export const metadata = {
  title: "Delete Community Post - Local Skills Hub",
  description:
    "Permanently delete your community post on Local Skills Hub. All associated data, interactions, and content will be removed. Please proceed with caution as this action cannot be undone.",
};

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DeletePost({ params }) {
  const slug = params;

  async function handleDelete() {
    "use server";

    await db.query(`DELETE FROM community_posts WHERE id = $1`, [slug.id]);

    revalidatePath("/community");
    redirect("/community");
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#D1E2EB] p-10">
      {/* Delete Section */}
      <section className="flex flex-col w-full max-w-4xl mx-auto bg-[#4C585B] text-[#D1E2EB] shadow-lg rounded-lg p-10 gap-6 text-center">
        <h1 className="text-3xl font-semibold">Delete Your post</h1>
        <h2 className="text-lg">
          Are you sure you want to permanently delete this post?
        </h2>
        <h3 className="text-md">This action is irreversible.</h3>

        <form
          action={handleDelete}
          className="flex flex-col items-center gap-4"
        >
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-700 hover:scale-105 transition duration-300"
          >
            Delete Post
          </button>
        </form>

        <h2 className="text-lg">
          Changed your mind? Go back to your community page.
        </h2>
        <Link
          href="/community"
          className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300 inline-block"
        >
          Back to community
        </Link>
      </section>
    </div>
  );
}
