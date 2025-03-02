// app/api/createprofile/route.js
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = await auth(req);

    const { username, profilepic, bio, datejoined, usertype } =
      await req.json();

    // Insert the profile data into the database
    await db.query(
      `INSERT INTO users (clerkid,username,profilepic,bio,datejoined,usertype) VALUES ($1, $2, $3, $4,$5,$6)`,
      [userId, username, profilepic, bio, datejoined, usertype]
    );

    // Send success response
    return new Response(
      JSON.stringify({ message: "Profile saved successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving profile:", error);
    return new Response(JSON.stringify({ message: "Error saving profile." }), {
      status: 500,
    });
  }
}
