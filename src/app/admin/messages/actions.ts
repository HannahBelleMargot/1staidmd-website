'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function markMessageReplied(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('contact_messages')
    .update({ replied: true })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/messages');
  revalidatePath('/admin');
  return { success: true };
}
