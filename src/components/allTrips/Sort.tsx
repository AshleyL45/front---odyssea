import {FC, useEffect, useRef, useState} from 'react';
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
    const sortRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDisplaySortItems(prev => !prev);
    };

    const handleSelection = (id: string) => {
        setSelectedOption(id);
        onChange(id);
        setDisplaySortItems(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(sortRef.current && !sortRef.current.contains(event.target as Node)){
                setDisplaySortItems(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, []);

    return (
        <div className={styles.sortContainer} ref={sortRef}>
            <div className={styles.sortButtonContainer}>
                <div className={styles.sortButton} onClick={toggleDropdown}>
                    <h3 className={styles.sortTitle}>{title}</h3>
                    <KeyboardArrowDownIcon className={styles.arrowIcon}/>
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
