"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome,
  IconCalendarCheck,
  IconBed,
  IconBrush,
  IconUsers,
  IconReceipt,
  IconChartBar,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from "next/navigation";

const adminLinks = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <IconHome className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Reservations",
    href: "/admin/reservations",
    icon: (
      <IconCalendarCheck className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Rooms",
    href: "/admin/rooms",
    icon: (
      <IconBed className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Housekeeping",
    href: "#",
    icon: (
      <IconBrush className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Guests",
    href: "#",
    icon: (
      <IconUsers className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Billing",
    href: "#",
    icon: (
      <IconReceipt className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Analytics",
    href: "#",
    icon: (
      <IconChartBar className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
];

const Logo = ({ open }: { open: boolean }) => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-5 py-1 text-lg font-normal text-white dark:text-white mb-6"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white dark:bg-white" />
      <motion.span
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          x: open ? 0 : -20,
        }}
        transition={{ duration: 0.3, type: "tween" }}
        className="font-medium whitespace-pre text-white dark:text-white"
        style={{ display: open ? "inline-block" : "none" }}
      >
        Halperin Hotel
      </motion.span>
    </a>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
  const router = useRouter();

  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  const isAdmin = user?.email && adminEmails.includes(user.email);

  React.useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !isAdmin) {
        router.replace("/admin/access-denied");
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  if (isLoading) return null;
  if (!isAuthenticated || !isAdmin) return null;

  let avatarIcon = null;
  if (user?.picture) {
    avatarIcon = (
      <img
        src={user.picture}
        className="h-9 w-9 shrink-0 rounded-full border border-[#8b6c26] object-cover"
        width={38}
        height={38}
        alt="Avatar"
      />
    );
  } else if (user?.email?.includes("google")) {
    avatarIcon = (
      <img
        src="/images/google-icon.png"
        className="h-9 w-9 shrink-0 rounded-full"
        width={38}
        height={38}
        alt="Google"
      />
    );
  } else if (user?.email?.includes("facebook")) {
    avatarIcon = (
      <img
        src="/images/facebook-icon.png"
        className="h-9 w-9 shrink-0 rounded-full"
        width={38}
        height={38}
        alt="Facebook"
      />
    );
  } else {
    avatarIcon = (
      <span className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-200 border border-[#8b6c26]">
        <IconUsers className="w-7 h-7 text-[#8b6c26]" />
      </span>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full h-screen flex-1 flex-col overflow-hidden md:flex-row",
        "bg-gray-100 dark:bg-neutral-800"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {/* Logo at the top */}
            <div className="pt-4 px-2">
              <Logo open={open} />
            </div>
            {/* Remove logo, show nav only */}
            <div className="mt-2 flex flex-col gap-2">
              {adminLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-15 w-full">
            {/* User avatar and name in a row */}
            <div className="flex items-center w-full">
              <div
                className="flex items-center justify-center"
                style={{ minWidth: 44, minHeight: 44 }}
              >
                {avatarIcon}
              </div>
              <motion.div
                initial={false}
                animate={{
                  width: open ? 120 : 0,
                  opacity: open ? 1 : 0,
                }}
                transition={{ duration: 0.3, type: "tween" }}
                className="overflow-hidden min-w-0 flex flex-row items-center"
                style={{ height: 24 }}
              >
                <span className="whitespace-nowrap text-base transition-opacity duration-300 block ml-3">
                  {user?.given_name || user?.email}
                </span>
              </motion.div>
            </div>
            {/* Logout icon and text in a row, both clickable */}
            <LogoutLink>
              <div className="flex items-center w-full cursor-pointer">
                <button
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                  }}
                  className="flex items-center justify-center px-3 py-1.5 rounded border border-white text-white hover:bg-neutral-800 font-medium text-sm transition-all"
                  style={{ minWidth: 44, minHeight: 44 }}
                  tabIndex={-1}
                >
                  <IconLogout className="w-5 h-5" />
                </button>
                <motion.button
                  type="button"
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                  }}
                  initial={false}
                  animate={{
                    width: open ? 80 : 0,
                    opacity: open ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, type: "tween" }}
                  className="overflow-hidden min-w-0 flex flex-row items-center whitespace-nowrap text-base transition-opacity duration-300 block ml-3 bg-transparent border-none text-white cursor-pointer"
                  style={{ height: 24 }}
                >
                  Sign Out
                </motion.button>
              </div>
            </LogoutLink>
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1">{children}</main>
    </div>
  );
}
