import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

export default function ToggleButton({
    label,
    icon,
    color,
    toggleable = true, // Prop to determine if it's toggleable or just a button
    onClick // Optional click handler for button behavior
}) {
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleClick = () => {
        if (toggleable) {
            setIsFavorite((prev) => !prev);
        }
        // Call the provided onClick handler if it exists
        if (onClick) {
            onClick(!toggleable ? isFavorite : !isFavorite); // Pass the state if not toggleable
        }
    };

    return (
        <BottomNavigation
            sx={{
                width: 100,
            }}
        >
            <BottomNavigationAction
                label={isFavorite ? label.active : label.inactive}
                icon={React.cloneElement(icon, { color: isFavorite ? color.active : color.inactive })}
                onClick={handleClick}
                showLabel={true}
                sx={{
                    '.MuiBottomNavigationAction-label': {
                        color: isFavorite ? color.active : color.inactive,
                        fontSize: '0.875rem', // Corresponds to Tailwind `text-sm`
                        fontWeight: '500', // Optional for `font-medium`
                    },
                }}
            />
        </BottomNavigation>
    );
}
