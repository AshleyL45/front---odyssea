import React, {FC} from "react";
import Navbar from "../../components/navbars/Navbar";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import MysteryTripDetails from "../../components/ReusableComponents/MysteryTripDetails";
import MysteryTripDetailsReverse from "../../components/ReusableComponents/MysteryTripDetailsReverse";
import MysteryTripBanner from "../../components/mysteryTrip/MysteryTripBanner";
import Footer from "../../components/ReusableComponents/Footer";
import {Link} from "react-router-dom";
import Pages from "../../components/layout/Pages";

const MysteryTrip: FC = () => {
    return (
        <>
            <div className="mysterytrip-page" style={{overflowX: 'hidden'}}>
            <Pages title="Mystery Trip - Odyssea">
            </Pages>

        <div style={{position: "relative", minHeight: "100vh"}}>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "80vh",
                    background:
                        'url("https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") no-repeat center center/cover',
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 20%, rgba(0,0,0,0.7) 100%)",
                    }}
                />
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        color: "#fff",
                        textAlign: "center",
                        zIndex: 2,
                        marginTop: "20px",
                    }}
                >
                    <h1 style={{fontSize: "2.5rem", marginBottom: "1rem"}}>
                        Go on a Mystery Tour
                    </h1>
                    <p style={{fontSize: "1.2rem", marginBottom: "2rem", lineHeight: 1.5}}>
                        Get ready for an unforgettable adventure with no planning!
                    </p>
                    <CustomButton style={{color: "#fff", marginTop: "2rem"}}>
                        <Link to="/booking-mystery-trip/country" style={{textDecoration: "none", color: "inherit"}}>
                            I'll go for it!
                        </Link>
                    </CustomButton>
                </div>
            </div>

            <div style={{position: "relative", zIndex: 2}}>
                <Navbar/>
            </div>
        </div>

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
            </div>
    </>
    );
};

export default MysteryTrip;
