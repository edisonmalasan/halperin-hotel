import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete all data in correct order to avoid FK errors
  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.suite.deleteMany();
  await prisma.diningTable.deleteMany();
  await prisma.event.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.suiteType.deleteMany();
  await prisma.diningVenue.deleteMany();
  await prisma.eventType.deleteMany();

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

  let allRooms: any[] = [];
  for (const type of roomTypeRecords) {
    allRooms = allRooms.concat(
      Array.from({ length: 10 }).map((_, i) => ({
        number: `${type.prefix}-${i + 1}`,
        status: 'available',
        typeId: type.id,
        price: 200 + (i % 3) * 50, // 200, 250, 300
      }))
    );
  }
  await prisma.room.createMany({ data: allRooms, skipDuplicates: true });

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

  let allSuites: any[] = [];
  for (const type of suiteTypeRecords) {
    allSuites = allSuites.concat(
      Array.from({ length: 10 }).map((_, i) => ({
        number: `${type.prefix}-${i + 1}`,
        status: 'available',
        typeId: type.id,
        price: 400 + (i % 4) * 150, // 400, 550, 700, 850
      }))
    );
  }
  await prisma.suite.createMany({ data: allSuites, skipDuplicates: true });

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

  let allDiningTables: any[] = [];
  for (const venue of diningVenueRecords) {
    allDiningTables = allDiningTables.concat(
      Array.from({ length: 10 }).map((_, i) => ({
        number: `Table ${i + 1}`,
        status: 'available',
        venueId: venue.id,
        price: 50 + (i % 3) * 25, // 50, 75, 100
      }))
    );
  }
  await prisma.diningTable.createMany({ data: allDiningTables, skipDuplicates: true });

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

  let allEvents: any[] = [];
  for (const eventType of eventTypeRecords) {
    allEvents = allEvents.concat(
      Array.from({ length: 10 }).map((_, i) => ({
        date: new Date(2024, 6, 10 + i, 12, 0, 0),
        status: 'available',
        typeId: eventType.id,
        price: 2000 + (i % 4) * 1000, // 2000, 3000, 4000, 5000
      }))
    );
  }
  await prisma.event.createMany({ data: allEvents, skipDuplicates: true });

  console.log('SUCCESSFUL...Seed complete!');
}

main()
  .catch((e) => {
    console.error('SEED FAILED:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
