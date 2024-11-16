import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackbarNotification({ open, message, handleClose, severity = 'info', variant = 'filled' }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={1300}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant={variant}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
