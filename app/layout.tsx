import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper"; // make sure path is correct

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Halperin Hotel",
  description: "Welcome to Halperin Hotel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} antialiased`}>
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="beforeInteractive"
        />
        <Providers>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
