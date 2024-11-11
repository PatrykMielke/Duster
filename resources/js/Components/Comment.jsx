import React from "react";
import { Box, Avatar, Typography, Rating } from "@mui/material";

function Comment({ avatar, username, rating, comment }) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
                mb: 2,
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                maxWidth: 500,
            }}
        >
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
                    value={rating}
                    precision={0.5}
                    readOnly
                    sx={{ mb: 1 }}
                />

                {/* Description */}
                <Typography variant="body2">{comment}</Typography>
            </Box>
        </Box>
    );
}

export default Comment;
