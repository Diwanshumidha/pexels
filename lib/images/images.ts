import { db } from "@/prisma/prisma";

export const getLatestImages = async () => {
  const images = await db.image.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (!images) return [];
  return images;
};
