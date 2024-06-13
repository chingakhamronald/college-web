import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  const { projectId, studentId } = params;
  let result = await prisma.doc.findMany({
    where: { projectId }
  });
  // if (!result) {
  //   return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  // }
  console.log('res', result);
  return NextResponse.json('result');
}
export async function POST(
  req: Request,
  { params }: { params: { projectId: string; studentId: string } }
) {
  try {
    const body = await req.json();
    const { projectId, studentId } = params;
    const { assignedBy } = body;
    // const user = await getUser(userId);
    // // const teacher = await getTeacher(userId);
    // if (teacher) {
    //   return NextResponse.json({ error: 'Already Exist' });
    // }
    // if (!user) {
    //   return NextResponse.json({ error: 'User not Found' });
    // }
    const teacher = await prisma.teacher.findFirst({
      where: {
        project: {
          some: {
            id: projectId
          }
        }
      }
    });
    console.log({ TEACHER: teacher });

    const project = await prisma.project.findUnique({
      where: { id: projectId }
    });
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });
    if (!project || !student) {
      return NextResponse.json({ error: 'project or student not found' });
    }

    const createTeacher = await prisma.assignProject.create({
      data: {
        assignedBy: teacher?.name ?? '',
        projectId,
        studentId
      }
    });
    return NextResponse.json(createTeacher);
  } catch (e) {
    console.log('error', e);
    return NextResponse.json({ error: 'Something went wrong' });
  }
}
