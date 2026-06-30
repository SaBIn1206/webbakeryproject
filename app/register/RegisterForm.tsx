"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/lib/schemas/auth.schema";
import { handleRegisterUser } from "@/lib/actions/auth-action";

const inputClassName =
  "mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    setError("");
    startTransition(async () => {
      try {
        const result = await handleRegisterUser(data);
        if (result.success) {
          router.push("/login");
        } else {
          setError(result.message || "Registration failed");
        }
      } catch (err: unknown) {
        const error = err as { message?: string };
        setError(error?.message || "Registration failed");
      }
    });
  };

  return (
    <>
      <form className="mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
            {error}
          </p>
        )}

        <label className="block">
          <span className="text-sm font-medium text-slate-700">First Name</span>
          <input
            type="text"
            placeholder="John"
            className={inputClassName}
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className="mt-2 block text-sm text-red-600">
              {errors.firstName.message}
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Last Name</span>
          <input
            type="text"
            placeholder="Doe"
            className={inputClassName}
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="mt-2 block text-sm text-red-600">
              {errors.lastName.message}
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Username</span>
          <input
            type="text"
            placeholder="johndoe"
            className={inputClassName}
            {...register("username")}
          />
          {errors.username && (
            <span className="mt-2 block text-sm text-red-600">
              {errors.username.message}
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            placeholder="example@gmail.com"
            className={inputClassName}
            {...register("email")}
          />
          {errors.email && (
            <span className="mt-2 block text-sm text-red-600">
              {errors.email.message}
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            placeholder="Create a password"
            className={inputClassName}
            {...register("password")}
          />
          {errors.password && (
            <span className="mt-2 block text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Confirm Password</span>
          <input
            type="password"
            placeholder="Repeat your password"
            className={inputClassName}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="mt-2 block text-sm text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-red-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-red-600 hover:text-red-700">
          Login
        </Link>
      </p>
    </>
  );
}
