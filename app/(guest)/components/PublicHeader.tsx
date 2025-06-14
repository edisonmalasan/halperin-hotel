"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function PublicHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Halperin Hotel
          </Link>
          <div className="flex gap-4">
            <Link href="/rooms" className="hover:text-blue-500">
              Rooms
            </Link>
            <Link href="/amenities" className="hover:text-blue-500">
              Amenities
            </Link>
            <Link href="/contact" className="hover:text-blue-500">
              Contact
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="hover:text-blue-500">
                  My Bookings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hover:text-blue-500"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-500">
                  Login
                </Link>
                <Link href="/register" className="hover:text-blue-500">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
