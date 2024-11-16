import ProductSection from "@/Components/FilterBar";
import Listing from "@/Pages/Listing/Partials/Listing";
import Layout from "@/Layouts/Layout";
import React, { useState, useEffect } from "react";
import FilterBar from "@/Components/FilterBar";
export default function Listings({ products, category }) {
    // State to hold the sorted products
    const [sortedProducts, setSortedProducts] = useState(products);
    const [sortCriteria, setSortCriteria] = useState("created_at");
    const [sortOrder, setSortOrder] = useState("desc");
    console.log(products);
    // Step 2: Sorting function
    const sortProducts = (criteria, order) => {
        const sorted = [...products].sort((a, b) => {
            if (criteria === "price") {
                return order === "asc" ? a.price - b.price : b.price - a.price;
            } else if (criteria === "created_at") {
                return order === "asc"
                    ? new Date(a.created_at) - new Date(b.created_at)
                    : new Date(b.created_at) - new Date(a.created_at);
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
        <Layout>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6  lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        {category ? "Kategoria: " + category : ""}
                    </h2>
                    <FilterBar
                        onSortChange={(criteria, order) => {
                            setSortCriteria(criteria);
                            setSortOrder(order);
                        }}
                    />
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products && products.length > 0 ? (
                            sortedProducts.map((product) => (
                                <Listing key={product.id} product={product} />
                            ))
                        ) : (
                            <p>Brak wystawionych przedmiotów.</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
