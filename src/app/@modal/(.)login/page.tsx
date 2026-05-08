"use client";

import { useRouter } from "next/navigation";
import FormLogin from "@/components/custom/FormLogin";
import { cn } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";

export default function LoginModal() {
  const router = useRouter();

  return (
    <Dialog
     
      open={true}
      onOpenChange={() => router.back()}
    >
      <FormLogin />
    </Dialog>
  );
}
