'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function updateBookingStatus(
  id: string,
  status: 'confirmed' | 'cancelled'
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/bookings');
  revalidatePath('/admin');
  return { success: true };
}
