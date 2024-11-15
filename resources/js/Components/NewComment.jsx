import React from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function NewComment() {
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
            <TextField
                id="outlined-error"
                label="Treść"
                defaultValue="Hello World"
                fullWidth
            />
        </Box>
    );
}
