import {FC} from 'react';
import '../../App.css';

interface MysteryTripDetailsReverseProps {
    title: string;
    paragraph: string;
    photoUrl: string;
    photoClassName?: string;
    stepNumber?: number;
}

const MysteryTripDetailsReverse: FC<MysteryTripDetailsReverseProps> = ({
                                                                           title,
                                                                           paragraph,
                                                                           photoUrl,
                                                                           photoClassName = "blog-details-photo",
                                                                           stepNumber = 1,
                                                                       }) => (
    <div className="mystery-trip-details-container">
        <section className="component blog-details-reverse mystery-trip-details">

            <div className="text-blog-details">
                <div className="mystery-trip-details-number mobile-number">
                    {stepNumber}
                </div>
                <h3 className="mystery-trip-details-title" style={{fontSize: "28px", margin: "0 0 30px 0"}}>
                    {title}
                </h3>
                <p className="mystery-trip-details-paragraph" style={{margin: "0 0 30px 0"}}>
                    {paragraph}
                </p>
            </div>

            <div className={`${photoClassName} mystery-trip-details-photo-container`}>
                <div className="photo-clip-wrapper">
                    <img
                        src={photoUrl}
                        alt={`Image étape ${stepNumber}`}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                </div>
                <div className="mystery-trip-details-number desktop-number">
                    {stepNumber}
                </div>
            </div>

        </section>
    </div>
);

export default MysteryTripDetailsReverse;
