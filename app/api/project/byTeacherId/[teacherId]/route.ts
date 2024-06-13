import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  const { teacherId } = params;
  let result = await prisma.project.findMany({
    where: { teacherId: teacherId }
  });
  if (!result) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  console.log('res', result);
  return NextResponse.json(result);
}
export async function POST(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  try {
    const body = await req.json();
    const teacherId = params.teacherId;
    const { name, semester, subject } = body;
    console.log({ Parammm____: params, BODY____: body });
    // const user = await getUser(userId);
    const teacher = await getTeacher(teacherId);
    // if (teacher) {
    //   return NextResponse.json({ error: 'Already Exist' });
    // }
    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not Found' });
    }

    const createTeacher = await prisma.project.create({
      data: {
        name: name ?? '',
        semester: semester ?? '',
        subject: subject ?? '',
        teacherId: teacherId
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
    where: { id }
  });
}
