import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import { Noto_Sans } from "next/font/google";
import PublicHeader from "./(guest)/components/PublicHeader";
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
          <PublicHeader />
          <main>{children}</main>
          <footer className="bg-gray-100 mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="font-bold mb-4">About Us</h3>
                  <p className="text-gray-600">
                    Halperin Hotel offers luxury accommodations in the heart of
                    the city.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="/rooms"
                        className="text-gray-600 hover:text-blue-500"
                      >
                        Rooms
                      </a>
                    </li>
                    <li>
                      <a
                        href="/suites"
                        className="text-gray-600 hover:text-blue-500"
                      >
                        Suites
                      </a>
                    </li>
                    <li>
                      <a
                        href="/dining"
                        className="text-gray-600 hover:text-blue-500"
                      >
                        Dining
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="text-gray-600 hover:text-blue-500"
                      >
                        Contact
                      </a>
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
                    <a href="#" className="text-gray-600 hover:text-blue-500">
                      Facebook
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-500">
                      Twitter
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-500">
                      Instagram
                    </a>
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
        </Providers>
      </body>
    </html>
  );
}
