import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState, useActionState, useRef } from "react";
import { actionFormSub, type FormStateSub } from "../../../action/actionForm";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Field, FieldGroup, FieldError } from "../ui/field";

const initialState: FormStateSub = {
  success: false,
  errors: {},
  currentData: { email: "", username: "", password: "", confirmPassword: "" },
};

export default function FormLogin() {
  const footerClass = cn(
    "!flex !flex-col-reverse md:!flex-row !justify-center !items-center !gap-3 !pt-4 !px-2",
  );

  const toggleBtnClass = cn(
    "!bg-transparent !border-0 !w-auto !h-auto",
    "!mx-auto !block",
    "text-cyan-400/60 hover:text-cyan-300",
    "!text-[0.65rem] !tracking-widest !uppercase",
    "!px-2 !py-1 !mt-1",
  );

  const fieldGroupCont = cn("!overflow-y-auto !px-4 !py-1 ", "flex flex-col");

  const fieldTwoInput = cn("flex flex-col md:flex-row md:justify-between md:items-center gap-3");

  const formClass = cn("!flex !flex-col !h-full !gap-2 !px-4 ");

  const inputClass = cn(
    "!h-10 !bg-white/5 !border-white/10",
    "!text-white placeholder:!text-white/20",
    "focus:!border-cyan-500/60",
    "!rounded-lg !mt-1",
  );

  const dialogClass = cn(
    "w-[95vw] sm:w-[80vw]! sm:max-w-3xl! max-h-[90vh]!",
    "overflow-y-auto! rounded-2xl! px-6! py-3!",
    "bg-[#050d1a]/95! backdrop-blur-xl!",
    "border! border-cyan-500/30!",
  );

  const errorFieldClass = cn("text-red-400 text-xs mt-1");

  // Label degli input
  const labelClass = cn(
    "text-cyan-300/80 text-sm font-medium tracking-wide uppercase",
  );

  // Titolo dialog — da aggiungere al DialogTitle
  const titleClass = cn(
    "text-2xl font-light tracking-[0.15em] uppercase",
    "text-transparent bg-clip-text",
    "bg-gradient-to-r from-cyan-300 to-blue-400",
  );

  // Descrizione dialog
  const descClass = cn("text-white/40 text-sm tracking-wide");

  // Bottone submit principale
  const submitBtnClass = cn(
    "bg-gradient-to-r from-cyan-500 to-blue-600 w-full md:!w-2/5",
    "hover:from-cyan-400 hover:to-blue-500",
    "text-white font-medium tracking-wider uppercase text-sm",
    "border-0 rounded-xl px-6",
    "transition-all duration-200",
    "shadow-[0_0_20px_rgba(0,200,255,0.25)]",
    "hover:shadow-[0_0_30px_rgba(0,200,255,0.4)]",
  );

  // Bottone cancel/outline
  const cancelBtnClass = cn(
    "bg-transparent border border-white/10 md:!w-2/5",
    "text-white/60 hover:text-white",
    "hover:bg-white/5 hover:border-white/20",
    "rounded-xl tracking-wider uppercase text-sm",
    "transition-all duration-200",
  );

  const [isSignIn, setIsSignIn] = useState(true);
  const [data, actionF, isPending] = useActionState(
    actionFormSub,
    initialState,
  );

  return (
    <DialogContent className={dialogClass}>
      <DialogHeader>
        <DialogTitle className={titleClass}>
          {isSignIn ? "Sign Up" : "Sign In"}
        </DialogTitle>
        <DialogDescription className={descClass}>
          {isSignIn
            ? "Choose a username and password for sign up"
            : "Enter your email and password to sign in"}
        </DialogDescription>
      </DialogHeader>
      <form className={formClass} action={actionF}>
        <FieldGroup className={fieldGroupCont}>
          <div className={fieldTwoInput}>
            <Field>
              <Label className={labelClass} htmlFor="email">
                Email
              </Label>
              <Input
                className={inputClass}
                required
                id="email"
                name="email"
                defaultValue={data.currentData.email || ""}
              />
              {data.errors.email && data.errors.email?.length > 0 && (
                <FieldError className={errorFieldClass}>
                  {data.errors.email?.[0]}
                </FieldError>
              )}
            </Field>
            <Field>
              <Label className={labelClass} htmlFor="username">
                Username
              </Label>
              <Input
                className={inputClass}
                required
                id="username"
                name="username"
                defaultValue={data.currentData.username || ""}
              />
              {data.errors.username && data.errors.username?.length > 0 && (
                <FieldError className={errorFieldClass}>
                  {data.errors.username?.[0]}
                </FieldError>
              )}
            </Field>
          </div>

          <div className={fieldTwoInput}>

                     <Field>
            <Label className={labelClass} htmlFor="password">
              Password
            </Label>
            <Input
              className={inputClass}
              required
              id="password"
              name="password"
              defaultValue={data.currentData.password || ""}
            />
            {data.errors.password && data.errors.password?.length > 0 && (
              <FieldError className={errorFieldClass}>
                {data.errors.password?.[0]}
              </FieldError>
            )}
          </Field>

          {isSignIn && (
            <Field>
              <Label className={labelClass} htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <Input
                className={inputClass}
                required
                id="confirmPassword"
                name="confirmPassword"
                defaultValue={data.currentData.confirmPassword || ""}
              />

                         {data.errors.password && data.errors.confirmPassword?.length > 0 && (
              <FieldError className={errorFieldClass}>
                {data.errors.password?.[0]}
              </FieldError>
            )}
            </Field>
            
          )}
          </div>

 
        </FieldGroup>
        <DialogFooter className={footerClass}>
          <DialogClose asChild>
            <Button className={cancelBtnClass} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button className={submitBtnClass} disabled={isPending} type="submit">
            {isSignIn ? "Sign Up" : "Sign In"}
          </Button>
        </DialogFooter>
        <Button
          className={toggleBtnClass}
          type="button"
          onClick={() => setIsSignIn(!isSignIn)}
        >
          {!isSignIn ? "Don't have an account?" : "You have already an account?"}
        </Button>
      </form>
    </DialogContent>
  );
}
