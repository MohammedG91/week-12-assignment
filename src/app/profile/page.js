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
        <h2 className={`${profilestyle.h2} text-[#124e66]`}>
          Welcome! Please create your profile to get started
        </h2>

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
      <section className=" min-h-screen m-0 bg-[#A5BFCC] text-[#134b70]  sm:p-4 md:p-2 lg:p-12 xl:p-16 flex flex-col items-center justify-center w-full  sm:max-w-none md:max-w-none lg:max-w-none xl:max-w-none">
        <section
          className={`${profilestyle.section} flex flex-col sm:flex-row w-full p-6 rounded-lg shadow-lg bg-white gap-6`}
        >
          <aside className="w-full sm:w-1/3 flex justify-center items-center gap-4">
            <Image
              src={wrangledUser.profilepic}
              alt="User profile image"
              width={300}
              height={300}
              style={{ objectFit: "contain" }}
              className="rounded-full"
            />
            <h1 className="text-3xl sm:text-4xl text-[#124e66] mb-4 sm:mb-6">
              {wrangledUser.username}
            </h1>
          </aside>

          <article className="w-full sm:w-2/3 flex-1">
            <h1 className="text-xl sm:text-2xl text-[#124e66] mb-4">About:</h1>
            <p className="text-gray-600 mt-2">{wrangledUser.bio}</p>

            <h2 className={`${profilestyle.h2} text-[#124e66] mt-6`}>
              Manage your profile settings here.
            </h2>
            <nav className="flex flex-wrap items-center justify-start sm:justify-center gap-3 mt-4">
              <Link
                href={`/profile/${id}/update`}
                className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300 w-full sm:w-auto"
              >
                Update Profile
              </Link>

              <Link
                href={`/profile/${id}/delete`}
                className="px-6 py-3 bg-[#733328] text-white rounded-lg hover:bg-[#9b5d50] transition duration-300 w-full sm:w-auto"
              >
                Delete Profile
              </Link>
            </nav>

            <h2 className={`${profilestyle.h2} text-[#124e66] mt-6`}>
              Create an Event or a Community Post
            </h2>

            <nav className="flex flex-wrap items-center justify-start sm:justify-center gap-3 mt-4">
              <Link
                href={`/createEvent/${personalid}/create`}
                className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300 w-full sm:w-auto"
              >
                Create Event
              </Link>
              <Link
                href={`/createcommunitypost/${personalid}/create`}
                className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300 w-full sm:w-auto"
              >
                Create Community Post
              </Link>
            </nav>
          </article>
        </section>

        {/* 2nd section with all events */}
        <section
          className={`${profilestyle.section} flex justify-center items-center p-6 rounded-lg shadow-lg bg-white mt-8 w-full`}
        >
          <h2 className={`${profilestyle.h2} text-black mb-6`}>Your Events</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userevent.rows.length === 0 ? (
              <div className="text-center text-xl">
                You have not created any events yet!
              </div>
            ) : (
              userevent.rows.map((event) => (
                <div
                  key={event.id}
                  className="overflow-hidden rounded-lg shadow-lg p-4 bg-white text-black"
                >
                  <ul className="list-disc pl-5 mb-4">
                    <li className="font-semibold text-xl">{event.eventname}</li>
                  </ul>

                  <nav className="flex flex-wrap items-center justify-center gap-3">
                    <Link href={`/createEvent/${event.id}/update`}>
                      <button className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300 w-full sm:w-auto">
                        Update Event
                      </button>
                    </Link>

                    <Link href={`/createEvent/${event.id}/delete`}>
                      <button className="px-6 py-3 bg-[#733328] text-white rounded-lg hover:bg-[#9b5d50] transition duration-300 w-full sm:w-auto">
                        Delete Event
                      </button>
                    </Link>
                  </nav>
                </div>
              ))
            )}
          </div>
        </section>
      </section>
    </>
  );
}
