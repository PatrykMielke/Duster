import React, { useState, useEffect } from "react";
import FilterBar from "@/Components/FilterBar";
import Listing from "@/Pages/Listing/Partials/Listing";

export default function Listings({ products, breadcrumbs = [] }) {
    // State to hold the sorted products
    const [sortedProducts, setSortedProducts] = useState(products);
    const [sortCriteria, setSortCriteria] = useState("created_at");
    const [sortOrder, setSortOrder] = useState("desc");
    // Step 2: Sorting function
    const sortProducts = (criteria, order) => {
        const sorted = [...products].sort((a, b) => {
            if (criteria === "price") {
                return order === "asc" ? a.price - b.price : b.price - a.price;
            } else if (criteria === "created_at") {
                return order === "asc"
                    ? new Date(a.created_at) - new Date(b.created_at)
                    : new Date(b.created_at) - new Date(a.created_at);
            } else if (criteria === "visits_count") {
                return order === "asc"
                    ? a.visits_count - b.visits_count
                    : b.visits_count - a.visits_count;
            } else if (criteria === "follow_count") {
                return order === "asc"
                    ? a.follow_count - b.follow_count
                    : b.follow_count - a.follow_count;
            }
            return 0;
        });
        setSortedProducts(sorted);
    };

    // Step 3: Use `useEffect` to sort products when sort criteria or order changes
    useEffect(() => {
        sortProducts(sortCriteria, sortOrder);
    }, [sortCriteria, sortOrder, products]);
    return (
        <>
            <div className="grid grid-cols-2 p-4 border-b border-gray-200">
                <div>
                    <span className="text-3xl font-semibold">Ogłoszenia</span>
                </div>

                <div className="flex justify-end items-end">
                    <span className="text-blue-500 cursor-pointer">
                        <FilterBar
                            onSortChange={(criteria, order) => {
                                setSortCriteria(criteria);
                                setSortOrder(order);
                            }}
                        />
                    </span>
                </div>
            </div>
            <div className="self-end ">
                {/* Sekcja z zakładkami */}

                <div className="bg-white rounded-[2rem] p-4">
                    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6  lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900"></h2>
                        <nav
                            aria-label="Breadcrumb"
                            className="flex items-center space-x-2 pb-2"
                        >
                            <ol
                                role="list"
                                className="flex items-end space-x-2"
                            >
                                {breadcrumbs.map((breadcrumb) => (
                                    <li key={breadcrumb.id}>
                                        <div className="flex items-center">
                                            <a
                                                href={breadcrumb.href}
                                                className="mr-2 text-sm font-medium text-gray-900"
                                            >
                                                {breadcrumb.name}
                                            </a>
                                            <svg
                                                fill="currentColor"
                                                width={16}
                                                height={20}
                                                viewBox="0 0 16 20"
                                                aria-hidden="true"
                                                className="h-5 w-4 text-gray-300"
                                            >
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {sortedProducts.map((product) => (
                                <Listing key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
