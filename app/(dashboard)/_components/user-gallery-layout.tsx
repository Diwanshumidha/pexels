import ImageCard from "@/app/(gallery)/_components/ImageCard";
import { UserAvatar } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { ReturnGetUserById } from "@/lib/user/user";
import { Image, Prisma, User } from "@prisma/client";
import { Heart, LibraryBig } from "lucide-react";
import Link from "next/link";
import React from "react";

type props = {
  thumbnail: Image;
  images: Image[];
  user: {
    name: string | null;
    profileImage: string | null;
  };
  totalImages: number;
  isSelf: boolean;
  title: string;
};
const UserGalleryLayout = ({
  isSelf,
  thumbnail,
  user,
  images,
  totalImages,
  title,
}: props) => {
  return (
    <div>
      <div className="relative h-[40svh]">
        <img
          src={thumbnail.image}
          className="w-full object-cover h-full "
          alt={thumbnail.name}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

        <div className=" absolute bottom-0   left-0 w-full translate-y-1/2 ">
          <div className="container mx-auto">
            <UserAvatar
              src={
                user?.profileImage || "https://placehold.co/600x400/EEE/31343C"
              }
              alt="user Image"
              className=" border-white border-solid border-4 rounded-full shadow-white shadow-2xl italic    "
              name={user?.name || "User"}
              size="size-28 text-3xl font-bold text-white"
            />
            <img />
          </div>
        </div>
      </div>
      <div className="pt-16 flex justify-between container mx-auto">
        <div>
          <h2 className="text-2xl font-medium">{title}</h2>
          <p>{totalImages} Images</p>
        </div>
        {isSelf ? (
          <div className=" flex gap-4">
            <Link
              href={"/liked"}
              className={buttonVariants({ className: "gap-2" })}
            >
              <Heart size={15} />
              Liked Images
            </Link>
            <Link
              href={"/liked"}
              className={buttonVariants({
                variant: "outline",
                className: "gap-2",
              })}
            >
              <LibraryBig size={15} />
              Saved Images
            </Link>
          </div>
        ) : null}
      </div>

      <div className="container mx-auto columns-1 mt-6 gap-1 sm:columns-2  md:columns-3 lg:columns-5 space-y-3 sm:space-y-1">
        {images.map((image, idx) => {
          return (
            <ImageCard
              index={idx}
              isSaved={false}
              isLiked={false}
              isAuthenticated={false}
              key={image.id}
              image={{
                ...image,
                User: { image: user.profileImage, name: user.name },
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserGalleryLayout;
