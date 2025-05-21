import React, {FC, useState, useEffect} from 'react';
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
                                                                           photoClassName = "mystery-trip-details-reverse-photo",
                                                                           stepNumber = 1,
                                                                       }) => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const isMobile = width <= 1100;

    const desktopImageContainerStyle: React.CSSProperties = {position: "relative"};
    const desktopNumberStyle: React.CSSProperties = {
        position: "absolute",
        top: "-80px",
        right: "-150px",
        fontSize: "500px",
        fontWeight: 400,
        zIndex: 2,
        pointerEvents: "none",
        userSelect: "none",
    };

    return (
        <div className="mystery-trip-details-container">
            <section className="component mystery-trip-details mystery-trip-details-reverse">
                {isMobile ? (
                    <>
                        <div className="text-mystery-trip-details">
                            <div className="mystery-trip-details-number mobile-number">
                                {stepNumber}
                            </div>
                            <h3 className="mystery-trip-details-title">
                                {title}
                            </h3>
                            <p className="mystery-trip-details-paragraph">
                                {paragraph}
                            </p>
                        </div>
                        <div className={`${photoClassName} mystery-trip-details-reverse-photo-container`}>
                            <img
                                src={photoUrl}
                                alt={`Image étape ${stepNumber}`}
                                style={{width: '100%'}}
                            />
                            <div className="mystery-trip-details-number desktop-number">
                                {stepNumber}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-mystery-trip-details-reverse">
                            <h3
                                className="mystery-trip-details-title"
                                style={{fontSize: "28px", marginBottom: "30px"}}
                            >
                                {title}
                            </h3>
                            <p
                                className="mystery-trip-details-reverse-paragraph"
                                data-step={stepNumber}
                                style={{margin: "30px 0"}}
                            >
                                {paragraph}
                            </p>
                        </div>
                        <div className={photoClassName} style={desktopImageContainerStyle}>
                            <img
                                src={photoUrl}
                                alt={`Image étape ${stepNumber}`}
                                style={{width: '100%'}}
                            />
                            <div style={desktopNumberStyle}>
                                {stepNumber}
                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default MysteryTripDetailsReverse;
