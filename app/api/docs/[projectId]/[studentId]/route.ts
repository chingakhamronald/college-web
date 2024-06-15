import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../config/prisma/db';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3 } from 'aws-sdk';

import { ObjectCannedACL, S3Client } from '@aws-sdk/client-s3';

export async function GET(req: Request, { params }: { params: any }) {
  const { projectId, studentId } = params;
  let result = await prisma.doc.findFirst({
    where: { projectId, studentId }
  });
  // if (!result) {
  //   return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  // }
  if (!result?.path) {
    return [];
  }
  console.log('res', result);
  return NextResponse.json(result);
}

export async function POST(
  req: Request,
  { params }: { params: { projectId: string; studentId: string } }
) {
  try {
    // const body = await req.json();
    const { projectId, studentId } = params;
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
        id: studentId
      }
    });

    if (!project || !student) {
      return NextResponse.json({
        error: `Project ${project?.name ?? ''} or Student ${
          student?.name ?? ''
        } not found`
      });
    }
    const doc = await prisma.doc.findFirst({
      where: {
        projectId,
        studentId
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
        studentId
      }
    });
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
      Bucket: process.env.BUCKET_NAME ?? '',
      Body: dataBuffer,
      Key: `${fileName}-${Date.now()}`,
      ACL: 'public-read' as ObjectCannedACL
    })
    .promise();

  return uploadResultw;
}
