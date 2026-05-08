"use server";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export interface FormState {
  success: boolean;
  errors: Record<string, string[] | undefined>;
  currentData: {
    username: string;
    email: string;
    password: string;
  };
}

export async function actionFormSub(
  prevS: FormState,
  formData: FormData,
): Promise<FormState> {
  const rawData = Object.fromEntries(formData);
  const data = {
    username: rawData.username as string | "",
    email: rawData.email as string | "",
    password: rawData.password as string | "",
  };

  const validateData = formSchema.safeParse(data);

  if (!validateData.success) {
    console.log(validateData.error.flatten().fieldErrors);
    
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
