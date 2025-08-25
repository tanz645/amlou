'use client';

import React from 'react';

const StatCard = ({ icon: Icon, label, value, color }: { icon: React.ElementType, label: string, value: string | number, color: string }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200/80 flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-blue-300/50 hover:-translate-y-0.5 group">
    <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${color} transition-transform duration-300 group-hover:scale-105`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default StatCard; 