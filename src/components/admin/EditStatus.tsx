import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import CustomButton from "../ReusableComponents/CustomButton";
import {useState} from "react";
import {patch} from "../../API/api"
import styles from './EditStatus.module.css'

type bookingType = "Standard" | "Personalized";
type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

interface EditStatusProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: number;
    bookingType: bookingType;
    onStatusChange: (newStatus: BookingStatus) => void;
}

const EditStatus = ({isOpen, onClose, bookingId, bookingType}: EditStatusProps) => {
    const [selectedStatus, setSelectedStatus] = useState<string>("Pending");

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
    };

    const handleConfirm = async () => {
        try {
            const response = (bookingType === "Standard") ? await patch(`/admin/bookings/${bookingId}/status`, {
                newStatus: selectedStatus.toUpperCase(),
            }) : await patch(`/admin/userItineraries/${bookingId}/status`, {
                newStatus: selectedStatus.toUpperCase(),
            }) ;

            console.log("Status updated:", selectedStatus.toUpperCase());
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut", error);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle component="h2">Update Booking Status</DialogTitle>

            <label htmlFor="status" className={styles.statusLabel}>Select new status :</label>
            <select name="status" id="status" value={selectedStatus} onChange={handleStatusChange} className={styles.selectContainer}>
                <optgroup>
                    <option value="Cancelled" className={styles.statusOption}>CANCELLED</option>
                    <option value="Confirmed" className={styles.statusOption}>CONFIRMED</option>
                    <option value="Pending" className={styles.statusOption}>PENDING</option>
                </optgroup>
            </select>

            <DialogActions>
                <CustomButton className={styles.statusConfirmButton} onClick={handleConfirm}>CONFIRM</CustomButton>
                <CustomButton className={styles.cancelStatusButton} onClick={onClose}>CANCEL</CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default EditStatus;
