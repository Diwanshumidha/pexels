import { db } from "@/prisma/prisma";

export const getUserById = async (id: string) => {
  const user = await db.user.findFirst({
    where: {
      id,
    },
  });

  if (!user || !user.id) return null;
  return user;
};
