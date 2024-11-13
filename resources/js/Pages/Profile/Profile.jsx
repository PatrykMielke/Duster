import React, { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout";
import FilterBar from "@/Components/FilterBar";
import Listing from "@/Pages/Listing/Partials/Listing";
import Rating from "@mui/material/Rating";
import Comment from "@/Components/Comment";
import ReportCommentForm from "@/Pages/Misc/Forms/ReportCommentForm";
export default function Profile({ user, products, comments }) {
    const [open, setOpen] = useState(false);
    const [selectedUsername, setSelectedUsername] = useState("");
    const [selectedId, setSelectedId] = useState(0);
    // Function to open the dialog
    const handleReportOpen = (username, id) => {
        setSelectedUsername(username);
        setSelectedId(id);
        setOpen(true);
    };

    // Function to close the dialog
    const handleReportClose = () => {
        setOpen(false);
    };
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
            } else if (criteria === "favorites") {
                return order === "asc"
                    ? a.favorites - b.favorites
                    : b.favorites - a.favorites;
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
            <div className="flex items-center border-b border-gray-300 p-4  space-x-8">
                {/* Sekcja zdjęcia profilowego po lewej */}
                <div className="flex-shrink-0 border-r border-gray-300 pr-4">
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-24 h-24 object-cover rounded-full"
                    />
                </div>

                {/* Sekcja informacji o użytkowniku */}
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <div className="mt-3">
                        <div className="flex items-center">
                            <Rating
                                defaultValue={1}
                                precision={0.1}
                                value={user.averageRating}
                                readOnly
                            />
                            <p className="ml-3 font-medium">
                                {user.ratingCount} reviews
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-8 mt-4">
                        <div>
                            <span className="font-bold">
                                {user.following_count}
                            </span>
                            <p className="text-gray-600">Obserwuje</p>
                        </div>
                        <div>
                            <span className="font-bold">
                                {user.followers_count}
                            </span>
                            <p className="text-gray-600">Obserwujących</p>
                        </div>
                        <div>
                            <span className="font-bold">{products.length}</span>
                            <p className="text-gray-600">Ogłoszenia</p>
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
            {comments.length > 0 ? "KOMENTARZE" : ""}
            {comments.map((comment) => (
                <Comment
                    //key={comment.user_id} // Używamy unikalnego ID komentarza
                    id={comment.user.id} // ID użytkownika, który dodał komentarz
                    avatar={
                        comment.user.avatar ||
                        "https://geex.x-kom.pl/wp-content/uploads/2022/08/andrew-tate.png"
                    } // Jeśli dostępne, użyj awatara użytkownika
                    username={comment.user.name} // Używamy nazwy użytkownika
                    rating={comment.rating} // Rating komentarza
                    comment={comment.comment} // Tekst komentarza
                    onReport={handleReportOpen} // Funkcja do zgłaszania komentarza
                />
            ))}
            <ReportCommentForm
                username={selectedUsername}
                id={selectedId}
                open={open}
                onClose={handleReportClose}
            />
        </Layout>
    );
}
