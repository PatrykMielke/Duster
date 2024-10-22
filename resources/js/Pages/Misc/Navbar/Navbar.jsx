"use client";
import Example from "../../../Components/DropDownButton";
import CategoryItems from "./CategoryItems";
import Login from "./Login";
import { Fragment, useState } from "react";
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import MobileCategoryList from "./MobileCategoryList";

const navigation = {
    categories: [
        {
            id: "women",
            name: "Women",
            featured: [
                {
                    name: "New Arrivals",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg",
                    imageAlt:
                        "Models sitting back to back, wearing Basic Tee in black and bone.",
                },
                {
                    name: "Basic Tees",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg",
                    imageAlt:
                        "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
                },
            ],
            sections: [
                {
                    id: "clothing",
                    name: "Clothing1",
                    items: [
                        { name: "Tops", href: "#" },
                        { name: "Dresses", href: "#" },
                        { name: "Pants", href: "#" },
                        { name: "Denim", href: "#" },
                        { name: "Sweaters", href: "#" },
                        { name: "T-Shirts", href: "#" },
                        { name: "Jackets", href: "#" },
                        { name: "Activewear", href: "#" },
                        { name: "Browse All", href: "#" },
                    ],
                },
                {
                    id: "accessories",
                    name: "Accessories",
                    items: [
                        { name: "Watches", href: "#" },
                        { name: "Wallets", href: "#" },
                        { name: "Bags", href: "#" },
                        { name: "Sunglasses", href: "#" },
                        { name: "Hats", href: "#" },
                        { name: "Belts", href: "#" },
                    ],
                },
                {
                    id: "brands",
                    name: "Brands",
                    items: [
                        { name: "Full Nelson", href: "#" },
                        { name: "My Way", href: "#" },
                        { name: "Re-Arranged", href: "#" },
                        { name: "Counterfeit", href: "#" },
                        { name: "Significant Other", href: "#" },
                    ],
                },
                {
                    id: "clothing",
                    name: "Clothing",
                    items: [
                        { name: "Tops", href: "#" },
                        { name: "Dresses", href: "#" },
                        { name: "Pants", href: "#" },
                        { name: "Denim", href: "#" },
                        { name: "Sweaters", href: "#" },
                    ],
                },
            ],
        },
        {
            id: "men",
            name: "Men",
            featured: [
                {
                    name: "New Arrivals",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
                    imageAlt:
                        "Drawstring top with elastic loop closure and textured interior padding.",
                },
                {
                    name: "Artwork Tees",
                    href: "#",
                    imageSrc:
                        "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
                    imageAlt:
                        "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
                },
            ],
            sections: [
                {
                    id: "clothing",
                    name: "Clothing",
                    items: [
                        { name: "Tops", href: "#" },
                        { name: "Pants", href: "#" },
                        { name: "Sweaters", href: "#" },
                        { name: "T-Shirts", href: "#" },
                        { name: "Jackets", href: "#" },
                        { name: "Activewear", href: "#" },
                        { name: "Browse All", href: "#" },
                    ],
                },
                {
                    id: "accessories",
                    name: "Accessories",
                    items: [
                        { name: "Watches", href: "#" },
                        { name: "Wallets", href: "#" },
                        { name: "Bags", href: "#" },
                        { name: "Sunglasses", href: "#" },
                        { name: "Hats", href: "#" },
                        { name: "Belts", href: "#" },
                    ],
                },
                {
                    id: "brands",
                    name: "Brands",
                    items: [
                        { name: "Re-Arranged", href: "#" },
                        { name: "Counterfeit", href: "#" },
                        { name: "Full Nelson", href: "#" },
                        { name: "My Way", href: "#" },
                    ],
                },
            ],
        },
    ],
    /*  pages: [
        { name: "Company", href: "#" },
        { name: "Stores", href: "#" },
    ], */
};

export default function Navbar(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="bg-white">
                {/* Mobile menu */}
                <MobileCategoryList navigation={navigation} />

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
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon
                                        aria-hidden="true"
                                        className="h-6 w-6"
                                    />
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <a href="#">
                                        <span className="sr-only">
                                            Your Company
                                        </span>
                                        <img
                                            alt=""
                                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                            className="h-8 w-auto"
                                        />
                                    </a>
                                </div>

                                <CategoryItems navigation={navigation} />

                                <div className="ml-auto flex items-center">
                                    <Login />

                                    <div className="hidden lg:ml-8 lg:flex">
                                        <a
                                            href="#"
                                            className="flex items-center text-gray-700 hover:text-gray-800"
                                        >
                                            <img
                                                alt=""
                                                src="https://tailwindui.com/plus/img/flags/flag-canada.svg"
                                                className="block h-auto w-5 flex-shrink-0"
                                            />
                                            <span className="ml-3 block text-sm font-medium">
                                                CAD
                                            </span>
                                            <span className="sr-only">
                                                , change currency
                                            </span>
                                        </a>
                                    </div>
                                    <Example />

                                    {/* Search */}
                                    <div className="flex lg:ml-6">
                                        <a
                                            href="#"
                                            className="p-2 text-gray-400 hover:text-gray-500"
                                        >
                                            <span className="sr-only">
                                                Search
                                            </span>
                                            <MagnifyingGlassIcon
                                                aria-hidden="true"
                                                className="h-6 w-6"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );
}
