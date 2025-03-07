export const metadata = {
  title: "Create Community Post - Local Skills Hub",
  description:
    "Create and share your community events or posts on the Local Skills Hub. Connect with others, share your skills, and promote local engagement.",
};

import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createCommunityPost({ params }) {
  const user = await params;

  // Fetching categories for the event from the event_categories table
  const categories = (await db.query("SELECT * FROM event_categories")).rows;

  async function handleSubmit(formData) {
    "use server";

    const userid = user.id;

    const title = formData.get("title");
    const content = formData.get("content");
    const posttype = formData.get("posttype");
    const createdat = new Date().toISOString();
    const category_id = formData.get("selectedCategoryId");

    await db.query(
      `INSERT INTO community_posts (userid, title, content, posttype, category_id, createdat) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userid, title, content, posttype, category_id, createdat]
    );

    revalidatePath("/community");
    redirect("/community");
  }

  return (
    <div className="flex justify-center flex-col items-center w-full min-h-screen bg-[#D1E2EB] p-6">
      <h1 className="text-3xl font-bold text-[#134b70] mb-4">
        Create a Community Post
      </h1>

      <form
        action={handleSubmit}
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
          required
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <button
          type="submit"
          className="bg-[#134b70] text-white px-6 py-3 rounded-lg border-2 border-[#134b70] text-center mt-6 hover:bg-[#508c9b] hover:scale-105 transition duration-300"
        >
          Save Post
        </button>
      </form>
    </div>
  );
}
