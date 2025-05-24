import React from 'react';
import CustomButton from '../ReusableComponents/CustomButton';
import {Link} from "react-router-dom";

const MysteryTripBanner: React.FC = () => {
    return (
        <div className="mystery-trip-banner">
            <h2 className="mystery-trip-banner-title">
                Let's go and be surprised!
            </h2>
            <div className="mystery-trip-banner-button-container">
                <CustomButton className="mystery-trip-banner-button">
                    <Link to="/country" style={{textDecoration: "none", color: "inherit"}}>
                        Booking
                    </Link>
                </CustomButton>
            </div>
        </div>
    );
};

export default MysteryTripBanner;
