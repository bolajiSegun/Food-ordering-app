import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      return NextResponse.json({
        status: 404,
        message: 'No Product found',
      });
    }

    return NextResponse.json({
      status: 200,
      message: 'Product found successfully',
      data: product,
    });
  } catch (err) {
    return NextResponse.json({ status: 500, message: 'Server error' });
  }
};

// DELET SINGLE PRODUCT
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getAuthSession();
  if (session?.user.isAdmin) {
    try {
      const { id } = params;

      await prisma.product.delete({
        where: { id: id },
      });

      return NextResponse.json({
        status: 200,
        message: 'Product deleted',
      });
    } catch (err) {
      return NextResponse.json({ status: 500, message: 'Server error' });
    }
  } else {
    return NextResponse.json({ status: 401, message: 'Not authorized' });
  }
};
