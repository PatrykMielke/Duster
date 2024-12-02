import React from "react";
import { Box, Avatar, Typography, Rating, IconButton } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "@inertiajs/react";

function Comment({
    id,
    avatar,
    username,
    rating,
    comment,
    onReport,
    onDelete,
    authorId,
    currentUserId,
}) {
    const isAuthor = currentUserId === authorId;

    // Obsługa kliknięcia przycisku zgłoszenia
    const handleReportClick = () => {
        onReport(username, id);
    };

    // Obsługa kliknięcia przycisku usunięcia
    const handleDeleteClick = async () => {
        try {
            await axios.delete(`/comments/${id}`); // Wyślij żądanie DELETE do API
            onDelete(id); // Wywołaj funkcję odświeżającą listę komentarzy
        } catch (error) {
            console.error("Błąd podczas usuwania komentarza:", error);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                mb: 2,
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            }}
        >
            {/* Warunkowe renderowanie przycisku „Usuń” lub „Zgłoś” */}
            {isAuthor ? (
                <IconButton
                    aria-label="delete"
                    onClick={handleDeleteClick}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "gray",
                        "&:hover": { color: "red" },
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            ) : (
                <IconButton
                    aria-label="report"
                    onClick={handleReportClick}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "gray",
                        "&:hover": { color: "red" },
                    }}
                >
                    <FlagIcon />
                </IconButton>
            )}

            {/* Awatar użytkownika */}
            <Link href={route("profile.show", authorId)}>
                <Avatar
                    src={avatar}
                    alt={username}
                    sx={{ width: 56, height: 56 }}
                />
            </Link>

            {/* Treść komentarza */}
            <Box sx={{ flexGrow: 1 }}>
                {/* Nazwa użytkownika */}
                <Link href={route("profile.show", authorId)}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {username}
                    </Typography>
                </Link>
                {/* Ocena */}
                <Rating
                    name="user-rating"
                    value={Number(rating)}
                    precision={0.5}
                    readOnly
                    sx={{ mb: 1 }}
                />

                {/* Komentarz */}
                <Typography variant="body2">{comment}</Typography>
            </Box>
        </Box>
    );
}

export default Comment;
