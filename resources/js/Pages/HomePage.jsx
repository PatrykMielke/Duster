import { useState } from "react";
import Layout from "@/Layouts/Layout";
import Select from "./Select";
import { router } from "@inertiajs/react";

function Search(props) {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            {/* Heading */}
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Znajdź to czego szukasz!
            </h1>

            {/* Search Bar */}
            <form
                onSubmit={props.handleSearchSubmit}
                className="w-full max-w-xl"
            >
                <div className="relative">
                    <input
                        type="text"
                        value={props.searchQuery.query}
                        onChange={props.handleSearchChange}
                        placeholder="Search for something..."
                        className="w-full rounded-full border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <button
                        type="submit"
                        className="absolute inset-y-0 right-0 flex items-center rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Szukaj
                    </button>
                </div>
            </form>
            <Select />
        </div>
    );
}

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState({
        query: "",
    });

    const handleSearchChange = (e) => {
        setSearchQuery({ query: e.target.value });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log("Search query:", searchQuery);
        router.get("/listings", searchQuery);
    };

    return (
        <Layout title="Duster">
            <Search
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
            />
        </Layout>
    );
}
