import ImageCard from "@/app/(gallery)/_components/ImageCard";
import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { getUserById } from "@/lib/user/user";
import { Heart, LibraryBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useMemo } from "react";
import UserGalleryLayout from "../../_components/user-gallery-layout";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await getUserById(params.id);
  const session = await auth();

  if (!user) {
    return notFound();
  }
  const isSelf = session?.user.id === user.id;

  const randomImage = user.images[0];

  return (
    <UserGalleryLayout
      isSelf={isSelf}
      thumbnail={randomImage}
      user={{ name: user.name, profileImage: user.image }}
      images={user.images}
      totalImages={user._count.images}
      title={`${isSelf ? "Your" : user?.name} Artwork`}
    />
  );
};

export default Page;
