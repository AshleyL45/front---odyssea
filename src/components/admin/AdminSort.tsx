import {useEffect, useRef, useState} from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styles from './AdminSort.module.css';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

type BookingType = "Standard" | "Personalized";
type SortDirection = "asc" | "desc";

interface AdminSortProps {
    type: BookingType;
    onSortChange: (sortField: string, sortDirection: SortDirection) => void;
}

const AdminSort = ({type, onSortChange} : AdminSortProps) => {
    const [open, setOpen] = useState(false);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [direction, setDirection] = useState<SortDirection>('asc');
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, []);

    const sortOptions: Record<BookingType, { label: string; value: string }[]> = {
        Standard: [
            {label: 'Purchase Date', value: 'purchaseDate'},
            {label: 'Departure Date', value: 'departureDate'},
        ],
        Personalized: [
            {label: 'Booking Date', value: 'booking_date'},
            {label: 'Start Date', value: 'startDate'},
        ],
    };

    const handleSortChange = (field: string) => {
        let newDirection = direction;
        if (selectedField === field) {
            newDirection = direction === 'asc' ? 'desc' : 'asc';
            setDirection(newDirection);
        } else {
            setSelectedField(field);
            setDirection('asc');
            newDirection = 'asc';
        }

        onSortChange(field, newDirection);
        setOpen(false);
    };

    const currentLabel = sortOptions[type].find(opt => opt.value === selectedField)?.label;

    return (
        <div className={styles['sort-container']} ref={sortRef}>
            <button
                className={styles['sort-label']}
                onClick={() => setOpen(prev => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
            <span>
              Sort by {currentLabel || ''}
            </span>
                {direction === 'asc' ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
            </button>

            {open && (
                <ul className={styles['sort-item__container']} role="listbox">
                    {sortOptions[type].map(({label, value}) => (
                        <li key={value} role="option" aria-selected={selectedField === value}>
                            <button
                                onClick={() => handleSortChange(value)}
                                className={`${styles['sort-item']} ${selectedField === value ? styles['active'] : ''}`}
                            >
                                {label} {selectedField === value && (direction === 'asc' ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminSort;
