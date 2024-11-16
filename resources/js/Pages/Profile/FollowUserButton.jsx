import React, { useState } from "react";
import { router } from '@inertiajs/react';

export default function FollowUserButton({ user, auth, isFollowing: initial }) {
    const [isFollowing, setIsFollowing] = useState(initial);
    const [isLoading, setIsLoading] = useState(false);

    const toggleFollow = async () => {
        setIsLoading(true);
        const data = {
            followed_user_id: user.id,
            user_id: auth.user.id
        };

        try {
            if (isFollowing) {
                await router.delete(route('followed_users.destroy'), {
                    data: data,
                    preserveState: true,
                    preserveScroll: true,
                });
                setIsFollowing(false);
            } else {
                await router.post(route('followed_users.store'), data, {
                    preserveState: true,
                    preserveScroll: true,
                });
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Wystąpił błąd', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="">

            <button
                onClick={toggleFollow}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md ${isFollowing
                    ? 'bg-red-500 hover:bg-red-600 text-white '
                    : 'border border-slate-200  hover:bg-slate-100 '
                    } transition-colors duration-200 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            >
                {isLoading ? 'Processing...' : (isFollowing ? 'Obserwowane' : 'Obserwuj')}
            </button>

        </div >

    );
}
