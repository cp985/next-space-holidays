import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState, useActionState,useEffect } from "react";


import { useRouter } from "next/navigation";
import {
  actionFormSub,
  type FormStateSub,
  actionFormLogIn,
  type FormStateLogin,
} from "../../../action/actionForm";
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
import FormSuccess from "./FormSuccess";

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
  onPendingChange: (isPending: boolean) => void;
  onSuccess?: () => void;
}

export default function FormLogin( { onPendingChange, onSuccess }: Props) {

const router = useRouter();
const searchParams = useSearchParams();
  const error = searchParams.get("error");


  const [isSignIn, setIsSignIn] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [dataLogIn, actionLogIn, isPendingLogIn] = useActionState(
    actionFormLogIn,
    initialStateLogIn,
  );

  const [dataSub, actionSub, isPendingSub] = useActionState(
    actionFormSub,
    initialStateSub,
  );

  const data = !isSignIn ? dataLogIn : dataSub;

  const action = !isSignIn ? actionLogIn : actionSub;
  const isPending = !isSignIn ? isPendingLogIn : isPendingSub;


const isSuccess = !isSignIn
  ? dataLogIn?.success
  : dataSub?.success;


 useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending]);



useEffect(() => {

  if (!isSuccess) return;

  
  router.refresh();

  const t = setTimeout(() => {
    router.replace("/shop");
  }, 2000);

  return () => clearTimeout(t);

}, [isSuccess, router]);

  const footerClass = cn(
    "flex mt-3! flex-col-reverse sm:flex-row justify-center items-center gap-3 pt-4 px-2",
  );

  const toggleBtnClass = cn(
    "!bg-transparent !border-0 !w-auto !h-auto",
    "!mx-auto !block",
    "text-cyan-400/60! hover:text-cyan-300!",
    "!text-[0.65rem] !tracking-widest !uppercase",
    "!px-2 !py-1 !mt-1",
  );

  const fieldGroupCont = cn("!overflow-y-auto !px-4 !py-1 ", "flex flex-col gap-2");

  const fieldTwoInput = cn(
    "flex flex-col md:flex-row md:justify-between md:items-center gap-3",
  );

  const formClass = cn("!flex !flex-col justify-start !h-full !gap-2 !px-4 ");

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
    "flex flex-col justify-start",
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
    "bg-gradient-to-r from-cyan-500 to-blue-600 w-full sm:w-2/5",
    "hover:from-cyan-400 hover:to-blue-500",
    "text-white! font-medium tracking-wider uppercase text-sm",
    "border-0 rounded-xl px-6",
    "transition-all duration-200 ",
    "shadow-[0_0_20px_rgba(0,200,255,0.25)]",
    "hover:shadow-[0_0_30px_rgba(0,200,255,0.4)] ",
    "flex items-center justify-center gap-2 text-center",
  );

  const spinnerButtonClass = cn(
    "animate-spin rounded-full h-4 w-4 border-t-2 border-cyan-400!  ",
  );

  const spanLoader = cn("flex justify-center w-full gap-4 items-center space-x-3 ");

  // Bottone cancel/outline
  const cancelBtnClass = cn(
    "bg-transparent border border-white/10 md:!w-2/5",
    "text-white/60! hover:text-white!",
    "hover:bg-white/5! hover:border-white/20",
    "rounded-xl tracking-wider uppercase text-sm",
    "transition-all duration-200",
  );

  const passCont = cn("flex items-center gap-2 sm:pr-5");

  if(data.success) return <FormSuccess   />

  function toggleSignIn() {
    setIsSignIn((prev) => !prev);
  }

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
{error && <h2 className={errorFieldClass}>Login error.Please try again </h2> }
      <form className={formClass} action={action}>
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
            {isSignIn && (
              <Field>
                <Label className={labelClass} htmlFor="username">
                  Username
                </Label>
                <Input
                  className={inputClass}
                  required
                  id="username"
                  name="username"
                  defaultValue={
                    (data as FormStateSub).currentData.username || ""
                  }
                />
                {data.errors.username && data.errors.username?.length > 0 && (
                  <FieldError className={errorFieldClass}>
                    {data.errors.username?.[0]}
                  </FieldError>
                )}
              </Field>
            )}
          </div>

          <div className={fieldTwoInput}>
            <Field>
              <Label className={labelClass} htmlFor="password">
                Password
              </Label>
              <div className={passCont}>
                <Input
                  className={inputClass}
                  required
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  defaultValue={data.currentData.password || ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <Eye /> : <EyeOff />}
                </Button>
              </div>

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

                <div className={passCont}>
                  <Input
                    className={inputClass}
                    required
                    type={isPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    defaultValue={
                      (data as FormStateSub).currentData.confirmPassword || ""
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <Eye /> : <EyeOff />}
                  </Button>
                </div>

                {data.errors.confirmPassword &&
                  data.errors.confirmPassword?.length > 0 && (
                    <FieldError className={errorFieldClass}>
                      {data.errors.confirmPassword?.[0]}
                    </FieldError>
                  )}
              </Field>
            )}
          </div>
        </FieldGroup>
        <DialogFooter className={footerClass}>
          <DialogClose asChild>
            <Button className={cancelBtnClass} disabled={isPending} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button className={submitBtnClass} disabled={isPending} type="submit">
            {isPending ? (
              <span className={spanLoader}>
                <span className={spinnerButtonClass}></span>{" "}
                <span> Loading</span>
              </span>
            ) : isSignIn ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
        </DialogFooter>
        <Button
        disabled={isPending}
          className={toggleBtnClass}
          type="button"
          onClick={toggleSignIn}
        >
          {!isSignIn
            ? "Don't have an account?"
            : "You have already an account?"}
        </Button>
      </form>
    </DialogContent>
  );
}
