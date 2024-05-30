"use client";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IncreaseUserUploadLimit } from "../user/user";

interface BearState {
  isLimitModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setModalOpenState: (to: boolean) => void;
}

export const useLimitModal = create<BearState>()((set) => ({
  isLimitModalOpen: false,
  openModal: () => set(() => ({ isLimitModalOpen: true })),
  closeModal: () => set(() => ({ isLimitModalOpen: false })),
  setModalOpenState: (to: boolean) => set(() => ({ isLimitModalOpen: to })),
}));

export const LimitModal = () => {
  const { isLimitModalOpen, setModalOpenState } = useLimitModal();

  const IncreaseUploadLimit = async () => {
    await IncreaseUserUploadLimit();
    setModalOpenState(false);
  };

  return (
    <Dialog open={isLimitModalOpen} onOpenChange={setModalOpenState}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Limit Exceeded</DialogTitle>
          <DialogDescription>
            The Limit of Uploading Image is completed
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
