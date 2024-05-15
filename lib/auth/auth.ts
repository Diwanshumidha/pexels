import { auth } from "@/auth";

export const checkAuthentication = async () => {
  const session = await auth();

  if (!session?.user.id || !session.user.email) {
    return false;
  }
  return true;
};
