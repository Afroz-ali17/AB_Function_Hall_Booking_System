import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, session } from '@/db/schema';
import { eq, desc, and, gt } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Extract Authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Validate Bearer token format
    const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/);
    if (!tokenMatch) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const token = tokenMatch[1];

    // Query session table to validate token and get userId
    const sessionRecords = await db
      .select()
      .from(session)
      .where(eq(session.token, token))
      .limit(1);

    if (sessionRecords.length === 0) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const userSession = sessionRecords[0];

    // Check if session is expired
    const currentTime = new Date();
    if (userSession.expiresAt <= currentTime) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Query bookings for the authenticated user, ordered by createdAt descending
    const userBookings = await db
      .select()
      .from(bookings)
      .where(eq(bookings.userId, userSession.userId))
      .orderBy(desc(bookings.createdAt));

    return NextResponse.json(userBookings, { status: 200 });
  } catch (error) {
    console.error('GET /api/my-bookings error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}