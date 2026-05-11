"use server";
import { z } from "zod";

const formSchemaLogin = z.object({
  email: z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})


const formSchemaSub = z.object({
  username: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long").max(13, "Password must be at most 20 characters long"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters long").max(13, "Password must be at most 20 characters long"),
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
  const rawData = Object.fromEntries(formData);
  const data = {
    username: rawData.username as string | "",
    email: rawData.email as string | "",
    password: rawData.password as string | "",
    confirmPassword: rawData.confirmPassword as string | "",
  };
  if(data.password !== data.confirmPassword){
    return {
      success: false,
      errors: {
        password: ["Passwords do not match"],
        confirmPassword: ["Passwords do not match"],
      },
      currentData: data,
    };
  }

  const validateData = formSchemaSub.safeParse(data);

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
