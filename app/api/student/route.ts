import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../config/prisma/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get('department');

  const semester = searchParams.get('semester');
  if (department && semester) {
    let result = await prisma.student.findMany({
      where: {
        department: department,
        semester: semester
      }
    });
    return NextResponse.json(result);
  }
  let result = await prisma.student.findMany({
    include: {
      user: {
        select: {
          email: true,
          isverified: true,
          role: true
        }
      }
    }
  });
  return NextResponse.json(result);
}
