import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "@/utils/dbConnection";

export default async function Profile() {
  const { userId } = await auth();

  return (
    <>
      <h1>welcome user {userId}</h1>
    </>
  );
}
