"use client";
import { Toaster } from "@/components/ui/sonner";
import { LimitModal } from "./LimitModal";
import { UploadModal } from "./UploadMoreModal";

export default function ModalProvider() {
  return (
    <>
      <LimitModal />
      <UploadModal />
      <Toaster />
    </>
  );
}
