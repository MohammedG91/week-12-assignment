import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import profilestyle from "../style.module.css";
import Image from "next/image";
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

  const wrangledUser = user.rows[0];
  const personalid = user.rows[0].id;

  return (
    <>
      <section
        className={`${profilestyle.section} flex  w-full m-h-[30vh] p-10 m-4 rounded-lg shadow-lg bg-white`}
      >
        <aside className="w-1/3 flex justify-center items-center gap-2">
          <Image
            src={wrangledUser.profilepic}
            alt="User profile image"
            width={300}
            height={300}
            style={{ objectFit: "contain" }}
            className="rounded-full"
          />
          <h2
            className={`${profilestyle.h2} text-xl font-semibold text-emerald-700`}
          >
            {wrangledUser.username}
          </h2>
        </aside>

        <article className="w-2/3 flex-1">
          <h2 className={`${profilestyle.h2} text-gray-800`}>About:</h2>
          <p className="text-gray-600 mt-2">{wrangledUser.bio}</p>
          <br />
          <h2 className={`${profilestyle.h2} text-gray-800`}>
            Manage your profile settings here.
          </h2>
          <nav className="flex items-center justify-center p-2 gap-3">
            <Link
              href={`/profile/${id}/update`}
              className="text-emerald-500 hover:bg-emerald-200 w-full mt-6 p-1 rounded-md border-2 bg-white text-center"
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
          <br />
          <Link
            href={`/createevent/${personalid}/create`}
            className="text-emerald-500 hover:text-blue-700 w-[10rem] mt-6 p-1 rounded-md border-2 bg-white text-center"
          >
            Create Event
          </Link>
        </article>
      </section>

      {/* 2nd section with all events */}
      <section
        className={`${profilestyle.section} flex justify-center items-center w-full h-[30vh] p-10 m-4 rounded-lg shadow-lg bg-white`}
      >
        <h2 className={`${profilestyle.h2} text-black`}>All Events</h2>
      </section>
    </>
  );
}
