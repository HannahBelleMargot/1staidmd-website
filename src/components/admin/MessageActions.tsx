'use client';

import { useState } from 'react';
import { markMessageReplied } from '@/app/admin/messages/actions';
import { Check, Loader2 } from 'lucide-react';

export default function MessageActions({
  messageId,
  replied,
}: {
  messageId: string;
  replied: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleMarkReplied = async () => {
    setLoading(true);
    await markMessageReplied(messageId);
    setLoading(false);
  };

  if (replied) {
    return (
      <span className="flex items-center gap-1 font-body text-xs text-green-400">
        <Check size={12} /> Replied
      </span>
    );
  }

  if (loading) {
    return <Loader2 size={16} className="animate-spin text-white/40" />;
  }

  return (
    <button
      onClick={handleMarkReplied}
      className="flex items-center gap-1 rounded-md bg-brand-red/10 px-2.5 py-1.5 font-body text-xs font-medium text-brand-red transition-colors hover:bg-brand-red/20"
    >
      <Check size={12} /> Mark Replied
    </button>
  );
}
