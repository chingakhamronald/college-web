import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';

export async function GET() {
  let result = await prisma.teacher.findMany({
    // where: {
    //   role: 'district_admin'
    // }
  });
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
    const { name, address, mobile_number, department } = body;
    const user = await getUser(userId);
    const teacher = await getTeacher(userId);
    if (teacher) {
      return NextResponse.json({ error: 'Already Exist' });
    }
    if (!user) {
      return NextResponse.json({ error: 'User not Found' });
    }

    const createTeacher = await prisma.teacher.create({
      data: {
        address: address,
        department: department,
        mobile_number: mobile_number,
        name: name,
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
    where: { id: userId, role: 'teacher' }
  });
}
function getTeacher(userId: string) {
  // console.log({ userId____: userId });
  return prisma.teacher.findUnique({
    where: { userId: userId }
  });
}
