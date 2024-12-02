import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState({
        query: "",
    });

    const handleSearchChange = (e) => {
        setSearchQuery({ query: e.target.value });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search query:", searchQuery);
        router.get("/ogloszenia", searchQuery);
    };

    return (
        <form
            onSubmit={handleSearchSubmit}
            className="flex items-center lg:ml-6 px-6"
        >
            <div className="relative">
                <input
                    type="search"
                    placeholder="Szukaj..."
                    value={searchQuery.query}
                    onChange={handleSearchChange}
                    className="pr-10 pl-3 py-2 w-64 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Szukaj</span>
                    <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </form>
    );
}
