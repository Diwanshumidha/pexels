"use client";
import React, { useState } from "react";
import ImageCard from "./ImageCard";
import { Image, Prisma } from "@prisma/client";
import Lightbox from "yet-another-react-lightbox";

import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { ImageWithUser } from "@/lib/types/prisma";
import { motion } from "framer-motion";

type ImageGallery = {
  images: ImageWithUser[];
  savedImages: string[] | undefined;
  likedImages: string[] | undefined;
  isAuthenticated: boolean;
};

const ImageGallery = ({
  images,
  savedImages,
  likedImages,
  isAuthenticated,
}: ImageGallery) => {
  const [index, setIndex] = useState(-1);
  const onOpen = (index: number) => {
    setIndex(index);
  };

  return (
    <motion.div
      layout
      className="columns-1 gap-1 sm:columns-2  md:columns-3 lg:columns-4 space-y-3 sm:space-y-1"
    >
      <Lightbox
        plugins={[Zoom, Download, Thumbnails]}
        open={index >= 0}
        index={index}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        close={() => setIndex(-1)}
        slides={images.map((image) => ({
          src: image.image,
          download: {
            filename: image.name.replaceAll(" ", "_").toLowerCase(),
            url: image.image,
          },
        }))}
      />

      {images.map((image, idx) => {
        return (
          <motion.div key={image.id}>
            <ImageCard
              isSaved={!!savedImages?.includes(image.id)}
              isLiked={!!likedImages?.includes(image.id)}
              isAuthenticated={isAuthenticated}
              image={image}
              onOpen={onOpen}
              index={idx}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ImageGallery;
