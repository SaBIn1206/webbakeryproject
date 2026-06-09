import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Register | BakeryHub",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#faf5f0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <section className="flex-1 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.16),_transparent_42%),linear-gradient(180deg,#ffffff_0%,#f8f3f0_100%)] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-100">
              BakeryHub
            </span>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Start your baking journey.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
              Create an account to explore fresh bread ideas, manage orders, and unlock bakery-inspired features that make your day better.
            </p>
          </div>
        </section>

        <section className="flex-1">
          <div className="overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
                  New here
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
                  Register your account
                </h2>
              </div>
            </div>

            <RegisterForm />
          </div>
        </section>
      </div>
    </main>
  );
}
