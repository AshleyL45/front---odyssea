import React, {useEffect, useState} from 'react';
import {useBackToTop} from '../../contexts/BackToTopProvider';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisivility = () =>{
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', toggleVisivility);
        return () => window.removeEventListener('scroll', toggleVisivility);
    }, []);

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return isVisible ? (
            <button
                onClick={handleClick}
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    paddingTop: '5px',
                    right: '20px',
                    width: '45px',
                    height: '45px',
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
        ) : null;
};

export default BackToTopButton;
