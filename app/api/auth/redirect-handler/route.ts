import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return NextResponse.redirect('http://localhost:3000');
  }
 // chcck if admin
  if (user.email === process.env.ADMIN_EMAIL) {
    return NextResponse.redirect('http://localhost:3000/admin/dashboard');
  }

  // redirect normal user to default
  return NextResponse.redirect('http://localhost:3000');
}