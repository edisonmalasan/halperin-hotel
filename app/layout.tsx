import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { Noto_Sans } from "next/font/google";
import DashboardNavigation from "./(client)/components/DashboardNavigation";
import Link from "next/link";
import "./globals.css";

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
        <Providers>
          <div className="flex flex-col min-h-screen">
            <header className="bg-white shadow sticky top-0 z-50">
              <DashboardNavigation />
            </header>
            <main className="flex-grow pb-47">{children}</main>
            <footer className="bg-gray-500">
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-bold mb-4">About Us</h3>
                    <p className="text-gray-600">
                      Halperin Hotel offers luxury accommodations in the heart
                      of the city.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/rooms"
                          className="text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          Rooms
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/occasions"
                          className="text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          Occasions
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dining"
                          className="text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          Dining
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact"
                          className="text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">Contact</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>123 Hotel Street</li>
                      <li>City, Country</li>
                      <li>Phone: +1 234 567 890</li>
                      <li>Email: info@halperinhotel.com</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                      <Link
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                      >
                        Facebook
                      </Link>
                      <Link
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                      >
                        Twitter
                      </Link>
                      <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-500 transition-colors"
                      >
                        Instagram
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="border-t mt-8 pt-8 text-center text-gray-600">
                  <p>
                    &copy; {new Date().getFullYear()} Halperin Hotel. All rights
                    reserved.
                  </p>
                </div>
              </div>
            </footer>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
