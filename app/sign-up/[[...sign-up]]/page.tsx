import { SignUp } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const instant = false;

const VALID_ROLES = ["player", "owner"];

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ "sign-up"?: string[] }>;
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedParams = await params;
  const { role } = (await searchParams) || {};

  // Check if this is a subroute in Clerk's multi-step flow (e.g. /sign-up/verify-email-address)
  const isSubRoute = Boolean(
    resolvedParams?.["sign-up"] && resolvedParams["sign-up"].length > 0
  );

  // No/invalid role on initial sign-up visit → send back home so they pick one
  if (!isSubRoute && (!role || !VALID_ROLES.includes(role))) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0C1114] px-4">
      {role && (
        <p className="text-xs font-bold uppercase tracking-wider text-[#B7F34A]">
          Signing up as {role === "owner" ? "Futsal Owner" : "Player"}
        </p>
      )}
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SignUp
          unsafeMetadata={role ? { role } : undefined}
          forceRedirectUrl={role ? `/dashboard/${role}` : "/dashboard"}
          signInUrl="/sign-in"
        />
      </Suspense>
    </main>
  );
}
