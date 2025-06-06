import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import CustomButton from "../ReusableComponents/CustomButton";
import {useState} from "react";
import {patch} from "../../API/api"
import styles from './EditStatus.module.css'

interface EditStatusProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: number;
}

const EditStatus = ({isOpen, onClose, bookingId}: EditStatusProps) => {
    const [selectedStatus, setSelectedStatus] = useState<string>("Pending");

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
    };

    const handleConfirm = async () => {
        try {
            const response = await patch(`/admin/bookings/${bookingId}/status`, {
                newStatus: selectedStatus.toUpperCase(),
            });

            console.log("Status updated:", selectedStatus.toUpperCase());
            onClose();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut", error);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} >
            <DialogTitle component="h2">Update Booking Status</DialogTitle>

            <label htmlFor="status">Select new status :</label>
            <select name="status" id="status" value={selectedStatus} onChange={handleStatusChange} className={styles.select}>
                <optgroup>
                    <option value="Cancelled">CANCELLED</option>
                    <option value="Confirmed">CONFIRMED</option>
                    <option value="Pending">PENDING</option>
                </optgroup>
            </select>

            <DialogActions>
                <CustomButton onClick={handleConfirm}>CONFIRM</CustomButton>
                <CustomButton onClick={onClose}>CANCEL</CustomButton>
            </DialogActions>
        </Dialog>
    );
};

export default EditStatus;
