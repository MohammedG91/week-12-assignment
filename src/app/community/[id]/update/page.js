export const metadata = {
  title: "Update Community Post - Local Skills Hub",
  description:
    "Edit and update your community post on Local Skills Hub. Make changes to your content, data, and interactions. Ensure your post reflects your latest updates before saving.",
};

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function UpdatePost({ params }) {
  const { id } = params;

  // Fetching post
  const postResult = await db.query(
    `SELECT * FROM community_posts WHERE id = $1`,
    [id]
  );

  if (!postResult.rows.length) {
    return notFound();
  }

  const post = postResult.rows[0];

  // Fetching event categories
  const categories = (await db.query(`SELECT * FROM event_categories`)).rows;

  async function handleUpdate(formData) {
    "use server";

    const title = formData.get("title");
    const content = formData.get("content");
    const posttype = formData.get("posttype");
    const category_id = formData.get("selectedCategoryId");

    await db.query(
      `UPDATE community_posts SET title=$1, content=$2, posttype=$3, category_id=$4 WHERE id=$5`,
      [title, content, posttype, category_id, id]
    );

    revalidatePath(`/community`);
    redirect(`/community`);
  }

  return (
    <div className="flex justify-center flex-col items-center w-full min-h-screen bg-[#D1E2EB] p-6">
      <h1 className="text-3xl font-bold text-[#134b70] mb-4">
        Update Your Community Post
      </h1>

      <form
        action={handleUpdate}
        className="flex flex-col justify-center items-center border-2 border-[#7E99A3] w-[70vh] p-6 rounded-lg bg-[#D1E2EB] shadow-lg"
      >
        <label htmlFor="title" className="text-[#134b70] font-semibold">
          Post Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          defaultValue={post.title}
          required
        />

        <label htmlFor="content" className="text-[#134b70] font-semibold mt-3">
          Content:
        </label>
        <textarea
          name="content"
          id="content"
          required
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-28 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          defaultValue={post.content}
        />

        <label htmlFor="category" className="text-[#134b70] font-semibold mt-3">
          Select Category:
        </label>
        <select
          id="category"
          name="selectedCategoryId"
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 w-full text-center focus:outline-none focus:border-[#508c9b]"
          defaultValue={post.category_id}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="posttype" className="text-[#134b70] font-semibold mt-3">
          Post Type:
        </label>
        <select
          name="posttype"
          id="posttype"
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 w-full text-center focus:outline-none focus:border-[#508c9b]"
          defaultValue={post.posttype}
          required
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <button
          type="submit"
          className="bg-[#134b70] text-white px-6 py-3 rounded-lg border-2 border-[#134b70] text-center mt-6 hover:bg-[#508c9b] hover:scale-105 transition duration-300"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
