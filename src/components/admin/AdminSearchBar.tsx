import {ChangeEvent, ChangeEventHandler, FC, JSX} from 'react';
import styles from "./AdminSearchBar.module.css"
import SearchIcon from '@mui/icons-material/Search';

interface AdminSearchBarProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminSearchBar = ({onChange}: AdminSearchBarProps): JSX.Element => {
    return (
        <div className={styles.searchInput}>
            <label htmlFor="search"></label>
            <SearchIcon className={styles.searchIcon}/>
            <input id="search" type="search" name="search" onChange={onChange}/>
        </div>
    );
};

export default AdminSearchBar;
