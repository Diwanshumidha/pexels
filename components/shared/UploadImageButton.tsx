"use client";
import { PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUploadModal } from "@/lib/modal/UploadMoreModal";

const UploadImageButton = () => {
  const { openModal } = useUploadModal();
  return (
    <Button className="gap-2" onClick={openModal}>
      <PlusIcon size={20} /> Upload Image
    </Button>
  );
};

export default UploadImageButton;
