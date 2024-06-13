import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../config/prisma/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get('department');

  const semester = searchParams.get('semester');
  console.log('department__________', department);
  if (department && semester) {
    let result = await prisma.student.findMany({
      where: {
        department: department,
        semester: semester
      }
    });
    console.log('res', result);
    return NextResponse.json(result);
  }
  let result = await prisma.student.findMany();
  console.log('res', result);
  return NextResponse.json(result);
}
