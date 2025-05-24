import React from 'react';
import CustomButton from '../ReusableComponents/CustomButton';
import {Link} from "react-router-dom";

const MysteryTripBanner: React.FC = () => {
    return (
        <div className="mystery-trip-banner">
            <h2 className="mystery-trip-banner-title">
                Let go and let yourself be surprised!
            </h2>
            <div>
                <CustomButton>
                    <Link to="/booking-mystery-trip/country" style={{textDecoration: "none", color: "#fff", fontSize: "18px",
                        padding: "10px 25px"}}>
                        WHERE TO?
                    </Link>
                </CustomButton>
            </div>
        </div>
    );
};

export default MysteryTripBanner;
