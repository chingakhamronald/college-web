import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  const { id } = params;
  let result = await prisma.student.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, email: true, isverified: true, role: true } }
    }
  });
  if (!result) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  return NextResponse.json(result);
}
