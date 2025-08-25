import React from 'react';
import { notFound } from 'next/navigation';
import AccountingShell from './AccountingShell';

const AccountingLayout = ({ children }: { children: React.ReactNode }) => {
  if (!children) {
    notFound();
  }

  return <AccountingShell>{children}</AccountingShell>;
};

export default AccountingLayout; 