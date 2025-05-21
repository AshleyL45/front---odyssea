import React from 'react';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HotelIcon from '@mui/icons-material/Hotel';
import HikingIcon from '@mui/icons-material/Hiking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import styles from '../../styles/components/TripIncludesIcons.module.css';

const TripIncludesIcons: React.FC = () => {
    return (
        <section className={styles.iconsContainer}>
            <h2 className={styles.iconsTitle}>The trip includes :</h2>
            <div className={styles.iconsRow}>
                <div className={styles.iconBox}>
                    <DirectionsCarIcon sx={{fontSize: 100, color: '#2C3E50'}}/>
                    <p>Transport</p>
                </div>
                <div className={styles.iconBox}>
                    <HotelIcon sx={{fontSize: 100, color: '#2C3E50'}}/>
                    <p>Hosting</p>
                </div>
                <div className={styles.iconBox}>
                    <HikingIcon sx={{fontSize: 100, color: '#2C3E50'}}/>
                    <p>Activities</p>
                </div>
                <div className={styles.iconBox}>
                    <RestaurantIcon sx={{fontSize: 100, color: '#2C3E50'}}/>
                    <p>Catering</p>
                </div>
            </div>
        </section>
    );
};

export default TripIncludesIcons;
