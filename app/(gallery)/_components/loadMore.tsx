"use client";
import React, { useEffect, useState } from "react";
import Spinner from "./spinner";
import { useInView } from "react-intersection-observer";
import { getLatestImages } from "@/lib/images/images";
import { ImageWithUser } from "@/lib/types/prisma";
import ImageGallery from "./ImageGallery";
import { useSession } from "next-auth/react";

type props = {
  likedImages: string[] | undefined;
  savedImages: string[] | undefined;
  initialImages: ImageWithUser[];
};
const LoadMore = ({ initialImages, likedImages, savedImages }: props) => {
  const [Images, setImages] = useState<ImageWithUser[]>(initialImages);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const session = useSession();

  const { ref, inView } = useInView();
  const loadMore = async () => {
    if (!hasMore) return;
    console.log("Loading....");
    const nextPage = pagesLoaded + 1;
    const newImages = await getLatestImages(nextPage);
    console.log(newImages);

    if (newImages.total <= Images.length) {
      setHasMore(false);
    }
    setImages([...Images, ...newImages.images]);
    setPagesLoaded(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <div>
      <ImageGallery
        images={Images}
        isAuthenticated={session.status === "authenticated"}
        likedImages={likedImages}
        savedImages={savedImages}
      />
      <div ref={ref} className="w-full flex items-center justify-center py-2">
        {hasMore ? <Spinner /> : null}
      </div>
    </div>
  );
};

export default LoadMore;
