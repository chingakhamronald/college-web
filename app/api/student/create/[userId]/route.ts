import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const userId = params.userId;
    const { name, address, mobile_number, department, fatherName, semester } = body;
    const user = await getUser(userId);
    const teacher = await getTeacher(userId);
    if (teacher) {
      return NextResponse.json({ error: 'Already Exist' });
    }
    if (!user) {
      return NextResponse.json({ error: 'User not Found' });
    }
    // console.log({
    //   ADDRESS: address,
    //   MOBILE_NUMBER: mobile_number,
    //   DEPARTMENT: department,
    //   NAME: name,
    //   UserId: user
    // });
    const createTeacher = await prisma.student.create({
      data: {
        address: address,
        department: department,
        mobile_number: mobile_number,
        name: name,
        fatherName: fatherName,
        semester: semester,
        userId: user.id
      }
    });
    return NextResponse.json(createTeacher);
  } catch (e) {
    console.log('error', e);
    return NextResponse.json({ error: 'Something went wrong' });
  }
}
function getUser(userId: string) {
  console.log({ userId____: userId });
  return prisma.user.findUnique({
    where: { id: userId, role: 'student' }
  });
}
function getTeacher(userId: string) {
  // console.log({ userId____: userId });
  return prisma.student.findUnique({
    where: { userId: userId }
  });
}
