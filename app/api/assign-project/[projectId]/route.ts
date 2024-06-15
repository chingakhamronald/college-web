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
  return NextResponse.json('result');
}
export async function POST(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    //   const body = await req.json();
    const { projectId } = params;
    // const { assignedBy } = body;
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
    // const student = await prisma.student.findUnique({
    //   where: { id: studentId }
    // });
    if (!project) {
      return NextResponse.json({ error: 'project or student not found' });
    }
    const students = await prisma.student.findMany({
      where: {
        department: teacher?.department,
        semester: project?.semester
      }
    });
    console.log({ STUDENTSSSSSSS: students });

    // const createTeacher = await prisma.assignProject.create({
    //   data: {
    //     assignedBy: teacher?.name ?? '',
    //     projectId,
    //     studentId
    //   }
    // });
    for (const studentId of students) {
      console.log({ STUDENTSSSSSSSSSSSSSSS_______: studentId.id });
      const createTeacher = await prisma.assignProject.create({
        data: {
          assignedBy: teacher?.name ?? '',
          projectId,
          studentId: studentId.id
        }
      });
    }
    return NextResponse.json('assigned');
  } catch (e) {
    console.log('error', e);
    return NextResponse.json({ error: 'Something went wrong' });
  }
}
