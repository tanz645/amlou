/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/elements/PageHeader';
import ClientForm from '@/components/ClientForm';
import clientsData from '@/data/clients.json';

interface RawClient {
  [key: string]: unknown;
}

export default function EditClientPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>('');
  const [client, setClient] = useState<RawClient | undefined>(undefined);
  
  useEffect(() => {
    params.then(({ id: resolvedId }) => {
      setId(resolvedId);
      const foundClient = (clientsData as RawClient[]).find(c => c.id === resolvedId);
      setClient(foundClient);
    });
  }, [params]);

  if (!id || !client) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Edit Client"
        actions={[]}
      />
      <div className="mt-8">
        <ClientForm
          initialData={client as any}
          isEditing={true}
        />
      </div>
    </div>
  );
} 