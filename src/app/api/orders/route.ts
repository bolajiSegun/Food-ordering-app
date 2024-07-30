import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();
  try {
    if (session) {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();

        return new NextResponse(
          JSON.stringify({ message: 'all Orders', data: orders }),
          { status: 200 }
        );
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });

      return new NextResponse(
        JSON.stringify({ message: 'all users Orders', data: orders }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: 'You are not Authenticated' }),
        { status: 401 }
      );
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong' }),
      { status: 500 }
    );
  }
};

// CREATE ORDER
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    try {
      const body = await req.json();

      const order = await prisma.order.create({
        data: { ...body, userEmail: session.user.email, status: 'Not Paid' },
      });

      return new NextResponse(
        JSON.stringify({ message: 'all users Orders', data: order }),
        { status: 200 }
      );
    } catch (err) {
      return new NextResponse(
        JSON.stringify({ message: 'Something went wrong' }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'You are not Authenticated' }),
      { status: 401 }
    );
  }
};
