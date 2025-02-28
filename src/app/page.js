//homepage
import Link from "next/link";

export default function homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <Link href="/terms">terms page</Link>
    </div>
  );
}
