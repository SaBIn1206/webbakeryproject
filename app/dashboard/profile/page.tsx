import UpdateForm from "../_components/UpdateForm";
import { handleUserDetails } from "@/lib/actions/auth-action";

export default async function Page() {
  const userDetails = await handleUserDetails();
  if (!userDetails.success) {
    throw new Error(userDetails.message || "Failed to fetch user details");
  }

  return (
    <main className="min-h-screen bg-[#faf5f0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-10 shadow-[0_30px_90px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80">
        <UpdateForm user={userDetails.data} />
      </div>
    </main>
  );
}
