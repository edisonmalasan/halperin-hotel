import { ReactNode } from "react";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={geist.className}>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
