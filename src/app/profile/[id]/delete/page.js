import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "../../../style.module.css";
export default async function DeleteUser({ params }) {
  const slug = params;

  async function handleDelete() {
    "use server";

    await db.query(`DELETE FROM users WHERE clerkid = $1`, [slug.id]);

    revalidatePath("/");
    redirect("/");
  }
  return (
    <>
      <div
        className={`${styles.section} flex justify-center flex-col items-center w-full m-6 bg-slate-300 p-6 rounded-3xl`}
      >
        <h1 className={styles.h1}>
          are you sure you want to delete your account?
        </h1>
        <h2 className={styles.h2}>
          To proceed, please click the button below.
        </h2>
        <form action={handleDelete}>
          <button
            type="submit"
            className="flex hover:bg-red-600 h-8 hover:text-white bg-red-400 p-1 rounded text-black items-center"
          >
            Delete
          </button>
        </form>

        <h2 className={styles.h2}>
          or Click below to navigate back to your profile page
        </h2>
        <Link
          href={`/profile`}
          className="text-black-500 hover:bg-blue-500 w-[50vh] mt-6 p-1 rounded-md border-2 bg-blue-400 text-center"
        >
          Go to Profile
        </Link>
      </div>
    </>
  );
}
