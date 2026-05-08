import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useState, useActionState, useRef } from "react";
import { actionFormSub, type FormState } from "../../../action/actionForm";
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

const initialState: FormState = {
  success: false,
  errors: {},
  currentData: { email: "", username: "", password: "" },
};

export default function FormLogin() {
  const dialogClass = cn(
    " w-[95vw] md:w-2/3 max-h-[80vh] overflow-y-auto rounded-lg p-4! bg-background border shadow-lg z-100",
  );
  const fieldGroupCont = cn("flex-1 overflow-y-auto px-1 py-4 space-y-4");
  const formClass = cn("flex flex-col h-full p-4!");
  const errorFieldClass = cn("text-destructive");

  const [isSignIn, setIsSignIn] = useState(true);
  const [data, actionF, isPending] = useActionState(
    actionFormSub,
    initialState,
  );

  return (
    <DialogContent className={dialogClass}>
      <DialogHeader>
        <DialogTitle>{isSignIn ? "Sign Up" : "Sign In"}</DialogTitle>
        <DialogDescription>
          Enter your email and password to sign in
        </DialogDescription>
      </DialogHeader>
      <form className={formClass} action={actionF}>
        <FieldGroup className={fieldGroupCont}>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
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
            <Label htmlFor="username">Username</Label>
            <Input
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
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
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
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} type="submit">
            {isSignIn ? "Sign Up" : "Sign In"}
          </Button>
        </DialogFooter>
        <Button type="button" onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? "Don't have an account?" : "You have already an account?"}
        </Button>
      </form>
    </DialogContent>
  );
}
