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

function Logo() {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-base font-bold text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white dark:bg-black" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-white dark:text-white"
      >
        Halperin PMS
      </motion.span>
    </a>
  );
}
function LogoIcon() {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-base font-bold text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white dark:bg-black" />
    </a>
  );
}

const adminLinks = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <IconHome className="h-5 w-5 shrink-0 text-white dark:text-white" />,
  },
  {
    label: "Reservations",
    key: "reservations",
    icon: (
      <IconCalendarCheck className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Rooms",
    key: "rooms",
    icon: (
      <IconBed className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Housekeeping",
    key: "housekeeping",
    icon: (
      <IconBrush className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Guests",
    key: "guests",
    icon: (
      <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Billing",
    key: "billing",
    icon: (
      <IconReceipt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Analytics",
    key: "analytics",
    icon: (
      <IconChartBar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    key: "settings",
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

const contentMap = {
  dashboard: <div className="p-6">Admin Dashboard Content</div>,
  reservations: <div className="p-6">Reservation Management Content</div>,
  rooms: <div className="p-6">Room Management Content</div>,
  housekeeping: <div className="p-6">Housekeeping Content</div>,
  guests: <div className="p-6">Guests Content</div>,
  billing: <div className="p-6">Billing Content</div>,
  analytics: <div className="p-6">Analytics Content</div>,
  settings: <div className="p-6">Settings Content</div>,
};

export default function AdminLayout() {
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("dashboard");

  // Determine avatar icon based on user's provider
  let avatarIcon = null;
  if (user?.picture) {
    avatarIcon = (
      <img
        src={user.picture}
        className="h-7 w-7 shrink-0 rounded-full border border-[#8b6c26] object-cover"
        width={28}
        height={28}
        alt="Avatar"
      />
    );
  } else if (user?.email?.includes("google")) {
    avatarIcon = (
      <img
        src="/images/google-icon.png"
        className="h-7 w-7 shrink-0 rounded-full"
        width={28}
        height={28}
        alt="Google"
      />
    );
  } else if (user?.email?.includes("facebook")) {
    avatarIcon = (
      <img
        src="/images/facebook-icon.png"
        className="h-7 w-7 shrink-0 rounded-full"
        width={28}
        height={28}
        alt="Facebook"
      />
    );
  } else {
    avatarIcon = (
      <span className="h-7 w-7 flex items-center justify-center rounded-full bg-gray-200 border border-[#8b6c26]">
        <IconUsers className="w-5 h-5 text-[#8b6c26]" />
      </span>
    );
  }

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div
      className={cn(
        "flex w-full h-screen flex-1 flex-row overflow-hidden bg-black dark:bg-black"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-black text-white">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {adminLinks.map((link, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelected(link.key)}
                  className={cn(
                    selected === link.key
                      ? "bg-neutral-800 text-white rounded"
                      : "rounded",
                    "transition-colors duration-150"
                  )}
                  style={{ cursor: "pointer" }}
                >
                  <SidebarLink
                    link={{
                      ...link,
                      href: "#",
                    }}
                    className={open ? "" : "justify-center"}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            {isLoading ? null : isAuthenticated ? (
              <SidebarLink
                link={{
                  label: open ? user?.given_name || "User" : "",
                  href: "#",
                  icon: avatarIcon,
                }}
                className={open ? "" : "justify-center"}
              />
            ) : null}
            <LogoutLink>
              <button
                onClick={handleSignOut}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 mt-2 rounded border border-white text-white hover:bg-neutral-800 font-medium text-sm transition-all w-full",
                  open ? "justify-start" : "justify-center"
                )}
              >
                <IconLogout className="w-5 h-5" />
                {open && "Sign Out"}
              </button>
            </LogoutLink>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-800 bg-neutral-900 p-2 md:p-10 m-4">
          {contentMap[selected as keyof typeof contentMap]}
        </div>
      </div>
    </div>
  );
}
