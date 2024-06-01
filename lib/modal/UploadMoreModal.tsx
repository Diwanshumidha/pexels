"use client";
import { create } from "zustand";

import UploadForm from "@/components/forms/upload-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ImagePlus } from "lucide-react";
import { useSession } from "next-auth/react";

interface ModalState {
  isUploadModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setModalOpenState: (to: boolean) => void;
}

export const useUploadModal = create<ModalState>()((set) => ({
  isUploadModalOpen: false,
  openModal: () => set(() => ({ isUploadModalOpen: true })),
  closeModal: () => set(() => ({ isUploadModalOpen: false })),
  setModalOpenState: (to: boolean) => set(() => ({ isUploadModalOpen: to })),
}));

export const UploadModal = () => {
  const { isUploadModalOpen, setModalOpenState } = useUploadModal();
  const session = useSession();

  if (session.status !== "authenticated") {
    return null;
  }

  return (
    <Drawer open={isUploadModalOpen} onOpenChange={setModalOpenState}>
      <DrawerContent style={{ height: "90svh" }}>
        <DrawerHeader>
          <DrawerTitle className="flex gap-3 items-center">
            <ImagePlus />
            Upload Image
          </DrawerTitle>
          <DrawerDescription>Here You Can Upload Images</DrawerDescription>
        </DrawerHeader>
        <div className=" py-14 h-full  " style={{ overflow: "auto" }}>
          <UploadForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
