// src/components/HomeCarousel.tsx
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './HomeCarousel.module.css';

export type ImageItem = {
    imageUrl: string;
    title: string;
    description?: string;
};

export type HomeCarouselProps = {
    images: ImageItem[];
};

const HomeCarousel: React.FC<HomeCarouselProps> = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const handleClick = () => {
        // Exemple de navigation en fonction de l'index (à adapter selon vos besoins)
        if (currentIndex === 0) {
            navigate('/trip/8');
        } else if (currentIndex === 1) {
            navigate('/trip/9');
        } else if (currentIndex === 2) {
            navigate('/trip/6');
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselWrapper}>
                <img
                    src={images[currentIndex].imageUrl}
                    alt={images[currentIndex].title}
                    className={styles.carouselImage}
                    onClick={handleClick}
                />
                <div className={styles.overlay}>
                    <div className={styles.overlayContent}>
                        <h2>{images[currentIndex].title}</h2>
                        {images[currentIndex].description && <p>{images[currentIndex].description}</p>}
                    </div>
                </div>

                <button className={styles.arrowLeft} onClick={goToPrev}>
                    &#9664;
                </button>
                <button className={styles.arrowRight} onClick={goToNext}>
                &#9654;
                </button>
            </div>
            <div className={styles.dotsContainer}>
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeCarousel;
