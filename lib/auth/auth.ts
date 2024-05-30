import "server-only";
import { auth } from "@/auth";
import { db } from "@/prisma/prisma";

export const checkAuthentication = async () => {
  const session = await auth();

  if (!session?.user.id || !session.user.email) {
    return null;
  }
  return session.user.id;
};

export const getCurrentUser = async () => {
  const session = await auth();

  if (!session?.user.id || !session.user.email) {
    return null;
  }

  return await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
};
