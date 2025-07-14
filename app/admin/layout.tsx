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

// content components for each section
function Dashboard() {
  return <div className="p-6">Admin Dashboard Content</div>;
}
function Reservations() {
  return <div className="p-6">Reservation Management Content</div>;
}
function Rooms() {
  return <div className="p-6">Room Management Content</div>;
}
function Housekeeping() {
  return <div className="p-6">Housekeeping Content</div>;
}
function Guests() {
  return <div className="p-6">Guests Content</div>;
}
function Billing() {
  return <div className="p-6">Billing Content</div>;
}
function Analytics() {
  return <div className="p-6">Analytics Content</div>;
}
function Settings() {
  return <div className="p-6">Settings Content</div>;
}

const adminLinks = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: (
      <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
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
  dashboard: <Dashboard />,
  reservations: <Reservations />,
  rooms: <Rooms />,
  housekeeping: <Housekeeping />,
  guests: <Guests />,
  billing: <Billing />,
  analytics: <Analytics />,
  settings: <Settings />,
};

function Logo() {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Halperin PMS
      </motion.span>
    </a>
  );
}

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
        "mx-auto flex w-full max-w-7xl flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {adminLinks.map((link, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelected(link.key)}
                  className={
                    selected === link.key
                      ? "bg-neutral-200 dark:bg-neutral-700 rounded"
                      : "rounded"
                  }
                  style={{ cursor: "pointer" }}
                >
                  <SidebarLink
                    link={{
                      ...link,
                      href: "#",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            {isLoading ? null : isAuthenticated ? (
              <SidebarLink
                link={{
                  label: user?.email || "User",
                  href: "#",
                  icon: avatarIcon,
                }}
              />
            ) : null}
            <LogoutLink>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-1.5 mt-2 rounded border border-[#8b6c26] text-[#8b6c26] hover:bg-[#8b6d2636] font-medium text-sm transition-all w-full justify-start"
              >
                <IconLogout className="w-5 h-5" /> Sign Out
              </button>
            </LogoutLink>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <main className="flex-1 p-4 md:p-10">
          {contentMap[selected as keyof typeof contentMap]}
        </main>
      </div>
    </div>
  );
}
