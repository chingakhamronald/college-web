import { NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    let check = await prisma.user.findUnique({
      where: { id: id }
    });
    if (!check) {
      return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
    }
    let result = await prisma.user.update({
      where: { id: id },
      data: {
        isverified: true
      }
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
