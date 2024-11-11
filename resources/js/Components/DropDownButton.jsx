import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react"; // Importujemy Link z Inertia.js

export default function Example() {
    return (
        <Menu as="div" className="relative inline-block text-left px-2">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    LINKI
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 h-5 w-5 text-gray-400"
                    />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        <Link
                            href={route("index")} // Laravel route helper, przekierowanie do trasy /qq
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Strona główna
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link
                            href={route("views")} // Laravel route helper, przekierowanie do trasy /qq
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Widoki
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link
                            href={route("index")} // Laravel route helper, przekierowanie do trasy /qq
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            /{" "}
                        </Link>
                    </MenuItem>

                    <MenuItem>
                        <Link
                            href={route("listings")} // Laravel route helper, przekierowanie do trasy /qq
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            Ogłoszenia
                        </Link>
                    </MenuItem>
                    <a className="block px-4 py-2 text-sm text-red-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 ">
                        ROBOCZE
                    </a>
                    <MenuItem>
                        <Link
                            href={route("twarde")} // Laravel route helper, przekierowanie do trasy /qq
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            twarde
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("tes")} // Laravel route helper, przekierowanie do trasy /qq
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            tes
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            href={route("t")} // Laravel route helper, przekierowanie do trasy /qq
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                        >
                            t
                        </Link>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    );
}
