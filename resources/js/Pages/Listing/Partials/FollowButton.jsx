import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ToggleFavoriteButton({ listing, auth }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!auth?.user?.id) return;

        const checkIfFavorite = async () => {
            try {
                const response = await axios.get(`/followed_listings/check`, {
                    params: {
                        user_id: auth.user.id,
                        listing_id: listing.id,
                    },
                });
                console.log(response);
                if (response.data.isFavorite) {
                    setIsFavorite(true);
                }
            } catch (error) {
                console.error("Błąd podczas sprawdzania obserwacji:", error);
            }
        };

        checkIfFavorite();
    }, [auth?.user?.id, listing.id]);

    const submit = async (e) => {
        e.preventDefault();

        if (!auth?.user?.id) {
            return;
        }

        const formData = {
            user_id: auth.user.id,
            listing_id: listing.id,
        };

        try {
            if (isFavorite) {
                await axios.delete("/followed_listings", { data: formData });
                setIsFavorite(false);
                console.log("Ogłoszenie usunięte z obserwowanych.");
            } else {
                await axios.post("/followed_listings", formData);
                setIsFavorite(true);
                console.log("Ogłoszenie dodane do obserwowanych.");
            }
        } catch (error) {
            console.error("Błąd podczas aktualizacji obserwacji:", error);
        }
    };

    if (!auth?.user?.id) {
        return null;
    }

    return (
        <BottomNavigation
            sx={{
                width: 100,
            }}
        >
            <BottomNavigationAction
                label={isFavorite ? "Obserwowane" : "Obserwuj"}
                icon={
                    isFavorite ? (
                        <FavoriteIcon color="error" />
                    ) : (
                        <FavoriteBorderIcon />
                    )
                }
                onClick={submit}
                showLabel={true}
                sx={{
                    ".MuiBottomNavigationAction-label": {
                        color: "rgb(107 114 128)",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                    },
                }}
            />
        </BottomNavigation>
    );
}
