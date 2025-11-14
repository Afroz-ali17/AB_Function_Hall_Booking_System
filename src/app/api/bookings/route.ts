import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings, session } from '@/db/schema';
import { eq, like, and, or, sql } from 'drizzle-orm';
import { sendBookingNotification } from '@/lib/email';
import { logBooking } from '@/lib/google-sheets';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single booking by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const booking = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, parseInt(id)))
        .limit(1);

      if (booking.length === 0) {
        return NextResponse.json(
          { error: 'Booking not found', code: 'BOOKING_NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(booking[0], { status: 200 });
    }

    // List bookings with pagination, search, and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let query = db.select().from(bookings);

    // Build WHERE conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(bookings.name, `%${search}%`),
          like(bookings.email, `%${search}%`),
          like(bookings.eventType, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(bookings.status, status));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Extract Authorization header for userId
    const authHeader = request.headers.get('Authorization');
    let userId: string | null = null;

    if (authHeader) {
      const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/);
      if (tokenMatch) {
        const token = tokenMatch[1];
        const sessionRecords = await db
          .select()
          .from(session)
          .where(eq(session.token, token))
          .limit(1);

        if (sessionRecords.length > 0) {
          const userSession = sessionRecords[0];
          const currentTime = new Date();
          if (userSession.expiresAt > currentTime) {
            userId = userSession.userId;
          }
        }
      }
    }

    const body = await request.json();
    const { name, email, phone, eventType, startDate, endDate, guestCount, message } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { error: 'Email is required', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Invalid email format', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return NextResponse.json(
        { error: 'Phone is required', code: 'MISSING_PHONE' },
        { status: 400 }
      );
    }

    if (!eventType || typeof eventType !== 'string' || eventType.trim() === '') {
      return NextResponse.json(
        { error: 'Event type is required', code: 'MISSING_EVENT_TYPE' },
        { status: 400 }
      );
    }

    if (!startDate || typeof startDate !== 'string' || startDate.trim() === '') {
      return NextResponse.json(
        { error: 'Start date is required', code: 'MISSING_START_DATE' },
        { status: 400 }
      );
    }

    if (!endDate || typeof endDate !== 'string' || endDate.trim() === '') {
      return NextResponse.json(
        { error: 'End date is required', code: 'MISSING_END_DATE' },
        { status: 400 }
      );
    }

    if (!guestCount || typeof guestCount !== 'number' || !Number.isInteger(guestCount)) {
      return NextResponse.json(
        { error: 'Guest count is required and must be an integer', code: 'MISSING_GUEST_COUNT' },
        { status: 400 }
      );
    }

    // Validate guestCount is positive
    if (guestCount <= 0) {
      return NextResponse.json(
        { error: 'Guest count must be a positive integer', code: 'INVALID_GUEST_COUNT' },
        { status: 400 }
      );
    }

    // Validate date formats
    const startDateTime = new Date(startDate.trim());
    const endDateTime = new Date(endDate.trim());

    if (isNaN(startDateTime.getTime())) {
      return NextResponse.json(
        { error: 'Invalid start date format', code: 'INVALID_START_DATE' },
        { status: 400 }
      );
    }

    if (isNaN(endDateTime.getTime())) {
      return NextResponse.json(
        { error: 'Invalid end date format', code: 'INVALID_END_DATE' },
        { status: 400 }
      );
    }

    // Validate endDate is after or equal to startDate
    if (endDateTime < startDateTime) {
      return NextResponse.json(
        { error: 'End date must be after or equal to start date', code: 'INVALID_DATE_RANGE' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone.trim();
    const sanitizedEventType = eventType.trim();
    const sanitizedMessage = message ? message.trim() : null;
    const sanitizedStartDate = startDate.trim();
    const sanitizedEndDate = endDate.trim();

    // Check for date conflicts with approved bookings
    // Two date ranges overlap if: startDate1 <= endDate2 AND endDate1 >= startDate2
    const conflictingBookings = await db
      .select()
      .from(bookings)
      .where(
        and(
          eq(bookings.status, 'approved'),
          sql`${bookings.startDate} <= ${sanitizedEndDate}`,
          sql`${bookings.endDate} >= ${sanitizedStartDate}`
        )
      );

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { 
          error: 'The selected dates are already booked. Please choose different dates.',
          code: 'DATE_CONFLICT',
          conflictingDates: conflictingBookings.map(b => ({
            startDate: b.startDate,
            endDate: b.endDate
          }))
        },
        { status: 409 }
      );
    }

    // Create booking with userId if available
    const newBooking = await db
      .insert(bookings)
      .values({
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        eventType: sanitizedEventType,
        startDate: sanitizedStartDate,
        endDate: sanitizedEndDate,
        guestCount: guestCount,
        message: sanitizedMessage,
        status: 'pending',
        userId: userId,
        createdAt: new Date().toISOString(),
      })
      .returning();

    // Sync to Google Sheets using new logging function
    try {
      await logBooking({
        bookingId: newBooking[0].id,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        eventType: sanitizedEventType,
        startDate: sanitizedStartDate,
        endDate: sanitizedEndDate,
        guestCount: guestCount,
        message: sanitizedMessage,
        status: 'pending',
        userId: userId,
        createdAt: newBooking[0].createdAt,
      });
    } catch (sheetError) {
      console.error('Failed to sync to Google Sheets:', sheetError);
      // Don't fail the booking if Google Sheets sync fails
    }

    // Send email notification to admin
    try {
      await sendBookingNotification({
        bookingId: newBooking[0].id,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        eventType: sanitizedEventType,
        startDate: sanitizedStartDate,
        endDate: sanitizedEndDate,
        guestCount: guestCount,
        message: sanitizedMessage || undefined,
      });
    } catch (emailError) {
      // Log email error but don't fail the booking creation
      console.error('Failed to send email notification:', emailError);
    }

    return NextResponse.json(newBooking[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}