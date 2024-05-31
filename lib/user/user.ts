"use server";
import { auth } from "@/auth";
import { db } from "@/prisma/prisma";
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from "next/dist/shared/lib/constants";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        images: true,
        _count: {
          select: {
            images: true,
          },
        },
      },
    });

    if (!user || !user.id) return null;
    return user;
  } catch {
    return null;
  }
};

export type ReturnGetUserById = Awaited<ReturnType<typeof getUserById>>;

export const IncreaseUserUploadLimit = async () => {
  const session = await auth();
  if (!session) {
    return;
  }
  const user = await db.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      imagesAllowed: {
        increment: 3,
      },
    },
  });

  return user;
};
