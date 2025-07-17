import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, date, user, roomTypeSlug, suiteTypeSlug, diningVenueSlug, eventTypeSlug } = body;
    if (!user?.email || !date || !category) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    //find or create current user 
    let dbUser = await prisma.user.findUnique({ where: { email: user.email } });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          kindeId: user.kindeId,
        },
      });
    }

    // find available entity and book
    let bookingData: any = {
      userId: dbUser.id,
      date: new Date(date),
      status: 'booked',
    };
    let updateStatus = 'occupied';
    let entity = null;

    if (category === 'room' && roomTypeSlug) {
      // find available room
      const roomType = await prisma.roomType.findUnique({ where: { slug: roomTypeSlug } });

      if (!roomType) return NextResponse.json({ error: 'Room type not found.' }, { status: 404 });
      entity = await prisma.room.findFirst({ where: { typeId: roomType.id, status: 'available' } });

      if (!entity) return NextResponse.json({ error: 'No available rooms.' }, { status: 409 });
      bookingData.roomId = entity.id;
      bookingData.price = entity.price; // set price from room
      await prisma.room.update({ where: { id: entity.id }, data: { status: updateStatus } });

    } else if (category === 'suite' && suiteTypeSlug) {
      const suiteType = await prisma.suiteType.findUnique({ where: { slug: suiteTypeSlug } });

      if (!suiteType) return NextResponse.json({ error: 'Suite type not found.' }, { status: 404 });
      entity = await prisma.suite.findFirst({ where: { typeId: suiteType.id, status: 'available' } });

      if (!entity) return NextResponse.json({ error: 'No available suites.' }, { status: 409 });
      bookingData.suiteId = entity.id;
      bookingData.price = entity.price; // set price from suite
      await prisma.suite.update({
        where: { id: entity.id }, data: { status: updateStatus }
      });

    } else if (category === 'dining' && diningVenueSlug) {
      const venue = await prisma.diningVenue.findUnique({ where: { slug: diningVenueSlug } });

      if (!venue) return NextResponse.json({ error: 'Dining venue not found.' }, { status: 404 });
      entity = await prisma.diningTable.findFirst({ where: { venueId: venue.id, status: 'available' } });

      if (!entity) return NextResponse.json({ error: 'No available tables.' }, { status: 409 });
      bookingData.diningTableId = entity.id;
      bookingData.price = entity.price; // set price from dining table
      await prisma.diningTable.update({ where: { id: entity.id }, data: { status: 'booked' } });

    } else if (category === 'event' && eventTypeSlug) {
      const eventType = await prisma.eventType.findUnique({ where: { slug: eventTypeSlug } });

      if (!eventType) return NextResponse.json({ error: 'Event type not found.' }, { status: 404 });
      entity = await prisma.event.findFirst({ where: { typeId: eventType.id, status: 'available' } });

      if (!entity) return NextResponse.json({ error: 'No available events.' }, { status: 409 });
      bookingData.eventId = entity.id;
      bookingData.price = entity.price; // set price from event
      await prisma.event.update({ where: { id: entity.id }, data: { status: 'booked' } });

    } else {
      return NextResponse.json({ error: 'Invalid booking category or missing slug.' }, { status: 400 });
    }

    // create booking
    const booking = await prisma.booking.create({ data: bookingData });
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { date: 'desc' },
      include: {
        user: true,
        room: true,
        suite: true,
        diningTable: true,
        event: true,
      },
    });
    const result = bookings.map((b) => ({
      id: b.id,
      guest: b.user?.name || b.user?.email || 'Guest',
      room:
        b.room?.number?.toString() ||
        b.suite?.number?.toString() ||
        b.diningTable?.number?.toString() ||
        (b.event ? `Event ${b.event.id}` : ''),
      dates: b.date instanceof Date ? b.date.toISOString().split('T')[0] : b.date,
      status: b.status,
    }));
    return NextResponse.json(result);
  } catch (error) {
    console.error('Booking fetch error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, action, guest, status } = await req.json();
    if (!id && !guest && !status) {
      return NextResponse.json({ error: 'Missing id, guest, or status.' }, { status: 400 });
    }
    // Edit guest or status directly
    if (id && (guest !== undefined || status !== undefined) && !action) {
      const updated = await prisma.booking.update({
        where: { id },
        data: {
          ...(guest !== undefined ? { guest } : {}),
          ...(status !== undefined ? { status } : {}),
        },
      });
      return NextResponse.json({ success: true, booking: updated });
    }
    // Find booking
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }
    let newStatus = booking.status;
    if (action === 'check-in') newStatus = 'Checked-in';
    else if (action === 'check-out') newStatus = 'Checked-out';
    else if (action === 'cancel') newStatus = 'Cancelled';
    else return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });

    // Update related entity status if needed
    if (booking.roomId) {
      if (action === 'check-in') await prisma.room.update({ where: { id: booking.roomId }, data: { status: 'occupied' } });
      if (action === 'check-out' || action === 'cancel') await prisma.room.update({ where: { id: booking.roomId }, data: { status: 'available' } });
    }
    if (booking.suiteId) {
      if (action === 'check-in') await prisma.suite.update({ where: { id: booking.suiteId }, data: { status: 'occupied' } });
      if (action === 'check-out' || action === 'cancel') await prisma.suite.update({ where: { id: booking.suiteId }, data: { status: 'available' } });
    }
    if (booking.diningTableId) {
      if (action === 'check-in') await prisma.diningTable.update({ where: { id: booking.diningTableId }, data: { status: 'booked' } });
      if (action === 'check-out' || action === 'cancel') await prisma.diningTable.update({ where: { id: booking.diningTableId }, data: { status: 'available' } });
    }
    if (booking.eventId) {
      if (action === 'check-in') await prisma.event.update({ where: { id: booking.eventId }, data: { status: 'booked' } });
      if (action === 'check-out' || action === 'cancel') await prisma.event.update({ where: { id: booking.eventId }, data: { status: 'available' } });
    }

    // Update booking status
    const updated = await prisma.booking.update({ where: { id }, data: { status: newStatus } });
    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error('Booking update error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}