import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  const { teacherId } = params;

  const teacher = await prisma.teacher.findUnique({
    where: {
      id: teacherId
    }
  });

  if (!teacher) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  const result = await prisma.student.findMany({
    where: {
      department: teacher.department
    }
  });
  if (!result) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  console.log('res', result);
  return NextResponse.json(result);
}
