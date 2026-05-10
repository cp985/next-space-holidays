'use client';

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  slug: string
}
export default function PlanetsDialog({ slug }: Props) {

const router = useRouter();
  return (
    <Dialog    open={true}
      onOpenChange={() => router.back()}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle> PlanetsDetails {slug}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
