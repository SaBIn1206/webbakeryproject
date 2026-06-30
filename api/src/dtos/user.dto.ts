import { z } from "zod";
import { UserSchema } from "../types/user.type";

export const CreateUserDTO = UserSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  username: true,
  password: true,
});

export type CreateUserDTO = z.infer<typeof CreateUserDTO>;

export const LoginUserDTO = UserSchema.pick({
  email: true,
  password: true,
});

export type LoginUserDTO = z.infer<typeof LoginUserDTO>;

const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Minimum 6 characters"),
  newPassword: z.string().min(6, "Minimum 6 characters"),
  confirmPassword: z.string().min(6, "Minimum 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const UpdatePasswordDTO = UpdatePasswordSchema;

export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordDTO>;

export const UpdateUserDTO = UserSchema.partial().pick({
  firstName: true,
  lastName: true,
  email: true,
  username: true,
  password: true,
  profileImage: true,
});

export type UpdateUserDTO = z.infer<typeof UpdateUserDTO>;
