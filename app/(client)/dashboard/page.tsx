import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/app/api/routes";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Book a Room</CardTitle>
            <CardDescription>Find and book available rooms</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={ROUTES.rooms.root}>View Available Rooms</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Bookings</CardTitle>
            <CardDescription>View and manage your bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/bookings">View Bookings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Deluxe Room</CardTitle>
              <CardDescription>
                Check-in: Jan 15, 2024 - Check-out: Jan 20, 2024
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Booking ID: #12345</p>
                  <p className="text-sm text-gray-500">Status: Confirmed</p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Special Offers */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekend Getaway</CardTitle>
              <CardDescription>Book 2 nights, get 1 night free</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Valid for weekend stays until March 31, 2024
              </p>
              <Button asChild>
                <Link href={ROUTES.rooms.root}>Book Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Early Bird Special</CardTitle>
              <CardDescription>
                Book 30 days in advance for 20% off
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Available for all room types
              </p>
              <Button asChild>
                <Link href={ROUTES.rooms.root}>Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
