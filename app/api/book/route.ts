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

  // Room Booking
if (category === 'room' && roomTypeSlug) {
  const roomType = await prisma.roomType.findUnique({
    where: { slug: roomTypeSlug },
  });

  if (!roomType) {
    return NextResponse.json(
      { error: 'Room type not found.' },
      { status: 404 }
    );
  }

  entity = await prisma.room.findFirst({
    where: {
      typeId: roomType.id,
      status: 'available',
    },
  });

  if (!entity) {
    return NextResponse.json(
      { error: 'No available rooms.' },
      { status: 409 }
    );
  }

  bookingData.roomId = entity.id;

  await prisma.room.update({
    where: { id: entity.id },
    data: { status: updateStatus },
  });
}

// Suite Booking
else if (category === 'suite' && suiteTypeSlug) {
  const suiteType = await prisma.suiteType.findUnique({
    where: { slug: suiteTypeSlug },
  });

  if (!suiteType) {
    return NextResponse.json(
      { error: 'Suite type not found.' },
      { status: 404 }
    );
  }

  entity = await prisma.suite.findFirst({
    where: {
      typeId: suiteType.id,
      status: 'available',
    },
  });

  if (!entity) {
    return NextResponse.json(
      { error: 'No available suites.' },
      { status: 409 }
    );
  }

  bookingData.suiteId = entity.id;

  await prisma.suite.update({
    where: { id: entity.id },
    data: { status: updateStatus },
  });
}

// Dining Table Booking
else if (category === 'dining' && diningVenueSlug) {
  const venue = await prisma.diningVenue.findUnique({
    where: { slug: diningVenueSlug },
  });

  if (!venue) {
    return NextResponse.json(
      { error: 'Dining venue not found.' },
      { status: 404 }
    );
  }

  entity = await prisma.diningTable.findFirst({
    where: {
      venueId: venue.id,
      status: 'available',
    },
  });

  if (!entity) {
    return NextResponse.json(
      { error: 'No available tables.' },
      { status: 409 }
    );
  }

  bookingData.diningTableId = entity.id;

  await prisma.diningTable.update({
    where: { id: entity.id },
    data: { status: 'booked' },
  });
}

// Event Booking
else if (category === 'event' && eventTypeSlug) {
  const eventType = await prisma.eventType.findUnique({
    where: { slug: eventTypeSlug },
  });

  if (!eventType) {
    return NextResponse.json(
      { error: 'Event type not found.' },
      { status: 404 }
    );
  }

  entity = await prisma.event.findFirst({
    where: {
      typeId: eventType.id,
      status: 'available',
    },
  });

  if (!entity) {
    return NextResponse.json(
      { error: 'No available events.' },
      { status: 409 }
    );
  }

  bookingData.eventId = entity.id;

  await prisma.event.update({
    where: { id: entity.id },
    data: { status: 'booked' },
  });
}

// Invalid Category or Missing Slug
else {
  return NextResponse.json(
    { error: 'Invalid booking category or missing slug.' },
    { status: 400 }
  );
}


    // create booking
    const booking = await prisma.booking.create({ data: bookingData });
    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  } finally {
    if (process.env.NODE_ENV !== 'production') {
      await prisma.$disconnect();
    }
  }
}