import React from 'react';
import {useBackToTop} from '../../contexts/BackToTopProvider';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const BackToTopButton: React.FC = () => {
    const {showBackToTop} = useBackToTop();

    if (!showBackToTop) return null;

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <button
            onClick={handleClick}
            style={{
                position: 'fixed',
                bottom: '90px',
                right: '20px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#2C3E50',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                color: 'white',
                zIndex: 1000,
            }}
            aria-label="Retour en haut"
        >
            <ArrowUpwardIcon/>
        </button>
    );
};

export default BackToTopButton;
