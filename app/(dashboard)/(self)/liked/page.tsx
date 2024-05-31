import { auth, signIn } from "@/auth";
import { db } from "@/prisma/prisma";
import React from "react";
import UserGalleryLayout from "../../_components/user-gallery-layout";
import { notFound, redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session?.user.id) {
    // return signIn();
    return redirect("/api/auth/signin");
  }

  const userWithLikedImages = await db.user.findFirst({
    where: {
      id: session?.user.id,
      email: session?.user.email || undefined,
    },
    select: {
      likedImages: true,
      name: true,
      _count: {
        select: {
          images: true,
        },
      },
      image: true,
    },
  });

  if (!userWithLikedImages) {
    return notFound();
  }
  return (
    <UserGalleryLayout
      images={userWithLikedImages?.likedImages}
      isSelf={false}
      thumbnail={userWithLikedImages?.likedImages[0]}
      totalImages={userWithLikedImages?._count.images}
      user={{
        name: userWithLikedImages?.name,
        profileImage: userWithLikedImages?.image,
      }}
      title={`${session?.user.name}`}
    />
  );
};

export default Page;
