import { prisma } from "@/config/prisma/db"
import { NextResponse } from "next/server"


export async function POST(req: Request) {

  try {
    const data = await req.json()
    console.log(data)

    const { email, password } = data

    await prisma.$connect();

    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
    });

    if (!user) {
      return NextResponse.json({ mesaage: "Not Found!" }, {
        status: 401
      })
    }

    console.log('password ', password)
    return NextResponse.json(user, { status: 200 })
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  } finally {
    await prisma.$disconnect();
  }
}
