import {FC, useState, useEffect} from 'react';
import '../../App.css';

interface MysteryTripDetailsReverseProps {
    title: string;
    paragraph: string;
    photoUrl: string; // Nouvelle prop pour l'URL de l'image
    photoClassName?: string;
    stepNumber?: number;
}

const MysteryTripDetailsReverse: FC<MysteryTripDetailsReverseProps> = ({
                                                                           title,
                                                                           paragraph,
                                                                           photoUrl,
                                                                           photoClassName = "blog-details-reverse-photo",
                                                                           stepNumber = 1,
                                                                       }) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = width <= 1100;

    const desktopImageContainerStyle: React.CSSProperties = {
        position: "relative",
    };

    const desktopNumberStyle: React.CSSProperties = {
        position: "absolute",
        top: "-80px",
        right: "-150px",
        fontSize: "500px",
        fontWeight: 400,
        zIndex: 2,
    };

    const mobileInlineNumberStyle: React.CSSProperties = {
        display: "inline-block",
        fontSize: "100px",
        fontWeight: 400,
        marginRight: "20px",
        bottom: "30px"
    };

    const textContainerStyle: React.CSSProperties = isMobile
        ? {display: "flex", alignItems: "center", flexWrap: "wrap"}
        : {};

    return (
        <div style={{margin: "200px 0"}}>
            <section className="component blog-details-reverse mystery-trip-details-reverse">
                <div className="text-blog-details-reverse" style={textContainerStyle}>
                    {isMobile && (
                        <div style={mobileInlineNumberStyle}>
                            {stepNumber}
                        </div>
                    )}
                    <h3 style={{fontSize: "28px", marginBottom: "30px"}}>{title}</h3>
                    <p style={{margin: "30px 0"}}>{paragraph}</p>
                </div>
                {/* Affichage de l'image */}
                <div className={photoClassName} style={desktopImageContainerStyle}>
                    <img
                        src={photoUrl}
                        alt={`Image étape ${stepNumber}`}
                        style={{width: "100%", height: "auto"}}
                    />
                    {!isMobile && (
                        <div style={desktopNumberStyle}>
                            {stepNumber}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default MysteryTripDetailsReverse;
