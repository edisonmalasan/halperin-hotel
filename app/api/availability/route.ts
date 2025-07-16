import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { type, description, category, prefix, roomTypeSlug, suiteTypeSlug, diningVenueSlug, eventTypeSlug } = await req.json();
    console.log('API input:', { type, description, category, prefix, roomTypeSlug, suiteTypeSlug, diningVenueSlug, eventTypeSlug }); // Debug log
    let available = 0;

    if (category === 'room' && roomTypeSlug) {
      const roomType = await prisma.roomType.findUnique({ where: { slug: roomTypeSlug } });
      if (roomType) {
        available = await prisma.room.count({
          where: {
            typeId: roomType.id,
            status: 'available',
          },
        });
      } else {
        available = 0;
      }
    } else if (category === 'suite' && suiteTypeSlug) {
      const suiteType = await prisma.suiteType.findUnique({ where: { slug: suiteTypeSlug } });
      if (suiteType) {
        available = await prisma.suite.count({
          where: {
            typeId: suiteType.id,
            status: 'available',
          },
        });
      } else {
        available = 0;
      }
    } else if (category === 'dining' && diningVenueSlug) {
      const diningVenue = await prisma.diningVenue.findUnique({ where: { slug: diningVenueSlug } });
      if (diningVenue) {
        available = await prisma.diningTable.count({
          where: {
            venueId: diningVenue.id,
            status: 'available',
          },
        });
      } else {
        available = 0;
      }
    } else if (category === 'event' && eventTypeSlug) {
      const eventType = await prisma.eventType.findUnique({ where: { slug: eventTypeSlug } });
      if (eventType) {
        available = await prisma.event.count({
          where: {
            typeId: eventType.id,
            status: 'available',
          },
        });
      } else {
        available = 0;
      }
    }

    return NextResponse.json({ available });
  } catch (error) {
    console.error('Error in /api/availability:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } 
}