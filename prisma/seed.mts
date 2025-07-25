import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // gagamitin lang ung deleteMany if ung command is pushing the seeder

  await prisma.booking.deleteMany();
  await prisma.room.deleteMany();
  await prisma.suite.deleteMany();
  // clear prepared statement
  await prisma.$disconnect();
  await prisma.$connect();
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
    let price = 200; // default
    if (type.prefix === 'Superior-Balcony') price = 300;
    else if (type.prefix === 'Deluxe') price = 250;
    else if (type.prefix === 'Deluxe-Balcony') price = 275;
    else if (type.prefix === 'Deluxe-Patio') price = 280;
    else if (type.prefix === 'Bungalow') price = 320;
    else if (type.prefix === 'Bungalow-Patio') price = 350;
    else if (type.prefix === 'Bungalow-Studio-Balcony') price = 370;
    allRooms = allRooms.concat(
      Array.from({ length: 10 }).map((_, i) => ({
        number: `${type.prefix}-${i + 1}`,
        status: 'available',
        typeId: type.id,
        price,
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
    let price = 400; // default
    if (type.prefix === 'Junior-Patio') price = 450;
    else if (type.prefix === 'Junior-Halperin') price = 500;
    else if (type.prefix === 'Rodeo') price = 600;
    else if (type.prefix === 'Crescent') price = 700;
    else if (type.prefix === 'Premier') price = 800;
    else if (type.prefix === 'Presidential') price = 1000;
    else if (type.prefix === 'Grand-Deluxe') price = 1200;
    allSuites = allSuites.concat(
      Array.from({ length: 10 }).map((_, i) => ({
        number: `${type.prefix}-${i + 1}`,
        status: 'available',
        typeId: type.id,
        price,
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

  // Prices from client/data/dining.ts
  const diningPrices = {
    'polo-lounge': 50,
    'cabana-cafe': 60,
    'fountain-coffee-room': 40,
  };

  for (const venue of diningVenues) {
    // Create the venue and get its actual ID
    const v = await prisma.diningVenue.create({
      data: {
        name: venue.name,
        description: venue.description,
        slug: venue.slug,
      },
    });

    const price = diningPrices[venue.slug as keyof typeof diningPrices];

    // Create 30 tables for this venue, one by one
    for (let i = 0; i < 30; i++) {
      await prisma.diningTable.create({
        data: {
          number: `Table ${i + 1}`,
          status: 'available',
          venueId: v.id,
          price,
        },
      });
    }
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

  let allEvents: any[] = [];
  for (const eventType of eventTypeRecords) {
    let price = 2000; // default
    if (eventType.prefix === 'social-event') price = 1500;
    else if (eventType.prefix === 'meeting') price = 1000;
    allEvents = allEvents.concat(
      Array.from({ length: 10 }).map((_, i) => ({
        date: new Date(2024, 6, 10 + i, 12, 0, 0),
        status: 'available',
        typeId: eventType.id,
        price,
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
