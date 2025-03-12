import {FC, JSX, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from "../styles/components/Sort.module.css"

type SortProps = {
    title: string;
    options: {id: string; label: string}[];
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
    };

    return (
        <div className={styles.sortContainer}>
            <div>
                <div style={{
                    width: "135px",
                    padding: "8px 16px",
                    border: "1px solid black",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <h3 style={{width: "fit-content"}}>{title}</h3>
                    <KeyboardArrowDownIcon onClick={displayItems}/>
                </div>

                {displaySortItems && (
                    <div className={styles.sortItems}>
                        {options.map((option) => (
                            <div key={option.id}>
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
