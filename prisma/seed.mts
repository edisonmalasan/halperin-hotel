import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Room Types and Rooms
  await prisma.roomType.create({
    data: {
      name: 'Deluxe',
      description: 'Deluxe Room',
      rooms: {
        create: [
          { number: 'Deluxe-1', status: 'available' },
          { number: 'Deluxe-2', status: 'available' },
          { number: 'Deluxe-3', status: 'occupied' },
          { number: 'Deluxe-4', status: 'available' },
          { number: 'Deluxe-5', status: 'cleaning' },
        ]
      }
    }
  });

  await prisma.roomType.create({
    data: {
      name: 'Bungalow',
      description: 'Bungalow Room',
      rooms: {
        create: [
          { number: 'Bungalow-1', status: 'available' },
          { number: 'Bungalow-2', status: 'occupied' },
          { number: 'Bungalow-3', status: 'available' },
        ]
      }
    }
  });

  await prisma.roomType.create({
    data: {
      name: 'Superior',
      description: 'Superior Room',
      rooms: {
        create: [
          { number: 'Superior-1', status: 'available' },
          { number: 'Superior-2', status: 'occupied' },
        ]
      }
    }
  });

  // Suite Types and Suites
  await prisma.suiteType.create({
    data: {
      name: 'Junior Suite',
      description: 'Junior Suite',
      suites: {
        create: [
          { number: 'Junior-1', status: 'available' },
          { number: 'Junior-2', status: 'occupied' },
          { number: 'Junior-3', status: 'available' },
        ]
      }
    }
  });

  await prisma.suiteType.create({
    data: {
      name: 'Presidential Suite',
      description: 'Presidential Suite',
      suites: {
        create: [
          { number: 'Presidential-1', status: 'available' },
          { number: 'Presidential-2', status: 'occupied' },
        ]
      }
    }
  });

  await prisma.suiteType.create({
    data: {
      name: 'Crescent Suite',
      description: 'Crescent Suite',
      suites: {
        create: [
          { number: 'Crescent-1', status: 'available' },
        ]
      }
    }
  });

  // Dining Venues and Tables
  await prisma.diningVenue.create({
    data: {
      name: 'Polo Lounge',
      description: 'The most interesting room in Beverly Hills.',
      tables: {
        create: [
          { number: 'Table 1', status: 'available' },
          { number: 'Table 2', status: 'booked' },
          { number: 'Table 3', status: 'available' },
          { number: 'Table 4', status: 'available' },
          { number: 'Table 5', status: 'booked' },
        ]
      }
    }
  });

  await prisma.diningVenue.create({
    data: {
      name: 'Cabana Cafe',
      description: 'Casual, fresh dining in a picture-perfect setting.',
      tables: {
        create: [
          { number: 'Table 1', status: 'available' },
          { number: 'Table 2', status: 'available' },
          { number: 'Table 3', status: 'booked' },
        ]
      }
    }
  });

  await prisma.diningVenue.create({
    data: {
      name: 'Fountain Coffee Room',
      description: 'Iconic diner serving Hollywood stars since 1949.',
      tables: {
        create: [
          { number: 'Table 1', status: 'available' },
          { number: 'Table 2', status: 'available' },
        ]
      }
    }
  });

  // Event Types and Events
  await prisma.eventType.create({
    data: {
      name: 'Wedding',
      description: 'Weddings at the Pink Palace.',
      events: {
        create: [
          { date: new Date('2024-07-15T12:00:00Z'), status: 'available' },
          { date: new Date('2024-07-16T12:00:00Z'), status: 'booked' },
          { date: new Date('2024-07-17T12:00:00Z'), status: 'available' },
        ]
      }
    }
  });

  await prisma.eventType.create({
    data: {
      name: 'Meeting',
      description: 'Business meetings and conferences.',
      events: {
        create: [
          { date: new Date('2024-07-20T09:00:00Z'), status: 'available' },
          { date: new Date('2024-07-21T09:00:00Z'), status: 'booked' },
        ]
      }
    }
  });

  await prisma.eventType.create({
    data: {
      name: 'Social Event',
      description: 'Private parties and social gatherings.',
      events: {
        create: [
          { date: new Date('2024-08-01T18:00:00Z'), status: 'available' },
        ]
      }
    }
  });

  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });