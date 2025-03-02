//homepage
import Link from "next/link";

export default function homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <h1 className="bg-slate-300 rounded-md border-2">
        <Link href="/terms">terms page</Link>
      </h1>
    </div>
  );
}
