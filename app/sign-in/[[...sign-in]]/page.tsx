import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0C1114] px-4">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <SignIn fallbackRedirectUrl="/dashboard" signUpUrl="/" />
      </Suspense>
    </main>
  );
}
