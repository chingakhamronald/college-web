import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../config/prisma/db';

export async function GET() {
  let result = await prisma.teacher.findMany({
    include: {
      user: { select: { email: true, isverified: true, role: true } }
    }
    // where: {
    //   role: 'district_admin'
    // }
  });
  return NextResponse.json(result);
}
