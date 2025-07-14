"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4 text-red-600">Access Denied</h1>
      <p className="text-lg">You do not have permission to view this page.</p>
    </div>
  );
} 