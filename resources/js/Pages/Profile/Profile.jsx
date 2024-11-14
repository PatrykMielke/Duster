import React, { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout";
import FilterBar from "@/Components/FilterBar";
import Listing from "@/Pages/Listing/Partials/Listing";
import axios from 'axios';

export default function Profile({ user, auth, products }) {
    // State to hold the sorted products
    const [sortedProducts, setSortedProducts] = useState(products);
    const [sortCriteria, setSortCriteria] = useState("created_at");
    const [sortOrder, setSortOrder] = useState("desc");
    const [isFollowed, setIsFollowed] = useState(false)
    // Step 2: Sorting function
    const sortProducts = (criteria, order) => {
        const sorted = [...products].sort((a, b) => {
            if (criteria === "price") {
                return order === "asc" ? a.price - b.price : b.price - a.price;
            } else if (criteria === "created_at") {
                return order === "asc"
                    ? new Date(a.created_at) - new Date(b.created_at)
                    : new Date(b.created_at) - new Date(a.created_at);
            } else if (criteria === "favorites") {
                return order === "asc"
                    ? a.favorites - b.favorites
                    : b.favorites - a.favorites;
            }
            return 0;
        });
        setSortedProducts(sorted);
    };



    useEffect(() => {
        if (!auth?.user?.id) return;

        const checkIfFollowed = async () => {

            try {
                const response = await axios.get('followed-users/check', {
                    params: {
                        user_id: auth.user.id,
                        followed_user_id: user.id,
                    },
                });
                if (response.data.isFollowed) {
                    setIsFollowed(true);
                }
            }
            catch (error) {
                console.error('Bład podczas sprawdzania obserwacji:', error);
            }
        };



        checkIfFollowed();
    }, [auth?.user?.id, user.id]);

    const submit = async (e) => {
        e.preventDefault();

        if (!auth?.user?.id) {
            return;
        }

        const formData = {
            user_id: auth.user.id,
            followed_user_id: user.id,
        };

        try {
            if (isFollowed) {
                await axios.delete('followed_users.destroy', { data: formData });
                setIsFollowed(false);
                console.log('Uzytkownik usunięty z obserwowanych.');
            } else {
                await axios.post('followed_users.store', formData);
                setIsFollowed(true);
                console.log('Uzytkownik dodany do obserwowanych.');
            }
        } catch (error) {
            console.error('Bład podczas aktualizacji obserwacji:', error);
        }

        if (!auth?.user?.id) {
            return null;
        }
    };



    // Step 3: Use `useEffect` to sort products when sort criteria or order changes
    useEffect(() => {
        sortProducts(sortCriteria, sortOrder);
    }, [sortCriteria, sortOrder, products]);

    return (
        <Layout>
            <div className="flex items-center border-b border-gray-300 p-4  space-x-8">
                {/* Sekcja zdjęcia profilowego po lewej */}
                <div className="flex-shrink-0 border-r border-gray-300 pr-4">
                    <img
                        src={"/avatars/" + user.avatar}
                        alt="Avatar"
                        className="w-24 h-24 object-cover rounded-full"
                    />
                </div>

                {/* Sekcja informacji o użytkowniku */}
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>

                    <div className="flex justify-between items-center mt-4 bg-gray-100 p-4 rounded-lg">
                        <div className="flex space-x-8">
                            <div>
                                <span className="font-bold">{user.following_count}</span>
                                <p className="text-gray-600">Obserwuje</p>
                            </div>
                            <div>
                                <span className="font-bold">{user.followers_count}</span>
                                <p className="text-gray-600">Obserwujących</p>
                            </div>
                            <div>
                                <span className="font-bold">{products.length}</span>
                                <p className="text-gray-600">Ogłoszenia</p>
                            </div>
                        </div>
                        <div>
                            <button
                                className="font-bold bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                onClick={submit}

                            >



                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="self-end ">
                {/* Sekcja z zakładkami */}

                <div className="bg-white rounded-[2rem] p-4">
                    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6  lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900"></h2>
                        <FilterBar
                            onSortChange={(criteria, order) => {
                                setSortCriteria(criteria);
                                setSortOrder(order);
                            }}
                        />

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {sortedProducts.map((product) => (
                                <Listing key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
