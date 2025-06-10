import React from 'react';
import {Snackbar, Alert, AlertColor} from '@mui/material';

interface CustomSnackbarProps {
    open: boolean;
    onClose: () => void;
    message: string;
    severity?: AlertColor;
    autoHideDuration?: number;
    anchorOrigin?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
                                                           open,
                                                           onClose,
                                                           message,
                                                           severity = 'info',
                                                           autoHideDuration = 4000,
                                                           anchorOrigin = {vertical: 'top', horizontal: 'right'},
                                                       }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            sx={{
                '& .MuiAlert-root': {
                    width: '100%',
                },
            }}
        >
            <Alert onClose={onClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;