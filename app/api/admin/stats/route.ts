import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  // Room stats
  const totalRooms = await prisma.room.count();
  const availableRooms = await prisma.room.count({ where: { status: 'available' } });
  const occupiedRooms = await prisma.room.count({ where: { status: 'occupied' } });

  // Suite stats
  const totalSuites = await prisma.suite.count();
  const availableSuites = await prisma.suite.count({ where: { status: 'available' } });
  const occupiedSuites = await prisma.suite.count({ where: { status: 'occupied' } });

  // Dining stats
  const totalDiningTables = await prisma.diningTable.count();
  const availableDiningTables = await prisma.diningTable.count({ where: { status: 'available' } });
  const bookedDiningTables = await prisma.diningTable.count({ where: { status: 'booked' } });

  // Event stats
  const totalEvents = await prisma.event.count();
  const availableEvents = await prisma.event.count({ where: { status: 'available' } });
  const bookedEvents = await prisma.event.count({ where: { status: 'booked' } });

  // Bookings, guests, etc.
  const totalBookings = await prisma.booking.count();
  const totalGuests = await prisma.user.count();

  // --- Analytics: Check-ins and Check-outs for the last 12 days ---
  const today = new Date();
  const analyticsLabels: string[] = [];
  const checkInData: number[] = [];
  const checkOutData: number[] = [];
  for (let i = 11; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    analyticsLabels.push(day.getDate().toString().padStart(2, '0'));
    // demo: count bookings with status checked-in or checked-out on this day
    const checkIns = await prisma.booking.count({
      where: {
        status: 'checked-in',
        date: { gte: dayStart, lte: dayEnd },
      },
    });
    const checkOuts = await prisma.booking.count({
      where: {
        status: 'checked-out',
        date: { gte: dayStart, lte: dayEnd },
      },
    });
    checkInData.push(checkIns);
    checkOutData.push(checkOuts);
  }

  // recent bookings
  const recentBookings = await prisma.booking.findMany({
    orderBy: { date: 'desc' },
    take: 5,
    include: {
      user: true,
      room: true,
      suite: true,
      diningTable: true,
      event: true,
    },
  });
  const recentBookingData = recentBookings.map((b) => ({
    name: b.user?.name || b.user?.email || 'Guest',
    date: b.date.toLocaleDateString(),
    type: b.room ? 'Room' : b.suite ? 'Suite' : b.diningTable ? 'Dining' : b.event ? 'Event' : '',
    info:
      b.room?.number ||
      b.suite?.number ||
      b.diningTable?.number ||
      (b.event ? b.event.id : ''),
    status: b.status,
  }));

  return NextResponse.json({
    totalRooms,
    availableRooms,
    occupiedRooms,
    totalSuites,
    availableSuites,
    occupiedSuites,
    totalDiningTables,
    availableDiningTables,
    bookedDiningTables,
    totalEvents,
    availableEvents,
    bookedEvents,
    totalBookings,
    totalGuests,
    analytics: {
      labels: analyticsLabels,
      checkIn: checkInData,
      checkOut: checkOutData,
    },
    recentBookings: recentBookingData,
  });
}