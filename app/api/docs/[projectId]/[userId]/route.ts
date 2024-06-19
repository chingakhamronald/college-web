import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3 } from 'aws-sdk';

import { ObjectCannedACL, S3Client } from '@aws-sdk/client-s3';

export async function GET(req: Request, { params }: { params: any }) {
  const { projectId, userId } = params;
  const student = await prisma.student.findFirst({ where: { userId: userId } });
  if (!student) {
    return NextResponse.json({ error: 'student not found' });
  }
  const result = await prisma.doc.findFirst({
    where: { projectId, studentId: student.id }
  });

  if (!result?.path) {
    return [];
  }
  return NextResponse.json(result);
}

export async function POST(
  req: Request,
  { params }: { params: { projectId: string; userId: string } }
) {
  try {
    // const body = await req.json();
    const { projectId, userId } = params;
    // const { docName } = body;
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const docName = formData.get('docName') as string | null;
    const type = file?.type;

    if (!file) {
      return NextResponse.json({ error: 'File not found' });
    }
    if (!type) {
      return NextResponse.json({ error: 'FileType not found' });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const project = await prisma.project.findUnique({
      where: {
        id: projectId
      }
    });

    const student = await prisma.student.findUnique({
      where: {
        userId
      }
    });

    if (!project || !student) {
      return NextResponse.json({
        error: `Project ${project?.question ?? ''} or Student ${student?.name ?? ''
          } not found`
      });
    }
    const doc = await prisma.doc.findFirst({
      where: {
        projectId,
        studentId: student.id
      }
    });
    if (doc) {
      return NextResponse.json({ error: 'Already Exist' });
    }

    const res = await uploadFile(buffer, file.name, type);
    console.log({ buffer________: buffer, RES______: res, docName: docName });

    const result = await prisma.doc.create({
      data: {
        docName: docName ?? '',
        path: res.Location,
        projectId,
        fileType: type ?? "",
        studentId: student.id
      }
    });
    if (result.path) {
      await prisma.assignProject.update({
        where: {
          projectId_studentId: {
            projectId,
            studentId: student.id
          }
        },
        data: {
          status: true
        }
      });
    }

    return NextResponse.json(result);
  } catch (e) {
    console.log('error', e);
    return NextResponse.json({ error: 'Something went wrong' });
  }
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
