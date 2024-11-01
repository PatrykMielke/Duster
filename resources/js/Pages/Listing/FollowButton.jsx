import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ToggleFavoriteButton() {
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleToggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    return (
        <BottomNavigation
            sx={{
                width: 100,
            }}
        >            <BottomNavigationAction
                label={isFavorite ? "Obserwowane" : "Obserwuj"}
                icon={isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                onClick={handleToggleFavorite}
                showLabel={true}
                sx={{
                    '.MuiBottomNavigationAction-label': {
                        color: 'rgb(107 114 128)', // Kolor podobny do text-gray-500
                        fontSize: '0.875rem', // Odpowiada Tailwind text-sm
                        fontWeight: '500', // Opcjonalnie, aby dopasować do font-medium
                    },
                }}
            />
        </BottomNavigation>
    );
}