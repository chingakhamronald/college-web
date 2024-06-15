import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  const { projectId } = params;
  let result = await prisma.doc.findMany({
    where: { projectId }
  });

  console.log('res', result);
  return NextResponse.json(result);
}
export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const body = await req.json();
    const { projectId } = params;
    const { docName, path } = body;

    const createTeacher = await prisma.doc.create({
      data: {
        docName: docName ?? '',
        path: path ?? '',
        projectId
      }
    });
    return NextResponse.json(createTeacher);
  } catch (e) {
    console.log('error', e);
    return NextResponse.json({ error: 'Something went wrong' });
  }
}
