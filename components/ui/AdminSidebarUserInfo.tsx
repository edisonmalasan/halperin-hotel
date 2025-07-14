"use client";
import React from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { IconUsers, IconLogout } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface AdminSidebarUserInfoProps {
  open: boolean;
}

export default function AdminSidebarUserInfo({ open }: AdminSidebarUserInfoProps) {
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();

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
    <div className="flex flex-col items-center gap-2 pb-4">
      {isLoading ? null : isAuthenticated ? (
        <div className={cn("flex items-center gap-2", open ? "justify-start" : "justify-center")}
        >
          {avatarIcon}
          {open && <span className="ml-2 font-medium">{user?.given_name || "User"}</span>}
        </div>
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
  );
} 