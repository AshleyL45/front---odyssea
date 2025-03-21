import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './HomeImages.module.css';

export type ImageItem = {
    imageUrl: string;
    title: string;
    description?: string;
};

export type HomeImagesProps = {
    images: ImageItem[];
};

const HomeImages: React.FC<HomeImagesProps> = ({images}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleClick = (index: number) => {
        if (index === 0) {
            navigate('/trip/8');
        } else if (index === 1) {
            navigate('/trip/9');
        } else if (index === 2) {
            navigate('/trip/6');
        }
    };

    return (
        <section className={styles.threeImagesSection}>
            {images.map((img, index) => (
                <div
                    key={index}
                    className={styles.imageBox}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleClick(index)}
                    style={{
                        flex: hoveredIndex === index ? 2 : 1,
                    }}
                >
                    <div className={styles.imageContainer}>
                        <img
                            src={img.imageUrl}
                            alt={img.title}
                            className={styles.image}
                        />
                        <div className={styles.overlay}>
                            <h2>{img.title}</h2>
                            {img.description && <p>{img.description}</p>}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default HomeImages;
