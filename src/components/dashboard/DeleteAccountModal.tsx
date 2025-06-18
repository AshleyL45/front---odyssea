import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import CustomButton from "../ReusableComponents/CustomButton";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}


const DeleteAccountModal = ({isOpen, onClose, onConfirm} : DeleteAccountModalProps) => {

    return (
        <>

            <Dialog open={isOpen} onClose={onClose} aria-labelledby={"delete-account-dialog-title"}>
                <DialogTitle component="h2" id={"delete-account-dialog-title"}>Delete your account</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your account? This action cannot be undone.
                    </DialogContentText>

                    <DialogContentText component="div">
                        <Typography variant="body2" fontWeight="bold" color="error">
                            Warning: This action will delete all your personalized trips and bookings.
                        </Typography>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <CustomButton style={{color: "red", backgroundColor: "white", border: "1px solid #2C3E50", minWidth: "90px"}}  onClick={onConfirm}>DELETE</CustomButton>
                    <CustomButton style= {{color: "white", minWidth: "90px"}} onClick={onClose}>CANCEL</CustomButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteAccountModal;
