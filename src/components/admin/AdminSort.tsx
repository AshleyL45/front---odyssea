import {FC, useState} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './AdminSort.module.css';

type bookingType = "Standard" | "Personalized";

interface AdminSortProps {
    type: bookingType;
    onSortChange: (sortField: string, sortDirection: "asc" | "desc") => void;
}

const AdminSort = ({type, onSortChange} : AdminSortProps) => {
    const [open, setOpen] = useState(false);
    const [direction, setDirection] = useState<"asc" | "desc">("asc");

    const sortOptionsByType: Record<"Standard" | "Personalized", { label: string; value: string }[]> = {
        Standard: [
            {label: "Purchase Date", value: "purchaseDate"},
            {label: "Departure Date", value: "departureDate"},
        ],
        Personalized: [
            {label: "Booking Date", value: "booking_date"},
            {label: "Start Date", value: "startDate"},
        ],
    };

    const handleSortClick = (field: string) => {
        onSortChange(field, direction);
        setOpen(false);
    };

    const toggleDirection = () => {
        setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    return (
        <div className={styles['sort-container']}>
            <div className={styles['sort-label']} onClick={() => setOpen(!open)}>
                <p>Sort ({direction})</p>
                <ExpandMoreIcon/>
            </div>

            {open && (
                <div className={styles['sort-item__container']}>
                    {sortOptionsByType[type]?.map(({label, value}) => (
                        <button
                            key={value}
                            className={styles['sort-item']}
                            onClick={() => handleSortClick(value)}
                        >
                            {label}
                        </button>
                    ))}
                    <button onClick={toggleDirection} className={styles['sort-item__toggle-button']}>
                        Toggle direction
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminSort;
