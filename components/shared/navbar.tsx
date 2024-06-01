import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import Image from "next/image";
import {
  ContactIcon,
  Github,
  HomeIcon,
  InfoIcon,
  MenuIcon,
  PlusIcon,
  ServerIcon,
  User,
} from "lucide-react";
import { auth } from "@/auth";
import UploadImageButton from "./UploadImageButton";
import UserButton from "./auth/user-button";

export async function Navbar() {
  const session = await auth();
  return (
    <header className="flex container max-w-[1400px] mx-auto bg-white h-16 w-full items-center justify-between px-4 md:px-6">
      <Link className="flex items-center gap-2" href="/">
        <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
        <span className="text-lg font-semibold">Magica</span>
      </Link>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {session?.user ? (
          <>
            <UploadImageButton />
          </>
        ) : (
          <>
            <Link
              className={buttonVariants({ className: "gap-2" })}
              href={"/api/auth/signin"}
            >
              <User size={18} />
              Sign In
            </Link>
          </>
        )}

        <a
          href="https://github.com/Diwanshumidha/pexels"
          target="_blank"
          className="flex items-center justify-center gap-x-2 py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg md:inline-flex"
        >
          <Github />
          Github
        </a>

        {session?.user ? (
          <UserButton
            profileImage={session.user.image || "/logo.svg"}
            username={session.user.name || "User"}
            userEmail={session.user.email || "-"}
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
