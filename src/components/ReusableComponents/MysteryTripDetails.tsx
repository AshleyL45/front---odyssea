import {FC} from 'react';
import '../../App.css';

interface MysteryTripDetailsProps {
    title: string;
    paragraph: string;
    photoUrl: string; // Ajout d'une prop pour l'URL de l'image
    photoClassName?: string;
    stepNumber?: number;
}

const MysteryTripDetails: FC<MysteryTripDetailsProps> = ({
                                                             title,
                                                             paragraph,
                                                             photoUrl,
                                                             photoClassName = "blog-details-photo",
                                                             stepNumber = 1,
                                                         }) => {
    return (
        <div className="mystery-trip-details-container">
            <section className="component blog-details mystery-trip-details">
                <div className={`${photoClassName} mystery-trip-details-photo-container`}>
                    {/* Affichage de l'image */}
                    <img
                        src={photoUrl}
                        alt={`Image étape ${stepNumber}`}
                        style={{width: '100%', height: 'auto'}}
                    />
                    {/* Version desktop : numéro sur l'image */}
                    <div className="mystery-trip-details-number desktop-number">
                        {stepNumber}
                    </div>
                </div>
                <div className="text-blog-details">
                    {/* Version mobile : numéro inline à gauche du titre */}
                    <div className="mystery-trip-details-number mobile-number">
                        {stepNumber}
                    </div>
                    <h3 style={{fontSize: "28px", marginBottom: "30px"}} className="mystery-trip-details-title">
                        {title}
                    </h3>
                    <p style={{margin: "30px 0"}} className="mystery-trip-details-paragraph">
                        {paragraph}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default MysteryTripDetails;