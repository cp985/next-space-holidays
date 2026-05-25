"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabase/server";
import { signIn } from "../src/auth/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { auth } from "@/auth/auth";
import { TRIPS } from "@/lib/content";

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

const formSchemaCheckout = z.object({
  email: z
    .string()
    .email()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ),
  firstName: z.string().min(3, "Name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last Name must be at least 3 characters long"),
  cc: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\d+$/.test(val), {
      message: "Credit token must contain only numeric digits",
    })
    .refine((val) => val.length >= 13 && val.length <= 19, {
      message: "Invalid transmission length (Must be between 13 and 19 digits)",
    }),
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

export interface FormStateCheckout {
  success: boolean;
  errors: Record<string, string[] | undefined>;
  currentData: {
    email: string;
    firstName: string;
    lastName: string;
    cc: string;
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

// LOGIN

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

    const isAuthError =
      e instanceof AuthError ||
      e.type?.includes("AuthError") ||
      e.message?.includes("CredentialsSignin");

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

//Checkout
export async function actionFormCheckout(
  cart: any[],
  itemsCart: number,
  totalPrice: number,
  prevS: FormStateCheckout,
  formData: FormData,
): Promise<FormStateCheckout> {

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const supabase = await createClient();
  const session = await auth();

  const rawData = Object.fromEntries(formData);
  const data = {
    firstName: rawData.firstName as string | "",
    lastName: rawData.lastName as string | "",
    email: rawData.email as string | "",
    cc: rawData.cc as string | "",
  };
  const validateData = formSchemaCheckout.safeParse(data);

  if (!validateData.success) {
    return {
      success: false,
      errors: validateData.error.flatten().fieldErrors,
      currentData: data,
    };
  }

  if (!session || !session.user?.email) {
    return {
      success: false,
      errors: {
        email: ["Security breach: No active session found. Please log in."],
      },
      currentData: data,
    };
  }

  if (session.user.email !== data.email) {
    return {
      success: false,
      errors: {
        email: [
          "Security breach: Form email does not match the authenticated session.",
        ],
      },
      currentData: data,
    };
  }

  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    cc: data.cc,
  };

  let serverTotalPrice = 0;
  let serverItemsCount = 0;

  try {
    for (const item of cart) {
      const secureTrip = TRIPS.find((t) => t.id === item.trip.id);

      if (!secureTrip) {
        return {
          success: false,
          errors: { email: ["Data breach detected: Invalid email signature."] },
          currentData: data,
        };
      }



      const passengerCount = Number(item.passengers) || 0;

      serverItemsCount += passengerCount;
      serverTotalPrice += Number(secureTrip.price) * passengerCount;
    }

    if (Number(serverItemsCount) !== Number(itemsCart) || Number(serverTotalPrice) !== Number(totalPrice) ) {
      return {
        success: false,
        errors: {
          email: [
            "Telemetry mismatch: Transaction values altered. Order aborted for security.",
          ],
        },
        currentData: data,
      };
    }
  } catch (err) {
    return {
      success: false,
      errors: { email: ["Failed to verify mission manifest credentials."] },
      currentData: data,
    };
  }

  try {

    const { data: currentUser, error: findError } = await supabase
      .from("users")
      .select("id")
      .eq("email", session.user.email) 
      .maybeSingle();

    if (findError || !currentUser) {
      return {
        success: false,
        errors: { email: ["Account verification failed. Please re-login."] },
        currentData: data,
      };
    }

    const { error: orderError } = await supabase.from("orders").insert({
      user_id: currentUser.id,          
      email: data.email,       
      first_name: data.firstName,      
      last_name: data.lastName,         
      cc: data.cc,             
      price_paid: serverTotalPrice,     
      status: "completed",
      items: cart,                    
    });

    if (orderError) {
      console.error("Errore inserimento ordine:", orderError);
      return {
        success: false,
        errors: { email: [`Order storage failure: ${orderError.message}`] },
        currentData: data,
      };
    }

    revalidatePath("/shop","layout");
    


  } catch (e) {
    return {
      success: false,
      errors: {
        email: [
          "Sub-space link failure. Connection to the database could not be established. Please retry.",
        ],
      },
      currentData: data,
    };
  }

  return {
    success: true,
    errors: {},
    currentData: data,
  };
}
