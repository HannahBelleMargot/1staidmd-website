import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const bookingSchema = z.object({
  course_name: z.string().min(1),
  course_date: z.string().min(1),
  location: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(''),
  participants: z.number().min(1).default(1),
  concession: z.boolean().default(false),
  returning_student: z.boolean().default(false),
  group_booking: z.boolean().default(false),
  group_name: z.string().optional().default(''),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    const supabase = await createClient();
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        course_name: data.course_name,
        course_date: data.course_date,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        participants: data.participants,
        concession: data.concession,
        returning_student: data.returning_student,
        group_booking: data.group_booking,
        group_name: data.group_name,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: booking.id, message: 'Booking created' });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
