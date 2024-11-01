// resources/js/Pages/Listing/Listings.jsx

import React, { useState } from 'react';

function Table({ products }) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Funkcja do uzyskiwania zagnieżdżonych wartości z obiektu
    const getNestedValue = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    // Funkcja pomocnicza do sortowania
    const sortedProducts = React.useMemo(() => {
        if (sortConfig.key) {
            return [...products].sort((a, b) => {
                const aValue = getNestedValue(a, sortConfig.key);
                const bValue = getNestedValue(b, sortConfig.key);

                // Obsługa sortowania dla stringów i liczb
                if (typeof aValue === 'string') {
                    return (aValue.localeCompare(bValue)) * (sortConfig.direction === 'asc' ? 1 : -1);
                } else {
                    return (aValue - bValue) * (sortConfig.direction === 'asc' ? 1 : -1);
                }
            });
        }
        return products;
    }, [products, sortConfig]);

    // Funkcja ustawiająca parametry sortowania
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Ogłoszenia</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th
                                className="py-2 px-4 border-b font-semibold text-gray-600 cursor-pointer"
                                onClick={() => requestSort('id')}
                            >
                                ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th
                                className="py-2 px-4 border-b font-semibold text-gray-600 cursor-pointer"
                                onClick={() => requestSort('title')}
                            >
                                Tytuł {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th
                                className="py-2 px-4 border-b font-semibold text-gray-600 cursor-pointer"
                                onClick={() => requestSort('price')}
                            >
                                Cena {sortConfig.key === 'price' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th
                                className="py-2 px-4 border-b font-semibold text-gray-600 cursor-pointer"
                                onClick={() => requestSort('created_at')}
                            >
                                Data utworzenia {sortConfig.key === 'created_at' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th
                                className="py-2 px-4 border-b font-semibold text-gray-600 cursor-pointer"
                                onClick={() => requestSort('status.name')}
                            >
                                Status {sortConfig.key === 'status.name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                            </th>
                            <th className="py-2 px-4 border-b font-semibold text-gray-600">Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map((listing) => (
                            <tr key={listing.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b text-gray-700">{listing.id}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{listing.title}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{listing.price} zł</td>
                                <td className="py-2 px-4 border-b text-gray-700">{new Date(listing.created_at).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{listing.status.name}</td>
                                <td className="py-2 px-4 border-b text-gray-700">
                                    <a
                                        href={`/listings/${listing.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Szczegóły
                                    </a>
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
