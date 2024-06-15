import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../config/prisma/db';

import { ObjectCannedACL, S3Client } from '@aws-sdk/client-s3';

export async function GET(req: Request, { params }: { params: any }) {
  const { projectId, studentId } = params;
  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });
  if (!project) {
    return NextResponse.json({ error: 'Project Not Found' }, { status: 404 });
  }
  const student = await prisma.student.findUnique({
    where: { id: studentId }
  });
  if (!student) {
    return NextResponse.json({ error: ' Student Not Found' }, { status: 404 });
  }
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
