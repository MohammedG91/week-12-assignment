export const metadata = {
  title: "Profile & Account Settings - Local Skills Hub",
  description:
    "Manage your account, update your profile, and view your shared events on Local Skills Hub. Connect with your community and enhance your skill-sharing experience.",
};

import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";
import Image from "next/image";

export default async function Profile() {
  const { userId } = await auth();
  const id = userId;

  // Fetching user profile data
  const user = await db.query(`SELECT * FROM users WHERE clerkid = $1`, [id]);

  if (!user.rows.length) {
    // automatically create a profile
    const defaultUsername = "New User";
    const defaultBio = "This is my bio.";
    const defaultProfilePic = "/default-profile-pic.jpg";
    const userType = "Learner";

    // insert profile into the database
    await db.query(
      `INSERT INTO users (clerkid, username, profilepic, bio, datejoined, usertype) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5)`,
      [id, defaultUsername, defaultProfilePic, defaultBio, userType]
    );

    const newUser = await db.query(`SELECT * FROM users WHERE clerkid = $1`, [
      id,
    ]);
    return (
      <section className="flex flex-col justify-center items-center w-full h-[50vh] p-10 m-4 rounded-lg shadow-lg bg-[#4C585B] text-[#D1E2EB]">
        <h2 className="text-2xl">
          Welcome! Your profile has been created automatically.
        </h2>
        <Link
          href={`/profile/${id}`}
          className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300 inline-block"
        >
          View Your Profile
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
    <div className="flex flex-col min-h-screen w-full bg-[#D1E2EB] p-10">
      {/* Profile Section */}
      <section className="flex flex-col w-full max-w-6xl mx-auto bg-[#4C585B] text-[#D1E2EB] shadow-lg rounded-lg p-10 gap-8">
        <aside className="flex flex-col justify-center items-center gap-4 w-full">
          <Image
            src={wrangledUser.profilepic}
            alt="User profile image"
            width={150}
            height={150}
            className="rounded-full border-4 border-[#508c9b] shadow-md"
            style={{ objectFit: "cover" }}
          />
          <h1 className="text-4xl font-semibold">{wrangledUser.username}</h1>
        </aside>

        <article className="w-full text-center">
          <h1 className="text-2xl font-semibold mb-4">About:</h1>
          <p className="text-[#A5BFCC] leading-relaxed">{wrangledUser.bio}</p>

          {/* Manage Profile */}
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Manage Your Profile</h2>
            <nav className="flex justify-center gap-4">
              <Link
                href={`/profile/${id}/update`}
                className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300 inline-block"
              >
                Update Profile
              </Link>

              <Link
                href={`/profile/${id}/delete`}
                className="px-6 py-3 bg-[#733328] text-white rounded-lg hover:bg-[#9b5d50] hover:scale-105 transition duration-300 inline-block"
              >
                Delete Profile
              </Link>
            </nav>
          </div>

          {/* Create Events or Posts */}
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">
              Create an Event or a Community Post
            </h2>
            <nav className="flex justify-center gap-4">
              <Link
                href={`/createEvent/${personalid}/create`}
                className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300 inline-block"
              >
                Create Event
              </Link>
              <Link
                href={`/community/${personalid}/create`}
                className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300 inline-block"
              >
                Create Community Post
              </Link>
            </nav>
          </div>
        </article>
      </section>

      {/* Events Section */}
      <section className="flex flex-col w-full max-w-6xl mx-auto bg-[#4C585B] text-[#D1E2EB] shadow-lg rounded-lg p-10 gap-8 mt-6">
        <h2 className="text-2xl font-semibold text-center">Your Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {userevent.rows.length === 0 ? (
            <div className="text-center text-[#D1E2EB]">
              You have not made any events yet!
            </div>
          ) : (
            userevent.rows.map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-lg shadow-md p-4 bg-[#A5BFCC] text-[#4C585B]"
              >
                <ul className="list-disc pl-5 mb-4">
                  <li className="font-semibold text-xl">{event.eventname}</li>
                </ul>

                <nav className="flex items-center justify-between gap-3">
                  <Link href={`/createEvent/${event.id}/update`}>
                    <button className="px-6 py-3 bg-[#508c9b] text-white rounded-lg hover:bg-[#134b70] hover:scale-105 transition duration-300 inline-block w-full">
                      Update Event
                    </button>
                  </Link>

                  <Link href={`/createEvent/${event.id}/delete`}>
                    <button className="px-6 py-3 bg-[#733328] text-white rounded-lg hover:bg-[#9b5d50] hover:scale-105 transition duration-300 inline-block w-full">
                      Delete Event
                    </button>
                  </Link>
                </nav>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
