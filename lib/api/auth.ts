import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const register = async (data: {
  name: string;
  email: string;
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
