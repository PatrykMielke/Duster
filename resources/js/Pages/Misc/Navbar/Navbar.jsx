"use client";
import CategoryItems from "./Partials/CategoryItems";
import Login from "./Partials/Login";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MobileCategoryList from "./Partials/MobileCategoryList";

import Searchbar from "./Partials/Searchbar";
import ProfileDropdown from "./Partials/ProfileDropdown";
import CurrencyDropdown from "./Partials/CurrencyDropdown";
import Logo from "./Partials/Logo";
import { Link, usePage } from "@inertiajs/react";

import React, { useEffect, useState } from "react";
import axios from "axios";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const user = usePage().props.auth.user;
    const [navigationData, setNavigationData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("/categories");
                //console.log("API response:", response.data); // Log the response data
                setNavigationData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
                setError("Failed to load categories");
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    if (loading) return <div></div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className="bg-white ">
                {/* Mobile menu */}
                <MobileCategoryList navigation={navigationData} />
                <header className="relative bg-white">
                    <nav
                        aria-label="Top"
                        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                    >
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center">
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Otwórz menu</span>
                                    <Bars3Icon
                                        aria-hidden="true"
                                        className="h-6 w-6"
                                    />
                                </button>
                                <Logo />
                                <CategoryItems navigation={navigationData} />
                                <div className="ml-auto flex items-center">
                                    {user && user?.role_id !== 1 ? (
                                        <Link
                                            href={route("admin")}
                                            className="bg-purple-500 text-white mx-4 py-2 px-4 border-slate-800 rounded-lg text-md font-semibold"
                                        >
                                            Admin
                                        </Link>
                                    ) : (
                                        <></>
                                    )}

                                    <Link
                                        href={route("listings.create")}
                                        className="bg-pink-500 text-white py-2 px-4 border-slate-800 rounded-lg text-md font-semibold"
                                    >
                                        Sprzedaj
                                    </Link>
                                    <Searchbar />
                                    {user ? ( // Logged In view
                                        <></>
                                    ) : (
                                        // Guest view
                                        <>
                                            <Login />
                                        </>
                                    )}
                                    <ProfileDropdown />
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );
}
