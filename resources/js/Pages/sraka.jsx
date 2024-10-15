import React from "react";
import BaseLayout from "./Layout"; // Adjust the import path as necessary

import { useEffect } from "react";

function Dashboard({ items }) {
    const dashboardData = {
        title: "My Dashboard",
        stats: {
            totalUsers: 120,
            activeUsers: 98,
            newUsers: 15,
        },
    };

    useEffect(() => {
        //console.log(items); // Wyświetla tablicę 'users' w konsoli
        for (i = 0; i < items.count; i++) console.log(items[0].name);
        console.log(items[0].categories[0].name);
        console.log(items[0].categories[0].items[0].name);
    }, [items]);

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
