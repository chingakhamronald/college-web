import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfigStudent, siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/dashboard"
          >
            <Logo />
            <p className="font-bold text-inherit">
              Student and Teacher Intereaction
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {(session?.user.role === "teacher"
            ? siteConfig
            : siteConfigStudent
          ).navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-lg font-bold">{session?.user?.email}</h1>
            <h1 className="text-sm">
              Role:{" "}
              {session?.user?.role === "teacher"
                ? "Teacher"
                : session?.user?.role === "student"
                ? "Student"
                : "Admin"}
            </h1>
          </div>
          <div className="w-3" />
          <Button
            className="text-sm font-normal text-default-600 bg-default-100"
            variant="flat"
            color="primary"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
