import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // room types and rooms
  const roomChildren = [
    { name: 'Superior', description: 'Superior Room', prefix: 'Superior' },
    { name: 'Superior', description: 'Superior Room with Balcony', prefix: 'Superior-Balcony' },
    { name: 'Deluxe', description: 'Deluxe Room', prefix: 'Deluxe' },
    { name: 'Deluxe', description: 'Deluxe Room with Balcony', prefix: 'Deluxe-Balcony' },
    { name: 'Deluxe', description: 'Deluxe Room with Patio', prefix: 'Deluxe-Patio' },
    { name: 'Bungalow', description: 'Bungalow Room', prefix: 'Bungalow' },
    { name: 'Bungalow', description: 'Bungalow Room with Patio', prefix: 'Bungalow-Patio' },
    { name: 'Bungalow', description: 'Bungalow Studio with Balcony', prefix: 'Bungalow-Studio-Balcony' },
  ];

  const roomTypeRecords = [];
  for (const child of roomChildren) {
    const type = await prisma.roomType.create({
      data: {
        name: child.name,
        description: child.description,
        slug: child.prefix,
      },
    });
    roomTypeRecords.push({ ...child, id: type.id, slug: child.prefix });
  }

  for (const type of roomTypeRecords) {
    await prisma.room.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        number: `${type.prefix}-${i + 1}`,
        status: i % 3 === 0 ? 'occupied' : 'available',
        typeId: type.id,
      })),
    });
  }

  //  suite types and suites
  const suiteChildren = [
    { name: 'Junior Suite', description: 'Junior Suite', prefix: 'Junior' },
    { name: 'Junior Suite', description: 'Junior Suite with Patio', prefix: 'Junior-Patio' },
    { name: 'Junior Halperin Suite', description: 'Junior Halperin Suite', prefix: 'Junior-Halperin' },
    { name: 'Rodeo Suite', description: 'Rodeo Suite', prefix: 'Rodeo' },
    { name: 'Crescent Suite', description: 'Crescent Suite', prefix: 'Crescent' },
    { name: 'Premier Suite', description: 'Premier Suite', prefix: 'Premier' },
    { name: 'Presidential Suite', description: 'Presidential Suite', prefix: 'Presidential' },
    { name: 'Grand Deluxe Suite', description: 'Grand Deluxe Suite', prefix: 'Grand-Deluxe' },
  ];

  const suiteTypeRecords = [];
  for (const child of suiteChildren) {
    const type = await prisma.suiteType.create({
      data: {
        name: child.name,
        description: child.description,
        slug: child.prefix,
      },
    });
    suiteTypeRecords.push({ ...child, id: type.id, slug: child.prefix });
  }

  for (const type of suiteTypeRecords) {
    await prisma.suite.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        number: `${type.prefix}-${i + 1}`,
        status: i % 4 === 0 ? 'occupied' : 'available',
        typeId: type.id,
      })),
    });
  }

  // dining venues and tables
  const diningVenues = [
    { name: 'Polo Lounge', description: 'Polo Lounge', slug: 'polo-lounge' },
    { name: 'The Cabana Cafe', description: 'The Cabana Cafe', slug: 'cabana-cafe' },
    { name: 'The Fountain Coffee Room', description: 'The Fountain Coffee Room', slug: 'fountain-coffee-room' },
  ];

  const diningVenueRecords = [];
  for (const venue of diningVenues) {
    const v = await prisma.diningVenue.create({
      data: {
        name: venue.name,
        description: venue.description,
        slug: venue.slug,
      },
    });
    diningVenueRecords.push({ ...venue, id: v.id });
  }

  for (const venue of diningVenueRecords) {
    await prisma.diningTable.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        number: `Table ${i + 1}`,
        status: i % 5 === 0 ? 'booked' : 'available',
        venueId: venue.id,
      })),
    });
  }

  // event types and events
  const eventTypes = [
    { name: 'Wedding', description: 'Weddings', prefix: 'wedding' },
    { name: 'Social Event', description: 'Social Events', prefix: 'social-event' },
    { name: 'Meeting', description: 'Meetings', prefix: 'meeting' },
  ];

  const eventTypeRecords = [];
  for (const eventType of eventTypes) {
    const e = await prisma.eventType.create({
      data: {
        name: eventType.name,
        description: eventType.description,
        slug: eventType.prefix, 
      },
    });
    eventTypeRecords.push({ ...eventType, id: e.id, slug: eventType.prefix });
  }

  for (const eventType of eventTypeRecords) {
    await prisma.event.createMany({
      data: Array.from({ length: 10 }).map((_, i) => ({
        date: new Date(2024, 6, 10 + i, 12, 0, 0),
        status: i % 2 === 0 ? 'available' : 'booked',
        typeId: eventType.id,
      })),
    });
  }

  console.log('SUCCESSFUL...Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
