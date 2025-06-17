import {useState} from 'react';
import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import styles from "./EditStatus.module.css";
import CustomButton from "../ReusableComponents/CustomButton";
import {useBookingDetails} from "../../contexts/BookingDetailsContext";
import {updateBookingPrice, updatePersonalizedTripPrice} from "../../services/AdminService";
import ConfirmationBox from "./ConfirmationBox";

interface EditPriceProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditPriceModal = ({isOpen, onClose} : EditPriceProps) => {
    const {bookingId, bookingType, bookingPrice, setBookingPrice,} = useBookingDetails();

    const [selectedPrice, setSelectedPrice] = useState<number>(bookingPrice);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPrice(Number(event.target.value));
    };

    const handleConfirm = async () => {
        try {
            if (bookingType === "Standard") {
                await updateBookingPrice(bookingId, selectedPrice);
            } else {
                await updatePersonalizedTripPrice(bookingId, selectedPrice);
            }

            setSnackbarOpen(true);
            setSnackbarMessage("Price updated successfully.");
            setSnackbarSeverity("success");
            setBookingPrice(selectedPrice);
            onClose();
        } catch (error) {
            setSnackbarOpen(true);
            setSnackbarMessage("An error occurred.");
            setSnackbarSeverity("error");
            console.error("An error occurred while updating the price", error);
        }
    };

    return (
        <>
            <ConfirmationBox open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} severity={snackbarSeverity}/>
            <Dialog open={isOpen} onClose={onClose} aria-labelledby={"price-dialog-title"}>
                <DialogTitle component="h2" id={"price-dialog-title"}>Update Booking Price</DialogTitle>

                <label htmlFor="price" className={styles.statusLabel}>Modify price :</label>
                <input
                    type="number"
                    id="price"
                    placeholder="Insert new price"
                    value={selectedPrice}
                    onChange={handlePriceChange}
                    className={styles.inputPrice}
                />

                <DialogActions>
                    <CustomButton className={styles.statusConfirmButton} onClick={handleConfirm}>CONFIRM</CustomButton>
                    <CustomButton className={styles.cancelStatusButton} onClick={onClose}>CANCEL</CustomButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditPriceModal;
