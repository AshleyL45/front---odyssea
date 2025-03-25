import {FC, JSX} from 'react';
import Navbar from "../navbars/Navbar";
import styles from "../../styles/components/HeroSection.module.css"

const HeroSection: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div className={styles.heroSection}>
           <Navbar/>
            <div className={styles.heroSectionImage}>
                <h1>Discover our exceptional trips, designed for minds in search of exclusivity.</h1>
            </div>

        </div>
    );
};

export default HeroSection;
