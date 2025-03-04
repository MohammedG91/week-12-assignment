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
      `INSERT INTO users (clerkid,username,profilepic,bio,datejoined,usertype) VALUES ($1, $2, $3, $4,$5,$6)`,
      [slug.id, username, profilepic, bio, datejoined, usertype]
    );

    // Redirecting to the profile page after saving
    revalidatePath("/profile");

    redirect("/profile");
  }

  return (
    <div
      className={`${styles.section} flex justify-center flex-col items-center w-full m-6 bg-slate-300 p-6 rounded-3xl`}
    >
      <h1 className={`${styles.h1} text-slate-200`}>
        Create Your User Profile
      </h1>

      <form
        action={handleSubmit}
        className="flex flex-col justify-center items-center border-2 border-solid border-gray-700 w-[70vh] p-3 rounded-lg"
      >
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          className="text-green-500 rounded-2xl h-10 p-4"
          required
        />

        <label htmlFor="bio">About: </label>
        <textarea
          type="text"
          name="bio"
          id="bio"
          required
          className="text-green-500 rounded-2xl h-28 p-4"
        />

        <label htmlFor="profilepic">Profile Image URL: </label>
        <textarea
          type="text"
          name="profilepic"
          id="profilepic"
          required
          className="text-green-500 rounded-2xl h-28 p-4"
        />

        <label htmlFor="usertype">User Type: </label>
        <select
          name="usertype"
          id="usertype"
          className="text-green-500 rounded-2xl h-10 w-[20vh] text-center"
        >
          <option value="Instructor">Instructor</option>
          <option value="Learner">Learner</option>
        </select>

        <button
          type="submit"
          className="bg-emerald-500 border-2 p-1 m-4 hover:bg-emerald-400 rounded-lg"
        >
          save profile
        </button>
      </form>
    </div>
  );
}
