import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const instant = false;

export default async function DashboardRouter() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const role = user.unsafeMetadata?.role ?? user.publicMetadata?.role;
  if (role === "owner") redirect("/dashboard/owner");

  redirect("/dashboard/player");
}
