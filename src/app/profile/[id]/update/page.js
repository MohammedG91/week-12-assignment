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

    // Access the input values
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
      <div className="flex flex-col min-h-screen w-full bg-[#D1E2EB] p-10">
        {/* Form Section */}
        <section className="flex flex-col w-full max-w-4xl mx-auto bg-[#4C585B] text-[#D1E2EB] shadow-lg rounded-lg p-10 gap-8">
          <h1 className="text-3xl text-center font-semibold mb-6">
            Update Your Profile
          </h1>

          <form
            action={handleUpdate}
            className="flex flex-col items-center w-full bg-[#4C585B] rounded-lg p-6 gap-6"
          >
            {/* Username Field */}
            <label htmlFor="username" className="text-lg mb-2">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={wrangledUser.username}
              className="text-[#4C585B] rounded-2xl h-10 p-4 mb-4 w-[80%] md:w-[60%]"
              required
            />

            {/* Bio Field */}
            <label htmlFor="bio" className="text-lg mb-2">
              About:
            </label>
            <textarea
              name="bio"
              id="bio"
              defaultValue={wrangledUser.bio}
              required
              className="text-[#4C585B] rounded-2xl h-28 p-4 mb-4 w-[80%] md:w-[60%]"
            />

            {/* Profile Image URL */}
            <label htmlFor="profilepic" className="text-lg mb-2">
              Profile Image URL:
            </label>
            <textarea
              name="profilepic"
              id="profilepic"
              defaultValue={wrangledUser.profilepic}
              required
              className="text-[#4C585B] rounded-2xl h-28 p-4 mb-4 w-[80%] md:w-[60%]"
            />

            {/* User Type Select */}
            <label htmlFor="usertype" className="text-lg mb-2">
              User Type:
            </label>
            <select
              name="usertype"
              id="usertype"
              defaultValue={wrangledUser.usertype}
              className="text-[#4C585B] rounded-2xl h-10 w-[80%] md:w-[60%] text-center mb-4"
            >
              <option value="Instructor">Instructor</option>
              <option value="Learner">Learner</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#508c9b] text-white px-6 py-3 rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300"
            >
              UPDATE
            </button>
          </form>
        </section>

        <nav className="flex justify-center gap-4 mt-6">
          <Link
            href="/profile"
            className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300"
          >
            Back to Profile
          </Link>
        </nav>
      </div>
    </>
  );
}
