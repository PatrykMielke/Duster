import React, { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout";
import Rating from "@mui/material/Rating";
import Comment from "@/Components/Comment";
import NewComment from "@/Components/NewComment";
import ReportCommentForm from "@/Pages/Misc/Forms/ReportCommentForm";
import CommentForm from "../Misc/Forms/CommentForm";
import Listings from "@/Components/Listings";
import FollowUserButton from "@/Pages/Profile/FollowUserButton";
import ToggleButton from "@/Pages/Listing/Partials/ReportButton";
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";

export default function Profile({
    user,
    auth,
    products,
    followedListings,
    isFollowing,
}) {
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
    const [selectedHeader, setSelectedHeader] = useState("");
    const [referenceId, setReferenceId] = useState(0);
    const [reportType, setReportType] = useState("");
    // Function to open the dialog
    const handleCommentReportOpen = (username, id) => {
        setSelectedHeader(username);
        setReportType("comment");
        setReferenceId(id);
        setOpen(true);
    };
    const handleProfileReportOpen = () => {
        setSelectedHeader(user.name);
        setReferenceId(user.id);
        setReportType("user");
        setOpen(true);
    };

    // Function to close the dialog
    const handleReportClose = () => {
        setOpen(false);
    };

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
                                value={parseInt(user.averageRating)}
                                readOnly
                            />
                            <p className="ml-3 font-medium">
                                {user.ratingCount} opinii
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4  rounded-lg">
                        <div className="flex space-x-8">
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
                                <span className="font-bold">
                                    {products.length}
                                </span>
                                <p className="text-gray-600">Ogłoszenia</p>
                            </div>
                        </div>
                        <div>
                            {auth?.user?.id !== user.id && (
                                <>
                                    <ToggleButton
                                        label={{
                                            active: "Zgłoś",
                                            inactive: "Zgłoś",
                                        }}
                                        icon={<OutlinedFlagSharpIcon />}
                                        color={{
                                            active: "error",
                                            inactive: "rgb(107 114 128)",
                                        }}
                                        onClick={handleProfileReportOpen}
                                    />

                                    <FollowUserButton
                                        user={user}
                                        auth={auth}
                                        isFollowing={isFollowing}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Listings products={products} header={"użytkownika " + user.name} />
            {auth.user.id === user.id && followedListings ? (
                <Listings products={followedListings} header="obserwowane" />
            ) : (
                ""
            )}

            <div className="grid grid-cols-2 p-4 border-b border-gray-200">
                <div>
                    <span className="text-3xl font-semibold">Komentarze</span>
                </div>

                <div className="flex justify-end items-end">
                    <span className="text-blue-500 cursor-pointer">
                        {auth?.user?.id !== user.id ? (
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
                        onReport={handleCommentReportOpen}
                        onDelete={handleDeleteComment} // Przekazujemy obsługę usuwania
                        authorId={comment.user_id} // ID autora komentarza
                        currentUserId={auth?.user?.id} // ID aktualnie zalogowanego użytkownika
                    />
                ))}
            </div>
            <ReportCommentForm
                title="Zgłoś komentarz"
                header={selectedHeader}
                open={open}
                onClose={handleReportClose}
                referenceId={referenceId} // Fixed typo from 'referemceId' to 'referenceId'
                reportType={reportType}
            />
        </Layout>
    );
}
