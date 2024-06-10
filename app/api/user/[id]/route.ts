import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id } = params;
    console.log('RecieveDId_____', id);
    let result = await prisma.user.findUnique({
      select: {
        id: true,
        role: true,
        email: true
      },
      where: {
        id: id
      }
    });
    console.log('res', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
