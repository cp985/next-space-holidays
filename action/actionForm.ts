"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const formSchemaLogin = z.object({
  email: z
    .string()
    .email()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(13, "Password must be at most 13 characters long"),
});

const formSchemaSub = z
  .object({
    username: z.string().min(3, "Name must be at least 3 characters long"),
    email: z
      .string()
      .email()
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(13, "Password must be at most 13 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(13, "Password must be at most 13 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export interface FormStateLogin {
  success: boolean;
  errors: Record<string, string[] | undefined>;
  currentData: {
    email: string;
    password: string;
  };
}

export interface FormStateSub {
  success: boolean;
  errors: Record<string, string[] | undefined>;
  currentData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export async function actionFormSub(
  prevS: FormStateSub,
  formData: FormData,
): Promise<FormStateSub> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const rawData = Object.fromEntries(formData);
  const data = {
    username: rawData.username as string | "",
    email: rawData.email as string | "",
    password: rawData.password as string | "",
    confirmPassword: rawData.confirmPassword as string | "",
  };

  const validateData = formSchemaSub.safeParse(data);

  if (!validateData.success) {
    return {
      success: false,
      errors: validateData.error.flatten().fieldErrors,
      currentData: data,
    };
  }
  return {
    success: true,
    errors: {},
    currentData: data,
  };
}


export async function actionFormLogIn(
  prevS: FormStateLogin,
  formData: FormData,
): Promise<FormStateLogin> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const rawData = Object.fromEntries(formData);
  const data = {
    email: rawData.email as string | "",
    password: rawData.password as string | "",
  };

  const validateData = formSchemaLogin.safeParse(data);

  if (!validateData.success) {
    return {
      success: false,
      errors: validateData.error.flatten().fieldErrors,
      currentData: data,
    };
  }
  return {
    success: true,
    errors: {},
    currentData: data,
  };
}
