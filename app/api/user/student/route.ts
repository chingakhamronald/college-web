export const dynamic = 'force-dynamic';
import { prisma } from '@/config/prisma/db';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  let result = await prisma.user.findMany({
    where: {
      role: 'student'
    },
    select: {
      id: true,
      email: true,
      role: true,
      student: true
    }
  });

  return NextResponse.json(result);
}
