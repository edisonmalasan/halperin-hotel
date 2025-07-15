export default function RecentBookingsTable({ recentBookings }: { recentBookings: any[] }) {
  return (
    <div className="text-lg font-semibold mb-2">Recent Bookings
      <div className="overflow-x-auto mt-2">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-400">
              <th className="px-2 py-1 text-left">Name</th>
              <th className="px-2 py-1 text-left">Date</th>
              <th className="px-2 py-1 text-left">Type</th>
              <th className="px-2 py-1 text-left">Info</th>
              <th className="px-2 py-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b, i) => (
              <tr key={i} className="border-b border-gray-700">
                <td className="px-2 py-1">{b.name}</td>
                <td className="px-2 py-1">{b.date}</td>
                <td className="px-2 py-1">{b.type}</td>
                <td className="px-2 py-1">{b.info}</td>
                <td className="px-2 py-1">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 