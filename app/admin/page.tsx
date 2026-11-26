import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SlTrophy } from "react-icons/sl";
import { BsCheckCircle } from "react-icons/bs";
import {
  LuShieldAlert,
  LuBuilding2,
  LuUsers,
  LuCalendarCheck,
  LuClock,
} from "react-icons/lu";

export const instant = false;

export default async function AdminPage() {
  // Proxy already ensures user is logged in before reaching here,
  // but we double-check and read the user object for role verification.
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const role =
    (user.publicMetadata?.role as string) ??
    (user.unsafeMetadata?.role as string);

  const isAdmin = role === "admin";

  // ── Not an admin → access denied ──
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0C1114] px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#161F29] p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10">
            <LuShieldAlert className="text-3xl text-red-400" />
          </div>

          <h1 className="text-2xl font-extrabold">Admin Access Only</h1>
          <p className="mt-2 text-sm text-zinc-400">
            You are signed in as{" "}
            <span className="font-bold text-white">
              {user.emailAddresses[0]?.emailAddress}
            </span>
            , but this account does not have admin privileges.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="block w-full rounded-xl bg-[#B7F34A] py-3 text-center text-xs font-black text-zinc-950 transition hover:bg-[#c9ff65]"
            >
              Go to My Dashboard
            </Link>
            <Link
              href="/"
              className="block w-full rounded-xl border border-zinc-700 py-3 text-center text-xs font-bold text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Return Home
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-zinc-800 pt-5 text-xs text-zinc-400">
            <span>Switch account:</span>
            <UserButton />
          </div>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ──
  return (
    <div className="min-h-screen bg-[#0C1114] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0C1114]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-[#161F29]">
              <SlTrophy className="text-[#B7F34A]" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold uppercase">
                Match <span className="text-[#B7F34A]">Point</span>
              </h1>
              <p className="text-[10px] font-bold uppercase text-zinc-500">
                Admin Panel
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-zinc-400 transition hover:text-[#B7F34A]"
            >
              Public Site
            </Link>
            <div className="h-4 w-px bg-zinc-800" />
            <UserButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        {/* Welcome */}
        <div className="rounded-2xl border border-zinc-800  p-8">
          <span className="mb-3 inline-block rounded-md border border-[#B7F34A]/30 bg-[#B7F34A]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B7F34A]">
            Administrator
          </span>
          <h1 className="text-3xl font-extrabold text-zinc-100">
            Welcome, {user.firstName || "Admin"}
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage venues, users, and monitor platform activity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800  p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-400">Pending Approvals</p>
              <LuClock className="text-amber-400" />
            </div>
            <h2 className="mt-2 text-2xl font-black text-amber-400">
              2 Venues
            </h2>
            <p className="mt-2 text-xs text-zinc-400">Awaiting verification</p>
          </div>

          <div className="rounded-2xl border border-zinc-800  p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-400">Verified Venues</p>
              <LuBuilding2 className="text-[#B7F34A]" />
            </div>
            <h2 className="mt-2 text-2xl font-black text-white">35</h2>
            <p className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
              <BsCheckCircle /> Active across Nepal
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800  p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-400">Registered Users</p>
              <LuUsers className="text-[#B7F34A]" />
            </div>
            <h2 className="mt-2 text-2xl font-black text-white">1,240</h2>
            <p className="mt-2 text-xs text-zinc-400">
              Players &amp; Owners
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800  p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-400">Bookings This Week</p>
              <LuCalendarCheck className="text-[#B7F34A]" />
            </div>
            <h2 className="mt-2 text-2xl font-black text-[#B7F34A]">184</h2>
            <p className="mt-2 text-xs text-zinc-400">Zero double bookings</p>
          </div>
        </div>

        {/* Venue queue */}
        <div className="rounded-2xl border border-zinc-800  p-6">
          <h2 className="mb-4 text-lg font-bold text-white">
            Venue Verification Queue
          </h2>

          <div className="divide-y divide-zinc-800">
            <div className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Kathmandu Arena &amp; Turf
                </h3>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Baluwatar, Kathmandu • 2 Courts • PAN Verified
                </p>
              </div>
              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-400">
                Pending Review
              </span>
            </div>

            <div className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Lakeside Futsal Club
                </h3>
                <p className="mt-0.5 text-xs text-zinc-400">
                  Lakeside, Pokhara • 1 Court • Submitted Today
                </p>
              </div>
              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-400">
                Pending Review
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
