import React from 'react';
import { notFound } from 'next/navigation';
import StrategicPlanningShell from './StrategicPlanningShell';

const StrategicPlanningLayout = ({ children }: { children: React.ReactNode }) => {
  if (!children) {
    notFound();
  }

  return <StrategicPlanningShell>{children}</StrategicPlanningShell>;
};

export default StrategicPlanningLayout; 