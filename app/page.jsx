import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-4xl font-bold text-center">
        <h1>Find your dream concert here!</h1>
        <Link href="/dashboard/allevents">
          <Button>View all events</Button>
        </Link>
      </div>
    </main>
  );
}