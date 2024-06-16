import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../config/prisma/db';

export async function GET(req: Request, { params }: { params: any }) {
  const { id } = params;
  let result = await prisma.project.findUnique({
    where: { id: id },
    include: {
      assignProject: { include: { student: true } }
    }
  });
  if (!result) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
  console.log('res', result);
  return NextResponse.json(result);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const id = params.id;
    const { question, semester, subject } = body;
    let check = await prisma.project.findUnique({
      where: { id: id }
    });
    if (!check) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const updateProject = await prisma.project.update({
      where: { id: id },
      data: {
        question: question ? question : check.question,
        semester: semester ? semester : check.semester,
        subject: subject ? subject : check.subject
      }
    });

    return NextResponse.json('OK');
  } catch (e) {
    console.log('error', e);
    return NextResponse.json({ error: 'Something went wrong' });
  }
}
