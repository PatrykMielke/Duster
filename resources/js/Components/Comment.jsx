import React from "react";
import { Box, Avatar, Typography, Rating, IconButton } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";

function Comment({ id, avatar, username, rating, comment, onReport }) {
    const handleReportClick = () => {
        // Call onReport with the username when the report button is clicked
        onReport(username, id);
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
                width: 500,
            }}
        >
            {/* Flag icon for reporting */}
            <IconButton
                aria-label="report"
                onClick={handleReportClick} // Ensure the state is updated on user interaction, not during render
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

            {/* User Avatar */}
            <Avatar
                src={avatar}
                alt={username}
                sx={{ width: 56, height: 56 }}
            />

            {/* Comment Content */}
            <Box sx={{ flexGrow: 1 }}>
                {/* Username */}
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {username}
                </Typography>

                {/* Rating */}
                <Rating
                    name="user-rating"
                    value={Number(rating)} // Ensure rating is a number
                    precision={0.5}
                    readOnly
                    sx={{ mb: 1 }}
                />

                {/* Comment */}
                <Typography variant="body2">{comment}</Typography>
            </Box>
        </Box>
    );
}

export default Comment;
