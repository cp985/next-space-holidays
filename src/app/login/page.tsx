"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import {
  actionFormSub,
  type FormStateSub,
  actionFormLogIn,
  type FormStateLogin,
} from "../../../action/actionForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldError } from "@/components/ui/field";
import FormSuccessPrime from "@/components/custom/FormSuccessPrime"

const initialStateSub: FormStateSub = {
  success: false,
  errors: {},
  currentData: { email: "", username: "", password: "", confirmPassword: "" },
};

const initialStateLogIn: FormStateLogin = {
  success: false,
  errors: {},
  currentData: { email: "", password: "" },
};

interface Props {
  onPendingChange?: (isPending: boolean) => void;
}

export default function Login({ onPendingChange }: Props) {
  const router = useRouter();

  const [isSignIn, setIsSignIn] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [dataLogIn, actionLogIn, isPendingLogIn] = useActionState(
    actionFormLogIn,
    initialStateLogIn
  );

  const [dataSub, actionSub, isPendingSub] = useActionState(
    actionFormSub,
    initialStateSub
  );

  const data = !isSignIn ? dataLogIn : dataSub;
  const action = !isSignIn ? actionLogIn : actionSub;
  const isPending = !isSignIn ? isPendingLogIn : isPendingSub;

  const isSuccess = !isSignIn ? dataLogIn?.success : dataSub?.success;

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  useEffect(() => {
    if (!isSuccess) return;

    const t = setTimeout(() => {
      router.replace("/shop");
    }, 1500);

    return () => clearTimeout(t);
  }, [isSuccess, router]);

  // --- MAPPING DELLO STILE ORIGINALE ---
  
  // Wrapper esterno per centrare la card nella pagina
  const pageWrapper = cn(
    "min-h-dvh w-full flex items-center justify-center p-4",
    "bg-[#020817]" 
  );

  const cardClass = cn(
    "w-full sm:max-w-3xl m-9! p-5! ",
    "rounded-2xl px-6 py-8 gap-3",
    "bg-[#050d1a]/95 backdrop-blur-xl",
    "border border-cyan-500/30",
    "flex flex-col justify-start  shadow-2xl shadow-cyan-500/10"
  );

  const titleClass = cn(
    "text-3xl font-light tracking-[0.15em] uppercase mb-2",
    "text-transparent bg-clip-text",
    "bg-gradient-to-r from-cyan-300 to-blue-400"
  );

  const descClass = cn("text-white/40 text-sm tracking-wide mb-8");

  // Classi ereditate dal tuo codice
  const formClass = cn("flex flex-col gap-5");
  const fieldGroupCont = cn("flex flex-col gap-4");
  const fieldTwoInput = cn("flex flex-col md:flex-row gap-4");
  const inputClass = cn(
    "!h-12 !bg-white/5 !border-white/10 !text-white placeholder:!text-white/20 focus:!border-cyan-500/60 !rounded-lg"
  );
  const labelClass = cn("text-cyan-300/80 text-xs font-medium tracking-widest uppercase mb-1");
  const errorFieldClass = cn("text-red-400 text-xs mt-1");
  const submitBtnClass = cn(
    "bg-gradient-to-r from-cyan-500 to-blue-600 w-full sm:w-2/4",
    "hover:from-cyan-400! hover:to-blue-500! text-white!  uppercase",
    "border-0 rounded-xl h-12 transition-all duration-200 shadow-[0_0_20px_rgba(0,200,255,0.25)] hover:shadow-[0_0_20px_rgba(0,200,255,0.5)]",
    "flex items-center justify-center gap-2 "
  );
  const cancelBtnClass = cn(
    "bg-transparent border border-white/10 w-full sm:w-1/2 h-12",
    "text-white/60! hover:text-white! hover:bg-white/5 rounded-xl tracking-wider uppercase text-sm"
  );
  const toggleBtnClass = cn(
    " bg-transparent border-0 text-cyan-600/60! uppercase text-xs! tracking-widest  mt-6! mx-auto hover:text-cyan-500!"
  );

  if (data.success) {
    return (
      <main className={pageWrapper}>
        <div className={cardClass}>
          <FormSuccessPrime />
        </div>
      </main>
    );
  }

  return (
    <main className={pageWrapper}>
      <section className={cardClass}>
        <header className="mb-6">
          <h1 className={titleClass}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </h1>
          <p className={descClass}>
            {isSignIn
              ? "Choose a username and password for sign up"
              : "Enter your email and password to sign in"}
          </p>
        </header>

        <form action={action} className={formClass}>
          <FieldGroup className={fieldGroupCont}>
            <div className={fieldTwoInput}>
              <Field className="flex-1">
                <Label className={labelClass} htmlFor="email">Email</Label>
                <Input
                  className={inputClass}
                  required
                  id="email"
                  name="email"
                  placeholder="pilot@galaxy.com"
                  defaultValue={data.currentData.email || ""}
                />
                {data.errors.email && (
                  <FieldError className={errorFieldClass}>{data.errors.email[0]}</FieldError>
                )}
              </Field>

              {isSignIn && (
                <Field className="flex-1">
                  <Label className={labelClass} htmlFor="username">Username</Label>
                  <Input
                    className={inputClass}
                    required
                    id="username"
                    name="username"
                    placeholder="StarRunner"
                    defaultValue={(data as FormStateSub).currentData.username || ""}
                  />
                  {data.errors.username && (
                    <FieldError className={errorFieldClass}>{data.errors.username[0]}</FieldError>
                  )}
                </Field>
              )}
            </div>

            <div className={fieldTwoInput}>
              <Field className="flex-1">
                <Label className={labelClass} htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    className={inputClass}
                    required
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    defaultValue={data.currentData.password || ""}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-cyan-400"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {data.errors.password && (
                  <FieldError className={errorFieldClass}>{data.errors.password[0]}</FieldError>
                )}
              </Field>

              {isSignIn && (
                <Field className="flex-1">
                  <Label className={labelClass} htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      className={inputClass}
                      required
                      type={isPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      defaultValue={(data as FormStateSub).currentData.confirmPassword || ""}
                    />
                  </div>
                  {data.errors.confirmPassword && (
                    <FieldError className={errorFieldClass}>{data.errors.confirmPassword[0]}</FieldError>
                  )}
                </Field>
              )}
            </div>
          </FieldGroup>

          <footer className="flex  flex-col-reverse sm:flex-row gap-4 pr-5! mt-8">
            <Button 
              asChild 
              variant="outline" 
              className={cn(cancelBtnClass, isPending && "pointer-events-none opacity-50 cursor-not-allowed")}
              disabled={isPending}
            >
              <Link  href={isPending ? "#" : "/"}>
                <ArrowLeft size={16} className="mr-2" /> Back
              </Link>
            </Button>
            
            <Button className={submitBtnClass} disabled={isPending} type="submit">
              {isPending ? (
                <span className="flex items-center gap-3">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-cyan-400"></span>
                  Loading
                </span>
              ) : isSignIn ? "Initialize Account" : "Access Station"}
            </Button>
          </footer>

          <Button
            disabled={isPending}
            className={toggleBtnClass}
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {!isSignIn
              ? "Are you new here? Sign Up"
              : "Do you already have an account? "}
          </Button>
        </form>
      </section>
    </main>
  );
}