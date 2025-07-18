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

    // local date and time 
    let localDate;
    if (typeof date === 'string' && date.includes('T')) {
      const [datePart, timePart] = date.split('T');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hour, minute] = timePart.split(':').map(Number);
      localDate = new Date(year, month - 1, day, hour, minute);
    } else {
      localDate = new Date(date);
    }
    let bookingData: any = {
      userId: dbUser.id,
      date: localDate,
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
      bookingData.price = entity.price; 
      await prisma.room.update({ where: { id: entity.id }, data: { status: updateStatus } });

    } else if (category === 'suite' && suiteTypeSlug) {
      const suiteType = await prisma.suiteType.findUnique({ where: { slug: suiteTypeSlug } });

      if (!suiteType) return NextResponse.json({ error: 'Suite type not found.' }, { status: 404 });
      entity = await prisma.suite.findFirst({ where: { typeId: suiteType.id, status: 'available' } });

      if (!entity) return NextResponse.json({ error: 'No available suites.' }, { status: 409 });
      bookingData.suiteId = entity.id;
      bookingData.price = entity.price; 
      await prisma.suite.update({
        where: { id: entity.id }, data: { status: updateStatus }
      });

    } else if (category === 'dining' && diningVenueSlug) {
      const venue = await prisma.diningVenue.findUnique({ where: { slug: diningVenueSlug } });

      if (!venue) return NextResponse.json({ error: 'Dining venue not found.' }, { status: 404 });
      entity = await prisma.diningTable.findFirst({ where: { venueId: venue.id, status: 'available' } });

      if (!entity) return NextResponse.json({ error: 'No available tables.' }, { status: 409 });
      bookingData.diningTableId = entity.id;
      bookingData.price = entity.price; 
      await prisma.diningTable.update({ where: { id: entity.id }, data: { status: 'booked' } });

    } else if (category === 'event' && eventTypeSlug) {
      const eventType = await prisma.eventType.findUnique({ where: { slug: eventTypeSlug } });

      if (!eventType) return NextResponse.json({ error: 'Event type not found.' }, { status: 404 });
      entity = await prisma.event.findFirst({ where: { typeId: eventType.id, status: 'available' } });

      if (!entity) return NextResponse.json({ error: 'No available events.' }, { status: 409 });
      bookingData.eventId = entity.id;
      bookingData.price = entity.price; 
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
      select: {
        id: true,
        date: true,
        checkIn: true,
        checkOut: true,
        status: true,
        user: { select: { name: true, email: true } },
        room: { select: { number: true } },
        suite: { select: { number: true } },
        diningTable: { select: { number: true } },
        event: { select: { id: true } },
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
      booked: b.date ? b.date.toISOString().replace('T', ' ').slice(0, 19) : null,
      checkIn: b.checkIn ? b.checkIn.toISOString().replace('T', ' ').slice(0, 19) : null,
      checkOut: b.checkOut ? b.checkOut.toISOString().replace('T', ' ').slice(0, 19) : null,
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
    if (id && (guest !== undefined || status !== undefined) && !action) {
      let updatedBooking;
      if (guest !== undefined) {
        const booking = await prisma.booking.findUnique({ where: { id } });
        if (!booking) return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
        await prisma.user.update({ where: { id: booking.userId }, data: { name: guest } });
      }
      if (status !== undefined) {
        // handle check in checkout
        let updateData: any = { status };
        if (status === 'Checked-in') {
          updateData.checkIn = new Date();
          updateData.checkOut = null;
        } else if (status === 'Checked-out') {
          updateData.checkOut = new Date();
        } else if (status === 'Booked') {
          updateData.checkIn = null;
          updateData.checkOut = null;
        }
        updatedBooking = await prisma.booking.update({ where: { id }, data: updateData });
      } else {
        updatedBooking = await prisma.booking.findUnique({ where: { id } });
      }
      // return
      const bookingWithUser = await prisma.booking.findUnique({
        where: { id },
        include: { user: true },
      });
      return NextResponse.json({ success: true, booking: bookingWithUser });
    }
    // Find booking
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }
    let newStatus = booking.status;
    let updateData: any = {};
    if (action === 'check-in') {
      newStatus = 'Checked-in';
      updateData.checkIn = new Date();
      updateData.checkOut = null;
    } else if (action === 'check-out') {
      newStatus = 'Checked-out';
      updateData.checkOut = new Date();
    } else if (action === 'cancel') {
      newStatus = 'Cancelled';
    } else {
      return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
    }
    updateData.status = newStatus;
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
    const updated = await prisma.booking.update({ where: { id }, data: updateData });
    return NextResponse.json({ success: true, booking: updated });
  } catch (error) {
    console.error('Booking update error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}