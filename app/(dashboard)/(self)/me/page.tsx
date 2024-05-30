import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return signIn();
  }

  redirect(`/user/${userId}`);
};

export default Page;
