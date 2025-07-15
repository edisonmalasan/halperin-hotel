"use client";
import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
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
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  active?: boolean;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden md:flex md:flex-col bg-[#181828] text-[#F8FAFC] w-[320px] shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? 320 : 88) : 320,
        }}
        transition={{ duration: 0.25, type: "tween" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  return (
    <a
      href={link.href}
      className={cn(
        "flex flex-row items-center group/sidebar py-3 text-[#F8FAFC] transition-colors duration-300 text-base font-medium rounded-lg relative gap-3",
        "hover:bg-[#60A5FA] hover:text-white focus:bg-[#60A5FA] focus:text-white",
        className
      )}
      style={{ minHeight: 48 }}
      {...props}
    >
      <span
        className={cn(
          "flex items-center justify-center h-9 w-9 text-[35px]",
          link.active ? "text-[#3B82F6]" : "text-[#F8FAFC]"
        )}
        style={{ minWidth: 36 }}
      >
        {link.icon}
      </span>
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
        <span className="whitespace-nowrap text-base transition-opacity duration-300 block">
          {link.label}
        </span>
      </motion.div>
    </a>
  );
};

function Logo({ open }: { open: boolean }) {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-base font-bold text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white dark:bg-black" />
      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-bold whitespace-pre text-white dark:text-white"
        >
          Halperin PMS
        </motion.span>
      )}
    </a>
  );
}

const adminLinks = [
  {
    label: "Dashboard",
    key: "dashboard",
    href: "#",
    icon: <IconHome className="h-5 w-5 shrink-0 text-white dark:text-white" />,
  },
  {
    label: "Reservations",
    key: "reservations",
    href: "#",
    icon: (
      <IconCalendarCheck className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Rooms",
    key: "rooms",
    href: "#",
    icon: (
      <IconBed className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Housekeeping",
    key: "housekeeping",
    href: "#",
    icon: (
      <IconBrush className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Guests",
    key: "guests",
    href: "#",
    icon: (
      <IconUsers className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Billing",
    key: "billing",
    href: "#",
    icon: (
      <IconReceipt className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Analytics",
    key: "analytics",
    href: "#",
    icon: (
      <IconChartBar className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    key: "settings",
    href: "#",
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-white dark:text-neutral-200" />
    ),
  },
];

export function AdminSidebar() {
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();
  const [selected, setSelected] = useState("dashboard");
  const { open } = useSidebar();

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
    <SidebarBody className="justify-between gap-10 bg-[#1E293B] text-white">
      <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
        <Logo open={open} />
        <div className="mt-8 flex flex-col gap-2">
          {adminLinks.map((link, idx) => (
            <div
              key={idx}
              onClick={() => setSelected(link.key)}
              style={{ cursor: "pointer" }}
            >
              <SidebarLink
                link={{
                  ...link,
                  href: link.href,
                  active: selected === link.key,
                }}
                className={
                  selected === link.key ? "bg-[#3B82F6] text-white" : ""
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pb-15 items-center">
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
  );
}
