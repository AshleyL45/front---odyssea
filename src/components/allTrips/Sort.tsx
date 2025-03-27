import {FC, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from "../../styles/components/Sort.module.css"

type SortProps = {
    title: string;
    options: { id: string; label: string }[];
    onChange: (selected: string) => void;
};

const Sort: FC<SortProps> = ({title, options, onChange}) => {
    const [displaySortItems, setDisplaySortItems] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const displayItems = () => {
        setDisplaySortItems(prevState => !prevState);
    }

    const handleSelection = (id: string) => {
        setSelectedOption(id);
        onChange(id);
        setDisplaySortItems(false);
    };

    return (
        <div className={styles.sortContainer}>
            <div className={styles.sortButtonContainer}>
                <div className={styles.sortButton}>
                    <h3 className={styles.sortTitle}>{title}</h3>
                    <KeyboardArrowDownIcon onClick={displayItems} className={styles.arrowIcon}/>
                </div>
                {displaySortItems && (
                    <div className={styles.sortDropdown}>
                        {options.map((option) => (
                            <div key={option.id} className={styles.sortItem} onClick={() => handleSelection(option.id)}>
                                <input
                                    type="radio"
                                    id={option.id}
                                    name="sortOptions"
                                    checked={selectedOption === option.id}
                                    onChange={() => handleSelection(option.id)}
                                />
                                <label htmlFor={option.id}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sort;
