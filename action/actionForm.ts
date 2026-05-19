"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabase/server";
import { signIn } from "../src/auth/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
  
  const supabase = await createClient();

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
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const { confirmPassword, ...user } = data;

  const newEmail = user.email.toLowerCase();
  user.email = newEmail;
  user.password = hashedPassword;

  const { error } = await supabase.from("users").insert(user);
  if (error) {
    return {
      success: false,
      errors: {
        username: [error.message],
        email: [error.message],
        password: [error.message],
      },
      currentData: data,
    };
  }

  try {
    const result = await signIn("credentials", {
      email: user.email,
      password: data.password,
      redirect: false,
    });
    if (result?.error) {
      return {
        success: false,
        errors: { email: ["Account created but credentials not recognized."] },
        currentData: data,
      };
    }

revalidatePath("/", "layout"); 
  revalidatePath("/shop");

  } catch (e) {
    if (e instanceof AuthError) {
      return {
        success: false,
        errors: { email: ["Account created but credentials not recognized."] },
        currentData: data,
      };
    }
    throw e; 
  }

  

  return {
    success: true,
    errors: {},
    currentData: data,
  };
}

//login

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

 
try {
  const result = await signIn("credentials", {
    email: data.email.toLowerCase(),
    password: data.password,
    redirect: false,
  });

  if (result?.error) {
    return {
      success: false,
      errors: { email: ["Credentials not recognized."] },
      currentData: data,
    };
  }

  revalidatePath("/", "layout"); 
  revalidatePath("/shop");

  return {
    success: true,
    errors: {},
    currentData: data,
  };

} catch (e: any) {
  if (isRedirectError(e)) {
    throw e;
  }

  const isAuthError = e instanceof AuthError || e.type?.includes("AuthError") || e.message?.includes("CredentialsSignin");

  if (isAuthError) {
    return {
      success: false,
      errors: { email: ["Wrong credentials, try again."] },
      currentData: data,
    };
  }

  return {
    success: false,
    errors: { email: ["Something went wrong. Please try again later."] },
    currentData: data,
  };


}


}



