import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

export default function BadgeVisibility({ username }) {
    const [invisible, setInvisible] = React.useState(false);

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };

    return (
        <Box
            sx={{
                color: "action.active",
                display: "flex",
                flexDirection: "column",
                "& > *": {},
                "& .MuiBadge-root": {},
            }}
        >
            <div>
                <Badge
                    color="secondary"
                    variant="dot"
                    fontSize="small"
                    invisible={invisible}
                >
                    <span style={{ marginRight: "11px" }}>{username}</span>

                    {/*  <PersonRoundedIcon fontSize="small" /> */}
                </Badge>
            </div>
        </Box>
    );
}
