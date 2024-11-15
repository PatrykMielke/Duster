import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackbarNotification({ open, message, handleClose }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={1300}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
