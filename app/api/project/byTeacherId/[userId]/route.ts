import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  const { userId } = params;
  const teacher = await getTeacher(userId);
  if (!teacher) {
    return NextResponse.json({ error: 'Teacher not Found' });
  }
  let result = await prisma.project.findMany({
    where: { teacherId: teacher.id }
  });
  if (!result) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  console.log('res', result);
  return NextResponse.json(result);
}
export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const userId = params.userId;

    const { question, semester, subject } = body;
    const teacher = await getTeacher(userId);

    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not Found' });
    }

    const createTeacher = await prisma.project.create({
      data: {
        question: question ?? '',
        semester: semester ?? '',
        subject: subject ?? '',
        teacherId: teacher.id
      }
    });
    return NextResponse.json(createTeacher);
  } catch (e) {
    console.log('error', e);
    return NextResponse.json({ error: 'Something went wrong' });
  }
}
function getTeacher(id: string) {
  console.log({ ID____: id });
  return prisma.teacher.findUnique({
    where: { userId: id }
  });
}
