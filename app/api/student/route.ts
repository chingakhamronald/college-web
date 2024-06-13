import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../config/prisma/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get('department');
  console.log('department__________', department);
  if (department) {
    let result = await prisma.student.findMany({
      where: {
        department: department
      }
    });
    console.log('res', result);
    return NextResponse.json(result);
  }
  let result = await prisma.student.findMany();
  console.log('res', result);
  return NextResponse.json(result);
}
