import UpdatePasswordForm from "../_components/UpdatePasswordForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#faf5f0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-10 shadow-[0_30px_90px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80">
        <UpdatePasswordForm />
      </div>
    </main>
  );
}
