import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const register = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(API.AUTH.REGISTER, data);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    throw new Error(
      err?.response?.data?.message || err?.message || "Registration failed - API server may not be running"
    );
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosInstance.post(API.AUTH.LOGIN, data);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    throw new Error(err?.response?.data?.message || err?.message || "Login failed - API server may not be running");
  }
};

export const whoami = async () => {
  try {
    const response = await axiosInstance.get(API.AUTH.WHOAMI);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    throw new Error(err?.response?.data?.message || "Failed to fetch user details");
  }
};

export const updateProfile = async (data: FormData) => {
  try {
    const response = await axiosInstance.put(API.AUTH.UPDATE, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    throw new Error(err?.response?.data?.message || "Failed to update profile");
  }
};

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    const response = await axiosInstance.put(API.AUTH.UPDATE_PASSWORD, data);
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    throw new Error(err?.response?.data?.message || "Failed to update password");
  }
};
