import React from "react";
import styles from "../../styles/Reservation.module.css";

interface BookingFiltersProps {
    filters: string[];
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

const BookingFilters: React.FC<BookingFiltersProps> = ({filters, activeFilter, setActiveFilter}) => {
    return (
        <nav aria-label="Booking filters">
            <ul className={styles.filters}>
                {filters.map((filter) => (
                    <li key={filter}>
                        <button
                            type="button"
                            className={`${styles.filterItem} ${
                                activeFilter === filter ? styles.active : ""
                            }`}
                            onClick={() => setActiveFilter(filter)}
                            aria-pressed={activeFilter === filter}
                        >
                            {filter}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default BookingFilters;
