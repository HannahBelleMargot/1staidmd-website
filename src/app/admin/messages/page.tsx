import { createClient } from '@/lib/supabase/server';
import { ContactMessage } from '@/types';
import MessageActions from '@/components/admin/MessageActions';
import { format } from 'date-fns';

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Messages</h1>

      {!messages?.length ? (
        <div className="rounded-2xl border border-brand-border bg-brand-card p-10 text-center">
          <p className="font-body text-white/50">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {(messages as ContactMessage[]).map((msg) => (
            <div
              key={msg.id}
              className="rounded-2xl border border-brand-border bg-brand-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-body text-sm font-semibold">
                      {msg.name}
                    </h3>
                    {msg.subject && (
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-body text-xs text-white/50">
                        {msg.subject}
                      </span>
                    )}
                    <span className="font-body text-xs text-white/30">
                      {format(new Date(msg.created_at), 'dd MMM yyyy, h:mm a')}
                    </span>
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="mt-1 block font-body text-xs text-brand-red hover:text-brand-red-light"
                  >
                    {msg.email}
                  </a>
                  <p className="mt-3 font-body text-sm text-white/70 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
                <MessageActions messageId={msg.id} replied={msg.replied} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
