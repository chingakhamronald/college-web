import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  const { projectId, studentId } = params;
  let result = await prisma.doc.findMany({
    where: { projectId }
  });
  // if (!result) {
  //   return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  // }
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
    // const user = await getUser(userId);
    // // const teacher = await getTeacher(userId);
    // if (teacher) {
    //   return NextResponse.json({ error: 'Already Exist' });
    // }
    // if (!user) {
    //   return NextResponse.json({ error: 'User not Found' });
    // }

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
