import {FC, JSX} from 'react';
import styles from "../styles/components/HeroSection.module.css"
import Navbar from "./navbars/Navbar";

const HeroSection: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div className={styles.heroSection}>
           <Navbar/>
            <div className={styles.heroSectionImage}>
                <h1>Retrouvez nos voyages d’exception, conçus pour les esprits en quête d’exclusivité</h1>
            </div>

        </div>
    );
};

export default HeroSection;
