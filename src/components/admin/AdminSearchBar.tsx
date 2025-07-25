import {ChangeEvent, JSX} from 'react';
import styles from "./AdminSearchBar.module.css"
import SearchIcon from '@mui/icons-material/Search';

interface AdminSearchBarProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminSearchBar = ({onChange}: AdminSearchBarProps) => {
    return (
        <div className={styles.searchContainer}>
            <label htmlFor="search">Search by customer name</label>
            <SearchIcon className={styles.searchIcon} aria-hidden="true" focusable="false"/>
            <input id="search" type="search" name="search" onChange={onChange} className={styles.searchInput}/>
        </div>
    );
};

export default AdminSearchBar;
