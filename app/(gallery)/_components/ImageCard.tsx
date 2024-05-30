"use client";
import { UserAvatar } from "@/components/ui/avatar";
import {
  AddImageToSavedAction,
  DislikeImageAction,
  LikeImageAction,
  RemoveImageFromSavedAction,
} from "@/lib/images/actions";
import { Prisma } from "@prisma/client";
import {
  Bookmark,
  BookmarkXIcon,
  DownloadIcon,
  Heart,
  HeartHandshake,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useOptimistic } from "react";

type props = {
  image: Prisma.ImageGetPayload<{
    include: {
      User: {
        select: {
          image: true;
          name: true;
        };
      };
    };
  }>;
  isLiked: boolean;
  isSaved: boolean;
  isAuthenticated: boolean;
  onOpen?: (index: number) => void;
  index: number;
};

const ImageCard = ({
  image,
  isLiked,
  isSaved,
  isAuthenticated,
  index,
  onOpen,
}: props) => {
  const [isLikedOptimistic, setLikedOptimistic] = useOptimistic(isLiked);
  const [isSavedOptimistic, setSavedOptimistic] = useOptimistic(isSaved);

  const LikeDislikeImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikedOptimistic(false);
      await DislikeImageAction(image.id);
    } else {
      setLikedOptimistic(true);
      const res = await LikeImageAction(image.id);
      console.log(res);
    }
  };

  const ToggleSaveImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      setSavedOptimistic(false);
      await RemoveImageFromSavedAction(image.id);
    } else {
      setSavedOptimistic(true);
      await AddImageToSavedAction(image.id);
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = image.image;
    link.download = image.name;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="relative group "
      role="button"
      onClick={() => (onOpen ? onOpen(index) : null)}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[3px] hidden  group-hover:block"></div>
      <div className="absolute z-20 p-3 inset-0 text-white hidden  flex-col justify-between  group-hover:flex">
        {isAuthenticated ? (
          <div className="flex justify-between">
            <div className=" flex gap-3">
              <button onClick={LikeDislikeImage}>
                {isLikedOptimistic ? (
                  <HeartHandshake className="text-red-600" />
                ) : (
                  <Heart className="hover:text-red-600 hover:fill-red-600" />
                )}
              </button>
              <button onClick={ToggleSaveImage}>
                {!isSavedOptimistic ? (
                  <Bookmark className="hover:text-red-600 hover:fill-red-600" />
                ) : (
                  <BookmarkXIcon className="text-red-600 fill-red-600 hover:fill-none" />
                )}
              </button>
            </div>
            <button onClick={handleDownload}>
              <DownloadIcon />
            </button>
          </div>
        ) : null}

        <div>
          <Link
            href={`/user/${image.userId}`}
            className="flex items-center gap-2 "
            onClick={(e) => e.stopPropagation()}
          >
            {image.User.image ? (
              <UserAvatar
                alt={image.User.name || "User Image"}
                name={image.User.name || "DM"}
                src={image.User.image}
                className="size-8 rounded-full"
              />
            ) : null}
            <span className="hover:underline">{image.User.name}</span>
          </Link>
        </div>
      </div>

      <img
        key={image.imageId}
        src={image.image}
        alt={image.name}
        loading="lazy"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dibqdu3zb/image/upload/w_640/e_blur:1000,q_1,f_auto/${image.imageId}")`,
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

export default ImageCard;
