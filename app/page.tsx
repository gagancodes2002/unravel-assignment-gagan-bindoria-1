import Button from "@/app/shared/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start ">
        <Link
          className="bg-brand-500 rounded-md text-neutral-0 py-2 px-4 hover:bg-brand-600 active:bg-brand-800"
          href={"/rooms"}
        >
          Navigate to Rooms listing page
        </Link>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
