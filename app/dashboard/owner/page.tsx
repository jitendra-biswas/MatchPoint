import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SlTrophy } from "react-icons/sl";
import { BsCalendar3, BsCheckCircle } from "react-icons/bs";
import { LuTrendingUp, LuDollarSign, LuUsers } from "react-icons/lu";

export const instant = false;

export default async function OwnerDashboard() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="min-h-screen bg-[#0C1114] text-white">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800 bg-[#0C1114]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 border border-zinc-800 bg-[#161F29] flex items-center justify-center rounded-xl">
              <SlTrophy className="text-[#B7F34A]" />
            </div>
            <div>
              <h1 className="uppercase font-extrabold text-lg">
                Match <span className="text-[#B7F34A]">Point</span>
              </h1>
              <p className="uppercase text-[10px] font-bold text-zinc-500">Owner Portal</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-zinc-400 hover:text-[#B7F34A] transition"
            >
              Public Site
            </Link>
            <div className="h-4 w-px bg-zinc-800" />
            <UserButton />
          </div>
        </div>
      </header>

    Owner Dashboard
    </div>
  );
}
