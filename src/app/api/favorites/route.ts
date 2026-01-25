import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

// GET - Obtener favoritos del usuario
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, isPro: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ favorites, isPro: user.isPro });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Agregar a favoritos
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, isPro: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check limit for free users
    if (!user.isPro) {
      const count = await prisma.favorite.count({ where: { userId: user.id } });
      if (count >= 5) {
        return NextResponse.json({ error: 'Favorite limit reached. Upgrade to PRO for unlimited favorites.' }, { status: 403 });
      }
    }

    const body = await request.json();
    const { calculatorSlug, calculatorName, category } = body;

    if (!calculatorSlug || !calculatorName || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const favorite = await prisma.favorite.upsert({
      where: {
        userId_calculatorSlug: {
          userId: user.id,
          calculatorSlug,
        },
      },
      update: {},
      create: {
        userId: user.id,
        calculatorSlug,
        calculatorName,
        category,
      },
    });

    return NextResponse.json({ success: true, favorite });
  } catch (error) {
    console.error('Error adding favorite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Eliminar de favoritos
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const calculatorSlug = searchParams.get('slug');

    if (!calculatorSlug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    await prisma.favorite.deleteMany({
      where: { userId: user.id, calculatorSlug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
