import Link from "next/link";
import { getUserData } from "@/lib/cookies";

export default async function DashboardPage() {
  const user = await getUserData();
  const name = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user?.username || user?.email || "Baker";

  return (
    <main className="min-h-screen bg-[#faf5f0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-10 shadow-[0_30px_90px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80">
        <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-100">
          BakeryHub
        </span>
        <h1 className="mt-6 text-4xl font-semibold text-slate-950">Dashboard</h1>
        <p className="mt-4 text-lg text-slate-600">
          Welcome, {name}! You are successfully logged in.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/dashboard/profile"
            className="rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Update Profile
          </Link>
          <Link
            href="/dashboard/password-update"
            className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Change Password
          </Link>
        </div>
      </div>
    </main>
  );
}
