import React from 'react';

interface Stat {
  name: string;
  value: string;
  change: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const StatsGrid = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">{stat.change}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <stat.icon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
