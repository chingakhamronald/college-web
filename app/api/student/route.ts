import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../config/prisma/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const teacherId = searchParams.get('teacherId');
  if (teacherId) {
    let result = await prisma.teacher.findMany({
      where: {
        project: {
          some: {
            teacher: {
              id: teacherId
            }
          }
        }
      }
    });
    console.log('res', result);
    return NextResponse.json(result);
  }
  let result = await prisma.teacher.findMany();
  console.log('res', result);
  return NextResponse.json(result);
}
