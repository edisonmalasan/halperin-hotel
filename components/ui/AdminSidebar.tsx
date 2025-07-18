import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
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

interface AdminSidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo?: React.ReactNode;
}

const adminLinks = [
  {
    label: "Dashboard",
    href: "#",
    icon: (
      <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Reservations",
    href: "#",
    icon: (
      <IconCalendarCheck className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Facilities",
    href: "#",
    icon: (
      <IconBed className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Housekeeping",
    href: "#",
    icon: (
      <IconBrush className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Guests",
    href: "#",
    icon: (
      <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Billing",
    href: "#",
    icon: (
      <IconReceipt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Analytics",
    href: "#",
    icon: (
      <IconChartBar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    href: "#",
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
];

const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <span className="font-medium whitespace-pre text-black dark:text-white">
        Halperin PMS
      </span>
    </a>
  );
};

const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

export default function AdminSidebar({
  open,
  setOpen,
  userInfo,
}: AdminSidebarProps) {
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {adminLinks.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>{userInfo}</div>
      </SidebarBody>
    </Sidebar>
  );
}
