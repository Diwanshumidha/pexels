import { auth } from "@/auth";
import SignOutButton from "@/components/shared/auth/signout-button";
import { AddImageToCloudinaryAction } from "@/lib/images/actions";
import { getLatestImages } from "@/lib/images/images";
import { Heart } from "lucide-react";
import React from "react";
import ImageCard from "./_components/ImageCard";
import { db } from "@/prisma/prisma";
import { User } from "@prisma/client";

import ImageGallery from "./_components/ImageGallery";
import LoadMore from "./_components/loadMore";
import Hero_section from "./_components/hero_section";

const Page = async () => {
  const session = await auth();
  let user: User | null = null;
  if (session?.user) {
    user = await db.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });
  }

  const images = await getLatestImages(1);

  return (
    <div className="container mx-auto">
      <Hero_section />
      <LoadMore
        likedImages={user?.likedImagesIds}
        savedImages={user?.savedImagesIds}
        initialImages={images.images}
      />
    </div>
  );
};

export default Page;
