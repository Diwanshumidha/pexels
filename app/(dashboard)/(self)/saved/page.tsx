import { auth } from "@/auth";
import { db } from "@/prisma/prisma";
import React from "react";
import UserGalleryLayout from "../../_components/user-gallery-layout";
import { notFound } from "next/navigation";

const Page = async () => {
  const session = await auth();
  const userWithSavedImages = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    select: {
      savedImages: true,
      name: true,
      _count: {
        select: {
          images: true,
        },
      },
      image: true,
    },
  });

  if (!userWithSavedImages) {
    return notFound();
  }
  return (
    <UserGalleryLayout
      images={userWithSavedImages?.savedImages}
      isSelf={false}
      thumbnail={userWithSavedImages?.savedImages[0]}
      totalImages={userWithSavedImages?._count.images}
      user={{
        name: userWithSavedImages?.name,
        profileImage: userWithSavedImages?.image,
      }}
      title="Liked Images"
    />
  );
};

export default Page;
