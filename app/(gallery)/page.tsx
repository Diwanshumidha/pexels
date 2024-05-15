import { auth } from "@/auth";
import { AddImageToCloudinaryAction } from "@/lib/images/actions";
import { getLatestImages } from "@/lib/images/images";
import React from "react";

const Page = async () => {
  const session = await auth();
  const images = await getLatestImages();
  return (
    <div>
      Gallery {session?.user.email} {session?.user.role}
      {images.map((image) => {
        return <img src={image.image} alt={image.name} />;
      })}
    </div>
  );
};

export default Page;
