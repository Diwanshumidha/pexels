import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Image from "next/image";
import {
  ContactIcon,
  HomeIcon,
  InfoIcon,
  MenuIcon,
  PlusIcon,
  ServerIcon,
} from "lucide-react";
import { auth } from "@/auth";
import UploadImageButton from "./UploadImageButton";
import { UserAvatar } from "../ui/avatar";

export async function Navbar() {
  const session = await auth();
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link className="flex items-center gap-2" href="/">
        <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
        <span className="text-lg font-semibold">Magica</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        <Link className="hover:underline hover:underline-offset-4" href="#">
          Home
        </Link>
        <Link className="hover:underline hover:underline-offset-4" href="#">
          About
        </Link>
        <Link className="hover:underline hover:underline-offset-4" href="#">
          Services
        </Link>
        <Link className="hover:underline hover:underline-offset-4" href="#">
          Contact
        </Link>

        {session?.user ? (
          <>
            <UploadImageButton />
          </>
        ) : null}

        {session?.user ? (
          <UserAvatar
            alt="Profile"
            name={session.user.name || "User"}
            width={40}
            height={40}
            size="size-10"
            src={session.user.image || "/logo.svg"}
            className=" size-10"
          />
        ) : null}
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="md:hidden" side="left">
          <div className="grid gap-4 py-6">
            <Link
              className="flex items-center gap-2 text-lg font-medium"
              href="#"
            >
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            <Link
              className="flex items-center gap-2 text-lg font-medium"
              href="#"
            >
              <InfoIcon className="h-5 w-5" />
              About
            </Link>
            <Link
              className="flex items-center gap-2 text-lg font-medium"
              href="#"
            >
              <ServerIcon className="h-5 w-5" />
              Services
            </Link>
            <Link
              className="flex items-center gap-2 text-lg font-medium"
              href="#"
            >
              <ContactIcon className="h-5 w-5" />
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
