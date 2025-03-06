export const metadata = {
  title: "Create Profile - Local Skills Hub",
  description:
    "Create your profile on Local Skills Hub. Share your skills, set up your preferences, and connect with your local community to start sharing and learning skills.",
};

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import styles from "../../../style.module.css";
import { db } from "@/utils/dbConnection";

export default async function CreateProfile({ params }) {
  const slug = await params;

  // Saving user profile details
  async function handleSubmit(formData) {
    "use server";

    const username = formData.get("username");
    const bio = formData.get("bio");
    const profilepic = formData.get("profilepic");
    const datejoined = new Date().toISOString();
    const usertype = formData.get("usertype");

    await db.query(
      `INSERT INTO users (clerkid,username,profilepic,bio,datejoined,usertype) VALUES ($1, $2, $3, $4, $5, $6)`,
      [slug.id, username, profilepic, bio, datejoined, usertype]
    );

    // Redirecting to the profile page after saving
    revalidatePath("/profile");
    redirect("/profile");
  }

  return (
    <div className="flex justify-center flex-col items-center w-full min-h-screen bg-[#D1E2EB] p-6">
      <h1 className="text-3xl font-bold text-[#134b70] mb-4">
        Create Your User Profile
      </h1>

      <form
        action={handleSubmit}
        className="flex flex-col justify-center items-center border-2 border-[#7E99A3] w-[70vh] p-6 rounded-lg bg-[#D1E2EB] shadow-lg"
      >
        <label htmlFor="username" className="text-[#134b70] font-semibold">
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 p-4 w-full focus:outline-none focus:border-[#508c9b]"
          required
        />

        <label htmlFor="bio" className="text-[#134b70] font-semibold mt-3">
          About:
        </label>
        <textarea
          name="bio"
          id="bio"
          required
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-28 p-4 w-full focus:outline-none focus:border-[#508c9b]"
        />

        <label
          htmlFor="profilepic"
          className="text-[#134b70] font-semibold mt-3"
        >
          Profile Image URL:
        </label>
        <textarea
          name="profilepic"
          id="profilepic"
          required
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-28 p-4 w-full focus:outline-none focus:border-[#508c9b]"
        />

        <label htmlFor="usertype" className="text-[#134b70] font-semibold mt-3">
          User Type:
        </label>
        <select
          name="usertype"
          id="usertype"
          className="text-[#134b70] border border-[#7E99A3] bg-[#A5BFCC] rounded-2xl h-10 w-full text-center focus:outline-none focus:border-[#508c9b]"
        >
          <option value="Instructor">Instructor</option>
          <option value="Learner">Learner</option>
        </select>

        <button
          type="submit"
          className="bg-[#134b70] text-white px-6 py-3 rounded-lg border-2 border-[#134b70] text-center mt-6 hover:bg-[#508c9b] hover:scale-105 transition duration-300"
        >
          save profile
        </button>
      </form>
    </div>
  );
}
