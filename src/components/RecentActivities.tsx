import React from 'react';

interface Activity {
  id: number;
  type: string;
  description: string;
  time: string;
}

const RecentActivities = ({ activities }: { activities: Activity[] }) => {
  return (
    <div className="nt-component nt-recent-activities bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">
                  {activity.type.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;
