import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(req: NextRequest) {
  const { email, name, kindeId, ...bookingData } = await req.json();

  // find or create user
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { email, name, kindeId },
    });
  }

  // create booking that will link to the suer
  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      ...bookingData,
    },
  });

  return NextResponse.json(booking);
}