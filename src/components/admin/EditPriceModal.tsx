import {FC, useState} from 'react';
import {patch} from "../../API/api";
import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import styles from "./EditStatus.module.css";
import CustomButton from "../ReusableComponents/CustomButton";
import {useBookingDetails} from "../../contexts/BookingDetailsContext";

interface EditPriceProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditPriceModal = ({isOpen, onClose} : EditPriceProps) => {
    const {
        bookingId,
        bookingType,
        bookingPrice,
        setBookingPrice,
    } = useBookingDetails();

    const [selectedPrice, setSelectedPrice] = useState<number>(bookingPrice);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPrice(Number(event.target.value));
    };

    const handleConfirm = async () => {
        try {
            const endpoint = bookingType === "Standard"
                ? `/admin/bookings/${bookingId}/price`
                : `/admin/userItineraries/${bookingId}/price`;

            await patch(endpoint, {
                newPrice: selectedPrice,
            });

            setBookingPrice(selectedPrice);
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du prix", error);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle component="h2">Update Booking Price</DialogTitle>

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
    );
};

export default EditPriceModal;
