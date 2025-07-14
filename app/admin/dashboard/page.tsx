"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function AdminDashboardPage() {
  const { user, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome, {user.given_name || user.email || "Admin"}!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Here is an overview of your hotel management system.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg bg-white dark:bg-neutral-900 p-6 shadow border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold mb-2">Reservations</h2>
          <p className="text-2xl font-bold">128</p>
        </div>
        <div className="rounded-lg bg-white dark:bg-neutral-900 p-6 shadow border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold mb-2">Rooms Occupied</h2>
          <p className="text-2xl font-bold">42/60</p>
        </div>
        <div className="rounded-lg bg-white dark:bg-neutral-900 p-6 shadow border border-neutral-200 dark:border-neutral-700">
          <h2 className="text-lg font-semibold mb-2">Revenue (This Month)</h2>
          <p className="text-2xl font-bold">$18,400</p>
        </div>
      </div>
      <div className="rounded-lg bg-white dark:bg-neutral-900 p-6 shadow border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li>• John Doe checked in to Room 204</li>
          <li>• New reservation from Jane Smith</li>
          <li>• Room 305 marked as cleaned</li>
        </ul>
      </div>
    </div>
  );
}
