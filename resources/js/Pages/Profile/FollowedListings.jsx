// resources/js/Pages/Listing/Listings.jsx
import React, { useState } from 'react';
import { Link } from "@inertiajs/react";

function Table({ followed_listings }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const sortedFollowedListings = React.useMemo(() => {
        if (sortConfig.key) {
            return [...followed_listings].sort((a, b) => {
                const aValue = getNestedValue(a, sortConfig.key);
                const bValue = getNestedValue(b, sortConfig.key);

                if (typeof aValue === 'string') {
                    return (aValue.localeCompare(bValue)) * (sortConfig.direction === 'asc' ? 1 : -1);
                } else {
                    return (aValue - bValue) * (sortConfig.direction === 'asc' ? 1 : -1);
                }
            });
        }
        return followed_listings;
    }, [followed_listings, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Obserwowane Ogłoszenia</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th
                                className="py-2 px-4 border-b font-semibold text-gray-600 cursor-pointer"
                                onClick={() => requestSort('listing.id')}
                            >
                                ID {sortConfig.key === 'listing.id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th
                                className="py-2 px-4 border-b font-semibold text-gray-600 cursor-pointer"
                                onClick={() => requestSort('listing.title')}
                            >
                                Tytuł {sortConfig.key === 'listing.title' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th
                                className="py-2 px-4 border-b font-semibold text-gray-600 cursor-pointer"
                                onClick={() => requestSort('listing.price')}
                            >
                                Cena {sortConfig.key === 'listing.price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th
                                className="py-2 px-4 border-b font-semibold text-gray-600 cursor-pointer"
                                onClick={() => requestSort('listing.created_at')}
                            >
                                Data utworzenia {sortConfig.key === 'listing.created_at' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th className="py-2 px-4 border-b font-semibold text-gray-600">Data polubienia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedFollowedListings.map((followed) => (
                            <tr key={followed.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b text-gray-700">{followed.listing.id}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{followed.listing.title}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{followed.listing.price} zł</td>
                                <td className="py-2 px-4 border-b text-gray-700">
                                    {new Date(followed.listing.created_at).toLocaleDateString()}
                                </td>

                                <td className="py-2 px-4 border-b text-gray-700">
                                    {new Date(followed.created_at).toLocaleDateString()}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
