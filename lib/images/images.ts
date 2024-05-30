"use server";
import { db } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";

const LIMIT = 10;
export const getLatestImages = async (page: number) => {
  const skip = (page - 1) * LIMIT;
  console.log(skip);
  const imagesPromise = db.image.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    take: LIMIT,
    skip: skip,
    include: {
      User: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const TotalImagesPromise = db.image.count();

  const [images, TotalImages] = await Promise.all([
    imagesPromise,
    TotalImagesPromise,
  ]);

  if (!images) return { images: [], total: TotalImages };
  return { images, total: TotalImages };
};
