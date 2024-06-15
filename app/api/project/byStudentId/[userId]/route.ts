import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  const { userId } = params;

  const student = await prisma.student.findUnique({
    where: {
      userId
    }
  });
  let result = await prisma.project.findMany({
    where: {
      assignProject: {
        some: {
          studentId: student?.id
        }
      }
    },
    include: { teacher: true }
  });
  if (!result) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  console.log('res', result);
  return NextResponse.json(result);
}
