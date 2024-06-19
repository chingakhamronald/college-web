import { prisma } from '@/config/prisma/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data);

    const { email, password } = data;

    await prisma.$connect();

    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 401 });
    }

    if (user.isverified === false) {
      return NextResponse.json({
        message: 'Account not verified. Please contact administration.'
      });
    }

    // Assuming password check logic is here, e.g., bcrypt comparison
    // if (!bcrypt.compareSync(password, user.password)) {
    //   return NextResponse.json(
    //     { message: 'Invalid email or password.' },
    //     { status: 401 }
    //   );
    // }
    if (user?.password !== password) {
      return NextResponse.json(
        { mesaage: 'Wrong Password!' },
        {
          status: 401
        }
      );
    }

    console.log('password ', password);
    return NextResponse.json(user, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { message: e.message || 'An error occurred' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
