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
          className="bg-[#134b70] text-white px-6 py-3 rounded-lg border-2 border-[#134b70] text-center hover:bg-[#508c9b] hover:scale-105 transition duration-300"
        >
          Create Profile.
        </Link>
      </section>
    );
  }

  const wrangledUser = user.rows[0];
  const personalid = user.rows[0].id;

  const userevent = await db.query(
    `SELECT * FROM events WHERE userid = $1 ORDER BY id DESC`,
    [personalid]
  );

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
          <h1 className="text-4xl text-[#124e66] mb-6">
            {wrangledUser.username}
          </h1>
        </aside>

        <article className="w-2/3 flex-1">
          <h1 className="text-2xl text-[#124e66] mb-6">About:</h1>
          <p className="text-gray-600 mt-2">{wrangledUser.bio}</p>
          <br />
          <h2 className={`${profilestyle.h2} text-[#124e66] `}>
            Manage your profile settings here.
          </h2>
          <nav className="flex items-center justify-center p-2 gap-3">
            <Link
              href={`/profile/${id}/update`}
              className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300 w-full"
            >
              Update Profile
            </Link>

            <Link
              href={`/profile/${id}/delete`}
              className="px-6 py-3 bg-[#733328] text-white rounded-lg hover:bg-[#9b5d50] transition duration-300 w-full"
            >
              Delete Profile
            </Link>
          </nav>

          <h2 className={`${profilestyle.h2} text-[#124e66]`}>
            Create an Event or a Community Post
          </h2>

          <nav className="flex items-center justify-center p-2 gap-3">
            <Link
              href={`/createEvent/${personalid}/create`}
              className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300 w-full"
            >
              Create Event
            </Link>
            <Link
              href={`/createcommunitypost/${personalid}/create`}
              className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300 w-full"
            >
              Create community post
            </Link>
          </nav>
        </article>
      </section>

      {/* 2nd section with all events */}
      <section
        className={`${profilestyle.section} flex justify-center items-center w-full m-h-[30vh] p-10 m-4 rounded-lg shadow-lg bg-white`}
      >
        <h2 className={`${profilestyle.h2} text-black`}>Your Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userevent.rows.length === 0 ? (
            <div>you have not made any event yet!</div>
          ) : (
            userevent.rows.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-lg shadow-lg p-4 bg-white text-black"
              >
                <ul className="list-disc pl-5 mb-4">
                  <li className="font-semibold text-xl">{event.eventname}</li>
                </ul>

                <nav className="flex items-center justify-between gap-3">
                  <Link href={`/createEvent/${event.id}/update`}>
                    <button className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300 w-full">
                      Update event
                    </button>
                  </Link>

                  <Link href={`/createEvent/${event.id}/delete`}>
                    <button className="px-6 py-3 bg-[#733328] text-white rounded-lg hover:bg-[#9b5d50] transition duration-300 w-full">
                      Delete event
                    </button>
                  </Link>
                </nav>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
