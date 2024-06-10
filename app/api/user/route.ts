import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../config/prisma/db';

export async function GET() {
  let result = await prisma.user.findMany({
    select: {
      id: true,
      role: true,
      email: true
    }
    // where: {
    //   role: 'district_admin'
    // }
  });
  console.log('res', result);
  return NextResponse.json(result);
}
