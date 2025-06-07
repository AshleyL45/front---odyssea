import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import CustomButton from "../ReusableComponents/CustomButton";
import {useState} from "react";
import {patch} from "../../API/api";
import styles from './EditStatus.module.css';
import {useBookingDetails} from "../../contexts/BookingDetailsContext";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

interface EditStatusProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditStatusModal = ({isOpen, onClose}: EditStatusProps) => {
    const {
        bookingId,
        bookingType,
        bookingStatus,
        setBookingStatus
    } = useBookingDetails();

    const [selectedStatus, setSelectedStatus] = useState<BookingStatus>(bookingStatus);

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value.toUpperCase() as BookingStatus);
    };

    const handleConfirm = async () => {
        try {
            const endpoint = bookingType === "Standard"
                ? `/admin/bookings/${bookingId}/status`
                : `/admin/userItineraries/${bookingId}/status`;

            await patch(endpoint, {newStatus: selectedStatus});

            setBookingStatus(selectedStatus);
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut", error);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle component="h2">Update Booking Status</DialogTitle>

            <label htmlFor="status" className={styles.statusLabel}>Select new status :</label>
            <select
                name="status"
                id="status"
                value={selectedStatus}
                onChange={handleStatusChange}
                className={styles.selectContainer}
            >
                <optgroup>
                    <option value="CANCELLED" className={styles.statusOption}>CANCELLED</option>
                    <option value="CONFIRMED" className={styles.statusOption}>CONFIRMED</option>
                    <option value="PENDING" className={styles.statusOption}>PENDING</option>
                </optgroup>
            </select>

            <DialogActions>
                <CustomButton className={styles.statusConfirmButton} onClick={handleConfirm}>CONFIRM</CustomButton>
                <CustomButton className={styles.cancelStatusButton} onClick={onClose}>CANCEL</CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default EditStatusModal;
