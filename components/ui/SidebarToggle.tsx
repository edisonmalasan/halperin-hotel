"use client";
import React, { useState } from "react";

interface SidebarToggleProps {
  children: (open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode;
}

export default function SidebarToggle({ children }: SidebarToggleProps) {
  const [open, setOpen] = useState(false);
  return <>{children(open, setOpen)}</>;
} 