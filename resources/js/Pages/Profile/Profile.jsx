import React, { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout";
import FilterBar from "@/Components/FilterBar";
import Listing from "@/Pages/Listing/Partials/Listing";
import Rating from "@mui/material/Rating";
import Comment from "@/Components/Comment";
import NewComment from "@/Components/NewComment";
import ReportCommentForm from "@/Pages/Misc/Forms/ReportCommentForm";
import CommentForm from "../Misc/Forms/CommentForm";
export default function Profile({ user, auth, products }) {
    const [comments, setComments] = useState([]);

    // Funkcja do załadowania komentarzy
    const loadComments = async () => {
        try {
            const response = await axios.get(`/comments/${user.id}`);
            setComments(response.data);
        } catch (error) {
            console.error("Błąd podczas ładowania komentarzy:", error);
        }
    };
    // Załaduj komentarze przy montowaniu komponentu
    useEffect(() => {
        loadComments();
    }, [user.id]);

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
    const [isFollowed, setIsFollowed] = useState(false);
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
                const response = await axios.get("followed-users/check", {
                    params: {
                        user_id: auth.user.id,
                        followed_user_id: user.id,
                    },
                });
                if (response.data.isFollowed) {
                    setIsFollowed(true);
                }
            } catch (error) {
                console.error("Bład podczas sprawdzania obserwacji:", error);
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
                await axios.delete("followed_users.destroy", {
                    data: formData,
                });
                setIsFollowed(false);
                console.log("Uzytkownik usunięty z obserwowanych.");
            } else {
                await axios.post("followed_users.store", formData);
                setIsFollowed(true);
                console.log("Uzytkownik dodany do obserwowanych.");
            }
        } catch (error) {
            console.error("Bład podczas aktualizacji obserwacji:", error);
        }

        if (!auth?.user?.id) {
            return null;
        }
    };

    // Step 3: Use `useEffect` to sort products when sort criteria or order changes
    useEffect(() => {
        sortProducts(sortCriteria, sortOrder);
    }, [sortCriteria, sortOrder, products]);

    const handleDeleteComment = (commentId) => {
        setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId),
        );
    };
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
                    <h2 className="text-3xl font-semibold">{user.name}</h2>
                    <div className="mt-3">
                        <div className="flex items-center">
                            <Rating
                                defaultValue={1}
                                precision={0.1}
                                value={user.averageRating}
                                readOnly
                            />
                            <p className="ml-3 font-medium">
                                {user.ratingCount} opinii
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
            <div className="grid grid-cols-2 p-4 border-b border-gray-200">
                <div>
                    <span class="text-3xl font-semibold">Ogłoszenia</span>
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

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {sortedProducts.map((product) => (
                                <Listing key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 p-4 border-b border-gray-200">
                <div>
                    <span className="text-3xl font-semibold">Komentarze</span>
                </div>

                <div className="flex justify-end items-end">
                    <span className="text-blue-500 cursor-pointer">
                        {auth.user.id !== user.id ? (
                            <CommentForm
                                profileUserId={user.id}
                                onCommentAdded={loadComments}
                            />
                        ) : (
                            ""
                        )}
                    </span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:gap-x-8">
                {comments.map((comment) => (
                    <Comment
                        key={comment.id} // Używamy unikalnego ID komentarza
                        id={comment.id} // ID użytkownika, który dodał komentarz
                        avatar={
                            comment.user.avatar ||
                            "https://geex.x-kom.pl/wp-content/uploads/2022/08/andrew-tate.png"
                        }
                        username={comment.user.name}
                        rating={comment.rating}
                        comment={comment.comment}
                        onReport={handleReportOpen}
                        onDelete={handleDeleteComment} // Przekazujemy obsługę usuwania
                        authorId={comment.user_id} // ID autora komentarza
                        currentUserId={auth.user.id} // ID aktualnie zalogowanego użytkownika
                    />
                ))}
            </div>
            <ReportCommentForm
                username={selectedUsername}
                id={selectedId}
                open={open}
                onClose={handleReportClose}
            />
        </Layout>
    );
}
