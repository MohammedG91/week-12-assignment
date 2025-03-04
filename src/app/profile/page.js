import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import profilestyle from "../style.module.css";

export default async function Profile() {
  const { userId } = await auth();

  const id = userId;

  // Fetching user profile data
  const user = await db.query(`SELECT * FROM users WHERE clerkid = $1`, [id]);

  // showing this when user doesn't have profile
  if (!user.rows.length) {
    return (
      <section
        className={`${profilestyle.section} flex justify-center items-center w-full h-[50vh] p-10 m-4 rounded-lg shadow-lg bg-white`}
      >
        <h1 className={`${profilestyle.h1} `}>
          Welcome! Please create your profile to get started
        </h1>

        <Link
          href={`/profile/${id}/createprofile`}
          className="text-black-500 hover:bg-green-500 w-[30vh] mt-6 p-1 rounded-md border-2 bg-emerald-300 text-center"
        >
          Create Profile.
        </Link>
      </section>
    );
  }

  const username = user.rows[0].username;
  const personalid = user.rows[0].id;

  return (
    <>
      <section
        className={`${profilestyle.section} flex justify-center items-center w-full m-h-[30vh] p-10 m-4 rounded-lg shadow-lg bg-white`}
      >
        <h1 className={`${profilestyle.h1} text-lg`}>Welcome {username}!</h1>

        <h2 className={`${profilestyle.h2} text-black`}>
          Manage your profile settings here.
        </h2>
        <nav className="flex items-center justify-center p-2 gap-3">
          <Link
            href={`/profile/${id}/update`}
            className="text-emerald-500 hover:text-blue-700 w-full mt-6 p-1 rounded-md border-2 bg-white text-center"
          >
            Update Profile
          </Link>

          <Link
            href={`/profile/${id}/delete`}
            className="w-full hover:bg-red-500 mt-6 p-1 text-gray-800 rounded-md border-2 bg-red-300"
          >
            Delete Profile
          </Link>
        </nav>
        <h2 className={`${profilestyle.h2} text-black`}>Create Event</h2>
        <Link
          href={`/createevent/${personalid}/create`}
          className="text-emerald-500 hover:text-blue-700 w-full mt-6 p-1 rounded-md border-2 bg-white text-center"
        >
          create event
        </Link>
      </section>
      <section
        className={`${profilestyle.section} flex justify-center items-center w-full h-[30vh] p-10 m-4 rounded-lg shadow-lg bg-white`}
      >
        <h2 className={`${profilestyle.h2} text-black`}>All Events</h2>
      </section>
    </>
  );
}
