import React, {FC} from 'react';
import Navbar from '../navbars/Navbar';
import styles from '../../styles/components/MysteryTripHeroSection.module.css';

interface MysteryTripHeroSectionProps {
    imageUrl: string;
    title: string;
    subtitle: string;
}

const MysteryTripHeroSection: FC<MysteryTripHeroSectionProps> = ({
                                                                     imageUrl,
                                                                     title,
                                                                     subtitle,
                                                                 }) => (
    <div className={styles.heroSection}>
        <Navbar/>
        <div
            className={styles.heroSectionImage}
            style={{backgroundImage: `url(${imageUrl})`}}
        >
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </div>
    </div>
);

export default MysteryTripHeroSection;