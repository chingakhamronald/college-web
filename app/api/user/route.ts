export const dynamic = 'force-dynamic'
import { prisma } from '@/config/prisma/db';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { options } from '../auth/[...nextauth]/options';


export async function POST(req: Request, res: NextApiResponse) {
  console.log('user data', req.body)
  const user = await req.json()
  console.log('user: ', user)


  let result = await prisma.user.upsert({
    where: {
      email: user.email
    },
    create: user,
    update: user
  })

  return NextResponse.json(result)
}

export async function GET(req: Request) {

  const session = await getServerSession(options)
  if (!session) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      student: true,
      teacher: true
    }
  })

  return NextResponse.json(result)
}