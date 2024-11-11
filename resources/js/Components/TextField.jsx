import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextField() {
    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": { mt: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                fullWidth
            />
        </Box>
    );
}
