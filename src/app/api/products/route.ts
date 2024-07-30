import { getAuthSession } from '@/utils/auth';
import { prisma } from '@/utils/connect';
import { NextRequest, NextResponse } from 'next/server';

// FETCH ALL CATEGORIES
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  try {
    const products = await prisma.product.findMany({
      where: {
        ...(category ? { catSlug: category } : { isFeatured: true }),
      },
    });

    return new NextResponse(
      JSON.stringify({ message: 'all categories', data: products }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong' }),
      { status: 500 }
    );
  }
};
export const POST = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();
    if (session?.user.isAdmin) {
      const body = await req.json();
      const product = await prisma.product.create({
        data: { ...body },
      });

      return new NextResponse(
        JSON.stringify({ message: 'Product Added', data: product }),
        { status: 200 }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: 'User not authorized' }),
      { status: 401 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong' }),
      { status: 500 }
    );
  }
};
