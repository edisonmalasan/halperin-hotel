"use client";

import { usePathname } from "next/navigation";
import DashboardNavigation from "@/app/client/components/DashboardNavigation";
import React from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && (
        <header className="bg-white shadow sticky top-0 z-50">
          <DashboardNavigation />
        </header>
      )}

      <main className="flex-grow">{children}</main>

      {!isAdmin && (
        <footer className="bg-[#fafafa]">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm ">
              <div>
                <h3 className="font-bold mb-4">ADDRESS</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>The Halperin Hotel,</li>
                  <li>9641 Sunset Boulevard,</li>
                  <li>Beverly Hills, CA 90210</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">ROOM & SUITES RESERVATIONS</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>+1 424 421 0060</li>
                  <li>+1 855 350 0079</li>
                  <li>reservations.DI2@thehalperinhotel.com</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">GENERAL ENQUIRIES</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>+1 310 276 2251</li>
                  <li>info.DI2@thehalperinhotel.com</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">FOLLOW US</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `<lord-icon
    src="https://cdn.lordicon.com/dbugezxr.json"
    trigger="loop"
    delay="1500"
    stroke="regular"
    state="hover-rotate"
    colors="primary:#121331,secondary:#ffc738,tertiary:#f49cc8,quaternary:#16a9c7,quinary:#ebe6ef"
    style="width:40px;height:40px">
</lord-icon>`,
                      }}
                    />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `<lord-icon
    src="https://cdn.lordicon.com/fmwsotep.json"
    trigger="loop"
    delay="2000"
    state="hover-draw"
    colors="primary:#121331,secondary:#ebe6ef,tertiary:#16a9c7"
    style="width:40px;height:40px">
</lord-icon>`,
                      }}
                    />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `<lord-icon
    src="https://cdn.lordicon.com/qrsdbrog.json"
    trigger="loop"
    delay="2000"
    state="hover-draw"
    style="width:40px;height:40px">
</lord-icon>`,
                      }}
                    />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `<lord-icon
    src="https://cdn.lordicon.com/lllcnxva.json"
    trigger="loop"
    delay="2000"
    state="in-reveal"
    style="width:40px;height:40px">
</lord-icon>`,
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
              <p>
                &copy; {new Date().getFullYear()} Edison Malasan . All Rights
                Reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
