import { ReactNode } from "react";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geist = Geist({
  subsets: ["latin"],
});

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen ${geist.className}`}>
      {/* Guest Header */}
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
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <p className="text-gray-600">
                Halperin Hotel offers luxury accommodations in the heart of the city.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/rooms" className="text-gray-600 hover:text-blue-500">
                    Rooms
                  </Link>
                </li>
                <li>
                  <Link href="/amenities" className="text-gray-600 hover:text-blue-500">
                    Amenities
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-500">
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
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Facebook
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Twitter
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Instagram
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Halperin Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 