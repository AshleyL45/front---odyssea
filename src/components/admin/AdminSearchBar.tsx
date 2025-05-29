import {ChangeEvent, ChangeEventHandler, FC, JSX} from 'react';
import styles from "./AdminSearchBar.module.css"

interface AdminSearchBarProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminSearchBar = ({onChange}: AdminSearchBarProps): JSX.Element => {
    return (
        <div className={styles.searchInput}>
            <label htmlFor="search"></label>
            <input id="search" type="search" name="search" onChange={onChange}/>
        </div>
    );
};

export default AdminSearchBar;
