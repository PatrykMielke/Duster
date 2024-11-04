import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ToggleFavoriteButton({ listing, auth }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkIfFavorite = async () => {
            try {
                const response = await axios.get(`/followed_listings/check`, {
                    params: {
                        user_id: auth.user.id,
                        listing_id: listing.id,
                    },
                });
                if (response.data.isFavorite) {
                    setIsFavorite(true);
                }
            } catch (error) {
                console.error('Błąd podczas sprawdzania obserwacji:', error);
            }
        };

        checkIfFavorite();
    }, [auth.user.id, listing.id]);

    const submit = async (e) => {
        e.preventDefault();
        setIsFavorite((prev) => !prev);

        const formData = {
            user_id: auth.user.id,
            listing_id: listing.id,
        };

        try {
            const response = await axios.post('/followed_listings', formData);
            console.log('Odpowiedź z backendu:', response.data);
        } catch (error) {
            console.error('Błąd podczas wysyłania danych:', error);
        }
    };

    return (
        <BottomNavigation
            sx={{
                width: 100,
            }}
        >
            <BottomNavigationAction
                label={isFavorite ? "Obserwowane" : "Obserwuj"}
                icon={isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                onClick={submit}
                showLabel={true}
                sx={{
                    '.MuiBottomNavigationAction-label': {
                        color: 'rgb(107 114 128)',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                    },
                }}
            />
        </BottomNavigation>
    );
}
