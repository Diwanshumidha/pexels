"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import React from "react";

const SignOutButton = () => {
  return <Button onClick={() => signOut()}>signOut</Button>;
};

export default SignOutButton;
