import React from 'react';
import BaseLayout from './Layout'; // Adjust the import path as necessary

function Dashboard() {
  const dashboardData = {
    title: 'My Dashboard',
    stats: {
      totalUsers: 120,
      activeUsers: 98,
      newUsers: 15,
    },
  };

  return (
    <BaseLayout title={dashboardData.title}>
      <div>
        <h2 className="text-xl font-semibold">Statistics</h2>
        <ul className="mt-4">
          <li>Total Users: {dashboardData.stats.totalUsers}</li>
          <li>Active Users: {dashboardData.stats.activeUsers}</li>
          <li>New Users: {dashboardData.stats.newUsers}</li>
        </ul>
      </div>
    </BaseLayout>
  );
}

export default Dashboard;
