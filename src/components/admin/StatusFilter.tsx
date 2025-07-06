import {JSX, useState} from 'react';
import styles from './StatusFilter.module.css'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface StatusFilterProps {
    onStatusChange: (status: string) => void;
}

const StatusFilter = ({onStatusChange} : StatusFilterProps) => {
    const [open, setOpen] = useState(false);
    const status = ["CANCELLED", "CONFIRMED", "PENDING"];
    return (
        <div className={styles['status-container']}>
            <button className={styles['status-filter']} onClick={() => setOpen(!open)}>
                <p>Status</p>
                <ExpandMoreIcon/>
            </button>
            {
                open && (
                    <ul
                        role="listbox"
                        className={styles['filter-item__container']}
                    >
                        {status.map((statutLabel) => (
                            <li
                                key={statutLabel}
                                role="option"
                                aria-selected={false}
                            >
                                <button
                                    className={styles['filter-item']}
                                    onClick={() => onStatusChange(statutLabel)}
                                >
                                    {statutLabel}
                                </button>
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    );
};

export default StatusFilter;
