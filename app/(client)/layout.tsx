import { ReactNode } from "react";
import { Geist } from "next/font/google";
import { Providers } from "../providers";

const geist = Geist({
  subsets: ["latin"],
});

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className={geist.className + " flex flex-col min-h-screen"}>
        <main className="flex-1 min-h-0 flex flex-col">{children}</main>
      </div>
    </Providers>
  );
}
