import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id } = params;
    let result = await prisma.user.findUnique({
      select: {
        id: true,
        role: true,
        email: true,
        isverified: true,
        teacher: true
      },
      where: {
        id: id
      }
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
