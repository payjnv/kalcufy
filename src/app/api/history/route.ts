import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

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
    const limit = user.isPro ? 100 : 10;
    const history = await prisma.calculatorHistory.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return NextResponse.json({ history, isPro: user.isPro });
  } catch (error) {
    console.error('Error fetching history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
    const body = await request.json();
    const { calculatorSlug, calculatorName, inputs, results } = body;
    if (!calculatorSlug || !calculatorName || !inputs || !results) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const entry = await prisma.calculatorHistory.create({
      data: {
        userId: user.id,
        calculatorSlug,
        calculatorName,
        inputs,
        results,
      },
    });
    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error('Error saving history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    await prisma.calculatorHistory.deleteMany({
      where: { id, userId: user.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
