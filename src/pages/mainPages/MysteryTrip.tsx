import React, {FC} from "react";
import Navbar from "../../components/navbars/Navbar";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import MysteryTripDetails from "../../components/ReusableComponents/MysteryTripDetails";
import MysteryTripDetailsReverse from "../../components/ReusableComponents/MysteryTripDetailsReverse";
import MysteryTripBanner from "../../components/mysteryTrip/MysteryTripBanner";
import Footer from "../../components/ReusableComponents/Footer";
import {Link} from "react-router-dom";
import Pages from "../../components/layout/Pages";
import styles from "../../styles/components/MysteryTripHeroSection.module.css";
import MysteryTripHeroSection from "../../components/mysteryTrip/MysteryTripHeroSection";

const MysteryTrip: FC = () => {
    return (
        <>
            <Pages title="Mystery Trip - Odyssea">
            </Pages>

            <MysteryTripHeroSection
                imageUrl="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80…"
                title="Go on a Mystery Trip"
                subtitle="Get ready for an unforgettable adventure with no planning"
            />


            <section className="hero section" style={{marginTop: "-19rem"}}>
            <div className="mystery-details-components">
            <MysteryTripDetails
                title="Select your preferences"
                paragraph="It all starts with a simple step: indicate the countries you wish to exclude from your trip. Do you have destinations in mind that you'd like to avoid? No problem, we'll take them into account to personalize your trip while respecting your wishes."
                photoUrl="https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                stepNumber={1}
            />
            </div>
            <div className="mystery-details-components">
            <MysteryTripDetailsReverse
                title="Choose your dates"
                paragraph="Then enter the dates when you are available. This allows us to offer you a holiday that perfectly matches your schedule. With just a few clicks, we can adjust your entire trip so that you can leave when it suits you best."
                photoUrl="https://images.pexels.com/photos/2662086/pexels-photo-2662086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                stepNumber={2}
            />
            </div>
            <div className="mystery-details-components">
            <MysteryTripDetails
                title="Let the magic happen"
                paragraph="Once you've entered your preferences and availability, our generator takes care of the rest. It selects a surprise destination, accommodation and activities to suit your criteria. All you have to do is enjoy your stay - it's all organized!"
                photoUrl="https://images.pexels.com/photos/1223648/pexels-photo-1223648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                stepNumber={3}
            />
            </div>
        </section>
            <MysteryTripBanner/>
            <Footer/>
    </>
    );
};

export default MysteryTrip;
