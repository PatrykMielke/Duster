import Layout from '@/Layouts/Layout';
import React from 'react';
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import { Link } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

function FollowedUsers({ followedUsers }) {
    // Example data for followed users

    return (
        <Layout>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2 }}>
                {/* User Cards */}
                <span className="text-3xl font-semibold">
                    Obserwowani użytkownicy
                </span>

                {followedUsers.map(user => (
                    console.log(user),
                    <Box
                        key={user.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            padding: 2,
                            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                            backgroundColor: "#fff",
                        }}
                    >
                        {/* Avatar */}
                        <Avatar
                            src={user.followed_user.avatar}
                            sx={{ width: 56, height: 56 }}
                        />

                        {/* User Name */}
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                {user.followed_user.name}
                            </Typography>
                        </Box>

                        {/* Optional button or link */}
                        <Link href={route('profile.show', user.followed_user.id)}>
                            <button
                                className="flex items-center justify-center px-4 py-2 border border-transparent bg-indigo-500 text-white mx-4 py-2 px-4 border-slate-800 rounded-lg text-md font-semibold"

                            >Profil</button>

                        </Link>
                    </Box>
                ))}
            </Box>
        </Layout>
    );
};

export default FollowedUsers;
