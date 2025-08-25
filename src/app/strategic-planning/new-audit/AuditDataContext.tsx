import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AuditDataMap = {
  [auditType: string]: Record<string, unknown>;
};

interface AuditDataContextType {
  auditData: AuditDataMap;
  setAuditData: (auditType: string, data: Record<string, unknown>) => void;
  clientId: string;
  setClientId: (id: string) => void;
  projectId: string;
  setProjectId: (id: string) => void;
  auditNumber: string;
  setAuditNumber: (num: string) => void;
}

const AuditDataContext = createContext<AuditDataContextType | undefined>(undefined);

export const AuditDataProvider = ({ children }: { children: ReactNode }) => {
  const [auditData, setAuditDataState] = useState<AuditDataMap>({});
  const [clientId, setClientId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [auditNumber, setAuditNumber] = useState('');

  const setAuditData = (auditType: string, data: Record<string, unknown>) => {
    setAuditDataState(prev => ({
      ...prev,
      [auditType]: data,
    }));
  };

  return (
    <AuditDataContext.Provider value={{ auditData, setAuditData, clientId, setClientId, projectId, setProjectId, auditNumber, setAuditNumber }}>
      {children}
    </AuditDataContext.Provider>
  );
};

export const useAuditData = () => {
  const context = useContext(AuditDataContext);
  if (!context) {
    throw new Error('useAuditData must be used within an AuditDataProvider');
  }
  return context;
}; 