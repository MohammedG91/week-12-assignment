export const metadata = {
  title: "Community - Local Skills Hub",
  description:
    "Join the Local Skills Hub community! Discover local events, connect with others, and share skills within your neighborhood. Empower your community and grow together.",
};

import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function CommunityPage() {
  const { userId } = await auth();

  // Get user information
  const user = await db.query(`SELECT * FROM users WHERE clerkid = $1`, [
    userId,
  ]);
  const personalid = user.rows.length > 0 ? user.rows[0].id : null;

  // Fetch community posts with all columns from community_posts
  const posts = await db.query(`
  SELECT p.*, c.name AS category
  FROM community_posts p
  JOIN event_categories c ON p.category_id = c.id
  ORDER BY p.createdat DESC
`);

  const communityPosts = posts.rows;

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#D1E2EB] p-8">
      <h1 className="text-4xl font-semibold text-center text-[#134b70] sm:mt-0 mt-8 mb-8">
        Community Posts
      </h1>

      {/* Create Event Button */}
      {userId && (
        <div className="mt-10 text-center">
          <Link
            href={`/community/${personalid}/create`}
            className="px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#508c9b] transition duration-300"
          >
            Create community post
          </Link>
        </div>
      )}

      {/* Display Community Posts */}
      <div className="mt-10">
        {communityPosts.length > 0 ? (
          communityPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-6 mb-6 border border-[#7E99A3]"
            >
              <h2 className="text-2xl font-semibold text-[#134b70]">
                {post.title}
              </h2>
              <p className="text-sm text-[#508c9b]">{post.category}</p>
              <p className="mt-4 text-[#134b70]">{post.content}</p>
              <p className="mt-4 text-sm text-gray-500">
                Posted on: {new Date(post.createdat).toLocaleString()}
              </p>
              <div className="mt-4 text-right">
                <Link
                  href={`/community/${post.id}/delete`}
                  className="text-[#9b6050] hover:text-[#702113] transition duration-300"
                >
                  Delete
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[#134b70]">
            No community posts found.
          </p>
        )}
      </div>
    </div>
  );
}
