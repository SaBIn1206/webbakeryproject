"use server";

import {
  LoginFormData,
  RegisterFormData,
} from "@/lib/schemas/auth.schema";
import {
  login,
  register,
  whoami,
  updateProfile,
  updatePassword,
} from "@/lib/api/auth";
import {
  setTokenCookie,
  storeUserData,
  clearAuthCookies,
} from "@/lib/cookies";
import { revalidatePath } from "next/cache";
import { UpdatePasswordFormData } from "@/app/dashboard/_components/schema";
import { redirect, RedirectType } from "next/navigation";

export const handleRegisterUser = async (data: RegisterFormData) => {
  try {
    const { confirmPassword: _, ...registerData } = data;
    const result = await register(registerData);

    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    }

    return {
      success: false,
      message: result.message || "Registration failed",
    };
  } catch (error: unknown) {
    const err = error as { message?: string };
    return {
      success: false,
      message: err?.message || "Registration failed",
    };
  }
};

export const handleLoginUser = async (data: LoginFormData) => {
  try {
    const result = await login(data);

    if (result.success) {
      const user = result.data.user;
      const token = result.data.token;
      await setTokenCookie(token);
      await storeUserData(user);

      return { success: true, message: result.message, data: result.data };
    }

    return { success: false, message: result.message || "Login failed" };
  } catch (error: unknown) {
    const err = error as { message?: string };
    return { success: false, message: err?.message || "Login failed" };
  }
};

export const handleUserDetails = async () => {
  try {
    const result = await whoami();
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Failed to fetch user details",
      };
    }
  } catch (error: unknown) {
    const err = error as { message?: string };
    return {
      success: false,
      message: err?.message || "Failed to fetch user details",
    };
  }
};

export const handleUpdateProfile = async (formData: FormData) => {
  try {
    const result = await updateProfile(formData);
    if (result.success) {
      await revalidatePath("/dashboard/profile");
      return { success: true, message: result.message, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Failed to update profile",
      };
    }
  } catch (error: unknown) {
    const err = error as { message?: string };
    return {
      success: false,
      message: err?.message || "Failed to update profile",
    };
  }
};

export const handleUpdatePassword = async (data: UpdatePasswordFormData) => {
  try {
    const result = await updatePassword(data);
    if (result.success) {
      return { success: true, message: result.message, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Failed to update password",
      };
    }
  } catch (error: unknown) {
    const err = error as { message?: string };
    return {
      success: false,
      message: err?.message || "Failed to update password",
    };
  }
};

export const handleLogout = async () => {
  await clearAuthCookies();
  redirect("/login", RedirectType.replace);
};
