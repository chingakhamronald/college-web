import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';
import { S3 } from 'aws-sdk';
import { ObjectCannedACL } from '@aws-sdk/client-s3';

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
    const userId = params.userId;

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const question = formData.get('question') as string | null;
    const semester = formData.get('semester') as string | null;
    const subject = formData.get('subject') as string | null;

    const type = file?.type;
    if (!file) {
      return NextResponse.json({ error: 'File not found' });
    }
    if (!type) {
      return NextResponse.json({ error: 'FileType not found' });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    console.log({
      buffer________: buffer,
      RES______: file,
      question: question,
      semester: semester,
      subject: subject
    });

    const teacher = await getTeacher(userId);

    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not Found' });
    }

    const res = await uploadFile(buffer, file.name, type);

    const createTeacher = await prisma.project.create({
      data: {
        question: question ?? '',
        semester: semester ?? '',
        subject: subject ?? '',
        path: res.Location ?? '',
        fileType: type ?? '',
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

async function uploadFile(dataBuffer: Buffer, fileName: string, type: string) {
  const s3 = new S3();
  const uploadResultw = await s3
    .upload({
      Bucket: 'mitnewbucket',
      Body: dataBuffer,
      Key: `${Date.now()}-${fileName}`,
      ACL: 'public-read' as ObjectCannedACL
    })
    .promise();

  return uploadResultw;
}
