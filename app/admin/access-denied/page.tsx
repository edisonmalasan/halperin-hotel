"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f3] px-4">
      <Card className="max-w-md w-full p-8 flex flex-col items-center shadow-lg border border-[#8b6c26] bg-white">
        <div className="text-5xl mb-4 text-[#8b6c26]">🚫</div>
        <h1 className="text-2xl font-bold mb-2 text-neutral-800">Access Denied</h1>
        <p className="text-neutral-600 mb-6 text-center">
          You do not have permission to access this page.<br />
          Only the admin may view this area.
        </p>
        <Link href="/">
          <Button variant="outline" className="border-[#8b6c26] text-[#8b6c26] hover:bg-[#8b6d2636]">Return to Homepage</Button>
        </Link>
      </Card>
    </div>
  );
} 