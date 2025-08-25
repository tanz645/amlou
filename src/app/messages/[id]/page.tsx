'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function MessageDetailPage() {
  const params = useParams();
  const messageId = params?.id;

  return (
    <div className="nt-page nt-message-detail">
      <h1>Message Detail</h1>
      <p>Message ID: {messageId}</p>
    </div>
  );
} 