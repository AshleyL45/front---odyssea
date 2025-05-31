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
            <div className={styles['status-filter']} onClick={() => setOpen(!open)}>
                <p>Status</p>
                <ExpandMoreIcon/>
            </div>
            {
                open && (
                    <div className={styles['filter-item__container']}>
                        {status.map((statutLabel) => (
                            <button className={styles['filter-item']} onClick={() => onStatusChange(statutLabel)} key={statutLabel}>
                                {statutLabel}
                            </button>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default StatusFilter;
