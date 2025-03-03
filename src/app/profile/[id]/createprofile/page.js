"use client";

import { useState } from "react";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "../../../style.module.css";
export default function CreateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  // Saving user profile details
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const bio = formData.get("bio");
    const profilepic = formData.get("profilepic");
    const datejoined = new Date().toISOString();
    const usertype = formData.get("usertype");

    setLoading(true);
    setError(null);
    setUsername(username);

    try {
      const response = await fetch("/api/createprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          profilepic,
          bio,
          datejoined,
          usertype,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const data = await response.json();
      console.log(data.message);
      window.alert("Profile saved successfully!");

      setProfileSaved(true);

      // Redirecting to the profile page after saving
      // revalidatePath("/profile");

      // redirect("/profile");
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.section} flex justify-center flex-col items-center w-full m-6 bg-slate-300 p-6 rounded-3xl`}
    >
      <h1 className={`${styles.h1} text-slate-200`}>
        Create Your User Profile
      </h1>

      <form
        onSubmit={handleSubmit}
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
          <option value="user">Instructor</option>
          <option value="admin">Learner</option>
        </select>

        <button
          type="submit"
          className="bg-emerald-500 border-2 p-1 m-4 hover:bg-emerald-400 rounded-lg"
          disabled={loading || profileSaved}
        >
          {loading
            ? "Saving..."
            : profileSaved
            ? "Profile Saved"
            : "Add Profile"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {/* Showing link to the user page once profile is saved */}
      {profileSaved && username && (
        <button className="bg-blue-400 border-2 p-1 m-4 hover:bg-blue-200 rounded-lg">
          <Link href={`/profile`}>Go to Profile Page</Link>
        </button>
      )}
    </div>
  );
}
