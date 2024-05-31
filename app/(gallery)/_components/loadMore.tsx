"use client";
import React, { useEffect, useState } from "react";
import Spinner from "./spinner";
import { useInView } from "react-intersection-observer";
import { getLatestImages } from "@/lib/images/images";
import { ImageWithUser } from "@/lib/types/prisma";
import ImageGallery from "./ImageGallery";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

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

  const { ref, inView } = useInView({ rootMargin: "1000px", threshold: 0.1 });

  useEffect(() => {
    const loadMore = async () => {
      if (!hasMore) return;

      const nextPage = pagesLoaded + 1;
      const newImages = await getLatestImages(nextPage);

      if (newImages.total === Images.length) {
        setHasMore(false);
      }
      setImages([...Images, ...newImages.images]);
      setPagesLoaded(nextPage);
    };

    if (inView) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, Images]);

  return (
    <div>
      <ImageGallery
        images={Images}
        isAuthenticated={session.status === "authenticated"}
        likedImages={likedImages}
        savedImages={savedImages}
      />
      <div
        ref={ref}
        className="w-full relative flex items-center justify-center py-2"
      >
        {hasMore ? <Spinner /> : null}
      </div>
    </div>
  );
};

export default LoadMore;
