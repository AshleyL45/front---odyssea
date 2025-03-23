// MysteryTripBanner.tsx
import React from 'react';
import CustomButton from './ReusableComponents/CustomButton'; // Ajustez le chemin si nécessaire

const MysteryTripBanner: React.FC = () => {
    return (
        <div className="mystery-trip-banner">
            <h2 className="mystery-trip-banner-title">
                Lâchez prise et laissez-vous surprendre !
            </h2>
            <div className="mystery-trip-banner-button-container">
                <CustomButton className="mystery-trip-banner-button">
                    Je pars où ?
                </CustomButton>
            </div>
        </div>
    );
};

export default MysteryTripBanner;
