"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FormLogin from "@/components/custom/FormLogin";
import { cn } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();
  const pathname = usePathname();

const [locked, setLocked] = useState(false);
const isOpen = pathname.includes("login");

  const handleOpenChange = (open: boolean) => {
    if (!open && locked) return; 
    if (!open) router.back();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} >
      <FormLogin
        onPendingChange={setLocked}
        onSuccess={() => router.replace("/shop")}
      />
    </Dialog>
  );
}
