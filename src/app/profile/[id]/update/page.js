import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "../../../style.module.css";
export default async function updateProfile({ params }) {
  const slug = await params;

  const user = await db.query(`SELECT * FROM users WHERE clerkid = $1`, [
    slug.id,
  ]);
  const wrangledUser = user.rows[0];
  console.log(wrangledUser);

  async function handleUpdate(formData) {
    "use server";

    //access the input value first

    const username = formData.get("username");
    const bio = formData.get("bio");
    const profilepic = formData.get("profilepic");
    const usertype = formData.get("usertype");

    await db.query(
      `UPDATE users SET username = $1, bio = $2, profilepic = $3 ,usertype=$4 WHERE clerkid= $5`,
      [username, bio, profilepic, usertype, slug.id]
    );

    revalidatePath("/profile");

    redirect("/profile");
  }

  return (
    <>
      <div
        className={`${styles.section} flex justify-center flex-col items-center w-full m-6 bg-slate-300 p-6 rounded-3xl`}
      >
        <h1 className={`${styles.h1} text-slate-200`}>
          Update Your User Profile
        </h1>

        <form
          action={handleUpdate}
          className="flex flex-col justify-center items-center border-2 border-solid border-gray-700 w-[70vh] p-3 rounded-lg"
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={wrangledUser.username}
            className="text-green-500 rounded-2xl h-10 p-4"
            required
          />

          <label htmlFor="bio">About: </label>
          <textarea
            type="text"
            name="bio"
            id="bio"
            defaultValue={wrangledUser.bio}
            required
            className="text-green-500 rounded-2xl h-28 p-4"
          />

          <label htmlFor="profilepic">Profile Image URL: </label>
          <textarea
            type="text"
            name="profilepic"
            id="profilepic"
            defaultValue={wrangledUser.profilepic}
            required
            className="text-green-500 rounded-2xl h-28 p-4"
          />

          <label htmlFor="usertype">User Type: </label>
          <select
            name="usertype"
            id="usertype"
            defaultValue={wrangledUser.usertype}
            className="text-green-500 rounded-2xl h-10 w-[20vh] text-center"
          >
            <option value="Instructor">Instructor</option>
            <option value="Learner">Learner</option>
          </select>

          <button
            type="submit"
            className="bg-emerald-500 border-2 p-1 m-4 hover:bg-emerald-400 rounded-lg"
          >
            UPDATE
          </button>
        </form>
      </div>
    </>
  );
}
