import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  const now = new Date();

  // stats for rooms, suites, dining, occasions
  const [
    roomCounts,
    suiteCounts,
    tableCounts,
    eventCounts,
    totalBookings,
    totalGuests
  ] = await Promise.all([
    prisma.room.groupBy({ by: ['status'], _count: true }),
    prisma.suite.groupBy({ by: ['status'], _count: true }),
    prisma.diningTable.groupBy({ by: ['status'], _count: true }),
    prisma.event.groupBy({ by: ['status'], _count: true }),
    prisma.booking.count(),
    prisma.user.count(),
  ]);

  const extractStats = (counts: typeof roomCounts) => ({
    available: counts.find((c) => c.status === 'available')?._count || 0,
    occupied: counts.find((c) => c.status === 'occupied' || c.status === 'booked')?._count || 0,
    total: counts.reduce((sum, c) => sum + c._count, 0),
  });

  const roomStats = extractStats(roomCounts);
  const suiteStats = extractStats(suiteCounts);
  const tableStats = {
    available: tableCounts.find(c => c.status === 'available')?._count || 0,
    booked: tableCounts.find(c => c.status === 'booked')?._count || 0,
    total: tableCounts.reduce((sum, c) => sum + c._count, 0),
  };
  const eventStats = {
    available: eventCounts.find(c => c.status === 'available')?._count || 0,
    booked: eventCounts.find(c => c.status === 'booked')?._count || 0,
    total: eventCounts.reduce((sum, c) => sum + c._count, 0),
  };

  // check in/out last 12d
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 11);
  startDate.setHours(0, 0, 0, 0);

  const checkStats = await prisma.$queryRawUnsafe<any[]>(`
    SELECT status, DATE("date") as day, COUNT(*) as count
    FROM "Booking"
    WHERE status IN ('checked-in', 'checked-out')
    AND "date" >= $1
    GROUP BY status, DATE("date")
    ORDER BY day
  `, startDate);

  const analyticsLabels: string[] = [];
  const checkInData: number[] = [];
  const checkOutData: number[] = [];

  for (let i = 11; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const dateStr = d.toISOString().split('T')[0];
    analyticsLabels.push(d.getDate().toString().padStart(2, '0'));

    const checkIn = checkStats.find(stat => stat.status === 'checked-in' && stat.day === dateStr);
    const checkOut = checkStats.find(stat => stat.status === 'checked-out' && stat.day === dateStr);

    checkInData.push(Number(checkIn?.count || 0));
    checkOutData.push(Number(checkOut?.count || 0));
  }

  // recent bookings
  const recentBookings = await prisma.booking.findMany({
    orderBy: { date: 'desc' },
    take: 5,
    include: { user: true, room: true, suite: true, diningTable: true, event: true },
  });

  const recentBookingData = recentBookings.map((b) => ({
    name: b.user?.name || b.user?.email || 'Guest',
    date: b.date.toLocaleDateString(),
    type: b.room ? 'Room' : b.suite ? 'Suite' : b.diningTable ? 'Dining' : b.event ? 'Event' : '',
    info: b.room?.number || b.suite?.number || b.diningTable?.number || (b.event ? `Event #${b.event.id}` : ''),
    status: b.status,
  }));

  // monthly rev
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  const monthlyRevenueResult = await prisma.booking.aggregate({
    _sum: { price: true },
    where: {
      date: { gte: monthStart, lte: monthEnd },
      status: { in: ['booked', 'checked-out'] },
    },
  });
  const monthlyRevenue = monthlyRevenueResult._sum.price || 0;

  // monthly stats
  const firstMonth = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const monthlyStats = await prisma.$queryRawUnsafe<any[]>(`
    SELECT
      EXTRACT(YEAR FROM "date") AS year,
      EXTRACT(MONTH FROM "date") AS month,
      SUM("price") AS revenue,
      COUNT(*) AS bookings
    FROM "Booking"
    WHERE "date" >= $1 AND "status" IN ('booked', 'checked-out')
    GROUP BY year, month
    ORDER BY year, month;
  `, firstMonth);

  const monthlyRevenueArr: number[] = [];
  const monthlyBookingsArr: number[] = [];
  const monthLabels: string[] = [];

  for (let i = 11; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = month.toLocaleString('default', { month: 'short', year: '2-digit' });
    monthLabels.push(label);

    const stat = monthlyStats.find(
      (s) => Number(s.year) === month.getFullYear() && Number(s.month) === month.getMonth() + 1
    );
    monthlyRevenueArr.push(stat ? Number(stat.revenue) : 0);
    monthlyBookingsArr.push(stat ? Number(stat.bookings) : 0);
  }

  // overdue bookings
  const todayStr = now.toISOString().slice(0, 10);
  const allBookings = await prisma.booking.findMany({ select: { status: true, checkIn: true, checkOut: true } });
  let upcomingBookings = 0;
  let overdueBookings = 0;
  allBookings.forEach((b) => {
    const checkInDate = b.checkIn ? b.checkIn.toISOString().slice(0, 10) : null;
    const checkOutDate = b.checkOut ? b.checkOut.toISOString().slice(0, 10) : null;
    if (checkInDate && checkInDate > todayStr && b.status === 'Booked') upcomingBookings++;
    if (checkOutDate && checkOutDate < todayStr && b.status === 'Checked-in') overdueBookings++;
  });

  // quick stats for bookings route
  const allBookingsForQuickStats = await prisma.booking.findMany({ select: { checkIn: true, checkOut: true } });
  let totalCheckIns = 0;
  let totalCheckOuts = 0;
  allBookingsForQuickStats.forEach((b) => {
    if (b.checkIn && !b.checkOut) totalCheckIns++;
    if (b.checkOut) totalCheckOuts++;
  });

  return NextResponse.json({
    totalRooms: roomStats.total,
    availableRooms: roomStats.available,
    occupiedRooms: roomStats.occupied,

    totalSuites: suiteStats.total,
    availableSuites: suiteStats.available,
    occupiedSuites: suiteStats.occupied,

    totalDiningTables: tableStats.total,
    availableDiningTables: tableStats.available,
    bookedDiningTables: tableStats.booked,

    totalEvents: eventStats.total,
    availableEvents: eventStats.available,
    bookedEvents: eventStats.booked,

    totalBookings,
    totalGuests,
    analytics: {
      labels: analyticsLabels,
      checkIn: checkInData,
      checkOut: checkOutData,
    },
    recentBookings: recentBookingData,
    monthlyRevenue,
    monthlyRevenueArr,
    monthlyBookingsArr,
    monthLabels,
    upcomingBookings,
    overdueBookings,
    totalCheckIns,
    totalCheckOuts,
  });
}
