"use client";
import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordFormData, updatePasswordSchema } from "./schema";
import { handleUpdatePassword } from "@/lib/actions/auth-action";
import { toast, Slide } from "react-toastify";

export default function UpdatePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = (data: UpdatePasswordFormData) => {
    setError("");
    startTransition(async () => {
      try {
        const result = await handleUpdatePassword(data);
        if (result.success) {
          toast.success("Password updated successfully", {
            position: "top-center",
            transition: Slide,
          });
          reset();
        } else {
          throw new Error(result.message || "Failed to update password");
        }
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Failed to update password");
        const message = err.message || "Failed to update password";
        setError(message);
        toast.error(message);
      }
    });
  };

  const fieldClass = "h-12 w-full border border-hairline bg-surface-card px-4 text-on-dark placeholder:text-muted outline-none transition-colors focus:border-on-dark";
  const labelClass = "mb-2 block text-xs font-bold uppercase tracking-[1.5px] text-body";
  const errClass = "mt-1 block text-sm text-m-red";

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8">
        <h1 className="text-4xl font-bold uppercase leading-none text-on-dark">Change Password</h1>
        <p className="mt-2 text-sm text-muted">Update your account password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="border border-m-red bg-m-red/10 px-4 py-3 text-sm text-m-red">
            {error}
          </div>
        )}

        <div>
          <label className={labelClass}>Current Password</label>
          <input
            type="password"
            {...register("currentPassword")}
            placeholder="Enter current password"
            className={fieldClass}
          />
          {errors.currentPassword && <p className={errClass}>{errors.currentPassword.message}</p>}
        </div>

        <div>
          <label className={labelClass}>New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            placeholder="Enter new password"
            className={fieldClass}
          />
          {errors.newPassword && <p className={errClass}>{errors.newPassword.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Confirm New Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm new password"
            className={fieldClass}
          />
          {errors.confirmPassword && <p className={errClass}>{errors.confirmPassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isPending}
          className="flex h-12 w-full items-center justify-center bg-on-dark text-xs font-bold uppercase tracking-[1.5px] text-canvas transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
